<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <div class="container">
      <div class="form-group">
        <div class="input-group">
          <label for="lang-select">Sprache</label>
          <select id="lang-select" v-model="lang">
            <option value="de">Deutsch</option>
            <option value="en">Englisch</option>
          </select>
        </div>

        <div class="input-group">
          <label for="company-select">Firmierung</label>
          <select id="company-select" v-model="company">
            <option value="wm">WeMatch Consulting GmbH</option>
            <option value="we">WeMatch Engineering GmbH</option>
            <option value="proj">WeMatch Projects GmbH</option>
          </select>
        </div>

        <div class="input-group">
          <label for="contract-select">Vertragsart</label>
          <select id="contract-select" v-model="contracttype">
            <option value="rv">Rahmenvereinbarung</option>
            <option value="ev">Projekteinzelauftrag</option>
          </select>
        </div>

        <div class="input-group">
          <label for="signing-select">Anzahl Unterschriftsblöcke</label>
          <select id="signing-select" v-model="zweiterEmpfaenger">
            <option :value="false">1</option>
            <option :value="true">2</option>
          </select>
        </div>

        <h3>Vertrag Absender</h3>
        <div class="input-group">
          <label for="absender_mail">E-Mail:</label>
          <input v-model="absenderMail" type="email" id="absender_mail">
          <label for="absender_name">Name:</label>
          <input v-model="absenderName" type="text" id="absender_mail">
        </div>

        <h3>Vertrag Empfänger</h3>
        <div class="input-group">
          <label for="empfaenger_mail">E-Mail:</label>
          <input v-model="empfaengerMail" type="email" id="empfaenger_mail">
          <label for="empfaenger_name">Name:</label>
          <input v-model="empfaengerName" type="text" id="empfaenger_mail">
        </div>

        <div v-if="zweiterEmpfaenger">
          <div class="input-group">
            <h3>Vertrag Zweiter Empfänger</h3>
            <label for="empfaenger_mail2">E-Mail:</label>
            <input v-model="empfaengerMail2" type="email" id="empfaenger_mail2">
            <label for="empfaenger_name2">Name:</label>
            <input v-model="empfaengerName2" type="text" id="empfaenger_mail2">
          </div>
        </div>

        <h3>Consultant in CC</h3>
        <div class="input-group">
          <label for="cc_mail">E-Mail:</label>
          <input v-model="ccMail" type="email" id="cc_mail">
          <label for="cc_name">Name:</label>
          <input v-model="ccName" type="text" id="cc_name">
        </div>
      </div>
  </div>
  <p class="error" v-if="aufgabenbeschreibungError">Die Aufgabenbeschreibung überschreitet die Grenze von 4000 Zeichen.<br />Bitte kürze sie in Bullhorn und gib die Match-ID erneut ein!</p>

  <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span><br/>
  <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">Bestätigen</button>
  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
  </div>
</template>

<script>
import {
  kuendigungsfristTranslator,
  verguetungssatzSwitchKunde,
  sendHelpMail,
  crvk,
  cevk2,
  cevk,
  cevkEng,
  cevkEng2,
} from "@/services/MethodService";
import { logout } from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: "chooseTemplateLegalDocuSign",
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Format', path: this.$router.resolve({ name: 'Format'}).href },
        { name: 'DocuSign-Verträge', path: this.$router.resolve({ name: 'DocuSign-Verträge Legal'}).href },
      ],
      verguetungssatzList: [],
      empfaengerName: localStorage.getItem('projektpartnerName'),
      empfaengerMail: localStorage.getItem('projektpartnerMail'),
      empfaengerName2: "",
      empfaengerMail2: "",
      absenderName: localStorage.getItem('wematchAnsprechpartnerName'),
      absenderMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      ccName: "",
      ccMail: "",
      zweiterEmpfaenger: false,
      aufgabenbeschreibungError: false,
      lang: "",
      company: "",
      contracttype: "",
      inputMissing: false
    };
  },
  methods: {
    logout,
    chooseTemplate() {
      if(this.lang && this.company && this.contracttype && this.empfaengerName && this.empfaengerMail && this.absenderName && this.absenderMail) {
        this.inputMissing = false;

        this.checkAufgabenbeschreibung();
        if (this.aufgabenbeschreibungError) {
          return;
        }

        verguetungssatzSwitchKunde();
        kuendigungsfristTranslator();

        const key = `${this.lang}-${this.company}-${this.contracttype}-${this.zweiterEmpfaenger.toString()}`;
        switch (key) {
          case "de-wm-rv-false":
            console.log("Erfolg")
            //crvk("c-rv-k");
            break;
          case "de-we-rv-false":
            crvk("c-rv-k-e");
            break;
          case "de-proj-rv-false":
            crvk("c-rv-k-p");
            break;
          case "en-wm-rv-false":
            crvk("c-rv-k-eng");
            break;
          case "en-we-rv-false":
            crvk("c-rv-k-e-eng");
            break;
          case "en-proj-rv-false":
            crvk("c-rv-k-p-eng");
            break;
          case "de-wm-ev-false":
            cevk("c-ev-k");
            break;
          case "de-we-ev-false":
            cevk("c-ev-k-e");
            break;
          case "de-proj-ev-false":
            cevk("c-ev-k-p");
            break;
          case "en-wm-ev-false":
            cevkEng("c-ev-k-eng");
            break;
          case "en-we-ev-false":
            cevkEng("c-ev-k-e-eng");
            break;
          case "en-proj-ev-false":
            cevkEng("c-ev-k-p-eng");
            break;
          case "de-wm-ev-true":
            cevk2("c-ev-k-2");
            break;
          case "de-wm-rv-true":
            cevk2("c-rv-k-2"); //TODO: Wieso wird rv über cevk2-Methode erstellt?
            break;
          case "de-we-rv-true":
            cevk2("c-rv-k-e-2"); //TODO: Wieso wird rv über cevk2-Methode erstellt?
            break;
          case "de-we-ev-true":
            cevk2("c-ev-k-e-2");
            break;
          case "en-wm-rv-true":
            cevkEng2("c-rv-k-2-eng"); //TODO: Wieso wird rv über cevkEng2-Methode erstellt?
            break;
          case "en-we-rv-true":
            cevkEng2("c-rv-2-e-eng"); //TODO: Wieso wird rv über cevkEng2-Methode erstellt?
            break;
          case "en-we-ev-true":
            cevkEng2("c-ev-k-e-2-eng");
            break;
        }

      } else {
        this.inputMissing = true;
      }
    },
    checkAufgabenbeschreibung() {
      const newValue = localStorage.getItem('aufgabenbeschreibung');
      if (newValue && encodeURIComponent(newValue).length > 4000) {
        this.aufgabenbeschreibungError = true;
        this.confirmed = false;
      } else {
        this.aufgabenbeschreibungError = false;
      }
    },
  },
  mounted() {
    localStorage.setItem("empfaengerName", this.empfaengerName);
    localStorage.setItem("empfaengerMail", this.empfaengerMail);
    localStorage.setItem("absenderName", this.absenderName);
    localStorage.setItem("absenderMail", this.absenderMail);

    document.getElementById("helpButton").addEventListener("click", function() {
      sendHelpMail();
    });

    // Watch for changes in the aufgabenbeschreibung in localStorage
    this.checkAufgabenbeschreibung();
    window.addEventListener('storage', this.checkAufgabenbeschreibung);
  },

  beforeUnmount() {
    window.removeEventListener('storage', this.checkAufgabenbeschreibung);
  },

  watch: {
    empfaengerName(newValue) {
      localStorage.setItem("empfaengerName", newValue);
    },
    empfaengerMail(newValue) {
      localStorage.setItem("empfaengerMail", newValue);
    },
    empfaengerName2(newValue) {
      localStorage.setItem("empfaengerName2", newValue);
    },
    empfaengerMail2(newValue) {
      localStorage.setItem("empfaengerMail2", newValue);
    },
    absenderName(newValue) {
      localStorage.setItem("absenderName", newValue);
    },
    absenderMail(newValue) {
      localStorage.setItem("absenderMail", newValue);
    },
    ccName(newValue) {
      localStorage.setItem("ccName", newValue);
    },
    ccMail(newValue) {
      localStorage.setItem("ccMail", newValue);
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 15px;
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

h3 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

label {

}

</style>
