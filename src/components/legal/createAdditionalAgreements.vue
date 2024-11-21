<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <h2>Wähle die passende Vereinbarung und Firmierung aus, die du erstellen möchtest:</h2>
  <h3>WeMatch</h3>
  <input type="radio" id="docx-z-pp" value="docx-z-pp" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-z-pp')">
  <label for="docx-z-pp">Zustatzvereinbarung - Leistungsbeschreibung</label><br/>
  <input type="radio" id="docx-z-pp-a" value="docx-z-pp-a" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-z-pp-a')">
  <label for="docx-z-pp-a">Zustatzvereinbarung - Auslastung</label><br/>
  <input type="radio" id="docx-z-pp-s" value="docx-z-pp-s" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-z-pp-s')">
  <label for="docx-z-pp-s">Zustatzvereinbarung - Divers</label><br/>
  <h3>Engineering</h3>
  <input type="radio" id="docx-z-e-pp" value="docx-z-e-pp" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-z-e-pp')"  >
  <label for="docx-z-e-pp">Zustatzvereinbarung - Leistungsbeschreibung</label><br/>
  <input type="radio" id="docx-z-e-pp-a" value="docx-z-e-pp-a" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-z-e-pp-a')">
  <label for="docx-z-e-pp-a">Zustatzvereinbarung - Auslastung</label><br/>
  <input type="radio" id="docx-z-e-pp-s" value="docx-z-e-pp-s" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-z-e-pp-s')">
  <label for="docx-z-e-pp-s">Zustatzvereinbarung - Divers</label><br/>
  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>
  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout"><b>Logout</b></button>
  </div>
</template>
<script>
import {
  docxTermination,
  sendHelpMail
} from "@/services/MethodService";
import {logout} from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";
export default {
  name: 'createAdditionalAgreements',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Format', path: this.$router.resolve({ name: 'Format' }).href },
        { name: 'Zusatzvereinbarungen', path: this.$router.resolve({ name: 'Zusatzvereinbarungen' }).href }
      ],
      confirmed: false,
      selectedContract: null
    }
  },
  methods: {
    logout,
    chooseTemplate() {
      if (this.selectedContract) {
        localStorage.setItem("docId", this.selectedContract);
        docxTermination();
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