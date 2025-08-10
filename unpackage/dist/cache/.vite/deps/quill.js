import {
  AlignClass,
  AlignStyle,
  BackgroundClass,
  BackgroundStyle,
  Block,
  BlockEmbed,
  ClassAttributor$1,
  Clipboard,
  Code,
  CodeBlock,
  ColorClass,
  ColorStyle,
  ContainerBlot$1,
  DirectionAttribute,
  DirectionClass,
  DirectionStyle,
  EmbedBlot$1,
  FontClass,
  FontStyle,
  Keyboard,
  LeafBlot$1,
  ParentBlot$1,
  Quill,
  Range,
  Scope,
  ScrollBlot$1,
  SizeClass,
  SizeStyle,
  Syntax,
  Text,
  break_default,
  bubbleFormats,
  container_default,
  cursor_default,
  deleteRange,
  embed_default,
  emitter_default,
  inline_default,
  logger_default,
  merge_default,
  module_default,
  parchment_exports,
  require_Delta,
  theme_default
} from "./chunk-PVQ7SAZW.js";
import "./chunk-P76UNY3Y.js";
import {
  __publicField,
  __toESM
} from "./chunk-UV5CTPV7.js";

// E:/WebProject/MixBlogUniApp/node_modules/quill/blots/scroll.js
var import_quill_delta = __toESM(require_Delta(), 1);
function isLine(blot) {
  return blot instanceof Block || blot instanceof BlockEmbed;
}
function isUpdatable(blot) {
  return typeof blot.updateContent === "function";
}
var Scroll = class extends ScrollBlot$1 {
  constructor(registry, domNode, _ref) {
    let {
      emitter
    } = _ref;
    super(registry, domNode);
    this.emitter = emitter;
    this.batch = false;
    this.optimize();
    this.enable();
    this.domNode.addEventListener("dragstart", (e) => this.handleDragStart(e));
  }
  batchStart() {
    if (!Array.isArray(this.batch)) {
      this.batch = [];
    }
  }
  batchEnd() {
    if (!this.batch)
      return;
    const mutations = this.batch;
    this.batch = false;
    this.update(mutations);
  }
  emitMount(blot) {
    this.emitter.emit(emitter_default.events.SCROLL_BLOT_MOUNT, blot);
  }
  emitUnmount(blot) {
    this.emitter.emit(emitter_default.events.SCROLL_BLOT_UNMOUNT, blot);
  }
  emitEmbedUpdate(blot, change) {
    this.emitter.emit(emitter_default.events.SCROLL_EMBED_UPDATE, blot, change);
  }
  deleteAt(index, length) {
    const [first, offset] = this.line(index);
    const [last] = this.line(index + length);
    super.deleteAt(index, length);
    if (last != null && first !== last && offset > 0) {
      if (first instanceof BlockEmbed || last instanceof BlockEmbed) {
        this.optimize();
        return;
      }
      const ref = last.children.head instanceof break_default ? null : last.children.head;
      first.moveChildren(last, ref);
      first.remove();
    }
    this.optimize();
  }
  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    this.domNode.setAttribute("contenteditable", enabled ? "true" : "false");
  }
  formatAt(index, length, format, value) {
    super.formatAt(index, length, format, value);
    this.optimize();
  }
  insertAt(index, value, def) {
    if (index >= this.length()) {
      if (def == null || this.scroll.query(value, Scope.BLOCK) == null) {
        const blot = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(blot);
        if (def == null && value.endsWith("\n")) {
          blot.insertAt(0, value.slice(0, -1), def);
        } else {
          blot.insertAt(0, value, def);
        }
      } else {
        const embed = this.scroll.create(value, def);
        this.appendChild(embed);
      }
    } else {
      super.insertAt(index, value, def);
    }
    this.optimize();
  }
  insertBefore(blot, ref) {
    if (blot.statics.scope === Scope.INLINE_BLOT) {
      const wrapper = this.scroll.create(this.statics.defaultChild.blotName);
      wrapper.appendChild(blot);
      super.insertBefore(wrapper, ref);
    } else {
      super.insertBefore(blot, ref);
    }
  }
  insertContents(index, delta) {
    const renderBlocks = this.deltaToRenderBlocks(delta.concat(new import_quill_delta.default().insert("\n")));
    const last = renderBlocks.pop();
    if (last == null)
      return;
    this.batchStart();
    const first = renderBlocks.shift();
    if (first) {
      const shouldInsertNewlineChar = first.type === "block" && (first.delta.length() === 0 || !this.descendant(BlockEmbed, index)[0] && index < this.length());
      const delta2 = first.type === "block" ? first.delta : new import_quill_delta.default().insert({
        [first.key]: first.value
      });
      insertInlineContents(this, index, delta2);
      const newlineCharLength = first.type === "block" ? 1 : 0;
      const lineEndIndex = index + delta2.length() + newlineCharLength;
      if (shouldInsertNewlineChar) {
        this.insertAt(lineEndIndex - 1, "\n");
      }
      const formats = bubbleFormats(this.line(index)[0]);
      const attributes = import_quill_delta.AttributeMap.diff(formats, first.attributes) || {};
      Object.keys(attributes).forEach((name) => {
        this.formatAt(lineEndIndex - 1, 1, name, attributes[name]);
      });
      index = lineEndIndex;
    }
    let [refBlot, refBlotOffset] = this.children.find(index);
    if (renderBlocks.length) {
      if (refBlot) {
        refBlot = refBlot.split(refBlotOffset);
        refBlotOffset = 0;
      }
      renderBlocks.forEach((renderBlock) => {
        if (renderBlock.type === "block") {
          const block = this.createBlock(renderBlock.attributes, refBlot || void 0);
          insertInlineContents(block, 0, renderBlock.delta);
        } else {
          const blockEmbed = this.create(renderBlock.key, renderBlock.value);
          this.insertBefore(blockEmbed, refBlot || void 0);
          Object.keys(renderBlock.attributes).forEach((name) => {
            blockEmbed.format(name, renderBlock.attributes[name]);
          });
        }
      });
    }
    if (last.type === "block" && last.delta.length()) {
      const offset = refBlot ? refBlot.offset(refBlot.scroll) + refBlotOffset : this.length();
      insertInlineContents(this, offset, last.delta);
    }
    this.batchEnd();
    this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(index) {
    const last = this.path(index).pop();
    if (!last) {
      return [null, -1];
    }
    const [blot, offset] = last;
    return blot instanceof LeafBlot$1 ? [blot, offset] : [null, -1];
  }
  line(index) {
    if (index === this.length()) {
      return this.line(index - 1);
    }
    return this.descendant(isLine, index);
  }
  lines() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const getLines = (blot, blotIndex, blotLength) => {
      let lines = [];
      let lengthLeft = blotLength;
      blot.children.forEachAt(blotIndex, blotLength, (child, childIndex, childLength) => {
        if (isLine(child)) {
          lines.push(child);
        } else if (child instanceof ContainerBlot$1) {
          lines = lines.concat(getLines(child, childIndex, lengthLeft));
        }
        lengthLeft -= childLength;
      });
      return lines;
    };
    return getLines(this, index, length);
  }
  optimize() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.batch)
      return;
    super.optimize(mutations, context);
    if (mutations.length > 0) {
      this.emitter.emit(emitter_default.events.SCROLL_OPTIMIZE, mutations, context);
    }
  }
  path(index) {
    return super.path(index).slice(1);
  }
  remove() {
  }
  update(mutations) {
    if (this.batch) {
      if (Array.isArray(mutations)) {
        this.batch = this.batch.concat(mutations);
      }
      return;
    }
    let source = emitter_default.sources.USER;
    if (typeof mutations === "string") {
      source = mutations;
    }
    if (!Array.isArray(mutations)) {
      mutations = this.observer.takeRecords();
    }
    mutations = mutations.filter((_ref2) => {
      let {
        target
      } = _ref2;
      const blot = this.find(target, true);
      return blot && !isUpdatable(blot);
    });
    if (mutations.length > 0) {
      this.emitter.emit(emitter_default.events.SCROLL_BEFORE_UPDATE, source, mutations);
    }
    super.update(mutations.concat([]));
    if (mutations.length > 0) {
      this.emitter.emit(emitter_default.events.SCROLL_UPDATE, source, mutations);
    }
  }
  updateEmbedAt(index, key, change) {
    const [blot] = this.descendant((b) => b instanceof BlockEmbed, index);
    if (blot && blot.statics.blotName === key && isUpdatable(blot)) {
      blot.updateContent(change);
    }
  }
  handleDragStart(event) {
    event.preventDefault();
  }
  deltaToRenderBlocks(delta) {
    const renderBlocks = [];
    let currentBlockDelta = new import_quill_delta.default();
    delta.forEach((op) => {
      const insert = op == null ? void 0 : op.insert;
      if (!insert)
        return;
      if (typeof insert === "string") {
        const splitted = insert.split("\n");
        splitted.slice(0, -1).forEach((text) => {
          currentBlockDelta.insert(text, op.attributes);
          renderBlocks.push({
            type: "block",
            delta: currentBlockDelta,
            attributes: op.attributes ?? {}
          });
          currentBlockDelta = new import_quill_delta.default();
        });
        const last = splitted[splitted.length - 1];
        if (last) {
          currentBlockDelta.insert(last, op.attributes);
        }
      } else {
        const key = Object.keys(insert)[0];
        if (!key)
          return;
        if (this.query(key, Scope.INLINE)) {
          currentBlockDelta.push(op);
        } else {
          if (currentBlockDelta.length()) {
            renderBlocks.push({
              type: "block",
              delta: currentBlockDelta,
              attributes: {}
            });
          }
          currentBlockDelta = new import_quill_delta.default();
          renderBlocks.push({
            type: "blockEmbed",
            key,
            value: insert[key],
            attributes: op.attributes ?? {}
          });
        }
      }
    });
    if (currentBlockDelta.length()) {
      renderBlocks.push({
        type: "block",
        delta: currentBlockDelta,
        attributes: {}
      });
    }
    return renderBlocks;
  }
  createBlock(attributes, refBlot) {
    let blotName;
    const formats = {};
    Object.entries(attributes).forEach((_ref3) => {
      let [key, value] = _ref3;
      const isBlockBlot = this.query(key, Scope.BLOCK & Scope.BLOT) != null;
      if (isBlockBlot) {
        blotName = key;
      } else {
        formats[key] = value;
      }
    });
    const block = this.create(blotName || this.statics.defaultChild.blotName, blotName ? attributes[blotName] : void 0);
    this.insertBefore(block, refBlot || void 0);
    const length = block.length();
    Object.entries(formats).forEach((_ref4) => {
      let [key, value] = _ref4;
      block.formatAt(0, length, key, value);
    });
    return block;
  }
};
__publicField(Scroll, "blotName", "scroll");
__publicField(Scroll, "className", "ql-editor");
__publicField(Scroll, "tagName", "DIV");
__publicField(Scroll, "defaultChild", Block);
__publicField(Scroll, "allowedChildren", [Block, BlockEmbed, container_default]);
function insertInlineContents(parent, index, inlineContents) {
  inlineContents.reduce((index2, op) => {
    const length = import_quill_delta.Op.length(op);
    let attributes = op.attributes || {};
    if (op.insert != null) {
      if (typeof op.insert === "string") {
        const text = op.insert;
        parent.insertAt(index2, text);
        const [leaf] = parent.descendant(LeafBlot$1, index2);
        const formats = bubbleFormats(leaf);
        attributes = import_quill_delta.AttributeMap.diff(formats, attributes) || {};
      } else if (typeof op.insert === "object") {
        const key = Object.keys(op.insert)[0];
        if (key == null)
          return index2;
        parent.insertAt(index2, key, op.insert[key]);
        const isInlineEmbed = parent.scroll.query(key, Scope.INLINE) != null;
        if (isInlineEmbed) {
          const [leaf] = parent.descendant(LeafBlot$1, index2);
          const formats = bubbleFormats(leaf);
          attributes = import_quill_delta.AttributeMap.diff(formats, attributes) || {};
        }
      }
    }
    Object.keys(attributes).forEach((key) => {
      parent.formatAt(index2, length, key, attributes[key]);
    });
    return index2 + length;
  }, index);
}
var scroll_default = Scroll;

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/history.js
var History = class extends module_default {
  constructor(quill, options) {
    super(quill, options);
    __publicField(this, "lastRecorded", 0);
    __publicField(this, "ignoreChange", false);
    __publicField(this, "stack", {
      undo: [],
      redo: []
    });
    __publicField(this, "currentRange", null);
    this.quill.on(Quill.events.EDITOR_CHANGE, (eventName, value, oldValue, source) => {
      if (eventName === Quill.events.SELECTION_CHANGE) {
        if (value && source !== Quill.sources.SILENT) {
          this.currentRange = value;
        }
      } else if (eventName === Quill.events.TEXT_CHANGE) {
        if (!this.ignoreChange) {
          if (!this.options.userOnly || source === Quill.sources.USER) {
            this.record(value, oldValue);
          } else {
            this.transform(value);
          }
        }
        this.currentRange = transformRange(this.currentRange, value);
      }
    });
    this.quill.keyboard.addBinding({
      key: "z",
      shortKey: true
    }, this.undo.bind(this));
    this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: true,
      shiftKey: true
    }, this.redo.bind(this));
    if (/Win/i.test(navigator.platform)) {
      this.quill.keyboard.addBinding({
        key: "y",
        shortKey: true
      }, this.redo.bind(this));
    }
    this.quill.root.addEventListener("beforeinput", (event) => {
      if (event.inputType === "historyUndo") {
        this.undo();
        event.preventDefault();
      } else if (event.inputType === "historyRedo") {
        this.redo();
        event.preventDefault();
      }
    });
  }
  change(source, dest) {
    if (this.stack[source].length === 0)
      return;
    const item = this.stack[source].pop();
    if (!item)
      return;
    const base = this.quill.getContents();
    const inverseDelta = item.delta.invert(base);
    this.stack[dest].push({
      delta: inverseDelta,
      range: transformRange(item.range, inverseDelta)
    });
    this.lastRecorded = 0;
    this.ignoreChange = true;
    this.quill.updateContents(item.delta, Quill.sources.USER);
    this.ignoreChange = false;
    this.restoreSelection(item);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(changeDelta, oldDelta) {
    if (changeDelta.ops.length === 0)
      return;
    this.stack.redo = [];
    let undoDelta = changeDelta.invert(oldDelta);
    let undoRange = this.currentRange;
    const timestamp = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0
    ) {
      const item = this.stack.undo.pop();
      if (item) {
        undoDelta = undoDelta.compose(item.delta);
        undoRange = item.range;
      }
    } else {
      this.lastRecorded = timestamp;
    }
    if (undoDelta.length() === 0)
      return;
    this.stack.undo.push({
      delta: undoDelta,
      range: undoRange
    });
    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift();
    }
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(delta) {
    transformStack(this.stack.undo, delta);
    transformStack(this.stack.redo, delta);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(stackItem) {
    if (stackItem.range) {
      this.quill.setSelection(stackItem.range, Quill.sources.USER);
    } else {
      const index = getLastChangeIndex(this.quill.scroll, stackItem.delta);
      this.quill.setSelection(index, Quill.sources.USER);
    }
  }
};
__publicField(History, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: false
});
function transformStack(stack, delta) {
  let remoteDelta = delta;
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const oldItem = stack[i];
    stack[i] = {
      delta: remoteDelta.transform(oldItem.delta, true),
      range: oldItem.range && transformRange(oldItem.range, remoteDelta)
    };
    remoteDelta = oldItem.delta.transform(remoteDelta);
    if (stack[i].delta.length() === 0) {
      stack.splice(i, 1);
    }
  }
}
function endsWithNewlineChange(scroll, delta) {
  const lastOp = delta.ops[delta.ops.length - 1];
  if (lastOp == null)
    return false;
  if (lastOp.insert != null) {
    return typeof lastOp.insert === "string" && lastOp.insert.endsWith("\n");
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some((attr) => {
      return scroll.query(attr, Scope.BLOCK) != null;
    });
  }
  return false;
}
function getLastChangeIndex(scroll, delta) {
  const deleteLength = delta.reduce((length, op) => {
    return length + (op.delete || 0);
  }, 0);
  let changeIndex = delta.length() - deleteLength;
  if (endsWithNewlineChange(scroll, delta)) {
    changeIndex -= 1;
  }
  return changeIndex;
}
function transformRange(range, delta) {
  if (!range)
    return range;
  const start = delta.transformPosition(range.index);
  const end = delta.transformPosition(range.index + range.length);
  return {
    index: start,
    length: end - start
  };
}

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/uploader.js
var import_quill_delta2 = __toESM(require_Delta(), 1);
var Uploader = class extends module_default {
  constructor(quill, options) {
    super(quill, options);
    quill.root.addEventListener("drop", (e) => {
      var _a;
      e.preventDefault();
      let native = null;
      if (document.caretRangeFromPoint) {
        native = document.caretRangeFromPoint(e.clientX, e.clientY);
      } else if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(e.clientX, e.clientY);
        native = document.createRange();
        native.setStart(position.offsetNode, position.offset);
        native.setEnd(position.offsetNode, position.offset);
      }
      const normalized = native && quill.selection.normalizeNative(native);
      if (normalized) {
        const range = quill.selection.normalizedToRange(normalized);
        if ((_a = e.dataTransfer) == null ? void 0 : _a.files) {
          this.upload(range, e.dataTransfer.files);
        }
      }
    });
  }
  upload(range, files) {
    const uploads = [];
    Array.from(files).forEach((file) => {
      var _a;
      if (file && ((_a = this.options.mimetypes) == null ? void 0 : _a.includes(file.type))) {
        uploads.push(file);
      }
    });
    if (uploads.length > 0) {
      this.options.handler.call(this, range, uploads);
    }
  }
};
Uploader.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(range, files) {
    if (!this.quill.scroll.query("image")) {
      return;
    }
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((images) => {
      const update = images.reduce((delta, image) => {
        return delta.insert({
          image
        });
      }, new import_quill_delta2.default().retain(range.index).delete(range.length));
      this.quill.updateContents(update, emitter_default.sources.USER);
      this.quill.setSelection(range.index + images.length, emitter_default.sources.SILENT);
    });
  }
};
var uploader_default = Uploader;

// E:/WebProject/MixBlogUniApp/node_modules/quill/core.js
var import_quill_delta4 = __toESM(require_Delta(), 1);

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/input.js
var import_quill_delta3 = __toESM(require_Delta(), 1);
var INSERT_TYPES = ["insertText", "insertReplacementText"];
var Input = class extends module_default {
  constructor(quill, options) {
    super(quill, options);
    quill.root.addEventListener("beforeinput", (event) => {
      this.handleBeforeInput(event);
    });
    if (!/Android/i.test(navigator.userAgent)) {
      quill.on(Quill.events.COMPOSITION_BEFORE_START, () => {
        this.handleCompositionStart();
      });
    }
  }
  deleteRange(range) {
    deleteRange({
      range,
      quill: this.quill
    });
  }
  replaceText(range) {
    let text = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (range.length === 0)
      return false;
    if (text) {
      const formats = this.quill.getFormat(range.index, 1);
      this.deleteRange(range);
      this.quill.updateContents(new import_quill_delta3.default().retain(range.index).insert(text, formats), Quill.sources.USER);
    } else {
      this.deleteRange(range);
    }
    this.quill.setSelection(range.index + text.length, 0, Quill.sources.SILENT);
    return true;
  }
  handleBeforeInput(event) {
    if (this.quill.composition.isComposing || event.defaultPrevented || !INSERT_TYPES.includes(event.inputType)) {
      return;
    }
    const staticRange = event.getTargetRanges ? event.getTargetRanges()[0] : null;
    if (!staticRange || staticRange.collapsed === true) {
      return;
    }
    const text = getPlainTextFromInputEvent(event);
    if (text == null) {
      return;
    }
    const normalized = this.quill.selection.normalizeNative(staticRange);
    const range = normalized ? this.quill.selection.normalizedToRange(normalized) : null;
    if (range && this.replaceText(range, text)) {
      event.preventDefault();
    }
  }
  handleCompositionStart() {
    const range = this.quill.getSelection();
    if (range) {
      this.replaceText(range);
    }
  }
};
function getPlainTextFromInputEvent(event) {
  var _a;
  if (typeof event.data === "string") {
    return event.data;
  }
  if ((_a = event.dataTransfer) == null ? void 0 : _a.types.includes("text/plain")) {
    return event.dataTransfer.getData("text/plain");
  }
  return null;
}
var input_default = Input;

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/uiNode.js
var isMac = /Mac/i.test(navigator.platform);
var TTL_FOR_VALID_SELECTION_CHANGE = 100;
var canMoveCaretBeforeUINode = (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
  event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Home") {
    return true;
  }
  if (isMac && event.key === "a" && event.ctrlKey === true) {
    return true;
  }
  return false;
};
var UINode = class extends module_default {
  constructor(quill, options) {
    super(quill, options);
    __publicField(this, "isListening", false);
    __publicField(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys();
    this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(range, _ref) {
        let {
          line,
          event
        } = _ref;
        if (!(line instanceof ParentBlot$1) || !line.uiNode) {
          return true;
        }
        const isRTL = getComputedStyle(line.domNode)["direction"] === "rtl";
        if (isRTL && event.key !== "ArrowRight" || !isRTL && event.key !== "ArrowLeft") {
          return true;
        }
        this.quill.setSelection(range.index - 1, range.length + (event.shiftKey ? 1 : 0), Quill.sources.USER);
        return false;
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (event) => {
      if (!event.defaultPrevented && canMoveCaretBeforeUINode(event)) {
        this.ensureListeningToSelectionChange();
      }
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    this.selectionChangeDeadline = Date.now() + TTL_FOR_VALID_SELECTION_CHANGE;
    if (this.isListening)
      return;
    this.isListening = true;
    const listener = () => {
      this.isListening = false;
      if (Date.now() <= this.selectionChangeDeadline) {
        this.handleSelectionChange();
      }
    };
    document.addEventListener("selectionchange", listener, {
      once: true
    });
  }
  handleSelectionChange() {
    const selection = document.getSelection();
    if (!selection)
      return;
    const range = selection.getRangeAt(0);
    if (range.collapsed !== true || range.startOffset !== 0)
      return;
    const line = this.quill.scroll.find(range.startContainer);
    if (!(line instanceof ParentBlot$1) || !line.uiNode)
      return;
    const newRange = document.createRange();
    newRange.setStartAfter(line.uiNode);
    newRange.setEndAfter(line.uiNode);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};
var uiNode_default = UINode;

// E:/WebProject/MixBlogUniApp/node_modules/quill/core.js
Quill.register({
  "blots/block": Block,
  "blots/block/embed": BlockEmbed,
  "blots/break": break_default,
  "blots/container": container_default,
  "blots/cursor": cursor_default,
  "blots/embed": embed_default,
  "blots/inline": inline_default,
  "blots/scroll": scroll_default,
  "blots/text": Text,
  "modules/clipboard": Clipboard,
  "modules/history": History,
  "modules/keyboard": Keyboard,
  "modules/uploader": uploader_default,
  "modules/input": input_default,
  "modules/uiNode": uiNode_default
});
var core_default = Quill;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/indent.js
var IndentAttributor = class extends ClassAttributor$1 {
  add(node, value) {
    let normalizedValue = 0;
    if (value === "+1" || value === "-1") {
      const indent = this.value(node) || 0;
      normalizedValue = value === "+1" ? indent + 1 : indent - 1;
    } else if (typeof value === "number") {
      normalizedValue = value;
    }
    if (normalizedValue === 0) {
      this.remove(node);
      return true;
    }
    return super.add(node, normalizedValue.toString());
  }
  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));
  }
  value(node) {
    return parseInt(super.value(node), 10) || void 0;
  }
};
var IndentClass = new IndentAttributor("indent", "ql-indent", {
  scope: Scope.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
var indent_default = IndentClass;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/blockquote.js
var Blockquote = class extends Block {
};
__publicField(Blockquote, "blotName", "blockquote");
__publicField(Blockquote, "tagName", "blockquote");
var blockquote_default = Blockquote;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/header.js
var Header = class extends Block {
  static formats(domNode) {
    return this.tagName.indexOf(domNode.tagName) + 1;
  }
};
__publicField(Header, "blotName", "header");
__publicField(Header, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
var header_default = Header;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/list.js
var ListContainer = class extends container_default {
};
ListContainer.blotName = "list-container";
ListContainer.tagName = "OL";
var ListItem = class extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute("data-list", value);
    return node;
  }
  static formats(domNode) {
    return domNode.getAttribute("data-list") || void 0;
  }
  static register() {
    Quill.register(ListContainer);
  }
  constructor(scroll, domNode) {
    super(scroll, domNode);
    const ui = domNode.ownerDocument.createElement("span");
    const listEventHandler = (e) => {
      if (!scroll.isEnabled())
        return;
      const format = this.statics.formats(domNode, scroll);
      if (format === "checked") {
        this.format("list", "unchecked");
        e.preventDefault();
      } else if (format === "unchecked") {
        this.format("list", "checked");
        e.preventDefault();
      }
    };
    ui.addEventListener("mousedown", listEventHandler);
    ui.addEventListener("touchstart", listEventHandler);
    this.attachUI(ui);
  }
  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute("data-list", value);
    } else {
      super.format(name, value);
    }
  }
};
ListItem.blotName = "list";
ListItem.tagName = "LI";
ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/bold.js
var Bold = class extends inline_default {
  static create() {
    return super.create();
  }
  static formats() {
    return true;
  }
  optimize(context) {
    super.optimize(context);
    if (this.domNode.tagName !== this.statics.tagName[0]) {
      this.replaceWith(this.statics.blotName);
    }
  }
};
__publicField(Bold, "blotName", "bold");
__publicField(Bold, "tagName", ["STRONG", "B"]);
var bold_default = Bold;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/italic.js
var Italic = class extends bold_default {
};
__publicField(Italic, "blotName", "italic");
__publicField(Italic, "tagName", ["EM", "I"]);
var italic_default = Italic;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/link.js
var Link = class extends inline_default {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("href", this.sanitize(value));
    node.setAttribute("rel", "noopener noreferrer");
    node.setAttribute("target", "_blank");
    return node;
  }
  static formats(domNode) {
    return domNode.getAttribute("href");
  }
  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }
  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute("href", this.constructor.sanitize(value));
    }
  }
};
__publicField(Link, "blotName", "link");
__publicField(Link, "tagName", "A");
__publicField(Link, "SANITIZED_URL", "about:blank");
__publicField(Link, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function sanitize(url, protocols) {
  const anchor = document.createElement("a");
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
  return protocols.indexOf(protocol) > -1;
}

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/script.js
var Script = class extends inline_default {
  static create(value) {
    if (value === "super") {
      return document.createElement("sup");
    }
    if (value === "sub") {
      return document.createElement("sub");
    }
    return super.create(value);
  }
  static formats(domNode) {
    if (domNode.tagName === "SUB")
      return "sub";
    if (domNode.tagName === "SUP")
      return "super";
    return void 0;
  }
};
__publicField(Script, "blotName", "script");
__publicField(Script, "tagName", ["SUB", "SUP"]);
var script_default = Script;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/strike.js
var Strike = class extends bold_default {
};
__publicField(Strike, "blotName", "strike");
__publicField(Strike, "tagName", ["S", "STRIKE"]);
var strike_default = Strike;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/underline.js
var Underline = class extends inline_default {
};
__publicField(Underline, "blotName", "underline");
__publicField(Underline, "tagName", "U");
var underline_default = Underline;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/formula.js
var Formula = class extends embed_default {
  static create(value) {
    if (window.katex == null) {
      throw new Error("Formula module requires KaTeX.");
    }
    const node = super.create(value);
    if (typeof value === "string") {
      window.katex.render(value, node, {
        throwOnError: false,
        errorColor: "#f00"
      });
      node.setAttribute("data-value", value);
    }
    return node;
  }
  static value(domNode) {
    return domNode.getAttribute("data-value");
  }
  html() {
    const {
      formula
    } = this.value();
    return `<span>${formula}</span>`;
  }
};
__publicField(Formula, "blotName", "formula");
__publicField(Formula, "className", "ql-formula");
__publicField(Formula, "tagName", "SPAN");
var formula_default = Formula;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/image.js
var ATTRIBUTES = ["alt", "height", "width"];
var Image = class extends EmbedBlot$1 {
  static create(value) {
    const node = super.create(value);
    if (typeof value === "string") {
      node.setAttribute("src", this.sanitize(value));
    }
    return node;
  }
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }
  static sanitize(url) {
    return sanitize(url, ["http", "https", "data"]) ? url : "//:0";
  }
  static value(domNode) {
    return domNode.getAttribute("src");
  }
  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
};
__publicField(Image, "blotName", "image");
__publicField(Image, "tagName", "IMG");
var image_default = Image;

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/video.js
var ATTRIBUTES2 = ["height", "width"];
var Video = class extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", "true");
    node.setAttribute("src", this.sanitize(value));
    return node;
  }
  static formats(domNode) {
    return ATTRIBUTES2.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  static sanitize(url) {
    return Link.sanitize(url);
  }
  static value(domNode) {
    return domNode.getAttribute("src");
  }
  format(name, value) {
    if (ATTRIBUTES2.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
  html() {
    const {
      video
    } = this.value();
    return `<a href="${video}">${video}</a>`;
  }
};
__publicField(Video, "blotName", "video");
__publicField(Video, "className", "ql-video");
__publicField(Video, "tagName", "IFRAME");
var video_default = Video;

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/table.js
var import_quill_delta5 = __toESM(require_Delta(), 1);

// E:/WebProject/MixBlogUniApp/node_modules/quill/formats/table.js
var _TableCell = class _TableCell extends Block {
  static create(value) {
    const node = super.create();
    if (value) {
      node.setAttribute("data-row", value);
    } else {
      node.setAttribute("data-row", tableId());
    }
    return node;
  }
  static formats(domNode) {
    if (domNode.hasAttribute("data-row")) {
      return domNode.getAttribute("data-row");
    }
    return void 0;
  }
  cellOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  format(name, value) {
    if (name === _TableCell.blotName && value) {
      this.domNode.setAttribute("data-row", value);
    } else {
      super.format(name, value);
    }
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    if (this.row()) {
      return this.row().rowOffset();
    }
    return -1;
  }
  table() {
    return this.row() && this.row().table();
  }
};
__publicField(_TableCell, "blotName", "table");
__publicField(_TableCell, "tagName", "TD");
var TableCell = _TableCell;
var TableRow = class extends container_default {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const thisHead = this.children.head.formats();
      const thisTail = this.children.tail.formats();
      const nextHead = this.next.children.head.formats();
      const nextTail = this.next.children.tail.formats();
      return thisHead.table === thisTail.table && thisHead.table === nextHead.table && thisHead.table === nextTail.table;
    }
    return false;
  }
  optimize(context) {
    super.optimize(context);
    this.children.forEach((child) => {
      if (child.next == null)
        return;
      const childFormats = child.formats();
      const nextFormats = child.next.formats();
      if (childFormats.table !== nextFormats.table) {
        const next = this.splitAfter(child);
        if (next) {
          next.optimize();
        }
        if (this.prev) {
          this.prev.optimize();
        }
      }
    });
  }
  rowOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
};
__publicField(TableRow, "blotName", "table-row");
__publicField(TableRow, "tagName", "TR");
var TableBody = class extends container_default {
};
__publicField(TableBody, "blotName", "table-body");
__publicField(TableBody, "tagName", "TBODY");
var TableContainer = class extends container_default {
  balanceCells() {
    const rows = this.descendants(TableRow);
    const maxColumns = rows.reduce((max, row) => {
      return Math.max(row.children.length, max);
    }, 0);
    rows.forEach((row) => {
      new Array(maxColumns - row.children.length).fill(0).forEach(() => {
        let value;
        if (row.children.head != null) {
          value = TableCell.formats(row.children.head.domNode);
        }
        const blot = this.scroll.create(TableCell.blotName, value);
        row.appendChild(blot);
        blot.optimize();
      });
    });
  }
  cells(column) {
    return this.rows().map((row) => row.children.at(column));
  }
  deleteColumn(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null)
      return;
    body.children.forEach((row) => {
      const cell = row.children.at(index);
      if (cell != null) {
        cell.remove();
      }
    });
  }
  insertColumn(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null)
      return;
    body.children.forEach((row) => {
      const ref = row.children.at(index);
      const value = TableCell.formats(row.children.head.domNode);
      const cell = this.scroll.create(TableCell.blotName, value);
      row.insertBefore(cell, ref);
    });
  }
  insertRow(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null)
      return;
    const id = tableId();
    const row = this.scroll.create(TableRow.blotName);
    body.children.head.children.forEach(() => {
      const cell = this.scroll.create(TableCell.blotName, id);
      row.appendChild(cell);
    });
    const ref = body.children.at(index);
    body.insertBefore(row, ref);
  }
  rows() {
    const body = this.children.head;
    if (body == null)
      return [];
    return body.children.map((row) => row);
  }
};
__publicField(TableContainer, "blotName", "table-container");
__publicField(TableContainer, "tagName", "TABLE");
TableContainer.allowedChildren = [TableBody];
TableBody.requiredContainer = TableContainer;
TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;
TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;
function tableId() {
  const id = Math.random().toString(36).slice(2, 6);
  return `row-${id}`;
}

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/table.js
var Table = class extends module_default {
  static register() {
    Quill.register(TableCell);
    Quill.register(TableRow);
    Quill.register(TableBody);
    Quill.register(TableContainer);
  }
  constructor() {
    super(...arguments);
    this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(TableContainer).forEach((table) => {
      table.balanceCells();
    });
  }
  deleteColumn() {
    const [table, , cell] = this.getTable();
    if (cell == null)
      return;
    table.deleteColumn(cell.cellOffset());
    this.quill.update(Quill.sources.USER);
  }
  deleteRow() {
    const [, row] = this.getTable();
    if (row == null)
      return;
    row.remove();
    this.quill.update(Quill.sources.USER);
  }
  deleteTable() {
    const [table] = this.getTable();
    if (table == null)
      return;
    const offset = table.offset();
    table.remove();
    this.quill.update(Quill.sources.USER);
    this.quill.setSelection(offset, Quill.sources.SILENT);
  }
  getTable() {
    let range = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (range == null)
      return [null, null, null, -1];
    const [cell, offset] = this.quill.getLine(range.index);
    if (cell == null || cell.statics.blotName !== TableCell.blotName) {
      return [null, null, null, -1];
    }
    const row = cell.parent;
    const table = row.parent.parent;
    return [table, row, cell, offset];
  }
  insertColumn(offset) {
    const range = this.quill.getSelection();
    if (!range)
      return;
    const [table, row, cell] = this.getTable(range);
    if (cell == null)
      return;
    const column = cell.cellOffset();
    table.insertColumn(column + offset);
    this.quill.update(Quill.sources.USER);
    let shift = row.rowOffset();
    if (offset === 0) {
      shift += 1;
    }
    this.quill.setSelection(range.index + shift, range.length, Quill.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(offset) {
    const range = this.quill.getSelection();
    if (!range)
      return;
    const [table, row, cell] = this.getTable(range);
    if (cell == null)
      return;
    const index = row.rowOffset();
    table.insertRow(index + offset);
    this.quill.update(Quill.sources.USER);
    if (offset > 0) {
      this.quill.setSelection(range, Quill.sources.SILENT);
    } else {
      this.quill.setSelection(range.index + row.children.length, range.length, Quill.sources.SILENT);
    }
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(rows, columns) {
    const range = this.quill.getSelection();
    if (range == null)
      return;
    const delta = new Array(rows).fill(0).reduce((memo) => {
      const text = new Array(columns).fill("\n").join("");
      return memo.insert(text, {
        table: tableId()
      });
    }, new import_quill_delta5.default().retain(range.index));
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.setSelection(range.index, Quill.sources.SILENT);
    this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, (mutations) => {
      mutations.some((mutation) => {
        if (["TD", "TR", "TBODY", "TABLE"].includes(mutation.target.tagName)) {
          this.quill.once(Quill.events.TEXT_CHANGE, (delta, old, source) => {
            if (source !== Quill.sources.USER)
              return;
            this.balanceTables();
          });
          return true;
        }
        return false;
      });
    });
  }
};
var table_default = Table;

// E:/WebProject/MixBlogUniApp/node_modules/quill/modules/toolbar.js
var import_quill_delta6 = __toESM(require_Delta(), 1);
var debug = logger_default("quill:toolbar");
var Toolbar = class extends module_default {
  constructor(quill, options) {
    var _a, _b;
    super(quill, options);
    if (Array.isArray(this.options.container)) {
      const container = document.createElement("div");
      container.setAttribute("role", "toolbar");
      addControls(container, this.options.container);
      (_b = (_a = quill.container) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.insertBefore(container, quill.container);
      this.container = container;
    } else if (typeof this.options.container === "string") {
      this.container = document.querySelector(this.options.container);
    } else {
      this.container = this.options.container;
    }
    if (!(this.container instanceof HTMLElement)) {
      debug.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar");
    this.controls = [];
    this.handlers = {};
    if (this.options.handlers) {
      Object.keys(this.options.handlers).forEach((format) => {
        var _a2;
        const handler = (_a2 = this.options.handlers) == null ? void 0 : _a2[format];
        if (handler) {
          this.addHandler(format, handler);
        }
      });
    }
    Array.from(this.container.querySelectorAll("button, select")).forEach((input) => {
      this.attach(input);
    });
    this.quill.on(Quill.events.EDITOR_CHANGE, () => {
      const [range] = this.quill.selection.getRange();
      this.update(range);
    });
  }
  addHandler(format, handler) {
    this.handlers[format] = handler;
  }
  attach(input) {
    let format = Array.from(input.classList).find((className) => {
      return className.indexOf("ql-") === 0;
    });
    if (!format)
      return;
    format = format.slice("ql-".length);
    if (input.tagName === "BUTTON") {
      input.setAttribute("type", "button");
    }
    if (this.handlers[format] == null && this.quill.scroll.query(format) == null) {
      debug.warn("ignoring attaching to nonexistent format", format, input);
      return;
    }
    const eventName = input.tagName === "SELECT" ? "change" : "click";
    input.addEventListener(eventName, (e) => {
      let value;
      if (input.tagName === "SELECT") {
        if (input.selectedIndex < 0)
          return;
        const selected = input.options[input.selectedIndex];
        if (selected.hasAttribute("selected")) {
          value = false;
        } else {
          value = selected.value || false;
        }
      } else {
        if (input.classList.contains("ql-active")) {
          value = false;
        } else {
          value = input.value || !input.hasAttribute("value");
        }
        e.preventDefault();
      }
      this.quill.focus();
      const [range] = this.quill.selection.getRange();
      if (this.handlers[format] != null) {
        this.handlers[format].call(this, value);
      } else if (
        // @ts-expect-error
        this.quill.scroll.query(format).prototype instanceof EmbedBlot$1
      ) {
        value = prompt(`Enter ${format}`);
        if (!value)
          return;
        this.quill.updateContents(new import_quill_delta6.default().retain(range.index).delete(range.length).insert({
          [format]: value
        }), Quill.sources.USER);
      } else {
        this.quill.format(format, value, Quill.sources.USER);
      }
      this.update(range);
    });
    this.controls.push([format, input]);
  }
  update(range) {
    const formats = range == null ? {} : this.quill.getFormat(range);
    this.controls.forEach((pair) => {
      const [format, input] = pair;
      if (input.tagName === "SELECT") {
        let option = null;
        if (range == null) {
          option = null;
        } else if (formats[format] == null) {
          option = input.querySelector("option[selected]");
        } else if (!Array.isArray(formats[format])) {
          let value = formats[format];
          if (typeof value === "string") {
            value = value.replace(/"/g, '\\"');
          }
          option = input.querySelector(`option[value="${value}"]`);
        }
        if (option == null) {
          input.value = "";
          input.selectedIndex = -1;
        } else {
          option.selected = true;
        }
      } else if (range == null) {
        input.classList.remove("ql-active");
        input.setAttribute("aria-pressed", "false");
      } else if (input.hasAttribute("value")) {
        const value = formats[format];
        const isActive = value === input.getAttribute("value") || value != null && value.toString() === input.getAttribute("value") || value == null && !input.getAttribute("value");
        input.classList.toggle("ql-active", isActive);
        input.setAttribute("aria-pressed", isActive.toString());
      } else {
        const isActive = formats[format] != null;
        input.classList.toggle("ql-active", isActive);
        input.setAttribute("aria-pressed", isActive.toString());
      }
    });
  }
};
Toolbar.DEFAULTS = {};
function addButton(container, format, value) {
  const input = document.createElement("button");
  input.setAttribute("type", "button");
  input.classList.add(`ql-${format}`);
  input.setAttribute("aria-pressed", "false");
  if (value != null) {
    input.value = value;
    input.setAttribute("aria-label", `${format}: ${value}`);
  } else {
    input.setAttribute("aria-label", format);
  }
  container.appendChild(input);
}
function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }
  groups.forEach((controls) => {
    const group = document.createElement("span");
    group.classList.add("ql-formats");
    controls.forEach((control) => {
      if (typeof control === "string") {
        addButton(group, control);
      } else {
        const format = Object.keys(control)[0];
        const value = control[format];
        if (Array.isArray(value)) {
          addSelect(group, format, value);
        } else {
          addButton(group, format, value);
        }
      }
    });
    container.appendChild(group);
  });
}
function addSelect(container, format, values) {
  const input = document.createElement("select");
  input.classList.add(`ql-${format}`);
  values.forEach((value) => {
    const option = document.createElement("option");
    if (value !== false) {
      option.setAttribute("value", String(value));
    } else {
      option.setAttribute("selected", "selected");
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}
Toolbar.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const range = this.quill.getSelection();
      if (range == null)
        return;
      if (range.length === 0) {
        const formats = this.quill.getFormat();
        Object.keys(formats).forEach((name) => {
          if (this.quill.scroll.query(name, Scope.INLINE) != null) {
            this.quill.format(name, false, Quill.sources.USER);
          }
        });
      } else {
        this.quill.removeFormat(range.index, range.length, Quill.sources.USER);
      }
    },
    direction(value) {
      const {
        align
      } = this.quill.getFormat();
      if (value === "rtl" && align == null) {
        this.quill.format("align", "right", Quill.sources.USER);
      } else if (!value && align === "right") {
        this.quill.format("align", false, Quill.sources.USER);
      }
      this.quill.format("direction", value, Quill.sources.USER);
    },
    indent(value) {
      const range = this.quill.getSelection();
      const formats = this.quill.getFormat(range);
      const indent = parseInt(formats.indent || 0, 10);
      if (value === "+1" || value === "-1") {
        let modifier = value === "+1" ? 1 : -1;
        if (formats.direction === "rtl")
          modifier *= -1;
        this.quill.format("indent", indent + modifier, Quill.sources.USER);
      }
    },
    link(value) {
      if (value === true) {
        value = prompt("Enter link URL:");
      }
      this.quill.format("link", value, Quill.sources.USER);
    },
    list(value) {
      const range = this.quill.getSelection();
      const formats = this.quill.getFormat(range);
      if (value === "check") {
        if (formats.list === "checked" || formats.list === "unchecked") {
          this.quill.format("list", false, Quill.sources.USER);
        } else {
          this.quill.format("list", "unchecked", Quill.sources.USER);
        }
      } else {
        this.quill.format("list", value, Quill.sources.USER);
      }
    }
  }
};

// E:/WebProject/MixBlogUniApp/node_modules/quill/ui/icons.js
var alignLeftIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>';
var alignCenterIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>';
var alignRightIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>';
var alignJustifyIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>';
var backgroundIcon = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>';
var blockquoteIcon = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>';
var boldIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>';
var cleanIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>';
var codeIcon = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>';
var colorIcon = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>';
var directionLeftToRightIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>';
var directionRightToLeftIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>';
var formulaIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>';
var headerIcon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>';
var header2Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
var header3Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
var header4Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>';
var header5Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
var header6Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>';
var italicIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>';
var imageIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>';
var indentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>';
var outdentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>';
var linkIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>';
var listBulletIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>';
var listCheckIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>';
var listOrderedIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>';
var subscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>';
var superscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>';
var strikeIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>';
var tableIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>';
var underlineIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>';
var videoIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>';
var icons_default = {
  align: {
    "": alignLeftIcon,
    center: alignCenterIcon,
    right: alignRightIcon,
    justify: alignJustifyIcon
  },
  background: backgroundIcon,
  blockquote: blockquoteIcon,
  bold: boldIcon,
  clean: cleanIcon,
  code: codeIcon,
  "code-block": codeIcon,
  color: colorIcon,
  direction: {
    "": directionLeftToRightIcon,
    rtl: directionRightToLeftIcon
  },
  formula: formulaIcon,
  header: {
    "1": headerIcon,
    "2": header2Icon,
    "3": header3Icon,
    "4": header4Icon,
    "5": header5Icon,
    "6": header6Icon
  },
  italic: italicIcon,
  image: imageIcon,
  indent: {
    "+1": indentIcon,
    "-1": outdentIcon
  },
  link: linkIcon,
  list: {
    bullet: listBulletIcon,
    check: listCheckIcon,
    ordered: listOrderedIcon
  },
  script: {
    sub: subscriptIcon,
    super: superscriptIcon
  },
  strike: strikeIcon,
  table: tableIcon,
  underline: underlineIcon,
  video: videoIcon
};

// E:/WebProject/MixBlogUniApp/node_modules/quill/ui/picker.js
var DropdownIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
var optionsCounter = 0;
function toggleAriaAttribute(element, attribute) {
  element.setAttribute(attribute, `${!(element.getAttribute(attribute) === "true")}`);
}
var Picker = class {
  constructor(select) {
    this.select = select;
    this.container = document.createElement("span");
    this.buildPicker();
    this.select.style.display = "none";
    this.select.parentNode.insertBefore(this.container, this.select);
    this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    });
    this.label.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape();
          event.preventDefault();
          break;
        default:
      }
    });
    this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded");
    toggleAriaAttribute(this.label, "aria-expanded");
    toggleAriaAttribute(this.options, "aria-hidden");
  }
  buildItem(option) {
    const item = document.createElement("span");
    item.tabIndex = "0";
    item.setAttribute("role", "button");
    item.classList.add("ql-picker-item");
    const value = option.getAttribute("value");
    if (value) {
      item.setAttribute("data-value", value);
    }
    if (option.textContent) {
      item.setAttribute("data-label", option.textContent);
    }
    item.addEventListener("click", () => {
      this.selectItem(item, true);
    });
    item.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Enter":
          this.selectItem(item, true);
          event.preventDefault();
          break;
        case "Escape":
          this.escape();
          event.preventDefault();
          break;
        default:
      }
    });
    return item;
  }
  buildLabel() {
    const label = document.createElement("span");
    label.classList.add("ql-picker-label");
    label.innerHTML = DropdownIcon;
    label.tabIndex = "0";
    label.setAttribute("role", "button");
    label.setAttribute("aria-expanded", "false");
    this.container.appendChild(label);
    return label;
  }
  buildOptions() {
    const options = document.createElement("span");
    options.classList.add("ql-picker-options");
    options.setAttribute("aria-hidden", "true");
    options.tabIndex = "-1";
    options.id = `ql-picker-options-${optionsCounter}`;
    optionsCounter += 1;
    this.label.setAttribute("aria-controls", options.id);
    this.options = options;
    Array.from(this.select.options).forEach((option) => {
      const item = this.buildItem(option);
      options.appendChild(item);
      if (option.selected === true) {
        this.selectItem(item);
      }
    });
    this.container.appendChild(options);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value);
    });
    this.container.classList.add("ql-picker");
    this.label = this.buildLabel();
    this.buildOptions();
  }
  escape() {
    this.close();
    setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded");
    this.label.setAttribute("aria-expanded", "false");
    this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(item) {
    let trigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const selected = this.container.querySelector(".ql-selected");
    if (item === selected)
      return;
    if (selected != null) {
      selected.classList.remove("ql-selected");
    }
    if (item == null)
      return;
    item.classList.add("ql-selected");
    this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item);
    if (item.hasAttribute("data-value")) {
      this.label.setAttribute("data-value", item.getAttribute("data-value"));
    } else {
      this.label.removeAttribute("data-value");
    }
    if (item.hasAttribute("data-label")) {
      this.label.setAttribute("data-label", item.getAttribute("data-label"));
    } else {
      this.label.removeAttribute("data-label");
    }
    if (trigger) {
      this.select.dispatchEvent(new Event("change"));
      this.close();
    }
  }
  update() {
    let option;
    if (this.select.selectedIndex > -1) {
      const item = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      option = this.select.options[this.select.selectedIndex];
      this.selectItem(item);
    } else {
      this.selectItem(null);
    }
    const isActive = option != null && option !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", isActive);
  }
};
var picker_default = Picker;

// E:/WebProject/MixBlogUniApp/node_modules/quill/ui/color-picker.js
var ColorPicker = class extends picker_default {
  constructor(select, label) {
    super(select);
    this.label.innerHTML = label;
    this.container.classList.add("ql-color-picker");
    Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((item) => {
      item.classList.add("ql-primary");
    });
  }
  buildItem(option) {
    const item = super.buildItem(option);
    item.style.backgroundColor = option.getAttribute("value") || "";
    return item;
  }
  selectItem(item, trigger) {
    super.selectItem(item, trigger);
    const colorLabel = this.label.querySelector(".ql-color-label");
    const value = item ? item.getAttribute("data-value") || "" : "";
    if (colorLabel) {
      if (colorLabel.tagName === "line") {
        colorLabel.style.stroke = value;
      } else {
        colorLabel.style.fill = value;
      }
    }
  }
};
var color_picker_default = ColorPicker;

// E:/WebProject/MixBlogUniApp/node_modules/quill/ui/icon-picker.js
var IconPicker = class extends picker_default {
  constructor(select, icons) {
    super(select);
    this.container.classList.add("ql-icon-picker");
    Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((item) => {
      item.innerHTML = icons[item.getAttribute("data-value") || ""];
    });
    this.defaultItem = this.container.querySelector(".ql-selected");
    this.selectItem(this.defaultItem);
  }
  selectItem(target, trigger) {
    super.selectItem(target, trigger);
    const item = target || this.defaultItem;
    if (item != null) {
      if (this.label.innerHTML === item.innerHTML)
        return;
      this.label.innerHTML = item.innerHTML;
    }
  }
};
var icon_picker_default = IconPicker;

// E:/WebProject/MixBlogUniApp/node_modules/quill/ui/tooltip.js
var isScrollable = (el) => {
  const {
    overflowY
  } = getComputedStyle(el, null);
  return overflowY !== "visible" && overflowY !== "clip";
};
var Tooltip = class {
  constructor(quill, boundsContainer) {
    this.quill = quill;
    this.boundsContainer = boundsContainer || document.body;
    this.root = quill.addContainer("ql-tooltip");
    this.root.innerHTML = this.constructor.TEMPLATE;
    if (isScrollable(this.quill.root)) {
      this.quill.root.addEventListener("scroll", () => {
        this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
      });
    }
    this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(reference) {
    const left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
    const top = reference.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${left}px`;
    this.root.style.top = `${top}px`;
    this.root.classList.remove("ql-flip");
    const containerBounds = this.boundsContainer.getBoundingClientRect();
    const rootBounds = this.root.getBoundingClientRect();
    let shift = 0;
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right;
      this.root.style.left = `${left + shift}px`;
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left;
      this.root.style.left = `${left + shift}px`;
    }
    if (rootBounds.bottom > containerBounds.bottom) {
      const height = rootBounds.bottom - rootBounds.top;
      const verticalShift = reference.bottom - reference.top + height;
      this.root.style.top = `${top - verticalShift}px`;
      this.root.classList.add("ql-flip");
    }
    return shift;
  }
  show() {
    this.root.classList.remove("ql-editing");
    this.root.classList.remove("ql-hidden");
  }
};
var tooltip_default = Tooltip;

// E:/WebProject/MixBlogUniApp/node_modules/quill/themes/base.js
var ALIGNS = [false, "center", "right", "justify"];
var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
var FONTS = [false, "serif", "monospace"];
var HEADERS = ["1", "2", "3", false];
var SIZES = ["small", false, "large", "huge"];
var BaseTheme = class extends theme_default {
  constructor(quill, options) {
    super(quill, options);
    const listener = (e) => {
      if (!document.body.contains(quill.root)) {
        document.body.removeEventListener("click", listener);
        return;
      }
      if (this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(e.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {
        this.tooltip.hide();
      }
      if (this.pickers != null) {
        this.pickers.forEach((picker) => {
          if (!picker.container.contains(e.target)) {
            picker.close();
          }
        });
      }
    };
    quill.emitter.listenDOM("click", document.body, listener);
  }
  addModule(name) {
    const module = super.addModule(name);
    if (name === "toolbar") {
      this.extendToolbar(module);
    }
    return module;
  }
  buildButtons(buttons, icons) {
    Array.from(buttons).forEach((button) => {
      const className = button.getAttribute("class") || "";
      className.split(/\s+/).forEach((name) => {
        if (!name.startsWith("ql-"))
          return;
        name = name.slice("ql-".length);
        if (icons[name] == null)
          return;
        if (name === "direction") {
          button.innerHTML = icons[name][""] + icons[name].rtl;
        } else if (typeof icons[name] === "string") {
          button.innerHTML = icons[name];
        } else {
          const value = button.value || "";
          if (value != null && icons[name][value]) {
            button.innerHTML = icons[name][value];
          }
        }
      });
    });
  }
  buildPickers(selects, icons) {
    this.pickers = Array.from(selects).map((select) => {
      if (select.classList.contains("ql-align")) {
        if (select.querySelector("option") == null) {
          fillSelect(select, ALIGNS);
        }
        if (typeof icons.align === "object") {
          return new icon_picker_default(select, icons.align);
        }
      }
      if (select.classList.contains("ql-background") || select.classList.contains("ql-color")) {
        const format = select.classList.contains("ql-background") ? "background" : "color";
        if (select.querySelector("option") == null) {
          fillSelect(select, COLORS, format === "background" ? "#ffffff" : "#000000");
        }
        return new color_picker_default(select, icons[format]);
      }
      if (select.querySelector("option") == null) {
        if (select.classList.contains("ql-font")) {
          fillSelect(select, FONTS);
        } else if (select.classList.contains("ql-header")) {
          fillSelect(select, HEADERS);
        } else if (select.classList.contains("ql-size")) {
          fillSelect(select, SIZES);
        }
      }
      return new picker_default(select);
    });
    const update = () => {
      this.pickers.forEach((picker) => {
        picker.update();
      });
    };
    this.quill.on(emitter_default.events.EDITOR_CHANGE, update);
  }
};
BaseTheme.DEFAULTS = merge_default({}, theme_default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let fileInput = this.container.querySelector("input.ql-image[type=file]");
          if (fileInput == null) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", "));
            fileInput.classList.add("ql-image");
            fileInput.addEventListener("change", () => {
              const range = this.quill.getSelection(true);
              this.quill.uploader.upload(range, fileInput.files);
              fileInput.value = "";
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
var BaseTooltip = class extends tooltip_default {
  constructor(quill, boundsContainer) {
    super(quill, boundsContainer);
    this.textbox = this.root.querySelector('input[type="text"]');
    this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.save();
        event.preventDefault();
      } else if (event.key === "Escape") {
        this.cancel();
        event.preventDefault();
      }
    });
  }
  cancel() {
    this.hide();
    this.restoreFocus();
  }
  edit() {
    let mode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link";
    let preview = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    this.root.classList.remove("ql-hidden");
    this.root.classList.add("ql-editing");
    if (this.textbox == null)
      return;
    if (preview != null) {
      this.textbox.value = preview;
    } else if (mode !== this.root.getAttribute("data-mode")) {
      this.textbox.value = "";
    }
    const bounds = this.quill.getBounds(this.quill.selection.savedRange);
    if (bounds != null) {
      this.position(bounds);
    }
    this.textbox.select();
    this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${mode}`) || "");
    this.root.setAttribute("data-mode", mode);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: true
    });
  }
  save() {
    let {
      value
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop
        } = this.quill.root;
        if (this.linkRange) {
          this.quill.formatText(this.linkRange, "link", value, emitter_default.sources.USER);
          delete this.linkRange;
        } else {
          this.restoreFocus();
          this.quill.format("link", value, emitter_default.sources.USER);
        }
        this.quill.root.scrollTop = scrollTop;
        break;
      }
      case "video": {
        value = extractVideoUrl(value);
      }
      case "formula": {
        if (!value)
          break;
        const range = this.quill.getSelection(true);
        if (range != null) {
          const index = range.index + range.length;
          this.quill.insertEmbed(
            index,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            value,
            emitter_default.sources.USER
          );
          if (this.root.getAttribute("data-mode") === "formula") {
            this.quill.insertText(index + 1, " ", emitter_default.sources.USER);
          }
          this.quill.setSelection(index + 2, emitter_default.sources.USER);
        }
        break;
      }
      default:
    }
    this.textbox.value = "";
    this.hide();
  }
};
function extractVideoUrl(url) {
  let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `${match[1] || "https"}://www.youtube.com/embed/${match[2]}?showinfo=0`;
  }
  if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
    return `${match[1] || "https"}://player.vimeo.com/video/${match[2]}/`;
  }
  return url;
}
function fillSelect(select, values) {
  let defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  values.forEach((value) => {
    const option = document.createElement("option");
    if (value === defaultValue) {
      option.setAttribute("selected", "selected");
    } else {
      option.setAttribute("value", String(value));
    }
    select.appendChild(option);
  });
}

// E:/WebProject/MixBlogUniApp/node_modules/quill/themes/bubble.js
var TOOLBAR_CONFIG = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
var BubbleTooltip = class extends BaseTooltip {
  constructor(quill, bounds) {
    super(quill, bounds);
    this.quill.on(emitter_default.events.EDITOR_CHANGE, (type, range, oldRange, source) => {
      if (type !== emitter_default.events.SELECTION_CHANGE)
        return;
      if (range != null && range.length > 0 && source === emitter_default.sources.USER) {
        this.show();
        this.root.style.left = "0px";
        this.root.style.width = "";
        this.root.style.width = `${this.root.offsetWidth}px`;
        const lines = this.quill.getLines(range.index, range.length);
        if (lines.length === 1) {
          const bounds2 = this.quill.getBounds(range);
          if (bounds2 != null) {
            this.position(bounds2);
          }
        } else {
          const lastLine = lines[lines.length - 1];
          const index = this.quill.getIndex(lastLine);
          const length = Math.min(lastLine.length() - 1, range.index + range.length - index);
          const indexBounds = this.quill.getBounds(new Range(index, length));
          if (indexBounds != null) {
            this.position(indexBounds);
          }
        }
      } else if (document.activeElement !== this.textbox && this.quill.hasFocus()) {
        this.hide();
      }
    });
  }
  listen() {
    super.listen();
    this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    });
    this.quill.on(emitter_default.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden"))
          return;
        const range = this.quill.getSelection();
        if (range != null) {
          const bounds = this.quill.getBounds(range);
          if (bounds != null) {
            this.position(bounds);
          }
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(reference) {
    const shift = super.position(reference);
    const arrow = this.root.querySelector(".ql-tooltip-arrow");
    arrow.style.marginLeft = "";
    if (shift !== 0) {
      arrow.style.marginLeft = `${-1 * shift - arrow.offsetWidth / 2}px`;
    }
    return shift;
  }
};
__publicField(BubbleTooltip, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
var BubbleTheme = class extends BaseTheme {
  constructor(quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }
    super(quill, options);
    this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(toolbar) {
    this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
    if (toolbar.container != null) {
      this.tooltip.root.appendChild(toolbar.container);
      this.buildButtons(toolbar.container.querySelectorAll("button"), icons_default);
      this.buildPickers(toolbar.container.querySelectorAll("select"), icons_default);
    }
  }
};
BubbleTheme.DEFAULTS = merge_default({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (!value) {
            this.quill.format("link", false, Quill.sources.USER);
          } else {
            this.quill.theme.tooltip.edit();
          }
        }
      }
    }
  }
});

// E:/WebProject/MixBlogUniApp/node_modules/quill/themes/snow.js
var TOOLBAR_CONFIG2 = [[{
  header: ["1", "2", "3", false]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
var SnowTooltip = class extends BaseTooltip {
  constructor() {
    super(...arguments);
    __publicField(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen();
    this.root.querySelector("a.ql-action").addEventListener("click", (event) => {
      if (this.root.classList.contains("ql-editing")) {
        this.save();
      } else {
        this.edit("link", this.preview.textContent);
      }
      event.preventDefault();
    });
    this.root.querySelector("a.ql-remove").addEventListener("click", (event) => {
      if (this.linkRange != null) {
        const range = this.linkRange;
        this.restoreFocus();
        this.quill.formatText(range, "link", false, emitter_default.sources.USER);
        delete this.linkRange;
      }
      event.preventDefault();
      this.hide();
    });
    this.quill.on(emitter_default.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null)
        return;
      if (range.length === 0 && source === emitter_default.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(Link, range.index);
        if (link != null) {
          this.linkRange = new Range(range.index - offset, link.length());
          const preview = Link.formats(link.domNode);
          this.preview.textContent = preview;
          this.preview.setAttribute("href", preview);
          this.show();
          const bounds = this.quill.getBounds(this.linkRange);
          if (bounds != null) {
            this.position(bounds);
          }
          return;
        }
      } else {
        delete this.linkRange;
      }
      this.hide();
    });
  }
  show() {
    super.show();
    this.root.removeAttribute("data-mode");
  }
};
__publicField(SnowTooltip, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
var SnowTheme = class extends BaseTheme {
  constructor(quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG2;
    }
    super(quill, options);
    this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(toolbar) {
    if (toolbar.container != null) {
      toolbar.container.classList.add("ql-snow");
      this.buildButtons(toolbar.container.querySelectorAll("button"), icons_default);
      this.buildPickers(toolbar.container.querySelectorAll("select"), icons_default);
      this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
      if (toolbar.container.querySelector(".ql-link")) {
        this.quill.keyboard.addBinding({
          key: "k",
          shortKey: true
        }, (_range, context) => {
          toolbar.handlers.link.call(toolbar, !context.format.link);
        });
      }
    }
  }
};
SnowTheme.DEFAULTS = merge_default({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (value) {
            const range = this.quill.getSelection();
            if (range == null || range.length === 0)
              return;
            let preview = this.quill.getText(range);
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf("mailto:") !== 0) {
              preview = `mailto:${preview}`;
            }
            const {
              tooltip
            } = this.quill.theme;
            tooltip.edit("link", preview);
          } else {
            this.quill.format("link", false, Quill.sources.USER);
          }
        }
      }
    }
  }
});
var snow_default = SnowTheme;

// E:/WebProject/MixBlogUniApp/node_modules/quill/quill.js
core_default.register({
  "attributors/attribute/direction": DirectionAttribute,
  "attributors/class/align": AlignClass,
  "attributors/class/background": BackgroundClass,
  "attributors/class/color": ColorClass,
  "attributors/class/direction": DirectionClass,
  "attributors/class/font": FontClass,
  "attributors/class/size": SizeClass,
  "attributors/style/align": AlignStyle,
  "attributors/style/background": BackgroundStyle,
  "attributors/style/color": ColorStyle,
  "attributors/style/direction": DirectionStyle,
  "attributors/style/font": FontStyle,
  "attributors/style/size": SizeStyle
}, true);
core_default.register({
  "formats/align": AlignClass,
  "formats/direction": DirectionClass,
  "formats/indent": indent_default,
  "formats/background": BackgroundStyle,
  "formats/color": ColorStyle,
  "formats/font": FontClass,
  "formats/size": SizeClass,
  "formats/blockquote": blockquote_default,
  "formats/code-block": CodeBlock,
  "formats/header": header_default,
  "formats/list": ListItem,
  "formats/bold": bold_default,
  "formats/code": Code,
  "formats/italic": italic_default,
  "formats/link": Link,
  "formats/script": script_default,
  "formats/strike": strike_default,
  "formats/underline": underline_default,
  "formats/formula": formula_default,
  "formats/image": image_default,
  "formats/video": video_default,
  "modules/syntax": Syntax,
  "modules/table": table_default,
  "modules/toolbar": Toolbar,
  "themes/bubble": BubbleTheme,
  "themes/snow": snow_default,
  "ui/icons": icons_default,
  "ui/picker": picker_default,
  "ui/icon-picker": icon_picker_default,
  "ui/color-picker": color_picker_default,
  "ui/tooltip": tooltip_default
}, true);
var quill_default = core_default;
var export_AttributeMap = import_quill_delta4.AttributeMap;
var export_Delta = import_quill_delta4.default;
var export_Op = import_quill_delta4.Op;
var export_OpIterator = import_quill_delta4.OpIterator;
export {
  export_AttributeMap as AttributeMap,
  export_Delta as Delta,
  module_default as Module,
  export_Op as Op,
  export_OpIterator as OpIterator,
  parchment_exports as Parchment,
  Range,
  quill_default as default
};
//# sourceMappingURL=quill.js.map
