<template>
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

  beforeUnmount() {
    window.removeEventListener("resize", this.checkIfMobile);
  },

  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  }

}
</script>

<style scoped>
  .btn-primary {
    background-color: #007772;
    border-color: #007772;
  }

  .btn-primary:hover {
    background-color: transparent;
  }

  .mobileDeviceError {
    color: red;
    font-size: 1.5em;
    text-align: center;
  }
</style>