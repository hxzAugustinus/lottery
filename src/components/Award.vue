<!--
 * @Date: 2020-01-09 11:24:26
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 11:47:04
 -->
<template>
  <div class="award-cop">
    <van-swipe :autoplay="2000" indicator-color="white" class="swiper">
      <van-swipe-item v-for="(item, index) in img" :key="index">
        <img :src="item.image" alt />
      </van-swipe-item>
    </van-swipe>
    <p>奖品：{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: {},
    title: {}
  }
};
</script>

<style lang="scss" scoped>
.award-cop {
  width: 100%;
  padding-bottom: 15px;
  background: #fff;
  border-radius: 10px;
  .swiper {
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0px 0px;
  }
  .swiper img {
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
  }
  p {
    margin: 14px 15px 0 15px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    line-height: 28px;
  }
}
</style>
