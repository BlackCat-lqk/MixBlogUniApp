"use strict";const t=require("../utils/request.js");exports.getNotesApi=function(e){return t.post("/getNotes",e,{loading:!1,showError:!1})};
