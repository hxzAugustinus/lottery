<!--
 * @Date: 2020-01-09 11:14:25
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 11:15:36
 -->
<template>
  <div class="detail">
    <div class="detail-item">
      <div class="item-img">
        <img src="@/images/domoimg.png" alt />
        <div class="detail-state">
          <div>
            <span>待开奖</span>
          </div>
          <img src="@/images/lottery-ing.png" alt />
        </div>
      </div>
      <div class="item-content">
        <div class="item-title">
          <span>奖品:&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{{detailItem.name}}</span>
        </div>
        <div class="item-text">
          <span>{{detailItem.date}}</span>
          <span>自动开奖</span>
        </div>
      </div>
    </div>
    <div class="heng"></div>
    <div class="lottery-info">
      <div class="info-title">抽奖信息</div>
      <div class="info-box">
        <div class="info-text">
          <div class="left">等待开奖</div>
          <div class="right">
            <img src="@/images/person.png" alt />
            <span>11838</span>
          </div>
        </div>
        <div class="my-coin">
          <span>我的兑奖码</span>
          <span>237890</span>
        </div>
        <div class="info-content">每邀请一位新用户，注册【网上老年大学】，可以增加5%获奖概率哦～（每个商品限4个。</div>
      </div>
      <button class="info-btn">邀请好友助力</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailItem: {
        imgSrc: "@/images/domoimg.png",
        name: "日本资深堂美润护手霜100gx1",
        date: "01月12日 10:00",
        state: "1"
      }
    };
  },
  mounted() {
    this.detailItem = JSON.parse(localStorage.getItem("lottary-item"));
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
    margin-bottom: 10px;
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
        font-family: PingFang-SC-Medium, PingFang-SC;
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
}
</style>
