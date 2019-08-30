<template>
  <navigation :type=false
              :title="'个人中心'"
              :fav=false
              :clearBtn=true></navigation>
</template>
<style>
</style>
<script>
import navigation from "./navigation/navigation.vue";
export default {
  name: "Home",
  components: {
    navigation
  }
};
</script>