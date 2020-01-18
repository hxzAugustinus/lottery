/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-15 18:17:18
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: 915,
    goodsId: 0
  },
  mutations: {
    setAuth(state, val) {
      let { uid, goodsId } = val;
      state.uid = uid;
      state.goodsId = goodsId;
    }
  },
  actions: {}
});
