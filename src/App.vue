<template>
  <img alt="MatchMaker logo" src="./assets/logo.png">
  <RouterView/>
  <div class="bottom-right">
    <p>MatchMaker v1.1.2 made with &#10084;&#65039; by WeMatch Team Operations</p>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  data(){
    return {
      userType: ""
    }
  },
  methods: {
    router() {
      return router
    },
  },
}
</script>

<style>
.bottom-right{
  position: fixed;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  color: #008783;
  font-family: 'Courier New', monospace;
  font-size: x-small;
}

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

#buttonContainer {
  position: fixed;
  top: 10px;
  right: 10px;
}

#helpButton {
  margin-right: 10px;
}

.btn-outline-primary {
  color: #007772;
  border-color: #007772;
}

.btn-outline-primary:hover {
  color: white;
  background-color: #007772;
}

.btn-primary {
  background-color: #007772;
  border-color: #007772;
}

.btn-primary:hover {
  background-color: transparent;
  color: #007772;
}

h2 {
  margin-top: 2rem;
}
</style>
