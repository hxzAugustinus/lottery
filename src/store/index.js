/*
 * @Date: 2020-01-09 10:39:39
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-10 14:31:20
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null,
    goodsId: null
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
