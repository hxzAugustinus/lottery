<template>
  <div class="DrawMsg">
    <p class="DrawMsg-title">抽奖信息</p>
    <div class="DrawMsg-conTitle">
      <p>{{ status ? "很遗憾，你未中奖！" : "很遗憾，您来晚了！" }}</p>
      <p>
        <img src="@/images/person.png" alt />
        {{
        joinperson / 10000 > 1
        ? (joinperson / 10000).toFixed(1) + "W"
        : joinperson
        }}
      </p>
    </div>
    <div class="DrawMsg-num" v-if="status">
      <p>我的兑奖码</p>
      <p>{{ drawCode }}</p>
    </div>
    <p class="msg" v-if="!preGoods.title">活动已结束，请添加官方客服人员微信号【{{ wechatNum }}】，关注后续活动哦～</p>
    <p class="DrawMsg-content" v-if="preGoods.title">为您准备了如下福利</p>
    <div class="nextLottery" v-if="preGoods.title">
      <img :src="preGoods.images[0].image" alt />
      <div class="nextLottery-content">
        <p>奖品：{{ preGoods.title }}</p>
        <p @click="toLottery">
          {{
          showTime
          ? timestampTime(preGoods.start_time) + " 开始抽奖"
          : "去抽奖"
          }}
        </p>
      </div>
    </div>
    <div class="winperson" :style="!preGoods.image ? 'margin-top:20px' : ''" v-if="winperson[0]">
      <h1>中奖名单</h1>
      <div class="personCon" v-for="(item, index) in winperson" :key="index">
        <img
          :src="
            item.avatar != null
              ? item.avatar
              : require('@/images/defultImg.png')
          "
          alt
          :onerror="defaultAvatar"
        />
        <div>
          <p>{{ item.nickname }}</p>
          <p>兑奖码：{{ item.exchange_code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    winperson: {},
    drawCode: {},
    joinperson: {},
    status: {},
    preGoods: {
      type: Object
    },
    wechatNum: {}
  },
  data() {
    return {
      defaultAvatar: 'this.src="' + require("@/images/defultImg.png") + '"',
      disabled: false,
      showTime: false
    };
  },
  mounted() {
    this.timecompare();
  },
  methods: {
    closeModal() {
      this.$emit("showmodel", true);
    },
    timecompare() {
      new Date(this.preGoods.start_time * 1000) > new Date()
        ? (this.showTime = true)
        : (this.showTime = false);
    },
    toLottery() {
      let uid = this.$store.state.uid,
        goodsId = this.preGoods.id;
      if (this.showTime) return;
      if (this.$route.name == "home") {
        this.$store.commit("setAuth", { uid, goodsId });
        this.$emit("getGoods");
      } else {
        console.log(this.$store.state);
        this.$router.push({
          name: "home",
          query: {
            uid,
            goodsId
          }
        });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.DrawMsg {
  width: 100%;
  background: #fff;
  padding: 0 15px 20px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  .DrawMsg-title {
    text-align: center;
    padding: 15px 0 10px 0;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(237, 237, 237, 1);
  }
  .DrawMsg-conTitle {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    p {
      display: inline-block;
      margin: 0;
    }
    p:nth-child(1) {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    p:nth-child(2) {
      padding: 2px 10px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      background: rgba(247, 247, 247, 1);
      border-radius: 2px;
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 14px;
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
  .DrawMsg-num {
    margin-top: 6px;
    display: flex;
    align-items: center;
    p {
      display: inline-block;
      font-size: 18px;
      margin: 0;
    }
    p:nth-child(1) {
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-right: 5px;
    }
    p:nth-child(2) {
      font-weight: bold;
      color: rgba(222, 32, 32, 1);
      margin-bottom: -4px;
    }
  }
  .DrawMsg-content {
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin: 9px 0 15px 0;
  }
  .nextLottery {
    margin: 6px 0;
    height: 100px;
    display: flex;
    img {
      width: 133px;
      height: auto;
      display: block;
      margin-right: 15px;
      border-radius: 15px;
    }
    .nextLottery-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0;
      }
      p:nth-child(1) {
        text-align: left;
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 29px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p:nth-child(2) {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 15px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        background: rgba(223, 32, 32, 1);
        border-radius: 3px;
      }
    }
  }
  .winperson {
    margin-top: 25px;
    h1 {
      font-size: 18px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin: 0 0 11px 0;
    }
    .personCon {
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      background: rgba(247, 247, 247, 1);
      border-radius: 3px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      img {
        width: 48px;
        height: 48px;
        margin-right: 15px;
        border-radius: 50%;
      }
      p {
        margin: 0;
      }
      p:nth-child(1) {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      p:nth-child(2) {
        margin-top: 3px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .msg {
    margin: 10px 0 0 0;
    font-size: 18px;
    line-height: 27px;
  }
}
</style>
