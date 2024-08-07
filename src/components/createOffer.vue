<template>
  <div class="container">
    <button @click="pageBack()" class="btn btn-outline-primary center-button">Zurück</button>
    <h2>2. Erstelle ein Angebot:</h2><br/>

    <h2> Die Angaben der Projektstunden und Aufteilung der Projektstunden in Remote-/On-Site-Stunden sind ausschlaggebend für die Errechnung des Gesamtpreises.</h2><br/>


    <div class="form-group">
        <h5>3. Gebe die Anzahl der ProjektTage an:</h5>
        <div class="input-group">
          <label for="project-days">Projektstunden:</label>
          <input type="number" id="project-days" v-model="projectDays" placeholder="Anzahl der Projekttage">
        </div><br/>

      <h5>4. Gebe die Anzahl der Projektstunden an:</h5>
      <div class="input-group">
        <label for="project-hours">Projektstunden:</label>
        <input type="number" id="project-hours" v-model="projectHours" placeholder="Anzahl der Projektstunden">
      </div><br/>

      <h5>5. Davon sind es Remote-Stunden:</h5>
      <div class="input-group">
        <label for="remote-hours">Anzahl Remote-Stunden:</label>
        <input type="number" id="remote-hours" v-model="remoteHours" placeholder="Anzahl der Remote-Stunden">
      </div><br/>

      <h5>6. Davon sind es On-Site-Stunden:</h5>
      <div class="input-group">
        <label for="onSite-hours">Anzahl der OnSide-Stunden:</label>
        <input type="number" id="onSite-Hours" v-model="onSiteHours" placeholder="Anzahl der On-Site-Stunden">
      </div><br/>

      <h5>7. Wähle aus, wer das Angebot erstellt:</h5>
      <div class="input-group">
        <label for="person-selection">Person auswählen:</label>
        <select id="person-selection" v-model="selectedPerson">
          <option value="Carolin Lins">Carolin Lins</option>
          <option value="Hassan Berrada">Hassan Berrada</option>
          <option value="Anett Peikert">Anett Peikert</option>
        </select>
      </div><br/>

      <h5>8. Wähle den Rechnungssatz aus:</h5>
      <div class="input-group">
        <label for="person-selection">Rechnungssatz auswählen:</label>
        <select id="person-selection" v-model="selectedCalculateType">
          <option value="Carolin Lins">Stundensatz</option>
          <option value="Hassan Berrada">Tagessatz</option>
        </select>
      </div><br/>

      <h5>9. Wähle das Angebot aus:</h5><br/>

      <div class="radio-group">
        <input type="radio" id="docx-a" value="docx-a" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-a')">
        <label for="docx-a"> Angebot </label>
      </div>
    </div>

    <button class="btn center-button" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>

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
  calculateOfferPricewithDailyRate,
  calculateOfferPricewithHourlyRate,
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
      remoteHours: 0,
      onSiteHours: 0,
      selectedContract: null,
      selectedPerson: '',
      selectedCalculateType: '',
      projectDays: 0


    }
  },
  methods: {
    logout,
    pageBack() {
      router.go(-1);
    },
    chooseTemplate() {
      stundensatzAgent();
      kuendigungsfristTranslator();


      if (this.projectHours < 0 || this.remoteHours < 0 || this.onSiteHours < 0) {
        alert("Bitte geben Sie gültige Stundenangaben ein.");
        return;
      }

      localStorage.setItem("projectHours", this.projectHours);
      localStorage.setItem("onSiteHours", this.onSiteHours);
      localStorage.setItem("remoteHours", this.remoteHours);
      localStorage.setItem("selectedPerson", this.selectedPerson);
      localStorage.setItem("calculationType", this.selectedCalculateType);
      localStorage.setItem("projetDays", this.projectDays);

      if(localStorage.getItem("calculationType") === "Tagessatz"){
        calculateOfferPricewithDailyRate();
      } else {
        localStorage.setItem("tagessatz","");
        calculateOfferPricewithHourlyRate();
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
    document.getElementById("helpButton").addEventListener("click", function() {
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
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.radio-group input[type="radio"] {
  margin-right: 0.5rem;
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
