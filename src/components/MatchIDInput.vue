<template>
  <h2 for="MatchID">1. Bitte gib die ID des Matches ein</h2>
  <p class="secondtitle">Wenn du Fehler in den Werten unterhalb findest, ändere diese bitte in Bullhorn und gib dann die Match-ID erneut ein.<br />Sonst kannst du auch alle Felder gleich im Vertrag in DocuSign ändern.</p>
    <div class="input-group mb-3">
      <input v-model="matchIdFromInput" id="MatchID" type="number" name="Match ID" class="form-control" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" @click="() => { getMatch();}"><b>Bestätigen</b></button>
      </div>
    </div>
  <div class="loading-div">
    <dot-loader :loading="isLoading" :color="'#007772'"></dot-loader>
  </div>
  <div class="valueTable" v-if="!isLoading">
    <table>
     <tbody>
       <tr>
         <td>WeMatch Ansprechpartner:</td>
         <td>{{wematchAnsprechpartnerName}}</td>
       </tr>
        <tr>
          <td>Projektpartner:</td>
          <td>{{projektpartnerName}}</td>
        </tr>
        <tr>
          <td>Projektpartner Gesellschaft:</td>
          <td>{{ppGesellschaft}}</td>
        </tr>
       <tr>
         <td>Projektpartner Adresse:</td>
         <td>{{ppAdresse}}</td>
       </tr>
        <tr>
          <td>Kunde:</td>
          <td>{{kunde}}</td>
        </tr>
        <tr>
          <td>Ansprechpartner Kunde:</td>
          <td>{{ansprechpartnerKunde}}</td>
        </tr>
        <tr>
          <td>Adresse Kunde:</td>
          <td>{{adresseKunde}}</td>
        </tr>
        <tr>
          <td>Startdatum:</td>
          <td>{{startdatum}}</td>
        </tr>
        <tr>
          <td>Enddatum:</td>
          <td>{{enddatum}}</td>
        </tr>
        <tr>
          <td>Kündigungsfrist:</td>
          <td>{{kuendigungsfrist}}</td>
        </tr>
        <tr>
          <td>Zahlungsziel PP:</td>
          <td>{{zahlungszielPP}}</td>
        </tr>
        <tr>
          <td>Zahlungsziel Kunde:</td>
          <td>{{zahlungszielKunde}}</td>
        </tr>
        <tr>
          <td>Vergütungssatz:</td>
          <td>{{verguetungssatz}}</td>
        </tr>
        <tr>
          <td>EK-Preis:</td>
          <td>{{ek}}</td>
        </tr>
        <tr>
          <td>VK-Preis:</td>
          <td>{{vk}}</td>
        </tr>
       <tr>
         <td>Auslastung:</td>
         <td>{{auslastung}}</td>
       </tr>
       <tr>
         <td>Einsatzort:</td>
         <td>{{einsatzort}}</td>
       </tr>
        <tr>
          <td>Position:</td>
          <td>{{position}}</td>
        </tr>
        <tr>
          <td>Aufgabenbeschreibung:</td>
          <td>{{aufgabenbeschreibung}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="btn weiter-button-gen" v-bind:class="{'weiter-button': !confirmed, 'btn-primary': confirmed}" @click="goToChooseTemplate"><b>Weiter</b></button><br />
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout()"><b>Logout</b></button>
</template>

<script>
import router from "@/router";
import BackendService from "@/services/BackendService";
import {logout} from "@/firebase-config";

export default {
  name: 'MatchIDInput',
  data() {
    return {
      // Helfer-Variablen
      matchIdFromInput: "",
      matches: [],
      confirmed: false,
      isLoading: false,

      // Variablen zur Datenverarbeitung
      projektpartnerName: "",
      wematchAnsprechpartnerName: "",
      projektpartnerMail: "",
      wematchAnsprechpartnerMail: "",
      adresseKundeStr: "",
      adresseKundeCity: "",
      adresseKunde: "",
      startdatum: "",
      enddatum: "",
      ek: "",
      vk: "",
      ppGesellschaft: "",
      kunde: "",
      kuendigungsfrist: "",
      zahlungszielPP: "",
      zahlungszielKunde: "",
      verguetungssatz: "",
      einsatzort: "",
      position: "",
      aufgabenbeschreibung: "",
      ansprechpartnerKunde: "",
      ppStreet: "",
      ppCity: "",
      ppAdresse: "",
      auslastung: "",
      tageProWoche: "",
      stundenProTag: "",

    }
  },
  methods: {
    getMatch() {
      this.isLoading = true;
      setTimeout(() => {
        BackendService.getMatch(this.matchIdFromInput).then((response) => {
          this.matches = response.data;

          if (this.matches.includes("DOCTYPE html")){
            alert("Die Match-ID ist nicht korrekt. Bitte gib die ID erneut ein.");
            console.log(this.matches);
            this.isLoading = false;
          } else {
            this.confirmClick();

            this.projektpartnerName = this.matches.at(0) + " " + this.matches.at(1);
            this.wematchAnsprechpartnerName = this.matches.at(9) + " " + this.matches.at(10);
            this.adresseKundeStr = this.matches.at(15) + ", " + this.matches.at(16);
            this.adresseKundeCity = this.matches.at(18) + " " + this.matches.at(17);
            this.adresseKunde = this.adresseKundeStr + ", " + this.adresseKundeCity;
            this.startdatum = this.dateFormatter(this.matches.at(11));
            this.enddatum = this.dateFormatter(this.matches.at(12));
            this.ek = this.preisFormatter(this.matches.at(6));
            this.vk = this.preisFormatter(this.matches.at(7));
            this.ansprechpartnerKunde = this.matches.at(24) + " " + this.matches.at(25);
            this.ppGesellschaft = this.matches.at(2);
            this.kunde = this.matches.at(14);
            this.kuendigungsfrist = this.matches.at(19);
            this.zahlungszielPP = this.matches.at(3);
            this.zahlungszielKunde = this.matches.at(4);
            this.verguetungssatz = this.matches.at(5);
            this.einsatzort = this.matches.at(21);
            this.position = this.matches.at(13);
            this.aufgabenbeschreibung = this.matches.at(8);
            this.ppStreet = this.matches.at(26) + " " + this.matches.at(27);
            this.ppCity = this.matches.at(28) + " " + this.matches.at(29);
            this.tageProWoche = this.matches.at(30);
            this.stundenProTag = this.matches.at(31);

            this.auslastung = this.stundenProTag * this.tageProWoche + " Stunden pro Woche";

            localStorage.setItem('match', this.matches);
            localStorage.setItem('projektpartnerName', this.projektpartnerName);
            localStorage.setItem('wematchAnsprechpartnerName', this.wematchAnsprechpartnerName)
            localStorage.setItem('projektpartnerMail', this.matches.at(22));
            localStorage.setItem('wematchAnsprechpartnerMail', this.matches.at(23));
            localStorage.setItem('startdatum', this.startdatum);
            localStorage.setItem('enddatum', this.enddatum);
            localStorage.setItem('adresseKundeStr', this.adresseKundeStr);
            localStorage.setItem('adresseKundeCity', this.adresseKundeCity);
            localStorage.setItem('ppGesellschaft', this.ppGesellschaft);
            localStorage.setItem('kunde', this.kunde);
            localStorage.setItem('kuendigungsfrist', this.kuendigungsfrist);
            localStorage.setItem('zahlungszielPP', this.zahlungszielPP);
            localStorage.setItem('zahlungszielKunde', this.zahlungszielKunde);
            localStorage.setItem('verguetungssatz', this.verguetungssatz);
            localStorage.setItem('einsatzort', this.einsatzort);
            localStorage.setItem('position', this.position);
            localStorage.setItem('aufgabenbeschreibung', this.aufgabenbeschreibung);
            localStorage.setItem('ek', this.ek);
            localStorage.setItem('vk', this.vk);
            localStorage.setItem('ansprechpartnerKunde', this.ansprechpartnerKunde);
            localStorage.setItem('matchID', this.matchIdFromInput);
            localStorage.setItem('ppStreet', this.ppStreet);
            localStorage.setItem('ppCity', this.ppCity);
            localStorage.setItem('auslastung', this.auslastung);

            this.ppAdresse = this.ppStreet + ", " + this.ppCity;

            console.log(this.matches);
            this.isLoading = false;
          }
        });
      }, 3000);
    },

    confirmClick() {
      this.confirmed = true;
    },

    goToChooseTemplate() {
      const legalMail = "j.scharf@wematch.de";
      const userMail = localStorage.getItem("userMail");
      if(userMail === legalMail){
        console.log("User: " + userMail);
        router.push('chooseTemplateType');
      } else {
        router.push('chooseTemplate');
      }
    },
    logout(){
      const userEmail = localStorage.getItem("userMail");
      const token = localStorage.getItem("token");
      logout(userEmail, token);
      localStorage.clear();
    },
    dateFormatter(timestamp){
        const date = new Date(parseInt(timestamp));
        return date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
    },
    preisFormatter(preis){
      let formatedValue = preis.toString().replace(/\./g, ',');
      if (formatedValue.indexOf(',') !== -1) {
        const nachkomma = formatedValue.split(',')[1].length;
        if(nachkomma === 1){
          formatedValue = formatedValue + "0";
        } else if(nachkomma === 0) {
          formatedValue += "00";
        }
      }
      return formatedValue;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.secondtitle {
  font-size: 0.8rem;
}

td {
  width: fit-content;
  padding-right: 10px;
}

h2 {
  font-size: 1.5rem;
}

#logoutButton {
  position: fixed;
  top: 10px;
  right: 10px;
}

.input-group {
  width: 300px;
  margin: 0 auto;
}

.btn-primary {
  background-color: #007772;
  border-color: #007772;
}

.btn-primary:hover {
  background-color: transparent;
}

.btn-primary:active {
  box-shadow: #007772;
}

.btn-outline-primary {
  color: #007772;
  border-color: #007772;
}

.btn-outline-primary:hover {
  color: white;
  background-color: #007772;
}

.valueTable {
  text-align: left;
}

.weiter-button {
  background-color: transparent;
  border-color: #007772;
  color: #007772;
  pointer-events: none;
}

.weiter-button-gen {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/*Pre-generated*/

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
