<template>
  <div>
    <button class="btn btn-primary" @click="login()">Login mit Google</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";
import {useGlobalStore} from "@/stores/global";

export default {
  name: "LoginSSO",
  data() {
    return {
      gStore: useGlobalStore()
    }
  },
  methods: {
    async login() {
      login();
    },
  },
  beforeMount() {
    this.gStore.updateIsLogin(true)
    this.path = "/login"
  },

}
</script>