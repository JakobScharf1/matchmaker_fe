<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>

  <button class="btn btn-primary chooseButtons" @click="toDocx()">Docx-Verträge</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toDocusign()">DocuSign-Verträge</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toAdditionalAgreement()">Zusatzvereinbarung</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toTermination()">Kündigungen</button><br/>
  <button class="btn btn-primary chooseButtons" @click="toOffer()">Angebote</button><br/>


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
  name: 'chooseTemplateFormats',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Format', path: this.$router.resolve({ name: 'Format' }).href }
      ]
    }
  },
  methods: {
    logout,
    toDocx() {
      router.push('/legal/docx');
    },
    toDocusign() {
      router.push('/legal/docusign');
    },
    toTermination(){
     router.push('/legal/termination');
    },
    toOffer(){
      router.push('/leaders/offer');
    },
    toAdditionalAgreement(){
      router.push('/legal/agreement')
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
.chooseButtons {
  margin-top: 10px;
  width: 250px;
}
</style>
