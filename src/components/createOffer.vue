<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <div class="container">
    <h2>Erstelle ein Angebot:</h2>

    <div class="form-group" style="margin-bottom:0">
      <div class="input-group">
        <label for="project-days">Projekttage:</label>
        <input type="number" id="project-days" v-model="projectDays" placeholder="Anzahl der Projekttage">
      </div>

      <div class="input-group">
        <label for="project-hours">Projektstunden:</label>
        <input type="number" id="project-hours" v-model="projectHours" placeholder="Anzahl der Projektstunden">
      </div>

      <div class="input-group">
        <label for="person-selection">Person auswählen:</label>
        <select id="person-selection" v-model="selectedPerson">
          <option value="Carolin Lins">Carolin Lins</option>
          <option value="Hassan Berrada">Hassan Berrada</option>
          <option value="Anett Peikert">Anett Peikert</option>
        </select>
      </div><br/>

      <h5 style="text-align:center">Wähle die Firmierung für das Angebot aus:</h5>

      <div class="radio-group">
        <div class="radio-item">
          <input type="radio" id="docx-a" value="docx-a" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a')">
          <label for="docx-a">WeMatch </label>
          <input type="radio" id="docx-a-e" value="docx-a-e" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a-e')">
          <label for="docx-a-e">Engineering </label>
          <input type="radio" id="docx-a-p" value="docx-a-p" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a-p')">
          <label for="docx-a-p">Engineering </label>
        </div>
      </div>
    </div>

    <button class="btn center-button" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" style="" @click="chooseTemplate()">Bestätigen</button>

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
        { name: 'Format', path: this.$router.resolve({ name: 'Format'}).href },
        { name: 'Angebotserstellung', path: this.$router.resolve({ name: 'Angebotserstellung'}).href },
      ],
      confirmed: false,
      projectHours: 0,
      selectedContract: null,
      selectedPerson: '',
      projectDays: 0,
    }
  },
  methods: {
    logout,
    chooseTemplate() {

      if (this.projectHours < 0 || this.projectDays < 0) {
        alert("Bitte geben Sie gültige Stundenangaben ein.");
        return;
      }

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

      if (this.selectedContract) {
        localStorage.setItem("docId", this.selectedContract);
        docxOffer();
      }
    },
    toggleSelection(contractId) {
      if (this.selectedContract === contractId) {
        this.selectedContract = contractId;
      }
      this.confirmed = true;
    }
  },
  mounted() {
    document.getElementById("helpButton").addEventListener("click", function () {
      sendHelpMail();
    });
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.radio-item label {
  cursor: pointer;
  margin: 0 0.5rem 0 0.5rem;
}

.radio-item input[type="radio"] {
  cursor: pointer;
}


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
</style>
