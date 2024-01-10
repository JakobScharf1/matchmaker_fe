<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
  <h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>

  <h3>Deutsch</h3>
  <input type="radio" id="c-rv-k" value="c-rv-k" name="radio" @click="confirmClick()">
  <label for="c-rv-k" @click="confirmClick()">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="c-ev-k" value="c-ev-k" name="radio" @click="confirmClick()">
  <label for="c-ev-k" @click="confirmClick()">Projekteinzelauftrag Kunde</label><br/>

  <h3>Englisch</h3>
  <input type="radio" id="c-rv-k-eng" value="c-rv-k-eng" name="radio" @click="confirmClick()">
  <label for="c-rv-k-eng" @click="confirmClick()">Rahmenvereinbarung Kunde</label><br/>
  <input type="radio" id="c-ev-k-eng" value="c-ev-k-eng" name="radio" @click="confirmClick()">
  <label for="c-ev-k-eng" @click="confirmClick()">Projekteinzelauftrag Kunde</label><br/>

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

  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate">Bestätigen</button>
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";

export default {
  name: 'chooseTemplateLegal',
  data() {
    return {
      confirmed: false,
      powerFormsURL: "",
      finalURL: "",
      absenderMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      absenderName: localStorage.getItem('wematchAnsprechpartnerName'),
      empfaengerMail: localStorage.getItem('projektpartnerMail'),
      empfaengerName: localStorage.getItem('projektpartnerName'),
      match: localStorage.getItem('match'),
      projektpartnerName: localStorage.getItem('projektpartnerName'),
      projektpartnerMail: localStorage.getItem('projektpartnerMail'),
      wematchAnsprechpartnerName: localStorage.getItem('wematchAnsprechpartnerName'),
      wematchAnsprechpartnerMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      tagessatz: "X",
      stundensatz: "X",
      festpreis: "X",
      verguetungssatz: localStorage.getItem('verguetungssatz'),
      startdatum: localStorage.getItem('startdatum'),
      enddatum: localStorage.getItem('enddatum'),
      adresseKundeStr: localStorage.getItem('adresseKundeStr'),
      adresseKundeCity: localStorage.getItem('adresseKundeCity'),
      ppGesellschaft: localStorage.getItem('ppGesellschaft'),
      kunde: localStorage.getItem('kunde'),
      kuendigungsfristPP: localStorage.getItem('kuendigungsfristPP'),
      kuendigungsfristKunde: localStorage.getItem('kuendigungsfristKunde'),
      kuendigungsfristPPEnglisch: "",
      kuendigungsfristKundeEnglisch: "",
      zahlungszielPP: localStorage.getItem('zahlungszielPP'),
      zahlungszielKunde: localStorage.getItem('zahlungszielKunde'),
      einsatzort: localStorage.getItem('einsatzort'),
      position: localStorage.getItem('position'),
      aufgabenbeschreibung: localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "),
      ek: localStorage.getItem('ek'),
      vk: localStorage.getItem('vk'),
      ansprechpartnerKunde: localStorage.getItem('ansprechpartnerKunde'),
      matchID: localStorage.getItem('matchID'),
      ccMail: "",
      ccName: "",
      ppStreet: localStorage.getItem('ppStreet'),
      ppCity: localStorage.getItem('ppCity'),
      auslastung: localStorage.getItem('auslastung'),
    }
  },
  methods: {
    pageBack(){
      router.go(-1);
    },
    confirmClick() {
      this.confirmed = true;
    },
    logout(){
      localStorage.clear();
      localStorage.setItem('idToken', "");
      router.push('/login');
    },
    chooseTemplate() {
      if (this.verguetungssatz === "Stundensatz") {
        this.stundensatz = this.vk;
      } else if (this.verguetungssatz === "Tagessatz") {
        this.tagessatz = this.vk;
      } else if (this.verguetungssatz === "Festpreis") {
        this.festpreis = this.vk;
      }

      if (this.kuendigungsfristKunde === "0 Tage") {
        this.kuendigungsfristKundeEnglisch = "0 days";
      } else if (this.kuendigungsfristKunde === "7 Tage") {
        this.kuendigungsfristKundeEnglisch = "7 days";
      } else if (this.kuendigungsfristKunde === "14 Tage") {
        this.kuendigungsfristKundeEnglisch = "14 days";
      } else if (this.kuendigungsfristKunde === "14 zum Monatsende") {
        this.kuendigungsfristKundeEnglisch = "14 days to month end";
      } else if (this.kuendigungsfristKunde === "30 Tage") {
        this.kuendigungsfristKundeEnglisch = "30 days";
      } else if (this.kuendigungsfristKunde === "6 Wochen") {
        this.kuendigungsfristKundeEnglisch = "6 weeks";
      } else if (this.kuendigungsfristKunde === "12 Wochen") {
        this.kuendigungsfristKundeEnglisch = "12 weeks";

        // --- Rahmenvertrag ---
        if (document.getElementById('c-rv-k').checked) {

          // -- Finale URL --
          this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=e68cf399-73d4-4c77-a38c-d6c732651b3c&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
          this.finalURL = this.powerFormsURL +
              "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
              "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
              "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
              "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
              "&CC_UserName=" + encodeURIComponent(this.ccName) +
              "&CC_Email=" + encodeURIComponent(this.ccMail) +
              "&KundeName=" + encodeURIComponent(this.kunde) +
              "&Adresse1=" + encodeURIComponent(this.adresseKundeStr) +
              "&Adresse2=" + encodeURIComponent(this.adresseKundeCity);
          console.log("finalURL: " + this.finalURL);
        }

        // --- Einzelvertrag ---
        else if (document.getElementById('c-ev-k').checked) {
          // -- Finale URL --
          this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=2d8e2436-2caa-4739-84f7-54da386f2a8a&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
          this.finalURL = this.powerFormsURL +
              "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
              "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
              "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
              "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
              "&CC_UserName=" + encodeURIComponent(this.ccName) +
              "&CC_Email=" + encodeURIComponent(this.ccMail) +
              "&Kunde=" + encodeURIComponent(this.kunde) +
              "&KundeAdresse1" + encodeURIComponent(this.adresseKundeStr) +
              "&KundeAdresse2" + encodeURIComponent(this.adresseKundeCity) +
              "&Wematch_Ansprechpartner=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
              "&Ansprechpartner_Kunde=" + encodeURIComponent(this.ansprechpartnerKunde) +
              "&MatchID=" + encodeURIComponent(this.matchID) +
              "&Tagessatz=" + encodeURIComponent(this.tagessatz) +
              "&Stundensatz=" + encodeURIComponent(this.stundensatz) +
              "&Festpreis=" + encodeURIComponent(this.festpreis) +
              "&Startdatum=" + encodeURIComponent(this.startdatum) +
              "&Enddatum=" + encodeURIComponent(this.enddatum) +
              "&Kuendigungsfrist=" + encodeURIComponent(this.kuendigungsfristKunde) +
              "&Projektpartner=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
              "&Auslastung=" + encodeURIComponent(this.auslastung) +
              "&Einsatzort=" + encodeURIComponent(this.einsatzort) +
              "&Position=" + encodeURIComponent(this.position) +
              "&Aufgabenbeschreibung=" + encodeURIComponent(this.aufgabenbeschreibung)
          ;
          console.log("finalURL: " + this.finalURL);
        }

        // -- Rahmenvertrag englisch --
        else if (document.getElementById('c-rv-k-eng').checked) {
          // -- Finale URL --
          this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=9bafb00b-f36f-4623-ae99-1a5fe6f1027b&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
          this.finalURL = this.powerFormsURL +
              "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
              "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
              "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
              "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
              "&CC_UserName=" + encodeURIComponent(this.ccName) +
              "&CC_Email=" + encodeURIComponent(this.ccMail) +
              "&Kunde=" + encodeURIComponent(this.kunde) +
              "&KundeAdresse1" + encodeURIComponent(this.adresseKundeStr) +
              "&KundeAdresse2" + encodeURIComponent(this.adresseKundeCity);
          console.log("finalURL: " + this.finalURL);
        }

        // -- Einzelvertrag englisch --
        else if (document.getElementById('c-ev-k-eng').checked) {
          // -- Finale URL --
          this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=16495b41-9e93-466b-923d-c31dd8eca80b&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
          this.finalURL = this.powerFormsURL +
              "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
              "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
              "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
              "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
              "&CC_UserName=" + encodeURIComponent(this.ccName) +
              "&CC_Email=" + encodeURIComponent(this.ccMail) +
              "&Kunde=" + encodeURIComponent(this.kunde) +
              "&KundeAdresse1" + encodeURIComponent(this.adresseKundeStr) +
              "&KundeAdresse2" + encodeURIComponent(this.adresseKundeCity) +
              "&Wematch_Ansprechpartner=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
              "&Ansprechpartner_Kunde=" + encodeURIComponent(this.ansprechpartnerKunde) +
              "&MatchID=" + encodeURIComponent(this.matchID) +
              "&Tagessatz=" + encodeURIComponent(this.tagessatz) +
              "&Stundensatz=" + encodeURIComponent(this.stundensatz) +
              "&Festpreis=" + encodeURIComponent(this.festpreis) +
              "&Startdatum=" + encodeURIComponent(this.startdatum) +
              "&Enddatum=" + encodeURIComponent(this.enddatum) +
              "&Kuendigungsfrist=" + encodeURIComponent(this.kuendigungsfristKundeEnglisch) +
              "&Projektpartner=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
              "&Auslastung=" + encodeURIComponent(this.auslastung) +
              "&Einsatzort=" + encodeURIComponent(this.einsatzort) +
              "&Position=" + encodeURIComponent(this.position) +
              "&Aufgabenbeschreibung=" + encodeURIComponent(this.aufgabenbeschreibung)
          ;
          console.log("finalURL: " + this.finalURL);
        }

        window.open(this.finalURL, "_blank");
      }
    },
    watch: {
      empfaengerName(newValue){
        localStorage.setItem('empfaengerName', newValue);
      },
      empfaengerMail(newValue){
        localStorage.setItem('empfaengerMail', newValue);
      },
      absenderName(newValue){
        localStorage.setItem('absenderName', newValue);
      },
      absenderMail(newValue){
        localStorage.setItem('absenderMail', newValue);
      },
      ccName(newValue){
        localStorage.setItem('ccName', newValue);
      },
      ccMail(newValue){
        localStorage.setItem('ccMail', newValue);
      }
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