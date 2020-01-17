<!--
 * @Author: mat
 * @Date: 2019-12-04 14:56:07
 * @LastEditTime : 2020-01-09 14:52:55
 * @Description: 实现数字翻牌动态效果，css 属性 writing-mode: vertical-lr，使数字竖直排版，
                2d移动 transform: translate(-50%, -40%); y值控制移动至哪个数字，transition 
                控制transform属性有动画效果 
 -->

<template>
  <div class="chartNum">
    <img src="@/images/lotteryBox.png" alt />
    <div class="box-item" v-if="showNum">
      <li class="number-item" v-for="(item, index) in orderNum" :key="index">
        <span>
          <i ref="numberItem">01234567890123456789</i>
        </span>
      </li>
    </div>
    <div class="redp-item" v-else>
      <li class="redpacet" v-for="(item, index) in 6" :key="index">
        <img src="@/images/redPakect.png" />
      </li>
    </div>
    <p>{{starttime}} 自动开奖</p>
    <img
      :src=" acticon ?  require('@/images/drawBtnactive.png') :  require('@/images/drawBtn.png')"
      alt
      @click="drawaction"
    />
    <p>已有{{joinperson}}人参与</p>
  </div>
</template>
<script>
export default {
  props: {
    drawFirst: {
      type: Boolean,
      default: false
    },
    drawCode: {
      type: Number
    },
    joinperson: {},
    starttime: {}
  },
  data() {
    return {
      orderNum: ["0", "0", "0", "0", "0", "0"], // 默认订单总数
      imgBtn: require("@/images/drawBtn.png"),
      acticon: false,
      showNum: false
    };
  },
  mounted() {},
  methods: {
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter(item => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 5 +
          50}%)`;
      }
    },
    // 处理总订单数字
    toOrderNum(num) {
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 6) {
        num = "0" + num; // 如未满6位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
      } else if (num.length === 6) {
        // 订单数中加入逗号
        this.orderNum = num.split(""); // 将其便变成数据，渲染至滚动数组
      } else {
        //this.$message.warning("总量数字过大");
      }
      this.setNumberTransform();
    },
    drawaction() {
      if (this.acticon) return;
      this.$emit("close-modal");
      if (this.drawFirst) return;
      this.acticon = true;
      this.$emit("getdrawCode");
      setTimeout(() => {
        if (this.drawCode > 0 && !this.showNum) {
          this.showNum = true;
          setTimeout(() => {
            this.toOrderNum(this.drawCode); // 这里输入数字即可调用
            this.$emit("showMsg");
          }, 100);
        }
        this.acticon = false;
      }, 200);
    }
  }
};
</script>
<style scoped lang="scss">
.chartNum {
  margin-top: 20px;
  width: 100%;
  height: 409px;
  position: relative;
  overflow: initial;
  padding-top: 96px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  img:nth-child(1) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  img:nth-child(4) {
    width: calc(100% - 25px);
    height: 85px;
    position: relative;
    z-index: 5;
  }
  p:nth-child(3) {
    display: inline-block;
    padding: 0 22px;
    height: 34px;
    background: rgba(226, 152, 0, 1);
    border-radius: 17px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    position: relative;
    z-index: 5;
    line-height: 34px;
    margin: 60px auto 15px auto;
  }
  p:last-child {
    font-size: 16px;
    font-weight: 500;
    color: rgba(183, 63, 0, 1);
    position: relative;
    z-index: 5;
    margin: 0;
  }
}
/*订单总量滚动数字设置*/
.box-item {
  margin: 0 auto;
  width: calc(100% - 45px);
  height: 77px;
  font-size: 55px;
  line-height: 41px;
  text-align: center;
  list-style: none;
  color: rgba(242, 19, 28, 1);
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  display: flex;
  display: -webkit-box;
  flex-direction: row;
  flex-wrap: nowrap;
  z-index: 1;
  position: relative;
  overflow: hidden;
  /*滚动数字设置*/
  .number-item {
    flex: 1;
    height: 100%;
    list-style: none;
    margin-right: 5px;
    & > span {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      width: 100%;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: upright;
      overflow: hidden;
      & > i {
        font-style: normal;
        position: absolute;
        top: 11px;
        left: 50%;
        transform: translate(-50%, 0);
        transition: transform 1s ease-in-out;
        letter-spacing: 10px;
      }
    }
  }
  .number-item:last-child {
    margin-right: 0;
  }
}
.redp-item {
  margin: 0 auto;
  width: calc(100% - 38px);
  height: 77px;
  text-align: center;
  display: flex;
  list-style: none;
  display: -webkit-box;
  flex-direction: row;
  flex-wrap: nowrap;
  z-index: 1;
  position: relative;
  overflow: hidden;
  .redpacet {
    flex: 1;
    margin: 0;
    margin-right: 6px;
    margin-left: 6px;
    line-height: 122px;
    img {
      width: 100%;
      height: auto;
      position: relative;
    }
  }
}
</style>
