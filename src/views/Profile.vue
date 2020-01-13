<!--
 * @Date: 2020-01-09 11:06:36
 * @LastEditors: hxz
 * @LastEditTime: 2020-01-09 11:17:19
 -->
<template>
  <div class="contrain">
    <div class="qst" v-if="drawList.length == 0">
      <img src="@/images/drawqst.png" alt />
      <p>还没参与活动哦，赶紧去抽奖吧！</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawList:[]
    }
  }
};
</script>

<style lang="scss" scoped>
.contrain {
  width: 100%;
  height: 100%;
  position: relative;
  .qst {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 233px;
      height: 157px;
      margin-bottom: 25px;
    }
    p {
      margin: 0;
      text-align: center;
      font-size: 18px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
