<!--
 * @Date: 2020-01-09 15:03:35
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 16:13:32
 -->
<template>
  <van-dialog
    v-model="showmodel"
    title="温馨提示"
    :showConfirmButton="showConfirmButton"
    closeOnClickOverlay
    width="276"
  >
    <p>
      为方便礼品的核实和兑换，请添加小助手微信
      <span>{{ wechatNum }}</span>如没有提前添加小助手微信，则中奖无效！
    </p>
    <van-button
      size="large"
      round
      type="info"
      v-clipboard:copy="wechatNum"
      v-clipboard:success="onCopy"
    >复制微信号</van-button>
  </van-dialog>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    showModel: {
      type: Boolean,
      default: false
    },
    wechatNum: {}
  },
  computed: {
    showmodel: {
      get() {
        return this.showModel;
      },
      set(val) {
        this.$emit("showmodel", val);
      }
    }
  },
  data() {
    return {
      wechatID: "sdfsdfds",
      showConfirmButton: false
    };
  },
  methods: {
    onCopy() {
      console.log("copy success");
      // this.$emit("showmodel");
      this.showmodel = false;
      Toast.success("复制成功");
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  word-break: break-all;
  line-height: 28px;
  font-size: 18px;
  span {
    padding: 0 12px;
    background: rgba(255, 229, 229, 1);
    border-radius: 2px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(240, 24, 24, 1);
  }
}
.van-button {
  width: 100%;
  height: 44px;
  background: rgba(240, 24, 24, 1);
  border-radius: 3px;
  font-size: 18px;
}
</style>
