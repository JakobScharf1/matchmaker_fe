 <template>
   <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
   <div class="container">
     <div class="form-group">

       <div class="input-group">
         <label for="type-selection">Dokumentenart</label>
         <select id="type-selection" v-model="docType">
           <option value="termination">Kündigung</option>
           <option value="confirmation">Kündigungsbestätigung</option>
         </select>

         <label for="type-selection">Vertragspartner</label>
         <select id="type-selection" v-model="target">
           <option value="client">Kunde</option>
           <option value="pp">Projektpartner</option>
         </select>

         <label for="company-selection">Firmierung</label>
         <select id="company-selection" v-model="company">
           <option value="wm">WeMatch Consulting GmbH</option>
           <option value="we">WeMatch Engineering GmbH</option>
         </select>
       </div>

       <div class="input-group" v-if="docType === 'termination'">
         <label for="type-selection">Fristenart</label>
         <select id="type-selection" v-model="frist">
           <option value="gerecht">Fristgerecht</option>
           <option value="los">Fristlos</option>
         </select>
       </div>

     </div>
   </div>

   <span class="error" v-if="inputMissing">Bitte fülle alle Felder aus.</span><br v-if="inputMissing"/>
   <button class="btn btn-primary bestatigen-button" @click="chooseTemplate()">Bestätigen</button>
</template>

<script>
import {
  kuendigungsfristTranslator,
  verguetungssatzSwitchKunde,
  docxTermination,
} from "@/services/MethodService";
import {logout} from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";

export default {
  name: 'chooseTemplateTermination',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Format', path: this.$router.resolve({ name: 'Format' }).href },
        { name: 'Kündigungen', path: this.$router.resolve({ name: 'Kündigungen' }).href }
      ],
      docType: '',
      frist: '',
      target: '',
      company: '',
      inputMissing: false
    }
  },
  methods: {
    logout,
    chooseTemplate() {
      if (this.docType && this.target && this.company) {
        if (this.docType === "termination" && !this.frist){
          this.inputMissing = true;
        } else {
          this.inputMissing = false;
          verguetungssatzSwitchKunde();
          kuendigungsfristTranslator();

          if (this.docType === "confirmation") {
            this.frist = "";
          }

          const key = `${this.company}-${this.docType}-${this.frist}-${this.target}`;

          switch (key) {
            case "wm-termination-gerecht-client":
              localStorage.setItem("docId", "docx-k-k-fg");
              break;
            case "wm-termination-los-client":
              localStorage.setItem("docId", "docx-k-k-fl");
              break;
            case "wm-confirmation--client":
              localStorage.setItem("docId", "docx-k-k-b");
              break;
            case "wm-termination-gerecht-pp":
              localStorage.setItem("docId", "docx-k-pp-fg");
              break;
            case "wm-termination-los-pp":
              localStorage.setItem("docId", "docx-k-pp-fl");
              break;
            case "wm-confirmation--pp":
              localStorage.setItem("docId", "docx-k-pp-b");
              break;
            case "we-termination-gerecht-client":
              localStorage.setItem("docId", "docx-e-k-k-fg");
              break;
            case "we-termination-los-client":
              localStorage.setItem("docId", "docx-e-k-k-fl");
              break;
            case "we-confirmation--client":
              localStorage.setItem("docId", "docx-e-k-k-b");
              break;
            case "we-termination-gerecht-pp":
              localStorage.setItem("docId", "docx-e-k-pp-fg");
              break;
            case "we-termination-los-pp":
              localStorage.setItem("docId", "docx-e-k-pp-fl");
              break;
            case "we-confirmation--pp":
              localStorage.setItem("docId", "docx-e-k-pp-b");
              break;
          }
          docxTermination();
        }
      } else {
        this.inputMissing = true;
      }
    },
  },
}
</script>
