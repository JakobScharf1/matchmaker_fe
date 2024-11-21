<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
<h2>Bitte wähle aus, was für eine Vertragsart du erstellen willst:</h2>
  <button class="btn btn-primary chooseButtons" @click="toLegal()">Kundenvertrag</button><br />
  <button class="btn btn-primary chooseButtons" @click="toNormal()">Projektpartnervertrag</button>

  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
  </div>
</template>

<script>
import router from "@/router";
import { logout } from "@/firebase-config";
import {sendHelpMail} from "@/services/MethodService";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: 'chooseTemplateType',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Typ', path: this.$router.resolve({ name: 'Typ' }).href }
      ]
    }
  },
  methods: {
    logout,
    toLegal() {
      localStorage.setItem("vertragsart","Kundenvertrag")
      router.push('chooseTemplateFormats');
    },
    toNormal() {
      localStorage.setItem("vertragsart","Projektpartnervertrag")
      router.push('chooseTemplateDocuSign');
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
