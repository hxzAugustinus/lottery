<!--
 * @Date: 2020-01-09 10:53:54
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-18 17:22:37
 -->
<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
    <div class="home">
      <img class="bg" src="@/images/homeBg.png" />
      <div class="user">
        <router-link :to="{ name: 'profile' }" class="router"></router-link>
        <span></span>
      </div>
      <div class="contariner">
        <award :img="goodsInfo.images" :title="goodsInfo.title"></award>
        <Raffle
          @close-modal="closeModal"
          :drawFirst="drawFirst"
          @showMsg="showmsg"
          @getdrawCode="getdrawCode"
          :joinperson="goodsInfo.join_total"
          :drawCode="drawCode"
          :starttime="goodsInfo.end_time"
          v-if="lotteryShow.showDraw"
        ></Raffle>
        <Waitedraw
          v-if="lotteryShow.showMsg"
          :imgList="lotteryInfo.invite_users ? lotteryInfo.invite_users : []"
          :drawCode="drawCode > 0 ? drawCode : lotteryInfo.exchange_code"
          :joinperson="goodsInfo.join_total"
          :winperson="lotteryInfo.lucky_users"
          :goodsId="goodsInfo.id"
        ></Waitedraw>
        <Winlottery
          v-if="lotteryShow.showWin"
          :drawCode="drawCode > 0 ? drawCode : lotteryInfo.exchange_code"
          :joinperson="goodsInfo.join_total"
          :winperson="lotteryInfo.lucky_users"
          :goodsId="goodsInfo.id"
          :goodsTitle="goodsInfo.title"
          @showmodel="showmodel"
        ></Winlottery>
        <Loselottery
          v-if="lotteryShow.showLose"
          :drawCode="drawCode > 0 ? drawCode : lotteryInfo.exchange_code"
          :joinperson="goodsInfo.join_total"
          :winperson="lotteryInfo.lucky_users"
          :goodsTitle="goodsInfo.title"
          :preGoods="lotteryInfo.pre_goods ? lotteryInfo.pre_goods : {}"
          :status="lotteryShow.status"
          :wechatNum="goodsInfo.wechat"
          @showmodel="showmodel"
          @getGoods="getGoods"
        ></Loselottery>
        <div class="prizeBox">
          <p class="prizeBox-title">抽奖说明</p>
          <div class="content">
            <p>新春福利，限时抽奖活动</p>
            <p>
              1.本次活动需添加活动微信“
              {{ goodsInfo.wechat }} ”才能获得抽奖资格和领取奖品。
            </p>
            <p>
              2.添加活动微信“ {{ goodsInfo.wechat }} ”可领取{{
              goodsInfo.title
              }}，共计{{ goodsInfo.stock }}份，先到先得，送完即止。
            </p>
            <p>3.中奖后请主动联系我们工作人员，根据中奖信息寄送礼品。</p>
            <p>4.本次活动100%真实有效，最终解释权归网上老年大学</p>
          </div>
        </div>
      </div>
      <wx-modal :showModel="showModel" @showmodel="showmodel" :wechatNum="goodsInfo.wechat"></wx-modal>
    </div>
  </mescroll-vue>
</template>

<script>
import Award from "@/components/Award";
import Raffle from "@/components/Raffle.vue";
import WxModal from "@/components/WxModal.vue";
import Waitedraw from "@/components/Waitedraw.vue";
import Winlottery from "@/components/Winlottery.vue";
import Loselottery from "@/components/Loselottery.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import api from "@/api/LotteryApi.js";

export default {
  name: "home",
  data() {
    return {
      drawCode: 0,
      showModel: false,
      drawFirst: true,
      lotteryShow: {
        showDraw: true,
        showMsg: false,
        showWin: false,
        showLose: false,
        status: false
      },
      imgList: [],
      winperson: [],
      goodsInfo: {},
      lottery_info: {},
      mescroll: "",
      mescrollDown: {
        callback: this.refresh
      }
    };
  },
  components: {
    Award,
    Raffle,
    WxModal,
    Waitedraw,
    Winlottery,
    Loselottery,
    MescrollVue
  },
  mounted() {
    this.$store.state.uid && this.getGoods();
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    refresh() {
      this.getGoods().finally(() => {
        this.mescroll.endDownScroll();
      });
    },
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
    getdrawCode() {
      if (this.drawCode > 0) return;
      api
        .lotteryJoinIn(this.goodsInfo.id)
        .then(res => {
          if (res.exchange_code) {
            this.drawCode = res.exchange_code;
          }
        })
        .catch(err => {
          // alert("网络开了小差,稍后再试哦！");
          if (err.code == 0) {
            this.$toast({
              message: err.msg
            });
          }
        });
    },
    showmsg() {
      setTimeout(() => {
        this.lotteryShow.showDraw = false;
        this.lotteryShow.showMsg = true;
        this.showModel = false;
      }, 3000);
    },
    showCom(status) {
      this.lotteryShow = {
        showDraw: false,
        showMsg: false,
        showWin: false,
        showLose: false,
        status: false
      };
      switch (status) {
        case -2:
          this.lotteryShow.showDraw = true;
          break;
        case -1:
          this.lotteryShow.showLose = true;
          this.lotteryShow.status = true;
          break;
        case 0:
          this.lotteryShow.showMsg = true;
          break;
        case 1:
          this.lotteryShow.showWin = true;
          break;
        case 2:
          this.lotteryShow.showLose = true;
          break;
      }
    },
    timestampTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var M = date.getMonth() + 1 + "月";
      var D = date.getDate() + "日";
      var h =
        (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()) + ":";
      var m =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      return M + D + h + m;
    },
    getGoods() {
      return api.getGoods(this.$store.state.goodsId).then(res => {
        this.showCom(res.lottery_info.lottery_status);
        res.goods.end_time = this.timestampTime(res.goods.end_time);
        res.goods.join_total = this.tow(res.goods.join_total);
        res.lottery_info.lucky_users
          ? (res.lottery_info.lucky_users = this.nickname(
              res.lottery_info.lucky_users
            ))
          : "";
        this.goodsInfo = res.goods;
        this.lotteryInfo = res.lottery_info;
      });
    },
    nickname(name) {
      name.forEach(item => {
        if (item.nickname != null) {
          let arr = Array.from(item.nickname),
            num = "";
          if (arr.length - 2 > 0) {
            for (let i = 0; i < arr.length - 2; i++) {
              num = num + "*";
            }
            item.nickname = arr[0] + num + arr[arr.length - 1];
          } else {
            item.nickname = arr[0] + "*";
          }
        } else {
          item.nickname = "**";
        }
      });
      return name;
    },
    /**破万 */
    tow(num) {
      return num / 10000 > 1 ? (num = (num / 10000).toFixed(1) + "W") : num;
    }
  },
  watch: {
    "$store.state.uid"(newV) {
      if (newV) this.getGoods();
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
      position: relative;
      z-index: 5;
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
      z-index: 0;
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
        word-break: break-all;
        text-align: left;
        font-size: 18px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 27px;
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
