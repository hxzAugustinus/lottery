<!--
 * @Date: 2020-01-10 09:48:14
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-18 22:22:29
 -->
<template>
  <div class="share-page">
    <article ref="capture" class="share-content">
      <section class="header">
        <div class="avator">
          <img :src="user.avatar_base64" alt="用户头像" />
        </div>
        <div>{{ user.nickname }}</div>
        <div>邀请你帮忙助力抽奖</div>
      </section>
      <section class="goods">
        <!-- 需要允许跨域 -->
        <img :src="user.image_base64" alt="奖品示意图" />
        <div>奖品：{{ user.title }}</div>
      </section>
      <section class="qrcode">
        <div>
          <img :src="Qrcode" alt="小程序码" />
        </div>
        <div>长按识别小程序来【网上老年大学】试试运气</div>
      </section>
    </article>
    <template v-if="imageFile">
      <div class="image_wrap">
        <img :src="imageFile" class="share_image" />
      </div>
      <div class="tip">
        长按图片保存，发送至朋友圈，
        <br />赶紧邀请好友来助力吧！
      </div>
    </template>
    <van-loading class="loading" v-else size="24px" vertical
      >生成图片中...</van-loading
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
      http.getQrcode(this.$route.params.goodsId),
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
  padding: 15px 15px 40px;
  box-sizing: border-box;

  .share-content {
    position: absolute;
    left: -1500px;
    box-sizing: border-box;
    background: url(~@/assets/share_bg.png) no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: calc(100% - 4.25rem);
    border-radius: 10px;
    padding: 1.875rem 0.9375rem;
    display: flex;
    flex-direction: column;

    .header {
      font-size: 0;
      text-align: center;
      margin: 0 auto 0.9375rem;
      .avator {
        display: inline-block;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 5px;
        border: 1px solid #ededed;
        > img {
          width: 100%;
          height: 100%;
        }
      }

      > div {
        font-size: 1rem;
        color: white;
        line-height: 1.875rem;
      }

      > div:last-child {
        font-size: 1.125rem;
        font-weight: 600;
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
      > img {
        flex: 1;
        width: calc(100% - 2px);
        border: 1px solid #ededed;
      }
      > div {
        padding: 0.875rem;
        font-size: 1.125rem;
        color: #333333;
        line-height: 1.75rem;
      }
    }

    .qrcode {
      box-sizing: border-box;
      border-top: 1px solid #d8d8d8;
      height: 7.5rem;
      background: white;
      padding: 0.9375rem;
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
