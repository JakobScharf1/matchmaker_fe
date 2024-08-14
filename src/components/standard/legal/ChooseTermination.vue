 <template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>Wähle die Art der Kündigung aus, die du erstellen möchtest:</h2>
  <h2>Deutsch</h2>
  <h3>WeMatch</h3>
  <input type="radio" id="docx-k-k-fg" value="docx-k-k-fg" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-k-fg')">
  <label for="docx-k-k-fg">Kündigung - fristgerecht - Kunde</label><br/>
  <input type="radio" id="docx-k-k-fl" value="docx-k-k-fl" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-k-fl')">
  <label for="docx-k-k-fl">Kündigung - fristlos - Kunde</label><br/>
  <input type="radio" id="docx-k-k-b" value="docx-k-k-b" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-k-b')">
  <label for="docx-k-k-b">Kündigungsbestätigung - Kunde</label><br/>
  <input type="radio" id="docx-k-pp-fg" value="docx-k-pp-fg" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-pp-fg')">
  <label for="docx-k-pp-fg">Kündigung - fristgerecht - Projektpartner</label><br/>
  <input type="radio" id="docx-k-pp-fl" value="docx-k-pp-fl" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-pp-fl')">
  <label for="docx-k-pp-fl">Kündigung - fristlos - Projektpartner</label><br/>
  <input type="radio" id="docx-k-pp-b" value="docx-k-pp-b" name="wematch" v-model="selectedContract" @click="toggleSelection('docx-k-pp-b')">
  <label for="docx-k-pp-b">Kündigungsbestätigung - Projektpartner</label><br/>


  <h3>Engineering</h3>
   <input type="radio" id="docx-e-k-k-fg" value="docx-e-k-k-fg" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-k-fg')">
   <label for="docx-e-k-k-fg">Kündigung - fristgerecht - Kunde</label><br/>
   <input type="radio" id="docx-e-k-k-fl" value="docx-e-k-k-fl" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-k-fl')">
   <label for="docx-e-k-k-fl">Kündigung - fristlos - Kunde</label><br/>
   <input type="radio" id="docx-e-k-k-b" value="docx-e-k-k-b" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-k-b')">
   <label for="docx-e-k-k-b">Kündigungsbestätigung - Kunde</label><br/>
   <input type="radio" id="docx-e-k-pp-fg" value="docx-e-k-pp-fg" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-pp-fg')">
   <label for="docx-e-k-pp-fg">Kündigung - fristgerecht - Projektpartner</label><br/>
   <input type="radio" id="docx-e-k-pp-fl" value="docx-e-k-pp-fl" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-pp-fl')">
   <label for="docx-e-k-pp-fl">Kündigung - fristlos - Projektpartner</label><br/>
   <input type="radio" id="docx-e-k-pp-b" value="docx-e-k-pp-b" name="engineering" v-model="selectedContract" @click="toggleSelection('docx-e-k-pp-b')">
   <label for="docx-e-k-pp-b">Kündigungsbestätigung - Projektpartner</label><br/>

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
  docxTermination,
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
