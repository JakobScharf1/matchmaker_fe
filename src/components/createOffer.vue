<template>
  <div class="container">
    <button @click="pageBack()" class="btn btn-outline-primary center-button">Zurück</button>
    <h2>Erstelle ein Angebot:</h2><br/>

    <div class="form-group" style="margin-bottom:0">
      <div class="input-group">
        <label for="project-days">Projekttage:</label>
        <input type="number" id="project-days" v-model="projectDays" placeholder="Anzahl der Projekttage">
      </div><br/>

      <div class="input-group">
        <label for="project-hours">Projektstunden:</label>
        <input type="number" id="project-hours" v-model="projectHours" placeholder="Anzahl der Projektstunden">
      </div><br/>

      <div class="input-group">
        <label for="person-selection">Person auswählen:</label>
        <select id="person-selection" v-model="selectedPerson">
          <option value="Carolin Lins">Carolin Lins</option>
          <option value="Hassan Berrada">Hassan Berrada</option>
          <option value="Anett Peikert">Anett Peikert</option>
        </select>
      </div><br/>

      <h5 style="text-align:center">Wähle die Firmierung für das Angebot aus:</h5><br/>

      <div class="radio-group">
        <div class="radio-item">
          <input type="radio" id="docx-a" value="docx-a" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a')">
          <label for="docx-a">WeMatch </label>
        </div>
        <div class="radio-item">
          <input type="radio" id="docx-a-e" value="docx-a-e" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a-e')">
          <label for="docx-a-e">Engineering </label>
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
import router from "@/router";
import {
  stundensatzAgent,
  tagessatzAgent,
  docxOffer,
  kuendigungsfristTranslator,
  sendHelpMail
} from "@/services/MethodService";
import { logout } from "@/firebase-config";

export default {
  name: 'createOffer',
  data() {
    return {
      confirmed: false,
      projectHours: 0,
      selectedContract: null,
      selectedPerson: '',
      projectDays: 0,
    }
  },
  methods: {
    logout,
    pageBack() {
      router.go(-1);
    },
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
        localStorage.setItem("tagessatzRemote", "-");
        localStorage.setItem("tagessatzOnSite", "-");
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

.center-button {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.radio-item label {
  cursor: pointer;
  margin-left: 0.5rem;
}

.radio-item input[type="radio"] {
  cursor: pointer;
}

h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

h5 {
  text-align: left;
  margin-left: 15px;
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
