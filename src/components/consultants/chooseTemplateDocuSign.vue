<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>

<h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h3>Contracts - Rahmenverträge</h3>
  <input type="radio" id="c-rv-pp" value="c-rv-pp" name="radio" @click="confirmed = true">
  <label for="c-rv-pp" @click="confirmed = true">Rahmenvertrag Projektpartner</label><br/>
  <input type="radio" id="eng-rv-pp" value="eng-rv-pp" name="radio" @click="confirmed = true">
  <label for="eng-rv-pp" @click="confirmed = true">Rahmenvertrag Projektpartner - Engineering</label><br/>
  <input type="radio" id="proj-rv-pp" value="proj-rv-pp" name="radio" @click="confirmed = true">
  <label for="proj-rv-pp" @click="confirmed = true">Rahmenvertrag Projektpartner - Projects</label><br/>

  <h3>Contracts - Einzelverträge</h3>
  <input type="radio" id="c-ev-pp" value="c-ev-pp" name="radio" @click="confirmed = true">
  <label for="c-ev-pp" @click="confirmed = true">Projekteinzelauftrag Projektpartner</label><br/>
  <input type="radio" id="eng-ev-pp" value="eng-ev-pp" name="radio" @click="confirmed = true">
  <label for="eng-ev-pp" @click="confirmed = true">Projekteinzelauftrag Projektpartner - Engineering</label><br/>
  <input type="radio" id="proj-ev-pp" value="proj-ev-pp" name="radio" @click="confirmed = true">
  <label for="proj-ev-pp" @click="confirmed = true">Projekteinzelauftrag Projektpartner - Projects</label><br/>

  <h3>Contracts - Rahmenverträge - Englisch</h3>
  <input type="radio" id="c-rv-pp-eng" value="c-rv-pp-eng" name="radio" @click="confirmed = true">
  <label for="c-rv-pp-eng" @click="confirmed = true">Rahmenvertrag Projektpartner</label><br/>
  <input type="radio" id="eng-rv-pp-eng" value="eng-rv-pp-eng" name="radio" @click="confirmed = true">
  <label for="eng-rv-pp-eng" @click="confirmed = true">Rahmenvertrag Projektpartner - Engineering</label><br/>
  <!--<input type="radio" id="proj-rv-pp-eng" value="proj-rv-pp-eng" name="radio" @click="confirmed = true">
  <label for="proj-rv-pp-eng" @click="confirmed = true">Rahmenvertrag Projektpartner - Projects</label><br/>-->

  <h3>Contracts - Einzelverträge - Englisch</h3>
  <input type="radio" id="c-ev-pp-eng" value="c-ev-pp-eng" name="radio" @click="confirmed = true">
  <label for="c-ev-pp-eng" @click="confirmed = true">Projekteinzelauftrag Projektpartner</label><br/>
  <input type="radio" id="eng-ev-pp-eng" value="eng-ev-pp-eng" name="radio" @click="confirmed = true">
  <label for="eng-ev-pp-eng" @click="confirmed = true">Projekteinzelauftrag Projektpartner - Engineering</label><br/>
  <input type="radio" id="proj-ev-pp-eng" value="proj-ev-pp-eng" name="radio" @click="confirmed = true">
  <label for="proj-ev-pp-eng" @click="confirmed = true">Projekteinzelauftrag Projektpartner - Projects</label><br/>



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
  cevpp,
  cevppEng,
  engevpp,
  projevpp,
  engevppEng,
  projevppEng,
  kuendigungsfristTranslator,
  verguetungssatzSwitchPP,
  sendHelpMail,
  crv
} from "@/services/MethodService";
import {logout} from "@/firebase-config";

export default {
  name: "chooseTemplate",
  data() {
    return {
      confirmed: false,
      verguetungssatzList: [],
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
    pageBack() {
      router.go(-1);
    },
    chooseTemplate() {
      verguetungssatzSwitchPP();
      kuendigungsfristTranslator();

      //RV Projektpartner
      if (document.getElementById('c-rv-pp').checked) {
        crv("c-rv-pp");
      }

      //RV Projektpartner - Engineering
      if (document.getElementById('eng-rv-pp').checked) {
        crv("eng-rv-pp");
      }

      //RV Projektpartner - Projects
      if (document.getElementById('proj-rv-pp').checked) {
        crv("proj-rv-pp");
      }

      //EV Projektpartner
      if (document.getElementById('c-ev-pp').checked) {
        cevpp();
      }

      //EV Projektpartner - Engineering
      if (document.getElementById('eng-ev-pp').checked) {
        engevpp();
      }

      //EV Projektpartner - Projects
      if (document.getElementById('proj-ev-pp').checked) {
        projevpp();
      }

      //RV Projektpartner Englisch
      if (document.getElementById('c-rv-pp-eng').checked) {
        crv("c-rv-pp-eng")
      }

      //RV Projektpartner Englisch - Engineering
      if (document.getElementById('eng-rv-pp-eng').checked) {
        crv("eng-rv-pp-eng")
      }

      //RV projektpartner Englisch - Projects
      if (document.getElementById('proj-rv-pp-eng').checked) {
        crv("proj-rv-pp-eng")
      }

      //EV Projektpartner Englisch
      if (document.getElementById('c-ev-pp-eng').checked) {
        cevppEng()
      }
      //EV Projektpartner Englisch - Engineering
      if (document.getElementById('eng-ev-pp-eng').checked) {
        engevppEng()
      }
      //EV Projektpartner Englisch - Projects
      if (document.getElementById('proj-ev-pp-eng').checked) {
        projevppEng()
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

  [type="email"] {
    margin-left: 0.5rem;
    margin-right: 2rem;
  }

  [type="text"] {
    margin-left: 0.5rem;
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

</style>
