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
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
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
}
</script>

<style>
@import url('./assets/font/font.css');

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
  height: fit-content;
  padding: 7px 35px;
  border-radius: 0;
  border: 1px solid #fff;
  font-family: Jost, sans-serif;
  font-size: large;
  color: white;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: white;
  box-shadow: 0px 0px 10px white;
  cursor: pointer;
  color: black
}

.btn-primary {
  padding: 7px 35px;
  border-radius: 0;
  border: 0;
  font-family: Jost, sans-serif;
  font-size: large;
  font-weight: bold;
  background-color: #fff;
  height: fit-content;
  color: #000;
}

.btn-primary:hover {
  box-shadow: 0px 0px 10px #fff;
  cursor: pointer;
  background-color: white;
  color: #000;
}

.btn-primary:active, .btn-primary:focus {
  color: #fff;
  background-color: transparent;
  border: 1px solid #fff;
  box-shadow: 0px 0px 10px #fff;
  transform: scale(0.98);
}

h2 {
  margin-top: 2rem;
}

.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

.input-group label {
  display: block;
  margin: 0.5rem 0 0.2rem 0;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.form-group {
  width: 100%;
  max-width: 400px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bestatigen-button {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.bestatigen-button:hover {
  cursor: pointer;
}

</style>
