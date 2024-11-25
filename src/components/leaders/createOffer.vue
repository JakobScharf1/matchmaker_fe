<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <div class="container">
    <div class="form-group">
      <div class="input-group">
        <label for="project-days">Projekttage</label>
        <input type="number" id="project-days" v-model="projectDays">

        <label for="project-hours">Projektstunden</label>
        <input type="number" id="project-hours" v-model="projectHours">

        <label for="person-selection">Person</label>
        <select id="person-selection" v-model="selectedPerson">
          <option value="Carolin Lins">Carolin Lins</option>
          <option value="Hassan Berrada">Hassan Berrada</option>
          <option value="Anett Peikert">Anett Peikert</option>
        </select>

        <label for="company-selection">Firmierung</label>
        <select id="company-selection" v-model="company">
          <option value="wm">WeMatch Consulting GmbH</option>
          <option value="we">WeMatch Engineering GmbH</option>
          <option value="proj">WeMatch Projects GmbH</option>
        </select>
      </div>

    </div>
    <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span>
    <span class="error" v-if="inputInvalid">Projekttage oder Projektstunden haben einen ungültigen Wert</span>

    <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">Bestätigen</button>

    <div id="buttonContainer">
      <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
      <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
    </div>
  </div>
</template>

<script>
import {
  stundensatzAgent,
  tagessatzAgent,
  calculateDailyPrice,
  docxOffer,
  kuendigungsfristTranslator,
  sendHelpMail
} from "@/services/MethodService";
import { logout } from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: 'createOffer',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Angebotserstellung', path: this.$router.resolve({ name: 'Angebotserstellung'}).href },
      ],
      confirmed: false,
      projectHours: 0,
      selectedContract: null,
      selectedPerson: '',
      projectDays: 0,
      company: '',
      inputMissing: false,
      inputInvalid: false
    }
  },
  methods: {
    logout,
    chooseTemplate() {
      if (this.projectHours < 0 || this.projectDays < 0) {
        this.inputInvalid = true;
      } else if (this.projectHours && this.projectDays && this.selectedPerson && this.company) {
        this.inputInvalid = false;
        this.inputMissing = false;

        localStorage.setItem("projectHours", this.projectHours + " Stunden");
        localStorage.setItem("selectedPerson", this.selectedPerson);
        localStorage.setItem("projectDays", this.projectDays + " Tage");

        kuendigungsfristTranslator();
        if (localStorage.getItem("verguetungssatz") === "Tagessatz") {
          localStorage.setItem("stundensatzRemote", "-");
          localStorage.setItem("stundensatzOnSite", "-");
          tagessatzAgent();
        } else {
          calculateDailyPrice();
          stundensatzAgent();
        }

        switch (this.company) {
          case "wm":
            localStorage.setItem("docId", "docx-a");
            break;
          case "we":
            localStorage.setItem("docId", "docx-a-e");
            break;
          case "proj":
            localStorage.setItem("docId", "docx-a-p");
            break;
        }
        docxOffer();

      } else {
        this.inputMissing = true;
      }
    },
  },
  mounted() {
    document.getElementById("helpButton").addEventListener("click", function () {
      sendHelpMail();
    });

    if(localStorage.getItem('permission') === '3'){
      //Wenn der User ein Leader ist, wird das Breadcrumb Typ-Auswahl ergänzt
      const path1 = { name: 'Typ', path: this.$router.resolve({ name: 'Typ' }).href }
      this.breadcrumbs = [...this.breadcrumbs.slice(0,1),path1,...this.breadcrumbs.slice(1)]
    } else if(localStorage.getItem('permission') === '2'){
      const path2 = { name: 'Format', path: this.$router.resolve({ name: 'Format'}).href }
      this.breadcrumbs = [...this.breadcrumbs.slice(0,1),path2,...this.breadcrumbs.slice(1)]
    }
  },
}
</script>

<style scoped>
#helpButton {
  margin-right: 10px;
}

#buttonContainer {
  position: fixed;
  top: 10px;
  right: 10px;
}

.bestatigen-button {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.error {
  color: red;
}
</style>
