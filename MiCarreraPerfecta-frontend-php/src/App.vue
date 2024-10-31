<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';


export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
}
#app {
  height: 100%;
}
</style>
