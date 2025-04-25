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
    </div>
  </div>
  <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span
  ><br v-if="inputMissing" />

  <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">
    Bestätigen
  </button>
</template>

<script>
import {
  kuendigungsfristTranslator,
  verguetungssatzSwitchKunde,
  docxContract,
} from "@/services/MethodService";
import { logout } from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: "chooseTemplateDocx",
  components: { BreadCrumbs },
  data() {
    return {
      breadcrumbs: [
        {
          name: "ID-Input",
          path: this.$router.resolve({ name: "ID-Input" }).href,
        },
        { name: "Format", path: this.$router.resolve({ name: "Format" }).href },
        {
          name: "DOCX-Verträge",
          path: this.$router.resolve({ name: "DOCX-Verträge" }).href,
        },
      ],
      lang: "",
      company: "",
      contracttype: "",
      inputMissing: false,
    };
  },
  methods: {
    logout,
    chooseTemplate() {
      if (!(this.lang && this.company && this.contracttype)) {
        this.inputMissing = true;
        return;
      }

      this.inputMissing = false;

      verguetungssatzSwitchKunde();
      kuendigungsfristTranslator();

      const key = `${this.lang}-${this.company}-${this.contracttype}`;
      const keyToDocId = {
        "de-wm-rv": "docx-rv-k",
        "de-wm-ev": "docx-ev-k",
        "de-we-rv": "docx-rv-k-e",
        "de-we-ev": "docx-ev-k-e",
        "en-wm-rv": "docx-rv-k-eng",
        "en-wm-ev": "docx-ev-k-eng",
        "en-we-rv": "docx-rv-k-e-eng",
        "en-we-ev": "docx-ev-k-e-eng",
      };

      if (key in keyToDocId) {
        localStorage.setItem("docId", keyToDocId.get(key) || "");
      }

      docxContract();
    },
  },
};
</script>
