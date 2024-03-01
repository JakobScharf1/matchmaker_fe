<template>
  <!-- Integration einer Fehlermeldung, wenn man Mobile Devices nutzt.
       Außerdem der Login-Button, der die login-Methode aus der firebase-config.js aufruft -->
  <div>
    <div class="mobileDeviceError" v-if="isMobile"><p>Diese Website ist für die Verwendung auf Mobilgeräten nicht optimiert. Bitte verwende einen PC oder ein Tablet.</p></div>
    <button class="btn btn-primary" @click="login()">Login mit Google</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";

export default {
  name: "LoginSSO",

  data() {
    return {
      isMobile: false,
    };
  },

  methods: {
    async login() {
      login();
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

<style scoped>
  .mobileDeviceError {
    color: red;
    font-size: 1.5em;
    text-align: center;
  }
</style>