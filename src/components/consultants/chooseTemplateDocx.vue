<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h3>Deutsch</h3>
  <input type="radio" id="docx-rv-k" value="docx-rv-k" name="radio" @click="confirmed = true">
  <label for="docx-rv-k" @click="confirmed = true">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="docx-ev-pp" value="docx-ev-pp" name="radio" @click="confirmed = true">
  <label for="docx-ev-pp" @click="confirmed = true">Projekteinzelauftrag Projektpartner</label><br/>


  <h3>Englisch</h3>
  <input type="radio" id="docx-rv-k-eng" value="docx-rv-k-eng" name="radio" @click=" confirmed = true">
  <label for="docx-rv-k-eng" @click="confirmed = true">Rahmenvereinbarung Projektpartner - Englisch</label><br/>
  <input type="radio" id="docx-ev-pp-eng" value="docx-ev-pp-eng" name="radio" @click="confirmed = true">
  <label for="docx-ev-pp-eng" @click="confirmed = true">Projekteinzelauftrag Projektpartner - Englisch</label><br/>






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
  name: 'chooseTemplateDocuSign',
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


      // -- Einzelvertrag DOCX --
      if (document.getElementById('docx-rv-k').checked) {
        localStorage.setItem("docId", "docx-rv-k")
        docxEvk();
      }
      if (document.getElementById('docx-rv-k-eng').checked) {
        localStorage.setItem("docId", "docx-rv-k-eng")
        docxEvk();
      }
      if (document.getElementById('docx-ev-pp').checked) {
        localStorage.setItem("docId", "docx-ev-pp")
        docxEvk();
      }
      if (document.getElementById('docx-ev-pp-eng').checked) {
        localStorage.setItem("docId", "docx-ev-pp-eng")
        docxEvk();
      }

      // -- Einzelvertrag DOCX Engineering --
      if (document.getElementById('docx-ev-engineering').checked) {
        localStorage.setItem("docId", "docx-ev-engineering");
        docxEvk();
      }

      // -- Einzelvertrag DOCX Projects --
      if (document.getElementById('docx-ev-proj').checked) {
        localStorage.setItem("docId", "docx-ev-proj")
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
