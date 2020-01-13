<!--
 * @Date: 2020-01-09 10:53:54
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 16:14:03
 -->
<template>
  <div class="home">
    <img class="bg" src="@/images/homeBg.png" />
    <router-link :to="{ name: 'profile' }" class="user"></router-link>
    <div class="contariner">
      <award></award>
      <Raffle @close-modal="closeModal" :drawFirst="drawFirst" v-if="showMsg"></Raffle>
      <DrawMsg wx:else :imgList="imgList"></DrawMsg>
      <div class="prizeBox">
        <p>图文详情</p>
        <div v-html="content" class="content"></div>
      </div>
    </div>
    <wx-modal :showModel="showModel" @close-modal="closeModal" :drawFirst="drawFirst"></wx-modal>
  </div>
</template>

<script>
import Award from "@/components/Award";
import Raffle from "@/components/Raffle.vue";
import WxModal from "@/components/WxModal.vue";
import DrawMsg from "@/components/DrawMsg.vue";

export default {
  name: "home",
  data() {
    return {
      showModel: false,
      drawFirst: true,
      showMsg: false,
      content:
        "手里接过获得胜利后但是立刻脚后跟流口水的韩国快乐圣诞节和可见光和领导萨克结果回来开始的就会过来看是的结果后来开始的结果后来看到世界观和是扩大解放韩国离开但是结果很快的时间后来开始电话发给来看待世界富豪",
      imgList: [require("@/images/userimg.png"), "", "", ""]
    };
  },
  components: {
    Award,
    Raffle,
    WxModal,
    DrawMsg
  },
  mounted() {},
  methods: {
    closeModal() {
      if (!this.drawFirst) {
        return;
      } else {
        this.showModel ? (this.showModel = false) : (this.showModel = true);
        this.drawFirst = false;
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(243, 23, 26, 1) 0%,
    rgba(240, 4, 33, 1) 100%
  );
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 639px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .user {
    width: 72px;
    height: 72px;
    background: url(~@/images/userBtn.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
    display: block;
    position: fixed;
    bottom: 100px;
    right: 9px;
    z-index: 1000;
  }
  .contariner {
    width: 100%;
    position: relative;
    margin-top: 222px;
    padding: 0 15px;
    box-sizing: border-box;
    padding-bottom: 109px;
    .prizeBox {
      width: 100%;
      height: 296px;
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;
      padding: 0 15px 70px 16px;
      box-sizing: border-box;
      overflow: hidden;
      p {
        font-size: 20px;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
        margin-top: 15px;
        padding-bottom: 10px;
        text-align: center;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
      }
      .content {
        text-align: left;
        font-size: 16px;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 27px;
        text-align: justify;
      }
    }
  }
  .van-dialog {
    padding: 0 27px 30px 27px;
    box-sizing: border-box;
    border-radius: 5px;
    .van-dialog__header {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
