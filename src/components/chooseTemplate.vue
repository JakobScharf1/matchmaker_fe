<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>

<h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>
  <h3>Contracts</h3>
  <input type="radio" id="c-rv-pp" value="c-rv-pp" name="radio" @click="confirmClick()">
  <label for="c-rv-pp" @click="confirmClick()">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp" value="c-ev-pp" name="radio" @click="confirmClick()">
  <label for="c-ev-pp" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>

  <h3>Contracts - Englisch</h3>
  <input type="radio" id="c-rv-pp-eng" value="c-rv-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-rv-pp-eng" @click="confirmClick()">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp-eng" value="c-ev-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-ev-pp-eng" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>

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
<!--
  <h3>IT Perm</h3>
  <input type="radio" id="p-rv-mitNach" value="p-rv-mitNach">
  <label for="p-rv-mitNach">Rahmenvertrag mit Nachbesetzung</label>
  <input type="radio" id="p-rv-ohneNach" value="p-rv-ohneNach">
  <label for="p-rv-ohneNach">Rahmenvertrag ohne Nachbesetzung</label>
  <input type="radio" id="p-rv-mitNachmitVer" value="p-rv-mitNachmitVer">
  <label for="p-rv-mitNachmitVer">Rahmenvertrag mit Nachbesetzung und Abweichenden Vereinbarungen</label>
  <input type="radio" id="p-rv-ohneNachmitVer" value="p-rv-ohneNachmitVer">
  <label for="p-rv-ohneNachmitVer">Rahmenvertrag ohne Nachbesetzung mit Abweichenden Vereinbarungen</label>
  <input type="radio" id="p-rv-mitRe" value="p-rv-mitRe">
  <label for="p-rv-mitRe">Rahmenvertrag mit Rückerstattung</label>
  <input type="radio" id="p-rv-ohneNach" value="p-rv-ohneNach">
  <label for="p-rv-ohneNach">Rahmenvertrag ohne Nachbesetzung</label>
 -->
  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate()">Bestätigen</button>
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";
import BackendService from "@/services/BackendService";

export default {
  name: "chooseTemplate",
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
      adresseKunde: "",
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
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      localStorage.setItem('userInfo', "");
      router.push('/');
    },
    pageBack() {
      router.go(-1);
    },
    confirmClick() {
      this.confirmed = true;
    },
    chooseTemplate() {

      switch (this.verguetungssatz){
        case "Stundensatz":
          this.stundensatz = this.ek;
          break;
        case "Tagessatz":
          this.tagessatz = this.ek;
          break;
        case "Festpreis":
          this.festpreis = this.ek;
          break;
      }

      switch (this.kuendigungsfristPP) {
        case "0 Tage":
          this.kuendigungsfristPPEnglisch = "0 days";
          break;
        case "7 Tage":
          this.kuendigungsfristPPEnglisch = "7 days";
          break;
        case "14 Tage":
          this.kuendigungsfristPPEnglisch = "14 days";
          break;
        case "14 Tage zum Monatsende":
          this.kuendigungsfristPPEnglisch = "14 days to month end";
          break;
        case "30 Tage":
          this.kuendigungsfristPPEnglisch = "30 days";
          break;
        case "6 Wochen":
          this.kuendigungsfristPPEnglisch = "6 weeks";
          break;
        case "12 Wochen":
          this.kuendigungsfristPPEnglisch = "12 weeks";
          break;
      }

        // -- Projektpartner Rahmenvertrag --
      if (document.getElementById('c-rv-pp').checked) {

        const response  = BackendService.getPowerForm("crvpp");
        console.log("PowerForms URL Request Response: " + response.toString());

        /*this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=c5d592c2-f5da-4d17-95b0-4a336edfd32b&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
        this.finalURL = this.powerFormsURL +
            "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
            "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
            "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
            "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
            "&CC_UserName=" + encodeURIComponent(this.ccName) +
            "&CC_Email=" + encodeURIComponent(this.ccMail) +
            "&PPName=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
            "&Adresse1=" + encodeURIComponent(this.ppStreet) +
            "&Adresse2=" + encodeURIComponent(this.ppCity);*/
        console.log("finalURL: " + this.finalURL);
      }

      // -- Projektpartner Einzelvertrag --
      else if (document.getElementById('c-ev-pp').checked) {

        this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=90f5f8f0-1e48-4e4c-a4c2-611e5de2cd80&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
        this.adresseKunde = this.adresseKundeStr + ", " + this.adresseKundeCity;
        this.finalURL = this.powerFormsURL +
            "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
            "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
            "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
            "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
            "&CC_UserName=" + encodeURIComponent(this.ccName) +
            "&CC_Email=" + encodeURIComponent(this.ccMail) +
            "&Wematch_Ansprechpartner=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
            "&Projektpartner=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
            "&Startdatum=" + encodeURIComponent(this.startdatum) +
            "&Enddatum=" + encodeURIComponent(this.enddatum) +
            "&Kuendigungsfrist=" + encodeURIComponent(this.kuendigungsfristPP) +
            "&Tagessatz=" + encodeURIComponent(this.tagessatz) +
            "&Stundensatz=" + encodeURIComponent(this.stundensatz) +
            "&Festpreis=" + encodeURIComponent(this.festpreis) +
            "&Endkunde=" + encodeURIComponent(this.kunde) +
            "&Endkunde_Adresse=" + this.adresseKunde +
            "&Einsatzort=" + encodeURIComponent(this.einsatzort) +
            "&Position=" + encodeURIComponent(this.position) +
            "&Aufgabenbeschreibung=" + encodeURIComponent(this.aufgabenbeschreibung) +
            "&MatchID=" + encodeURIComponent(this.matchID)
        ;
        console.log("finalURL: " + this.finalURL);
      }

      // -- Projektpartner Rahmenvertrag englisch --
      else if (document.getElementById('c-rv-pp-eng').checked) {
        // --- Finale URL ---
        this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=c08a5ab7-7f6a-4780-9803-e1e88e6ec1b1&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
        this.finalURL = this.powerFormsURL +
            "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
            "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
            "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
            "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
            "&CC_UserName=" + encodeURIComponent(this.ccName) +
            "&CC_Email=" + encodeURIComponent(this.ccMail) +
            "&PPName=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
            "&Adresse1=" + encodeURIComponent(this.ppStreet) +
            "&Adresse2=" + encodeURIComponent(this.ppCity);
        console.log("finalURL: " + this.finalURL);
      }

      // -- Projektpartner Einzelvertrag englisch --
      else if (document.getElementById('c-ev-pp-eng').checked) {
        // --- Finale URL ---
        this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=d0a99cc2-6b16-4ebb-81a9-2c5a4415822d&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
        this.adresseKunde = this.adresseKundeStr + ", " + this.adresseKundeCity;
        this.finalURL = this.powerFormsURL +
            "&Absender_UserName=" + encodeURIComponent(this.absenderName) +
            "&Absender_Email=" + encodeURIComponent(this.absenderMail) +
            "&Projektpartner_UserName=" + encodeURIComponent(this.empfaengerName) +
            "&Projektpartner_Email=" + encodeURIComponent(this.empfaengerMail) +
            "&CC_UserName=" + encodeURIComponent(this.ccName) +
            "&CC_Email=" + encodeURIComponent(this.ccMail) +
            "&Wematch_Ansprechpartner=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
            "&Projektpartner=" + encodeURIComponent(this.ppGesellschaft) + " " + encodeURIComponent(this.projektpartnerName) +
            "&Startdatum=" + encodeURIComponent(this.startdatum) +
            "&Enddatum=" + encodeURIComponent(this.enddatum) +
            "&Kuendigungsfrist=" + encodeURIComponent(this.kuendigungsfristPPEnglisch) +
            "&Tagessatz=" + encodeURIComponent(this.tagessatz) +
            "&Stundensatz=" + encodeURIComponent(this.stundensatz) +
            "&Festpreis=" + encodeURIComponent(this.festpreis) +
            "&Endkunde=" + encodeURIComponent(this.kunde) +
            "&Endkunde_Adresse=" + this.adresseKunde +
            "&Einsatzort=" + encodeURIComponent(this.einsatzort) +
            "&Position=" + encodeURIComponent(this.position) +
            "&Aufgabenbeschreibung=" + encodeURIComponent(this.aufgabenbeschreibung) +
            "&MatchID=" + encodeURIComponent(this.matchID)
        ;
        console.log("finalURL: " + this.finalURL);
      }

      window.open(this.finalURL, "_blank");
    }
  },
  watch: {
      empfaengerName(newValue) {
        localStorage.setItem('empfaengerName', newValue);
      },
      empfaengerMail(newValue) {
        localStorage.setItem('empfaengerMail', newValue);
      },
      absenderName(newValue) {
        localStorage.setItem('absenderName', newValue);
      },
      absenderMail(newValue) {
        localStorage.setItem('absenderMail', newValue);
      },
      ccName(newValue) {
        localStorage.setItem('ccName', newValue);
      },
      ccMail(newValue) {
        localStorage.setItem('ccMail', newValue);
      }
    }
}
</script>

<style scoped>
  [type="email"] {
    margin-left: 0.5rem;
    margin-right: 2rem;
  }

  [type="text"] {
    margin-left: 0.5rem;
  }

  .btn-primary {
    background-color: #007772;
    border-color: #007772;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .bestatigen-button {
    margin-top: 1rem;
    margin-bottom: 2rem;
    pointer-events: none;
  }

  h2 {
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  [type="radio"] {
    margin-right: 5px;
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

</style>
