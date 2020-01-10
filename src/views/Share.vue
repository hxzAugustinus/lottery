<!--
 * @Date: 2020-01-10 09:48:14
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-10 17:23:35
 -->
<template>
  <div class="share-page">
    <article class="share-content">
      <section class="header">
        <div class="avator">
          <img
            src="http://www.hkpznrf.com/uploads/allimg/191025/3-191025104923a2.jpg"
            alt="用户头像"
          />
        </div>
        <div>
          细水长流 <br />
          邀请你帮忙助力抽奖
        </div>
      </section>
      <section class="goods">
        <img
          src="http://www.hkpznrf.com/uploads/allimg/191025/3-19102510431c52.jpg"
          alt="奖品示意图"
        />
        <div>奖品：日本资深堂美润护手霜及纯手工面霜一盒</div>
      </section>
      <section class="qrcode"></section>
    </article>
    <button class="save">保存到手机</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.share-page {
  height: 100%;
  background: url(~@/assets/share_bg.png) no-repeat center center;
  background-size: 100% 100%;
  padding: 65px 15px;
  box-sizing: border-box;

  .share-content {
    box-sizing: border-box;
    background: white;
    height: calc(100% - 5.625rem);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;

    .header {
      height: 3.75rem;
      position: relative;
      padding-left: 5rem;
      font-size: 1.125rem;
      color: rgba(51, 51, 51, 1);
      line-height: 1.875rem;
      margin-bottom: 15px;
      .avator {
        position: absolute;
        left: 0.625rem;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        overflow: hidden;

        > img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .goods {
      position: relative;
      flex: 1;
      background: #f7f7f7;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      > img {
        height: 70%;
        width: 100%;
      }
      > div {
        margin: 0.875rem;
        font-size: 1.125rem;
        color: #333333;
        line-height: 1.75rem;
      }
    }

    .qrcode {
      height: 6.875rem;
      background: #f7f7f7;
      border-radius: 0.625rem;
    }
  }

  .save {
    height: 3.75rem;
    margin-top: 1.875rem;
  }
}
</style>
