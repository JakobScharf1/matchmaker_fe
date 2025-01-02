<template>
  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout"><b>Logout</b></button>
  </div>
</template>

<script>
import {logout} from "@/firebase-config";

export default {
  name: 'LogoutHelpButtons',
  methods: {
    logout,
  }
}
</script>