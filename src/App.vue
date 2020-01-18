<!--
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-18 16:34:40
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (process.env.NODE_ENV == "development") {
      this.init();
    } else {
      this.$wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          this.init();
        }
      });
    }
  },
  methods: {
    init() {
      /* 用户id */
      const uid = this.$utils.getQueryString("uid");
      /* 商品id */
      const goodsId = this.$utils.getQueryString("id");
      console.log(uid, goodsId);
      this.$store.commit("setAuth", { uid, goodsId });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html {
  font-size: 16px;
}

@media screen and (max-width: 359px) {
  html {
    font-size: 12px;
  }
}
</style>
