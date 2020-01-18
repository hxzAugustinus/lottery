<template>
  <van-overlay :show="Overlay" @click="showOverlay">
    <div class="wrapper">
      <div class="block">
        <div class="btnBox">
          <div class="btn" @click.stop="share">
            <img src="@/images/wechat.png" alt />
            <p>发给朋友</p>
          </div>
          <div class="btn">
            <img src="@/images/saveImg.png" alt />
            <p>保存图片</p>
          </div>
        </div>
        <div class="close" @click.stop="showOverlay">取消</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    Overlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    showOverlay() {
      this.$emit("showOverlay");
    },
    share() {}
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(237, 237, 237, 1);
  border-radius: 10px 10px 0px 0px;
  .btnBox {
    width: 100%;
    height: 80px;
    background: #fff;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-left: 10px;
      }
    }
    .btn:nth-child(1) {
      border-right: 1px solid rgba(237, 237, 237, 1);
    }
  }
  .close {
    width: 100%;
    height: 76px;
    margin-top: 5px;
    padding-top: 11px;
    box-sizing: border-box;
    background: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    overflow: hidden;
  }
}
.van-overlay {
  z-index: 1000 !important;
}
</style>
