<!--
 * @Date: 2020-01-09 11:06:36
 * @LastEditors: hxz
 * @LastEditTime: 2020-01-09 11:17:19
 -->
<template>
  <div class="contrain">
    <div class="qst" v-if="drawList.length == 1">
      <img src="@/images/drawqst.png" alt />
      <p>还没参与活动哦，赶紧去抽奖吧！</p>
    </div>
    <div class="my-lottery" v-else>
      <div class="lottery-list">
        <div
          class="lottery-item"
          v-for="(item,index) in drawList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="item-img">
            <img src="@/images/domoimg.png" alt />
            <div class="lottery-state" v-if="item.state == 1">
              <div>
                <span>待开奖</span>
              </div>
              <img src="@/images/lottery-ing.png" alt />
            </div>
            <div class="lottery-state" v-else>
              <div>
                <span>已结束</span>
              </div>
              <img src="@/images/lottery-over.png" alt />
            </div>
            <div class="over" v-if="item.state == 0"></div>
          </div>
          <div :class="['item-content', {'item-content-over' : item.state==0}]">
            <div class="item-title">
              <span>奖品:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>{{item.name}}</span>
            </div>
            <div class="item-text">
              <span>{{item.date}} </span>
              <span>  自动开奖</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawList: [
        {
          imgSrc: "@/images/domoimg.png",
          name: "日本资深堂美润护手霜100gx1",
          date: "01月12日 10:00",
          state: "1"
        },
        {
          imgSrc: "@/images/domoimg.png",
          name: "日本资深堂美润护手霜100gx1",
          date: "01月10日 10:00",
          state: "0"
        },
        {
          imgSrc: "@/images/domoimg.png",
          name: "欧莱雅面膜125gx5 日本资深堂美润护手霜100gx1",
          date: "01月08日 10:00",
          state: "1"
        },
        {
          imgSrc: "@/images/domoimg.png",
          name: "日本资深堂美润护手霜100gx1",
          date: "01月08日 10:00",
          state: "0"
        }
      ]
    };
  },
  methods: {
    toDetail: function(item) {
      console.log(item)
      if(item.state == 1){
        localStorage.setItem('lottary-item',JSON.stringify(item))
        this.$router.push({ name: "detail" });
      }
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
  .my-lottery {
    background: #f7f7f7;
    .lottery-list {
      .lottery-item {
        height: 320px;
        padding: 15px;
        margin-bottom: 10px;
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
          .over {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
          }
          .lottery-state {
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
          color: rgba(51, 51, 51, 1);
          .item-title {
            height: 28px;
            line-height: 28px;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .item-text {
            height: 25px;
            font-size: 18px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            line-height: 25px;
          }
        }
        .item-content-over {
          color: #999 !important;
        }
      }
    }
  }
}
</style>
