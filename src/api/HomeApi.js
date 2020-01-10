/*
 * @Date: 2020-01-10 10:00:16
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-10 10:03:44
 */
import vue from "vue";

export default {
  /**
   * @description: 请求范例
   * @param {Object} parmas
   * @return: promise
   */
  getExample(params) {
    return vue.$axios.post("/example/getInfo", params);
  }
};
