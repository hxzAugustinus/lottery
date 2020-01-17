<!--
 * @Date: 2020-01-09 11:24:26
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 11:47:04
 -->
<template>
  <div class="award-cop">
    <img :src="img" />
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
  img {
    width: 100%;
    height: 250px;
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
