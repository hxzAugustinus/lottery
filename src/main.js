/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-15 15:06:00
 */
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import utils from "@/utils/utils.js";
import wx from "jweixin-module";
Vue.prototype.$wx = wx;
Vue.prototype.$utils = utils;

import { Tab, Tabs, Button, Loading, Overlay, Dialog } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Loading)
  .use(Overlay)
  .use(Dialog);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;

/* 手机查看console */
if (process.env.NODE_ENV !== "development") {
  var VConsole = require("vconsole/dist/vconsole.min.js");
  new VConsole();
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
