<template>
  <navigation :type=false
              :title="'红烧肉'"
              :fav=true></navigation>
</template>
<style>
</style>
<script>
import navigation from "./navigation/navigation.vue";
export default {
  name: "List",
  components: {
    navigation
  }
};
</script>