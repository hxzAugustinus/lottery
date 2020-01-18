/*
 * @Date: 2020-01-10 10:00:16
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-17 16:56:48
 */
import Vue from "vue";

export default {
  /**
   * @description: 获取用户参与某个抽奖的分享二维码
   * @param {int} goods_id
   * @return: promise
   */
  getQrcode(goods_id) {
    return window.axios.get("/lottery/getQrcode?goods_id=" + goods_id);
  },
  /**
   * @description: 获取用户最近的抽奖记录
   * @param {int}goods_id
   * @return: promise
   */
  getLatestRecord(goods_id) {
    return Vue.axios.get("/lottery/getLatestRecord?goods_id=" + goods_id);
  }
};
