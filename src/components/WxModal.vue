<!--
 * @Date: 2020-01-09 15:03:35
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 16:13:32
 -->
<template>
  <van-dialog v-model="show" title="提示">
    <div>添加微信</div>
    <van-button
      size="large"
      round
      type="info"
      v-clipboard:copy="wechatID"
      v-clipboard:success="onCopy"
      >复制微信号</van-button
    >
  </van-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wechatID: "sdfsdfds"
    };
  },
  methods: {
    onCopy() {
      console.log("copy success");
      this.$emit("close-modal");
    }
  }
};
</script>

<style lang="scss" scoped></style>
