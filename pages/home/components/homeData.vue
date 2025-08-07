<template>
    <view class="home-data-container">
        <view class="total-count">
            <span>99</span>
            <text>总访问</text>
        </view>
        <view class="today-count">
            <span>9</span>
            <text>今日访问</text>
        </view>
    </view>
</template>

<script>
</script>

<style scoped lang="scss">
.home-data-container {
    margin-top: 20px;
    display: flex;
    gap: 24px;
    justify-content: center;
    margin: 20px 10px;
    .total-count, .today-count {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #fff;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        span{
            display: block;
            font-size: 2rem;
        }
    }
}
</style>