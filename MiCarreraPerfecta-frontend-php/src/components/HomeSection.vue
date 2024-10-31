<template>
    <section class="home">
      <div class="overlay"></div>
      <div class="home-content">
        <h1>MI CARRERA PERFECTA</h1>
        <button @click="navigateToTest">Realizar Test</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToTest() {
        this.$router.push('/test');
      }
    }
  };
  </script>
  
  <style scoped>
  .home {
    height: 100vh;
    background-image: url('src/assets/img/home3.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
  }
  .overlay {
  position: absolute;
  top: 204px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.home-content {
  position: relative;
  z-index: 2;
}
  .home-content h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  .home-content button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #1b1343;
    color: white;
    border: 1px solid;
    cursor: pointer;
    border-radius: 25px;
  }
  .home-content button:hover {
    background-color: #005bb5;
  }
  </style>
  