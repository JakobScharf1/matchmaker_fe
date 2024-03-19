<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h2>Deutsch</h2>

  <h3>WeMatch</h3>

  <input type="radio" id="docx-rv-k" value="docx-rv-k" name="radio" @click="confirmed = true">
  <label for="docx-rv-k" @click="confirmed = true">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="docx-ev-pp" value="docx-ev-k" name="radio" @click="confirmed = true">
  <label for="docx-ev-pp" @click="confirmed = true">Projekteinzelauftrag Kunde</label><br/>

  <h3>Engineering</h3>
  <input type="radio" id="docx-rv-k-e" value="docx-rv-k-e" name="radio" @click="confirmed = true">
  <label for="docx-rv-k-e" @click="confirmed = true">Rahmenvereinbarung Kunde Engineering</label><br/>
  <input type="radio" id="docx-ev-k-e" value="docx-ev-k-e" name="radio" @click="confirmed= true">
  <label for="docx-ev-k-e" @click="confirmed = true">Projekteinzelauftrag Kunde Engineering</label><br/>

  <h3>Projects</h3>

  <input type="radio" id="docx-rv-k-p" value="docx-rv-k-p" name="radio" @click="confirmed = true">
  <label for="docx-rv-k-p" @click="confirmed = true">Rahmenvereinbarung Kunde Projects</label><br/>
  <input type="radio" id="docx-ev-k-p" value="docx-ev-k-p" name="radio" @click="confirmed = true">
  <label for="docx-ev-k-p" @click="confirmed = true">Projekteinzelauftrag Kunde Projects</label><br/>




  <h2>Englisch</h2>

  <h3>WeMatch</h3>

  <input type="radio" id="docx-rv-k-eng" value="docx-rv-k-eng" name="radio" @click=" confirmed = true">
  <label for="docx-rv-k-eng" @click="confirmed = true">Rahmenvereinbarung Kunde - Englisch</label><br/>
  <input type="radio" id="docx-ev-pp-eng" value="docx-ev-k-eng" name="radio" @click="confirmed = true">
  <label for="docx-ev-pp-eng" @click="confirmed = true">Projekteinzelauftrag Kunde - Englisch</label><br/>

  <h3>Engineering</h3>

  <input type="radio" id="docx-rv-k-e-eng" value="docx-rv-k-e-eng" name="radio" @click="confirmed = true">
  <label for="docx-rv-k-p-eng" @click="confirmed = true">Rahmenvereinbarung Kunde Engineering - Englisch</label><br/>
  <input type="radio" id="docx-ev-k-e-eng" value="docx-ev-k-e-eng" name="radio" @click="confirmed = true">
  <label for="docx-ev-k-p-eng" @click="confirmed = true">Projekteinzelauftrag Kunde Engineering - Englisch</label><br/>

  <h3>Projects</h3>

  <input type="radio" id="docx-rv-k-p-eng" value="docx-rv-k-p-eng" name="radio" @click="confirmed = true">
  <label for="docx-rv-k-p-eng" @click="confirmed = true">Rahmenvereinbarung Kunde Projects - Englisch</label><br/>
  <input type="radio" id="docx-ev-k-p-eng" value="docx-ev-k-p-eng" name="radio" @click="confirmed = true">
  <label for="docx-ev-k-p-eng" @click="confirmed = true">Projekteinzelauftrag Kunde Projects - Englisch</label><br/>



  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>

  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
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
  name: 'chooseTemplateLegalDocx',
  data() {
    return {
      confirmed: false,
    }
  },
  methods: {
    logout,
    pageBack(){
      router.go(-1);
    },
    chooseTemplate() {
      verguetungssatzSwitchKunde()
      kuendigungsfristTranslator()


      // -- Rahmenvertrag DOCX ---
      if (document.getElementById('docx-rv-k').checked) {
        localStorage.setItem("docId", "docx-rv-k")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-eng').checked) {
        localStorage.setItem("docId", "docx-rv-k-eng")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-e').checked) {
        localStorage.setItem("docId", "docx-rv-k-e")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-e-eng').checked) {
        localStorage.setItem("docId", "docx-rv-k-e-eng")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-p').checked) {
        localStorage.setItem("docId", "docx-rv-k-p")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-p-eng').checked) {
        localStorage.setItem("docId", "docx-rv-k-p-eng")
        docxEvk();
      }

      // -- Einzelvertrag DOCX ---
      if (document.getElementById('docx-ev-k').checked) {
        localStorage.setItem("docId", "docx-ev-k")
        docxEvk();
      }
      if (document.getElementById('docx-ev-k-eng').checked) {
        localStorage.setItem("docId", "docx-ev-k-eng")
        docxEvk();
      }
      if (document.getElementById('docx-ev-k-e').checked) {
        localStorage.setItem("docId", "docx-ev-k-e")
        docxEvk();
      }
      if (document.getElementById('docx-ev-k-e-eng').checked) {
        localStorage.setItem("docId", "docx-ev-k-e-eng")
        docxEvk();
      }
      if (document.getElementById('docx-ev-k-p').checked) {
        localStorage.setItem("docId", "docx-ev-k-p")
        docxEvk();
      }
      if (document.getElementById('docx-ev-k-p-eng').checked) {
        localStorage.setItem("docId", "docx-ev-k-p-eng")
        docxEvk();
      }
    }
  },
  mounted() {

    document.getElementById("helpButton").addEventListener("click", function() {
      sendHelpMail();
    })
  }
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
  pointer-events: none;
}
h3 {
  font-size: 1.5rem;
  margin-top: 2rem;
}

[type="radio"] {
  margin-right: 5px;
}

[type="email"] {
  margin-left: 0.5rem;
  margin-right: 2rem;
}

[type="text"] {
  margin-left: 0.5rem;
}

</style>
