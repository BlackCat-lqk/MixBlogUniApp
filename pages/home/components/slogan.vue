<template>
  <view>
    <image class="slogan-logo" src="@/static/sloganLogo.webp" alt="slogan Logo"></image>
    <view class="slogan-container">
      <image
        src="@/static/Github.svg"
        class="slogan-image"
        alt="slogan Logo"
      ></image>
      <image
        src="@/static/Blibli.svg"
        class="slogan-image"
        alt="slogan Logo"
      ></image>
      <button class="button" type="primary">MIX AI</button>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped lang="scss">
.slogan-logo {
    width: 100%;
}
.slogan-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  .slogan-image {
    width: 24px;
    height: 24px;
  }
  .button {
    margin: 0;
    height: 32px;
    display: flex;
    align-items: center;
  }
}
</style>
