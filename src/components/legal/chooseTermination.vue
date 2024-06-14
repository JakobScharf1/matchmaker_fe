 <template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>Wähle den kündigung aus, den du erstellen willst:</h2>
  <h2>Deutsch</h2>
  <h3>WeMatch</h3>
  <input type="radio" id="docx-k-k-fg" value="docx-k-k-fg" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-rv-k')">
  <label for="docx-k-k-fg">Kündigung - fristgerecht - Kunde</label><br/>
  <input type="radio" id="docx-k-k-fl" value="docx-k-k-fl" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-k-k-fl">Kündigung - firstlos - Kunde</label><br/>
  <input type="radio" id="docx-k-k-b" value="docx-k-k-b" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-k-k-b">Kündigungsbestätigung - Kunde</label><br/>
  <input type="radio" id="docx-k-pp-fg" value="docx-k-pp-fg" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-k-pp-fg">Kündigung - firstgerecht - Projektpartner</label><br/>
  <input type="radio" id="docx-k-pp-fl" value="docx-k-pp-fl" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-k-pp-fl">Kündigung - firstlos - Projektpartner</label><br/>
  <input type="radio" id="docx-ev-k" value="docx-ev-k" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-ev-k')">
  <label for="docx-ev-k">Kündigungsbestätigung - Projektpartner</label><br/>


  <h3>Engineering</h3>
  <input type="radio" id="docx-k-pp-fg-e" value="docx-k-pp-fg-e" name="engineering-deu" v-model="selectedContract" @click="toggleSelection('docx-rv-k-e')"  >
  <label for="docx-k-pp-fg-e">Kündigung - firstgerecht - Projektpartner</label><br/>
  <input type="radio" id="docx-k-pp-fl-e" value="docx-k-pp-fl-e" name="engineering-deu" v-model="selectedContract" @click="toggleSelection('docx-ev-k-e')">
  <label for="docx-k-pp-fl-e">Kündigung - firstlos - Projektpartner</label><br/>

  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>

  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout"><b>Logout</b></button>
  </div>
</template>-->

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
  name: 'chooseTemplateTermination',
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
</style> -->
