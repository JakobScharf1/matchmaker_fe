<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>Bitte wähle aus, was Du erstellen möchtest:</h2>
  <button class="btn btn-primary chooseButtons" @click="toPP()">Projektpartnervertrag</button><br />
  <button class="btn btn-primary chooseButtons" @click="toOffer()">Angebot</button>

  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
  </div>
</template>

<script>
import router from "@/router";
import { logout } from "@/firebase-config";
import {sendHelpMail} from "@/services/MethodService";

export default {
  name: 'chooseTypeOffer',
  methods: {
    logout,
    toPP() {
      router.push('chooseTemplateDocuSign');
    },
    toOffer() {
      router.push('createOffer');
    },
    pageBack(){
      router.go(-1);
    },
  },
  mounted() {
    document.getElementById("helpButton").addEventListener("click", function() {
      sendHelpMail();
    })
  },
}

</script>

<style>
#helpButton {
  margin-right: 10px;
}

#buttonContainer {
  position: fixed;
  top: 10px;
  right: 10px;
}

.chooseButtons {
  margin-top: 10px;
}
</style>
