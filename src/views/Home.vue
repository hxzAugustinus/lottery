<!--
 * @Date: 2020-01-09 10:53:54
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 16:14:03
 -->
<template>
  <div class="home">
    <img class="bg" src="@/images/homeBg.png" />
    <p class="lotteryTime">活动时间：{{lotteryTime}}</p>
    <div class="user">
      <router-link :to="{ name: 'profile' }" class="router"></router-link>
      <span></span>
    </div>
    <div class="contariner">
      <award></award>
      <Raffle
        @close-modal="closeModal"
        :drawFirst="drawFirst"
        @showMsg="showmsg"
        :drawCode="drawCode"
        v-if="showDraw"
      ></Raffle>
      <Waitedraw
        v-if="showMsg"
        :imgList="imgList"
        :drawCode="drawCode"
        :joinperson="joinperson"
        @showOverlay="showoverlay"
      ></Waitedraw>
      <Winlottery
        v-if="showWin"
        :winperson="winperson"
        :drawCode="drawCode"
        :joinperson="joinperson"
        @showmodel="showmodel"
      ></Winlottery>
      <Loselottery
        v-if="showLose"
        :winperson="winperson"
        :drawCode="drawCode"
        :joinperson="joinperson"
        @showmodel="showmodel"
      ></Loselottery>
      <div class="prizeBox">
        <p class="prizeBox-title">抽奖说明</p>
        <div v-html="content" class="content"></div>
      </div>
    </div>
    <wx-modal :showModel="showModel" @showmodel="showmodel"></wx-modal>
    <Overlay :Overlay="showOverlay" @showOverlay="showoverlay"></Overlay>
  </div>
</template>

<script>
import Award from "@/components/Award";
import Raffle from "@/components/Raffle.vue";
import WxModal from "@/components/WxModal.vue";
import Waitedraw from "@/components/Waitedraw.vue";
import Overlay from "@/components/Overlay.vue";
import Winlottery from "@/components/Winlottery.vue";
import Loselottery from "@/components/Loselottery.vue";

export default {
  name: "home",
  data() {
    return {
      drawCode: 996038,
      joinperson: 113856,
      showModel: false,
      drawFirst: true,
      showDraw: true,
      showMsg: false,
      showWin: false,
      showLose: false,
      showOverlay: false,
      content:
        "<p>新春福利，限时抽奖活动</p><p>1.本次活动需添加活动微信“ jidx002 ”才能获得抽奖资格和领取奖品。</p><p>2.添加活动微信“ jidx002 ”可领取鼠宝宝布偶一个，共计200个，先到先得，送完即止。</p><p>3.中奖后请主动联系我们工作人员，根据中奖信息寄送礼品。</p><p>4.本次活动100%真实有效，最终解释权归网上老年大学</p>",
      imgList: [require("@/images/userimg.png"), "", ""],
      winperson: {
        avatar: require("@/images/userimg.png"),
        name: "是客服打",
        drawCode: "234567"
      },
      lotteryTime: "1月15日—2月9日"
    };
  },
  components: {
    Award,
    Raffle,
    WxModal,
    Waitedraw,
    Overlay,
    Winlottery,
    Loselottery
  },
  mounted() {
    let winperson = {
        avatar: require("@/images/userimg.png"),
        name: "是撒旦飞洒地方客",
        drawCode: "234567"
      },
      num = "";
    if (winperson.name.length - 2 > 0) {
      for (let i = 0; i < winperson.name.length - 2; i++) {
        num = num + "*";
      }
      winperson.name =
        winperson.name.substring(0, 1) +
        num +
        winperson.name.substring(winperson.name.length - 1);
    } else {
      winperson.name = winperson.name.substring(0, 1) + "*";
    }
    this.winperson = winperson;
  },
  methods: {
    closeModal() {
      if (!this.drawFirst) {
        return;
      } else {
        this.showModel = true;
        this.drawFirst = false;
      }
    },
    showmodel(val) {
      this.showModel = val;
    },
    showmsg() {
      setTimeout(() => {
        this.showDraw = false;
        this.showMsg = true;
        this.showModel = false;
      }, 3000);
    },
    showoverlay() {
      this.showOverlay ? (this.showOverlay = false) : (this.showOverlay = true);
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
  .lotteryTime {
    font-size: 18px;
    font-weight: 600;
    color: rgba(246, 8, 45, 1);
    width: 100%;
    text-align: center;
    position: absolute;
    top: 171px;
    margin: 0;
  }
  .bg {
    width: 100%;
    height: 639px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .user {
    width: 74px;
    height: 71px;
    background: url(~@/images/userBtn.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    position: fixed;
    bottom: 100px;
    right: 9px;
    z-index: 1000;
    .router {
      display: block;
      width: 100%;
      height: 100%;
    }
    span {
      display: block;
      width: 73px;
      height: 22px;
      // background:rgba(193,0,0,1);
      box-shadow: 0px 4px 12px 0px rgba(153, 0, 0, 0.6);
      border-radius: 3px;
      position: absolute;
      bottom: 0;
    }
  }
  .contariner {
    width: 100%;
    position: relative;
    margin-top: 222px;
    padding: 0 15px;
    box-sizing: border-box;
    padding-bottom: 109px;
    .prizeBox {
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;
      padding: 0 15px 25px 16px;
      overflow: hidden;
      p {
        margin: 0;
      }
      .prizeBox-title {
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
