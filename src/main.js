/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-10 13:57:15
 */
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import wx from "jweixin-module";
import utils from "@/utils/utils.js";
Vue.prototype.$wx = wx;
Vue.prototype.$utils = utils;

import { Tab, Tabs, Button, Dialog, Overlay} from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Dialog)
  .use(Overlay)

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
