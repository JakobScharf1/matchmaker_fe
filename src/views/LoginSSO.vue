<template>
  <div>
    <button class="btn btn-primary" @click="login()">Login mit Google</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";

export default {
  name: "LoginSSO",
  methods: {
    async login() {
      login();
    },
  },

}
</script>