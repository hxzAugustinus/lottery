<template>
  <div class="DrawMsg">
    <p class="DrawMsg-title">抽奖信息</p>
    <div class="DrawMsg-conTitle">
      <p>等待开奖</p>
      <p>
        <img src="@/images/person.png" alt />
        {{
        joinperson / 10000 > 1
        ? (joinperson / 10000).toFixed(1) + "W"
        : joinperson
        }}
      </p>
    </div>
    <div class="DrawMsg-num">
      <p>我的兑奖码</p>
      <p>{{ drawCode }}</p>
    </div>
    <p class="DrawMsg-content">每邀请一位新用户，注册【网上老年大学】，可以增加5%获奖概率哦～（每个商品限4个。</p>
    <div class="invatepeple" v-if="imgList.length > 0">
      <p>已邀请{{ imgList.length }}位，中奖概率增加{{ imgList.length * 5 }}%</p>
      <div class="imgBox">
        <img
          v-for="(item, index) in imgList"
          :key="index"
          :src="item.avatar"
          alt
          :onerror="defaultAvatar"
        />
      </div>
    </div>
    <van-button type="danger" :disabled="imgList.length >= 4" @click="showoverlay">邀请好友助力</van-button>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array
    },
    drawCode: {
      type: Number
    },
    joinperson: {
      type: Number
    }
  },
  data() {
    return {
      defaultAvatar: 'this.src="' + require("@/images/defultImg.png") + '"',
      disabled: false,
      goodsId: 111
    };
  },
  methods: {
    showoverlay() {
      this.$router.push({
        name: "share",
        params: {
          goodsId: this.goodsId
        }
      });
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
      font-weight: 500;
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
      font-weight: 500;
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
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    margin: 9px 0 15px 0;
  }
  .invatepeple {
    padding: 15px 0 20px 0;
    border-top: 1px solid rgba(237, 237, 237, 1);
    p {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .imgBox {
      padding-top: 10px;
      display: flex;
      align-items: center;
      img {
        width: 49px;
        height: 49px;
        margin-right: 12px;
        border-radius: 50%;
      }
    }
  }
  .van-button {
    width: 100%;
    border-radius: 4px;
    font-size: 18px;
  }
  .van-button--disabled {
    opacity: 1;
    background: rgba(204, 204, 204, 1);
    border: 1px solid rgba(204, 204, 204, 1);
  }
}
</style>
