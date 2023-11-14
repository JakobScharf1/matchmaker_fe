<template>
  <img alt="MatchMaker logo" src="./assets/logo.png">
  <MatchIDInput></MatchIDInput>
</template>

<script>
import MatchIDInput from './components/MatchIDInput.vue'

export default {
  name: 'App',
  components: {
    MatchIDInput
  }
}
</script>

<style>
body {
  background-color: #001f25;
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding-top: 60px;
  height: 100%;
  width: 50%;
  margin: 0 auto;
}
</style>
