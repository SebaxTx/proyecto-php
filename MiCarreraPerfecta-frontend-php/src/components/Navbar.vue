<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="@/assets/img/icon.png" alt="Mi Carrera Perfecta" class="navbar-logo">
    </div>
    <div class="navbar-burger" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div :class="['navbar-menu', { 'is-active': isActive }]">
      <router-link to="/">Inicio</router-link>
      <router-link to="/career">Carreras</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isActive = ref(false);

    const toggleMenu = () => {
      isActive.value = !isActive.value;
    };

    return { isActive, toggleMenu };
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background-color: #1b1343;
  color: white;
}
.navbar-brand .navbar-logo {
  width: 200px;
  height: 200px;
}
.navbar.container-lg{
  display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
}
.navbar-burger {
  display: none;
  cursor: pointer;
}
.navbar-burger div {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px;
}
.navbar-menu {
  display: flex;
  align-items: center;
}
.navbar-menu a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}
@media (max-width: 768px) {
  .navbar-burger {
    display: block;
  }
  .navbar-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #1b1343;
  }
  .navbar-menu a {
    padding: 10px 20px;
    width: 100%;
    text-align: center;
  }
  .navbar-menu.is-active {
    display: flex;
  }
}
</style>
