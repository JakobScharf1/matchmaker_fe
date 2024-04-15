<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>Wähle den Vertrag aus, den du erstellen willst:</h2>
  <h2>Deutsch</h2>
  <h3>WeMatch</h3>
  <input type="radio" id="docx-rv-k" value="docx-rv-k" name="wematch-deu" v-model="selectedContract" @click="toggleSelection('docx-rv-k')">
  <label for="docx-rv-k">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k" value="docx-ev-k" name="wematch-deu" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-ev-k">Projekteinzelauftrag Kunde</label><br/>

  <h3>Engineering</h3>
  <input type="radio" id="docx-rv-k-e" value="docx-rv-k-e" name="engineering-deu" v-model="selectedContract" @click="toggleSelection('docx-rv-k-e')"  >
  <label for="docx-rv-k-e">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k-e" value="docx-ev-k-e" name="engineering-deu" v-model="selectedContract" @click="toggleSelection('docx-ev-k-e')">
  <label for="docx-ev-k-e">Projekteinzelauftrag Kunde</label><br/>

  <h3>Projects</h3>
  <input type="radio" id="docx-rv-k-p" value="docx-rv-k-p" name="projects-deu" v-model="selectedContract" @click="toggleSelection('docx-rv-k-p')">
  <label for="docx-rv-k-p">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k-p" value="docx-ev-k-p" name="projects-deu" v-model="selectedContract" @click="toggleSelection('docx-ev-k-p')">
  <label for="docx-ev-k-p">Projekteinzelauftrag Kunde</label><br/>

  <h2>Englisch</h2>
  <h3>WeMatch</h3>
  <input type="radio" id="docx-rv-k-eng" value="docx-rv-k-eng" name="wematch-eng" v-model="selectedContract" @click="toggleSelection('docx-rv-k-eng')">
  <label for="docx-rv-k-eng">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k-eng" value="docx-ev-k-eng" name="wematch-eng" v-model="selectedContract" @click="toggleSelection('docx-ev-p-eng')">
  <label for="docx-ev-k-eng">Projekteinzelauftrag Kunde</label><br/>

  <h3>Engineering</h3>
  <input type="radio" id="docx-rv-k-e-eng" value="docx-rv-k-e-eng" name="engineering-eng" v-model="selectedContract" @click="toggleSelection('docx-rv-k-e-eng')">
  <label for="docx-rv-k-e-eng">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k-e-eng" value="docx-ev-k-e-eng" name="engineering-eng" v-model="selectedContract" @click="toggleSelection('docx-ev-k-e-eng')">
  <label for="docx-ev-k-e-eng">Projekteinzelauftrag Kunde</label><br/>

  <h3>Projects</h3>
  <input type="radio" id="docx-rv-k-p-eng" value="docx-rv-k-p-eng" name="projects-rv-eng" v-model="selectedContract" @click="toggleSelection('docx-rv-k-p-eng')">
  <label for="docx-rv-k-p-eng">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-k-p-eng" value="docx-ev-k-p-eng" name="projects-eng" v-model="selectedContract" @click="toggleSelection('docx-ev-k-p-eng')">
  <label for="docx-ev-k-p-eng">Projekteinzelauftrag Kunde</label><br/>

  <!-- Repeat the same structure for other sections -->

  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>

  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout"><b>Logout</b></button>
  </div>
</template>

<script>
import router from "@/router";
import {
  kuendigungsfristTranslator,
  verguetungssatzSwitchKunde,
  docxEvk,
  sendHelpMail
} from "@/services/MethodService";
import {logout} from "@/firebase-config";

export default {
  name: 'chooseTemplateDocx',
  data() {
    return {
      confirmed: false,
      selectedContract: null
    }
  },
  methods: {
    logout,
    pageBack() {
      router.go(-1);
    },
    chooseTemplate() {
      verguetungssatzSwitchKunde();
      kuendigungsfristTranslator();

      if (this.selectedContract) {
        localStorage.setItem("docId", this.selectedContract);
        docxEvk();
      } else {
        alert("Bitte wähle einen Vertrag aus.");
      }
    },
    toggleSelection(contractId) {
      if (this.selectedContract === contractId) {
        this.selectedContract = contractId;
        this.confirmed = true;
      }

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
h3 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

[type="radio"] {
  cursor: pointer;
  margin-right: 10px;
}
</style>
