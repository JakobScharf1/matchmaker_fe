<template>
  <div class="background-image" :class="{ 'hidden': isMobile }"></div>
  <img alt="MatchMaker logo" src="@/assets/logo.png">
  <!-- Integration einer Fehlermeldung, wenn man Mobile Devices nutzt.
     Außerdem der Login-Button, der die login-Methode aus der firebase-config.js aufruft -->
  <div class="mobileDeviceError" v-if="isMobile"><p>Diese Website ist für die Verwendung auf Mobilgeräten nicht optimiert. Bitte verwende einen PC oder ein Tablet.</p></div>

  <RouterView/>
  <div class="bottom-right">
    <p>MatchMaker v2 made with &#10084;&#65039; by WeMatch Team Operations</p>
  </div>

  <logout-help-buttons v-if="!isLoginPage"/>
</template>

<script>
import router from "@/router";
import LogoutHelpButtons from "@/elements/LogoutHelpButtons.vue";

export default {
  name: 'App',
  components: {LogoutHelpButtons},
  data(){
    return {
      userType: "",
      isMobile: false
    }
  },
  methods: {
    router() {
      return router
    },
    checkIfMobile() {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },

  /* Fügt den Eventlistener "resize" ein welcher darauf achtet, welches Format das aktuell genutzte Gerät hat und ob sich dieses verändert */
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  },

  /* Entfernt den resize-Eventlistener, um das Fenster sauber zu schließen und das Neuladen bei erneutem Öffnen zu gewährleisten*/
  beforeUnmount() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
  computed: {
    isLoginPage() {
      const loginPage = ['/login'];
      return loginPage.includes(this.$route.path);
    }
  }
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
