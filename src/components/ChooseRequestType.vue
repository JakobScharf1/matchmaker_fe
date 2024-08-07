<template>
  <h2>Bitte wähle aus, auf welcher Datengrundlage du einen Vertrag erstellen willst:</h2>
  <span>Je nach Auswahl musst du später die entsprechende bullhorn ID angeben. Wenn noch kein Match in bullhorn eingetragen wurde, wähle bitte die zweite oder dritte Option.</span>
  <br />
  <button class="btn btn-primary chooseButtons" @click="toStandard()">Match (Standard)</button>
  <br />
  <button class="btn btn-primary chooseButtons" @click="toKunde()">Kunde</button>
  <br />
  <button class="btn btn-primary chooseButtons" @click="toPP()">Projektpartner</button>

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
  name: 'chooseRequestType',
  methods: {
    logout,
    toStandard() {
      localStorage.setItem("requestType","Standard")
      router.push('matchIDInput');
    },
    toKunde() {
      localStorage.setItem("requestType","Kunde")
      router.push('kundeIDInput');
    },
    toPP(){
      localStorage.setItem("requestType","Projektpartner")
      router.push('ppIDInput');
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
