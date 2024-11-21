<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>

  <h2>Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h2>Deutsch</h2>

  <h3>WeMatch</h3>
  <input type="radio" id="c-rv-k" value="c-rv-k" name="radio" @click="confSecond(false)">
  <label for="c-rv-k" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k" value="c-ev-k" name="radio" @click="confSecond(false)">
  <label for="c-ev-k" @click="confSecond(false)">Projekteinzelauftrag Kunde</label><br/>
  <input type="radio" id="c-rv-k-2" value="c-rv-k-2" name="radio" @click="confSecond(true)">
  <label for="c-rv-k-2" @click="confSecond(true)">Rahmenvertrag Kunde: 2 Unterschriftsblöcke</label><br/>
  <input type="radio" id="c-ev-k-2" value="c-ev-k-2" name="radio" @click="confSecond(true)">
  <label for="c-ev-k-2" @click="confSecond(true)">Projekteinzelauftrag Kunde: 2 Unterschriftsblöcke</label><br/>

  <h3>Engineering</h3>
  <input type="radio" id="c-rv-k-e" value="c-rv-k-e" name="radio" @click="confSecond(false)">
  <label for="c-rv-k-e" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k-e" value="c-ev-k-e" name="radio" @click="confSecond(false)">
  <label for="c-ev-k-e" @click="confSecond(false)">Projekteinzelauftrag Kunde</label><br/>
  <input type="radio" id="c-rv-k-e-2" value="c-rv-k-e-2" name="radio" @click="confSecond(true)">
  <label for="c-rv-k-e-2" @click="confSecond(true)">Rahmenvertrag Kunde: 2 Unterschriftsblöcke</label><br/>
  <input type="radio" id="c-ev-k-e-2" value="c-ev-k-e-2" name="radio" @click="confSecond(true)">
  <label for="c-ev-k-e-2" @click="confSecond(true)">Projekteinzelauftrag Kunde: 2 Unterschriftsblöcke</label><br/>

  <h3>Projects</h3>
  <input type="radio" id="c-rv-k-p" value="c-rv-k-p" name="radio" @click="confSecond(false)">
  <label for="c-rv-k-p" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k-p" value="c-ev-k-p" name="radio" @click="confSecond(false)">
  <label for="c-ev-k-p" @click="confSecond(false)">Projekteinzelauftrag Kunde</label><br/>

  <h2>Englisch</h2>

  <h3>WeMatch</h3>
  <input type="radio" id="c-rv-k-eng" value="c-rv-k-eng" name="radio" @click="confSecond(false)">
  <label for="c-rv-k-eng" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k-eng" value="c-ev-k-eng" name="radio" @click="confSecond(false)">
  <label for="c-ev-k-eng" @click="confSecond(false)">Projekteinzelauftrag Kunde</label><br/>
  <input type="radio" id="c-rv-k-2-eng" value="c-rv-k-2-eng" name="radio" @click="confSecond(true)">
  <label for="c-rv-k-2-eng" @click="confSecond(true)">Rahmenvertrag Kunde: 2 Unterschriftsblöcke</label><br/>
  <input type="radio" id="c-ev-k-2-eng" value="c-ev-k-2-eng" name="radio" @click="confSecond(true)">
  <label for="c-ev-k-2-eng" @click="confSecond(true)">Projekteinzelauftrag Kunde: 2 Unterschriftsblöcke</label><br/>

  <h3>Engineering</h3>
  <input type="radio" id="c-rv-k-e-eng" value="c-rv-k-e-eng" name="radio" @click="confSecond(false)">
  <label for="c-rv-k-e-eng" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k-e-eng" value="c-ev-k-e-eng" name="radio" @click="confSecond(false)">
  <label for="c-ev-k-e-eng" @click="confSecond(true)">Projekteinzelauftrag Kunde</label><br/>
  <input type="radio" id="c-rv-k-e-2-eng" value="c-rv-k-e-2-eng" name="radio" @click="confSecond(true)">
  <label for="c-rv-k-e-2-eng" @click="confSecond(true)">Rahmenvertrag Kunde: 2 Unterschriftsblöcke</label><br/>
  <input type="radio" id="c-ev-k-e-2-eng" value="c-ev-k-e-2-eng" name="radio" @click="confSecond(true)">
  <label for="c-ev-k-e-2-eng" @click="confSecond(false)">Projekteinzelauftrag Kunde: 2 Unterschriftsblöcke</label><br/>

  <h3>Projects</h3>
  <input type="radio" id="c-rv-k-p-eng" value="c-rv-k-p-eng" name="radio" @click="confSecond(false)">
  <label for="c-rv-k-p-eng" @click="confSecond(false)">Rahmenvertrag Kunde</label><br/>
  <input type="radio" id="c-ev-k-p-eng" value="c-ev-k-p-eng" name="radio" @click="confSecond(false)">
  <label for="c-ev-k-p-eng" @click="confSecond(false)">Projekteinzelauftrag Kunde</label><br/>

  <h2>Prüfe, ob folgende Daten<br />zum Versand des Vertrags korrekt sind:</h2>

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

  <div v-if="zweiterEmpfaenger">
    <h3>Vertrag Zweiter Empfänger</h3>
    <label for="empfaenger_mail2">E-Mail:</label>
    <input v-model="empfaengerMail2" type="email" id="empfaenger_mail2">
    <label for="empfaenger_name2">Name:</label>
    <input v-model="empfaengerName2" type="text" id="empfaenger_mail2"><br />
  </div>

  <h3>Consultant in CC</h3>
  <label for="cc_mail">E-Mail:</label>
  <input v-model="ccMail" type="email" id="cc_mail">
  <label for="cc_name">Name:</label>
  <input v-model="ccName" type="text" id="cc_name"><br />

  <p class="error" v-if="aufgabenbeschreibungError">Die Aufgabenbeschreibung überschreitet die Grenze von 4000 Zeichen.<br />Bitte kürze sie in Bullhorn und gib die Match-ID erneut ein!</p>

  <button class="btn" :class="{'bestatigen-button btn-outline-primary': !confirmed || aufgabenbeschreibungError, 'btn-primary': confirmed && !aufgabenbeschreibungError}" :disabled="aufgabenbeschreibungError" @click="chooseTemplate()">Bestätigen</button>
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
  sendHelpMail,
  crvk,
  cevk2,
  cevk,
  cevkEng,
  cevkEng2,
} from "@/services/MethodService";
import { logout } from "@/firebase-config";

export default {
  name: "chooseTemplateLegalDocuSign",
  data() {
    return {
      confirmed: false,
      verguetungssatzList: [],
      empfaengerName: localStorage.getItem('projektpartnerName'),
      empfaengerMail: localStorage.getItem('projektpartnerMail'),
      empfaengerName2: "",
      empfaengerMail2: "",
      absenderName: localStorage.getItem('wematchAnsprechpartnerName'),
      absenderMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      ccName: "",
      ccMail: "",
      zweiterEmpfaenger: false,
      aufgabenbeschreibungError: false,
    };
  },
  methods: {
    logout,
    pageBack() {
      router.go(-1);
    },
    confSecond(cond) {
      if (cond) {
        this.confirmed = true;
        this.zweiterEmpfaenger = true;
      } else if (!cond) {
        this.confirmed = true;
        this.zweiterEmpfaenger = false;
      }
    },
    chooseTemplate() {
      this.checkAufgabenbeschreibung();
      if (this.aufgabenbeschreibungError) {
        return;
      }

      verguetungssatzSwitchKunde();
      kuendigungsfristTranslator();

      // RV Kunde Deutsch : WeMatch, Engineering, Projects
      if (document.getElementById("c-rv-k").checked) {
        crvk("c-rv-k");
      }

      if (document.getElementById("c-rv-k-e").checked) {
        crvk("c-rv-k-e");
      }

      if (document.getElementById("c-rv-k-p").checked) {
        crvk("c-rv-k-p");
      }

      // RV Kunde Englisch: WeMatch, Engineering, Projects
      if (document.getElementById("c-rv-k-eng").checked) {
        crvk("c-rv-k-eng");
      }

      if (document.getElementById("c-rv-k-e-eng").checked) {
        crvk("c-rv-k-e-eng");
      }

      if (document.getElementById("c-rv-k-p-eng").checked) {
        crvk("c-rv-k-p-eng");
      }

      // EV Kunde Deutsch : WeMatch, Engineering, Projects
      if (document.getElementById("c-ev-k").checked) {
        cevk("c-ev-k");
      }

      if (document.getElementById("c-ev-k-e").checked) {
        cevk("c-ev-k-e");
      }

      if (document.getElementById("c-ev-k-p").checked) {
        cevk("c-ev-k-p");
      }

      // EV Kunde Englisch: WeMatch, Engineering, Projects
      if (document.getElementById("c-ev-k-eng").checked) {
        cevkEng("c-ev-k-eng");
      }

      if (document.getElementById("c-ev-k-e-eng").checked) {
        cevkEng("c-ev-k-e-eng");
      }
      if (document.getElementById("c-ev-k-p-eng").checked) {
        cevkEng("c-ev-k-p-eng");
      }

      // EV Kunde - 2 Unterschriftsblöcke

      if (document.getElementById("c-ev-k-2").checked) {
        cevk2("c-ev-k-2");
      }

      if (document.getElementById("c-rv-k-2").checked) {
        cevk2("c-ev-k-2");
      }

      if (document.getElementById("c-rv-k-e-2").checked) {
        cevk2("c-rv-k-e-2");
      }

      if (document.getElementById("c-ev-k-e-2").checked) {
        cevk2("c-ev-k-e-2");
      }

      if (document.getElementById("c-ev-k-2-eng").checked) {
        cevkEng2("c-ev-k-2-eng");
      }

      if (document.getElementById("c-rv-k-2-eng").checked) {
        cevkEng2("c-rv-k-2-eng");
      }

      if (document.getElementById("c-rv-k-e-2-eng").checked) {
        cevkEng2("c-rv-2-e-eng");
      }

      if (document.getElementById("c-ev-k-e-2-eng").checked) {
        cevkEng2("c-ev-k-e-2-eng");
      }
    },
    checkAufgabenbeschreibung() {
      const newValue = localStorage.getItem('aufgabenbeschreibung');
      if (newValue && encodeURIComponent(newValue).length > 4000) {
        this.aufgabenbeschreibungError = true;
        this.confirmed = false;
      } else {
        this.aufgabenbeschreibungError = false;
      }
    },
  },
  mounted() {
    localStorage.setItem("empfaengerName", this.empfaengerName);
    localStorage.setItem("empfaengerMail", this.empfaengerMail);
    localStorage.setItem("absenderName", this.absenderName);
    localStorage.setItem("absenderMail", this.absenderMail);

    document.getElementById("helpButton").addEventListener("click", function() {
      sendHelpMail();
    });

    // Watch for changes in the aufgabenbeschreibung in localStorage
    this.checkAufgabenbeschreibung();
    window.addEventListener('storage', this.checkAufgabenbeschreibung);
  },

  beforeUnmount() {
    window.removeEventListener('storage', this.checkAufgabenbeschreibung);
  },

  watch: {
    empfaengerName(newValue) {
      localStorage.setItem("empfaengerName", newValue);
    },
    empfaengerMail(newValue) {
      localStorage.setItem("empfaengerMail", newValue);
    },
    empfaengerName2(newValue) {
      localStorage.setItem("empfaengerName2", newValue);
    },
    empfaengerMail2(newValue) {
      localStorage.setItem("empfaengerMail2", newValue);
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
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 15px;
}

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
