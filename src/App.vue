<template>
  <img alt="MatchMaker logo" src="./assets/logo.png">
  <RouterView/>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  methods: {
    router() {
      return router
    }
  },
  mounted() {
    const userInfo = localStorage.getItem('userInfo');
    console.log("userInfo: " + userInfo);
    try {
      if (userInfo.length === 0) {
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    }
      },
}
</script>

<style>
body {
  background-color: #001f25;
  text-align: center;
  font-family: Jost, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding-top: 60px;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

img {
  height: auto;
  max-width: 100%;
}

g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
