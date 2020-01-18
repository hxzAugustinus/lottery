<!--
 * @Date: 2020-01-09 11:14:25
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 11:15:36
 -->
<template>
  <div class="detail">
    <div class="detail-item">
      <div class="item-img">
        <img :src="detailItem.image" alt />
        <div class="detail-state" v-if="detailItem.status == 0">
          <div>
            <span>待开奖</span>
          </div>
          <img src="@/images/lottery-ing.png" alt />
        </div>
        <div class="detail-state" v-if="detailItem.status == -1">
          <div>
            <span>未中奖</span>
          </div>
          <img src="@/images/lottery-over.png" alt />
        </div>
        <div class="detail-state" v-if="detailItem.status == 1">
          <div>
            <span>已中奖</span>
          </div>
          <img src="@/images/lottery-win.png" alt />
        </div>
      </div>
      <div class="item-content">
        <div class="item-title">
          <span>奖品:&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{{ detailItem.title }}</span>
        </div>
        <div class="item-text">
          <span>{{ detailItem.end_time }}</span>
          <span>&nbsp;自动开奖</span>
        </div>
      </div>
    </div>
    <div class="heng"></div>
    <Waitedraw
      :imgList="invate_users"
      :drawCode="detailItem.exchange_code"
      :joinperson="detailItem.join_total"
      style="margin-top:0px;"
      v-if="detailItem.status == 0"
    ></Waitedraw>
    <Winlottery
      :winperson="lucky_users"
      :drawCode="detailItem.exchange_code"
      :joinperson="detailItem.join_total"
      :goodsTitle="detailItem.title"
      :goodsId="detailItem.id"
      @showmodel="showmodel"
      style="margin-top:0px;"
      v-if="detailItem.status == 1"
    ></Winlottery>
    <Loselottery
      v-if="detailItem.status == -1"
      :winperson="lucky_users"
      :drawCode="detailItem.exchange_code"
      :joinperson="detailItem.join_total"
      status="1"
      :preGoods="pre_goods"
      @showmodel="showmodel"
      style="margin-top:0px;"
    ></Loselottery>
    <wx-modal :showModel="showModel" @showmodel="showmodel" :wechatNum="pre_goods.wechat"></wx-modal>
  </div>
</template>

<script>
import api from "@/api/LotteryApi.js";
import Waitedraw from "@/components/Waitedraw.vue";
import Winlottery from "@/components/Winlottery.vue";
import WxModal from "@/components/WxModal.vue";
import Loselottery from "@/components/Loselottery.vue";

export default {
  components: {
    Waitedraw,
    Winlottery,
    Loselottery,
    WxModal
  },
  data() {
    return {
      detailItem: {},
      lucky_users: [],
      invate_users: [],
      pre_goods: {},
      showModel: false
    };
  },
  created() {
    this.status = this.$route.query.status;
    api.getRecordById(this.$route.query.id).then(res => {
      res.record.end_time = this.timestampToTime(res.record.end_time);
      res.record.join_total = this.tow(res.record.join_total);
      res.pre_goods.start_time = this.timestampTime(res.pre_goods.start_time);
      res.record.exchange_code = Number(res.record.exchange_code);
      res.lucky_users = this.nickname(res.lucky_users);
      this.detailItem = res.record;
      this.lucky_users = res.lucky_users;
      this.pre_goods = res.pre_goods;
      res.invate_users ? (this.invate_users = res.invate_users) : "";
    });
  },
  mounted() {},
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes();
      return Y + M + D + h + m;
    },
    timestampTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var M = date.getMonth() + 1 + "月";
      var D = date.getDate() + "日";
      var h = date.getHours() + ":";
      var m = date.getMinutes();
      return M + D + h + m;
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
    showmodel(val) {
      this.showModel = val;
    },
    closeModal() {
      this.showModel = true;
    },
    /**破万 */
    tow(num) {
      return num / 10000 > 1 ? (num = (num / 10000).toFixed(1) + "W") : num;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  .heng {
    width: 100%;
    height: 10px;
    background: rgba(247, 247, 247, 1);
  }
  .detail-item {
    height: 320px;
    padding: 15px 15px 16px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: white;
    .item-img {
      height: 250px;
      margin-bottom: 15px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .detail-state {
        position: absolute;
        top: 0;
        left: 0;
        width: 97px;
        height: 36px;
        text-align: center;
        font-weight: 400;
        font-family: PingFangSC-Regular, PingFang SC;
        div {
          width: 97px;
          height: 36px;
          font-size: 18px;
          color: white;
          line-height: 36px;
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          span {
            margin: 5px 27px 5px 16px;
          }
        }
      }
    }
    .item-content {
      width: 100%;
      text-align: left;
      .item-title {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .item-text {
        height: 25px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
    }
  }
  .lottery-info {
    background: white;
    .info-title {
      margin: 0 15px 15px 15px;
      padding: 10px;
      font-size: 20px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      text-align: center;
      border-bottom: 1px solid #ededed;
    }
    .info-box {
      margin: 15px;
      .info-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
        }
        .right {
          width: 70px;
          height: 28px;
          background: rgba(247, 247, 247, 1);
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          span {
            font-size: 16px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            margin-bottom: 2px;
          }
          img {
            width: 18px;
            height: 14px;
          }
        }
      }
      .my-coin {
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #333;
        line-height: 25px;
        span:last-child {
          margin-left: 5px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #de2020;
          line-height: 18px;
        }
      }
      .info-content {
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 27px;
        margin-bottom: 10px;
      }
    }
    .info-btn {
      margin: 15px;
      width: calc(100% - 30px);
      height: 46px;
      font-size: 18px;
      font-weight: bold;
      font-family: PingFang-SC-Bold, PingFang-SC;
      background: #f01818;
      border-radius: 4px;
      color: white;
      text-align: center;
      border: none;
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
