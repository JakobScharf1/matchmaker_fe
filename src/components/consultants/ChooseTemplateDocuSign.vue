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

        <label for="company-select">Firmierung</label>
        <select id="company-select" v-model="company">
          <option value="wm">WeMatch Consulting GmbH</option>
          <option value="we">WeMatch Engineering GmbH</option>
        </select>

        <label for="contract-select">Vertragsart</label>
        <select id="contract-select" v-model="contracttype">
          <option value="rv">Rahmenvereinbarung</option>
          <option value="ev">Projekteinzelauftrag</option>
        </select>
      </div>

      <h3>Vertrag Absender</h3>
      <div class="input-group">
        <label for="absender_mail">E-Mail</label>
        <input v-model="absenderMail" type="email" id="absender_mail">
        <label for="absender_name">Name</label>
        <input v-model="absenderName" type="text" id="absender_mail">
      </div>

      <h3>Vertrag Empfänger</h3>
      <div class="input-group">
        <label for="empfaenger_mail">E-Mail</label>
        <input v-model="empfaengerMail" type="email" id="empfaenger_mail">
        <label for="empfaenger_name">Name</label>
        <input v-model="empfaengerName" type="text" id="empfaenger_mail">
      </div>

      <h3>Consultant in CC</h3>
      <div class="input-group">
        <label for="cc_mail">E-Mail</label>
        <input v-model="ccMail" type="email" id="cc_mail">
        <label for="cc_name">Name</label>
        <input v-model="ccName" type="text" id="cc_name">
      </div>
    </div>
  </div>
  <p class="error" v-if="aufgabenbeschreibungError">Die Aufgabenbeschreibung überschreitet die Grenze von 4000 Zeichen.<br />Bitte kürze sie in Bullhorn und gib die Match-ID erneut ein!</p>
  <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span><br v-if="inputMissing"/>

  <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">Bestätigen</button>
</template>

<script>
import {
  cevpp,
  cevppEng,
  engevpp,
  engevppEng,
  kuendigungsfristTranslator,
  verguetungssatzSwitchPP,
  crv,
  umbrellaMail
} from "@/services/MethodService";
import {logout} from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: "chooseTemplateDocuSign",
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'DocuSign-Verträge', path: this.$router.resolve({ name: 'DocuSign-Verträge' }).href }
      ],
      verguetungssatzList: [],
      empfaengerMail: umbrellaMail(),
      empfaengerName: localStorage.getItem('projektpartnerName'),
      absenderName: localStorage.getItem('wematchAnsprechpartnerName'),
      absenderMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      ccName: "",
      ccMail: "",
      aufgabenbeschreibungError: false,
      lang: "",
      company: "",
      contracttype: "",
      inputMissing: false
    }
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

        verguetungssatzSwitchPP();
        kuendigungsfristTranslator();

        const key = `${this.lang}-${this.company}-${this.contracttype}`;
        switch (key) {
          case "de-wm-rv":
            crv("c-rv-pp");
            break;
          case "de-we-rv":
            crv("eng-rv-pp");
            break;
          case "de-wm-ev":
            cevpp();
            break;
          case "de-we-ev":
            engevpp();
            break;
          case "en-wm-rv":
            crv("c-rv-pp-eng")
            break;
          case "en-we-rv":
            crv("eng-rv-pp-eng")
            break;
          case "en-wm-ev":
            cevppEng();
            break;
          case "en-we-ev":
            engevppEng();
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
    }
  },
    logout,

  mounted() {
    localStorage.setItem("empfaengerName", this.empfaengerName);
    localStorage.setItem("empfaengerMail", this.empfaengerMail);
    localStorage.setItem("absenderName", this.absenderName);
    localStorage.setItem("absenderMail", this.absenderMail);

    this.checkAufgabenbeschreibung();
    window.addEventListener('storage', this.checkAufgabenbeschreibung);

    if(localStorage.getItem('permission') === '3'){
      //Wenn der User ein Leader ist, wird das Breadcrumb Typ-Auswahl ergänzt
      const path = { name: 'Typ', path: this.$router.resolve({ name: 'Typ' }).href }
      this.breadcrumbs = [...this.breadcrumbs.slice(0,1),path,...this.breadcrumbs.slice(1)]
    }
  },

  watch: {
    empfaengerName(newValue) {
      localStorage.setItem("empfaengerName", newValue);
    },
    empfaengerMail(newValue) {
      localStorage.setItem("empfaengerMail", newValue);
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
    }
  }
}
</script>