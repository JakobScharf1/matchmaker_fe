<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>Bitte wähle aus, in welchem Format du den Vertrag erstellen möchtest:</h2>
  <button class="btn btn-primary chooseButtons" @click="toDocx()">Docx-Verträge</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toDocusign()">DocuSign-Verträge</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toTermination()">Kündigungen</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toOffer()">Angebot</button><br/>


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
  name: 'chooseTemplateFormats',
  methods: {
    logout,
    toDocx() {
      router.push('chooseTemplateLegalDocx');
    },
    toDocusign() {
      router.push('chooseTemplateLegalDocuSign');
    },
    toTermination(){
     router.push('chooseTermination');
    },
    toOffer(){
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
  width: 250px;
}
</style>
