<template>
  <div>我的</div>
</template>
<script>
import { userIndex } from "@/api/api";
export default {
  name: "user",
  created() {
    this.initData();
  },
  methods: {
    initData() {
      userIndex().then(res => {
        console.log(res.data.data.order);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>