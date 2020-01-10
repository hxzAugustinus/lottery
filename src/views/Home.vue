<!--
 * @Date: 2020-01-09 10:53:54
 * @LastEditors  : hxz
 * @LastEditTime : 2020-01-09 16:14:03
 -->
<template>
  <div class="home">
    <div>今日福利</div>
    <router-link :to="{ name: 'profile' }">我的抽奖</router-link>
    <award></award>
    <van-tabs animated>
      <van-tab title="立即抽奖">
        <Raffle></Raffle>
      </van-tab>
      <van-tab title="图文详情">内容 2</van-tab>
    </van-tabs>
    <wx-modal :show="show" @close-modal="closeModal"></wx-modal>
  </div>
</template>

<script>
import Award from "@/components/Award";
import Raffle from "@/components/Raffle.vue";
import WxModal from "@/components/WxModal.vue";

export default {
  name: "home",
  data() {
    return {
      show: false
    };
  },
  components: {
    Award,
    Raffle,
    WxModal
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 2000);
  },
  methods: {
    closeModal() {
      this.show = false;
    }
  }
};
</script>
