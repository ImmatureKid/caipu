<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view class="root"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true
    }
  },
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: all 1s ease;
  /* transform: translateX(45%); */
}
.root{
  position: absolute;
  width: 100%;
}
</style>
