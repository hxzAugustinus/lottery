/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 15:41:33
 */
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import { Tab, Tabs, Button, Dialog } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Dialog);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
