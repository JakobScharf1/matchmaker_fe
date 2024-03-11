<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h3>Deutsch</h3>
  <input type="radio" id="c-ev-k" value="c-ev-k" name="radio" @click="confirmed = true">
  <label for="c-ev-k" @click="confirmed = true">Projekteinzelauftrag Kunde</label><br/>

  <h3>Englisch</h3>
  <input type="radio" id="c-ev-k-eng" value="c-ev-k-eng" name="radio" @click="confirmed = true">
  <label for="c-ev-k-eng" @click="confirmed = true">Projekteinzelauftrag Kunde</label><br/>

  <h3 style="color:red">Individuelle DOCX-Verträge</h3>
  <input type="radio" id="docx-ev" value="docx-ev" name="radio" @click="confirmed = true">
  <label for="docx-ev" @click="confirmed = true">Projekteinzelauftrag</label><br/>
  <input type="radio" id="docx-ev-engineering" value="docx-ev-engineering" name="radio" @click="confirmed = true">
  <label for="docx-ev-engineering" @click="confirmed = true">Projekteinzelauftrag - Engineering</label><br/>
  <input type="radio" id="docx-ev-proj" value="docx-ev-proj" name="radio" @click="confirmed = true">
  <label for="docx-ev-proj" @click="confirmed = true">Projekteinzelauftrag - Projects</label><br/>

  <h2>3. Prüfe, ob folgende Daten<br />zum Versand des Vertrags korrekt sind:</h2>

  <h3>Vertrag Absender</h3>
  <label for="absender_mail">E-Mail:</label>
  <input v-model="absenderMail" type="email" id="absender_mail">
  <label for="absender_name">Name:</label>
  <input v-model="absenderName" type="text" id="absender_mail"><br />

  <h3>Vertrag Empfänger</h3>
  <label for="empfaenger_mail">E-Mail:</label>
  <input v-model="empfaengerMail" type="email" id="empfaenger_mail">
  <label for="empfaenger_name">Name:</label>
  <input v-model="empfaengerName" type="text" id="empfaenger_mail"><br />

  <h3>Consultant in CC</h3>
  <label for="cc_mail">E-Mail:</label>
  <input v-model="ccMail" type="email" id="cc_mail">
  <label for="cc_name">Name:</label>
  <input v-model="ccName" type="text" id="cc_name"><br />

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
  cevk,
  cevkEng,
  docxEvk,
  sendHelpMail
} from "@/services/MethodService";
import {logout} from "@/firebase-config";

export default {
  name: 'chooseTemplateLegal',
  data() {
    return {
      confirmed: false,
      empfaengerMail: localStorage.getItem('projektpartnerMail'),
      empfaengerName: localStorage.getItem('projektpartnerName'),
      absenderName: localStorage.getItem('wematchAnsprechpartnerName'),
      absenderMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      ccName: "",
      ccMail: "",
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

      // --- Einzelvertrag ---
      if (document.getElementById('c-ev-k').checked) { cevk(); }

      // -- Einzelvertrag englisch --
      if (document.getElementById('c-ev-k-eng').checked) { cevkEng(); }

      // -- Einzelvertrag DOCX --
      if (document.getElementById('docx-ev').checked) {
        localStorage.setItem("docId", "docx-ev");
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
    localStorage.setItem("empfaengerName", this.empfaengerName);
    localStorage.setItem("empfaengerMail", this.empfaengerMail);
    localStorage.setItem("absenderName", this.absenderName);
    localStorage.setItem("absenderMail", this.absenderMail);

    document.getElementById("helpButton").addEventListener("click", function() {
      sendHelpMail();
    })
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
