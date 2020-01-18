import Vue from "vue";

export default {
  /**
   * @description: 获取用户参与抽奖兑奖码
   * @param {int} goods_id
   * @return: promise
   */
  lotteryJoinIn(goods_id) {
    return Vue.axios.post("/lottery/joinIn?goods_id=" + goods_id);
  },
  /**
   * @description: 获取用户参与抽奖记录
   * @param {int} goods_id
   * @return: promise
   */
  getRecordList() {
    return Vue.axios.get("/lottery/getRecordList");
  },
  /**
   * @description: 获取用户参与抽奖详情
   * @param {int} record_id
   * @return: promise
   */
  getRecordById(record_id) {
    return Vue.axios.get("/lottery/getRecordById?record_id=" + record_id);
  },
  /**
   * @description: 获取用户参与抽奖详情
   * @param {int} goods_id
   * @return: promise
   */
  getGoods(goods_id) {
    return Vue.axios.get("/lottery/getGoods?goods_id=" + goods_id);
  }
};
