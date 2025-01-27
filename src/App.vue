<template>
  <div class="background-image"></div>
  <img alt="MatchMaker logo" src="@/assets/logo.png">
  <RouterView/>
  <div class="bottom-right">
    <p>MatchMaker 2.1.2 made with &#10084;&#65039; by WeMatch Team Operations</p>
  </div>

  <logout-help-buttons v-if="!this.gStore.isLogin"/>
</template>

<script>
import router from "@/router";
import LogoutHelpButtons from "@/elements/LogoutHelpButtons.vue";
import { useGlobalStore } from '@/stores/global.js';

export default {
  name: 'App',
  components: {LogoutHelpButtons},
  data(){
    return {
      userType: "",
      isMobile: false,
      gStore: useGlobalStore(),
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
@import url('./assets/font/font.css');
@import url('./assets/main.css');

.hidden {
  display: none;
}

.mobileDeviceError {
  color: red;
  font-size: 1.5em;
  text-align: center;
}

.bottom-right{
  position: fixed;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  color: #008783;
  font-family: 'Courier New', monospace;
  font-size: x-small;
}

.background-image {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 600px;
  background-image: url(./assets/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: -1;
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

</style>
