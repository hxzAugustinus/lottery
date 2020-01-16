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
};