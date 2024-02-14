<template>
  <h2 for="MatchID">1. Bitte gib die ID des Matches ein</h2>
  <p class="secondtitle">Wenn du Fehler in den Werten unterhalb findest, ändere diese bitte in Bullhorn und gib dann die Match-ID erneut ein.<br />Sonst kannst du auch alle Felder gleich im Vertrag in DocuSign ändern.</p>
    <div class="input-group mb-3">
      <input v-model="matchIdFromInput" id="MatchID" type="number" name="Match ID" class="form-control" aria-describedby="basic-addon2" @keyup.enter="getMatch()">
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
         <td>{{localStorage.getItem('wematchAnsprechpartnerName')}}</td>
       </tr>
        <tr>
          <td>Projektpartner:</td>
          <td>{{localStorage.getItem('projektpartnerName')}}</td>
        </tr>
        <tr>
          <td>Projektpartner Gesellschaft:</td>
          <td>{{localStorage.getItem('ppGesellschaft')}}</td>
        </tr>
       <tr>
         <td>Projektpartner Adresse:</td>
         <td>{{localStorage.getItem('ppAdresse')}}</td>
       </tr>
        <tr>
          <td>Kunde:</td>
          <td>{{localStorage.getItem('kunde')}}</td>
        </tr>
        <tr>
          <td>Ansprechpartner Kunde:</td>
          <td>{{localStorage.getItem('ansprechpartnerKunde')}}</td>
        </tr>
        <tr>
          <td>Adresse Kunde:</td>
          <td>{{localStorage.getItem('adresseKunde')}}</td>
        </tr>
        <tr>
          <td>Startdatum:</td>
          <td>{{localStorage.getItem('startdatum')}}</td>
        </tr>
        <tr>
          <td>Enddatum:</td>
          <td>{{localStorage.getItem('enddatum')}}</td>
        </tr>
        <tr>
          <td>Kündigungsfrist:</td>
          <td>{{localStorage.getItem('kuendigungsfrist')}}</td>
        </tr>
        <tr>
          <td>Zahlungsziel PP:</td>
          <td>{{localStorage.getItem('zahlungszielPP')}}</td>
        </tr>
        <tr>
          <td>Zahlungsziel Kunde:</td>
          <td>{{localStorage.getItem('zahlungszielKunde')}}</td>
        </tr>
        <tr>
          <td>Vergütungssatz:</td>
          <td>{{localStorage.getItem('verguetungssatz')}}</td>
        </tr>
        <tr>
          <td>EK-Preis:</td>
          <td>{{localStorage.getItem('ek')}}</td>
        </tr>
        <tr>
          <td>VK-Preis:</td>
          <td>{{localStorage.getItem('vk')}}</td>
        </tr>
       <tr>
         <td>Auslastung:</td>
         <td>{{localStorage.getItem('auslastung')}}</td>
       </tr>
       <tr>
         <td>Einsatzort:</td>
         <td>{{localStorage.getItem('einsatzort')}}</td>
       </tr>
        <tr>
          <td>Position:</td>
          <td>{{localStorage.getItem('position')}}</td>
        </tr>
        <tr>
          <td>Aufgabenbeschreibung:</td>
          <td>{{localStorage.getItem('aufgabenbeschreibung')}}</td>
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
      matchIdFromInput: "",
      matches: [],
      confirmed: false,
      isLoading: false,
    }
  },
  methods: {
    logout,
    /**
     * Fragt die Daten eines Matches mit Hilfe des BackendServices ab und verarbeitet die Response.
     * Zeitgleich wird ein Timeout gesetzt, sodass bei zu langer Wartezeit der Vorgang abgebrochen wird.
     * Wenn als Rückgabe ein HTML-Code kommt, wird dieser anhang "DOCTYPE html" erkannt und es wird eine Fehlermeldung geworfen.
     * Sonst werden die Daten aus der Response den lokalen Variablen zugeordnet und in den localStorage geschrieben.
     */
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

            localStorage.setItem('match', this.matches);
            localStorage.setItem('projektpartnerName', this.matches.at(0) + " " + this.matches.at(1));
            localStorage.setItem('wematchAnsprechpartnerName', this.matches.at(9) + " " + this.matches.at(10))
            localStorage.setItem('projektpartnerMail', this.matches.at(22));
            localStorage.setItem('wematchAnsprechpartnerMail', this.matches.at(23));
            localStorage.setItem('startdatum', this.dateFormatter(this.matches.at(11)));
            localStorage.setItem('enddatum', this.dateFormatter(this.matches.at(12)));
            localStorage.setItem('adresseKundeStr', this.matches.at(15) + ", " + this.matches.at(16));
            localStorage.setItem('adresseKundeCity', this.matches.at(18) + " " + this.matches.at(17));
            localStorage.setItem('adresseKunde', this.matches.at(15) + ", " + this.matches.at(16) + ", " + this.matches.at(18) + " " + this.matches.at(17))
            localStorage.setItem('ppGesellschaft', this.matches.at(2));
            localStorage.setItem('kunde', this.matches.at(14));
            localStorage.setItem('kuendigungsfrist', this.matches.at(19));
            localStorage.setItem('zahlungszielPP', this.matches.at(3));
            localStorage.setItem('zahlungszielKunde', this.matches.at(4));
            localStorage.setItem('verguetungssatz', this.matches.at(5));
            localStorage.setItem('einsatzort', this.matches.at(21));
            localStorage.setItem('position', this.matches.at(13));
            localStorage.setItem('aufgabenbeschreibung', this.matches.at(8));
            localStorage.setItem('ek', this.preisFormatter(this.matches.at(6)));
            localStorage.setItem('vk', this.preisFormatter(this.matches.at(7)));
            localStorage.setItem('ansprechpartnerKunde', this.matches.at(24) + " " + this.matches.at(25));
            localStorage.setItem('matchID', this.matchIdFromInput);
            localStorage.setItem('ppStreet', this.matches.at(26) + " " + this.matches.at(27));
            localStorage.setItem('ppCity', this.matches.at(28) + " " + this.matches.at(29));
            localStorage.setItem('ppAdresse', this.matches.at(26) + " " + this.matches.at(27) + ", " + this.matches.at(28) + " " + this.matches.at(29))
            localStorage.setItem('auslastung', this.matches.at(31) * this.matches.at(30) + " Stunden pro Woche");

            console.log(this.matches);
            this.isLoading = false;
          }
        });
      }, 3000);
    },

    confirmClick() {
      this.confirmed = true;
    },

    /**
     * Wenn der Nutzer bei legalMail hinterlegt wurde, wird er zu chooseTemplateType weitergeleitet, weil der Nutzer,
     * berechtigt ist, auch Kundenverträge erstellen zu können. Wenn nicht, wird er normal zu chooseTemplate weitergeleitet und kann PP-Verträge erstellen.
     */
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

    /**
     * Das Datum aus dem response JSON wird in das deutsche Datumsformat umgewandelt.
     * @param timestamp Der Timestamp aus der response JSON.
     * @returns {string} Das umgewandelte Datum im deutschen Format.
     */
    dateFormatter(timestamp){
        const date = new Date(parseInt(timestamp));
        return date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
    },

    /**
     * Der Preis wird umformatiert, sodass er kein . sondern nur , enthält sowie wird ggf. 00 angehangen oder eine 0, wenn eine Nachkommstelle vorhanden ist.
     * @param preis Der gegebene Wert aus der response JSON.
     * @returns {string} Der umformatierte Wert im deutschen Format.
     */
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
