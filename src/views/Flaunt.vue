<!--
 * @Date: 2020-01-10 09:48:14
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-18 22:23:17
 -->
<template>
  <div class="share-page">
    <article ref="capture" class="share-content">
      <div class="wrap">
        <section class="header">
          <div class="avator">
            <img :src="user.avatar_base64" alt="用户头像" />
          </div>
          <div>{{ user.nickname }}</div>
        </section>
        <section class="goods">
          <div>
            <span>我中奖了：</span>
            <span>{{ user.title }}</span>
          </div>
          <!-- 需要允许跨域 -->
          <img :src="user.image_base64" alt="奖品示意图" />
        </section>
        <section class="qrcode">
          <div>
            <img :src="Qrcode" alt="小程序码" />
          </div>
          <div>长按识别小程序来【网上老年大学】试试运气</div>
        </section>
      </div>
    </article>
    <template v-if="imageFile">
      <div class="image_wrap">
        <img :src="imageFile" class="share_image" />
      </div>
      <div class="tip">
        长按图片保存，发送至朋友圈，
        <br />赶紧炫耀一下吧！
      </div>
    </template>
    <van-loading class="loading" v-else size="24px" vertical
      >图片生成中...</van-loading
    >
  </div>
</template>

<script>
import http from "@/api/HomeApi.js";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      imageFile: "",
      Qrcode: "",
      user: {}
    };
  },
  mounted() {
    Promise.all([
      http.getQrcode(0),
      http.getLatestRecord(this.$route.params.goodsId)
    ]).then(res => {
      this.Qrcode = res[0];
      this.user = res[1] || {};
      this.$nextTick(() => {
        this.save();
      });
    });
  },
  methods: {
    async save() {
      const el = this.$refs.capture;
      const options = {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null
      };
      const canvas = await html2canvas(el, options);
      this.imageFile = canvas.toDataURL("image/png");
    }
  }
};
</script>

<style lang="scss" scoped>
.share-page {
  position: relative;
  height: 100%;
  padding: 0.9375rem 0.9375rem 2.5rem;
  box-sizing: border-box;

  .share-content {
    position: absolute;
    left: -1500px;
    box-sizing: border-box;
    background: url(~@/assets/flaunt_bg.png) no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: calc(100% - 4.25rem);
    border-radius: 0.625rem;
    padding: 4.6875rem 0.9375rem;
    .wrap {
      background: white;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.9375rem;
    }

    .header {
      display: flex;
      align-items: center;
      .avator {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ededed;
        > img {
          width: 100%;
          height: 100%;
        }
      }

      > div:last-child {
        margin-left: 0.625rem;
        font-size: 1.125rem;
        font-weight: 600;
        color: #333;
      }
    }

    .goods {
      position: relative;
      font-size: 0;
      flex: 1;
      background: white;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      > div {
        font-size: 1.125rem;
        color: #333333;
        line-height: 1.75rem;
        margin: 0.625rem 0;
        > span:first-child {
          font-weight: bold;
        }
      }
      > img {
        flex: 1;
        width: calc(100% - 2px);
        border: 1px solid #ededed;
      }
    }

    .qrcode {
      margin-top: 0.9375rem;
      height: 5rem;
      display: flex;
      align-items: center;
      > div:first-child {
        width: 5rem;
        height: 5rem;
        > img {
          width: 100%;
        }
      }

      > div:last-child {
        margin-left: 0.9375rem;
        flex: 1;
        font-size: 1rem;
        color: #666666;
        line-height: 1.75rem;
      }
    }
  }

  .tip {
    line-height: 1.5rem;
    color: #333;
    text-align: center;
    margin-top: 1.25rem;
  }

  .image_wrap {
    overflow: hidden;
    height: calc(100% - 4.25rem);
    box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    .share_image {
      width: 100%;
      height: 100%;
    }
  }

  .loading {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
