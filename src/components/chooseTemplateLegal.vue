<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h3>Deutsch</h3>
  <!--<input type="radio" id="c-rv-k" value="c-rv-k" name="radio" @click="confirmed = true">
  <label for="c-rv-k" @click="confirmed = true">Rahmenvereinbarung Kunde</label><br/>-->
  <input type="radio" id="c-ev-k" value="c-ev-k" name="radio" @click="confirmed = true">
  <label for="c-ev-k" @click="confirmed = true">Projekteinzelauftrag Kunde</label><br/>

  <h3>Englisch</h3>
  <!--<input type="radio" id="c-rv-k-eng" value="c-rv-k-eng" name="radio" @click="confirmed = true">
  <label for="c-rv-k-eng" @click="confirmed = true">Rahmenvereinbarung Kunde</label><br/>-->
  <input type="radio" id="c-ev-k-eng" value="c-ev-k-eng" name="radio" @click="confirmed = true">
  <label for="c-ev-k-eng" @click="confirmed = true">Projekteinzelauftrag Kunde</label><br/>

  <h3 style="color:red">Individuelle DOCX-Verträge</h3>
  <input type="radio" id="docx-ev" value="docx-ev" name="radio" @click="confirmed = true">
  <label for="docx-ev" @click="confirmed = true">Projekteinzelauftrag</label><br/>

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
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";
import {logout} from "@/firebase-config";
import {kuendigungsfristTranslator, verguetungssatzSwitch, cevk, cevkEng, docxEv} from "@/services/MethodService";

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
      verguetungssatzSwitch()
      kuendigungsfristTranslator()

      // --- Einzelvertrag ---
      if (document.getElementById('c-ev-k').checked) { cevk(); }

      // -- Einzelvertrag englisch --
      if (document.getElementById('c-ev-k-eng').checked) { cevkEng(); }

      // -- Einzelvertrag DOCX --
      else if (document.getElementById('docx-ev').checked) { docxEv(); }
    }
  },
  mounted() {
    localStorage.setItem("empfaengerName", this.empfaengerName);
    localStorage.setItem("empfaengerMail", this.empfaengerMail);
    localStorage.setItem("absenderName", this.absenderName);
    localStorage.setItem("absenderMail", this.absenderMail);
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

h2 {
  margin-top: 2rem;
}

#logoutButton {
  position: fixed;
  top: 10px;
  right: 10px;
}

.btn-outline-primary {
  color: #007772;
  border-color: #007772;
}

.btn-outline-primary:hover {
  color: white;
  background-color: #007772;
}

.btn-primary {
  background-color: #007772;
  border-color: #007772;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>
