<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <div class="container">
    <div class="form-group">

      <div class="input-group">
        <label for="type-selection">Zusatz</label>
        <select id="type-selection" v-model="type">
          <option value="descr">Leistungsbeschreibung</option>
          <option value="hours">Auslastung</option>
          <option value="misc">Sonstige</option>
        </select>

        <label for="company-selection">Firmierung</label>
        <select id="company-selection" v-model="company">
          <option value="wm">WeMatch Consulting GmbH</option>
          <option value="we">WeMatch Engineering GmbH</option>
        </select>
      </div>
    </div>
  </div>

  <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span><br v-if="inputMissing"/>
  <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">Bestätigen</button>
</template>
<script>
import {
  docxTermination,
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
      selectedContract: null,
      type: '',
      company: '',
      inputMissing: false
    }
  },
  methods: {
    logout,
    chooseTemplate() {
      if (this.type && this.company) {
        this.inputMissing = false;

        const key = `${this.company}-${this.type}`
        switch (key) {
          case "wm-descr":
            localStorage.setItem("docId", "docx-z-pp");
            break;
          case "wm-hours":
            localStorage.setItem("docId", "docx-z-pp-a");
            break;
          case "wm-misc":
            localStorage.setItem("docId", "docx-z-pp-s");
            break;
          case "we-descr":
            localStorage.setItem("docId", "docx-z-e-pp");
            break;
          case "we-hours":
            localStorage.setItem("docId", "docx-z-e-pp-a");
            break;
          case "we-misc":
            localStorage.setItem("docId", "docx-z-e-pp-s");
            break;
        }
        docxTermination();

      } else {
        this.inputMissing = true;
      }
    },
  },
}
</script>