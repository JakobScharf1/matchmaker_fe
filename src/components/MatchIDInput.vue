<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>

  <p class="secondtitle">Wenn du Fehler in den Werten unterhalb findest, ändere diese bitte in Bullhorn und gib dann die Match-ID erneut ein.<br />Sonst kannst du auch alle Felder gleich im Vertrag in DocuSign ändern.</p>
    <div class="input-group mb-3">
      <div class="input-wrapper">
        <input placeholder="Match ID" v-model="matchIdFromInput" id="MatchID" type="number" name="Match ID" class="form-control" aria-describedby="basic-addon2" @keyup.enter="getMatch()">
        <button class="btn btn-primary" @click="getMatch()"><b>Bestätigen</b></button>
      </div>
    </div>
  <div class="loading-div">
    <dot-loader :loading="isLoading" :color="'#fff'"></dot-loader>
  </div>
  <div class="valueTable" v-if="!isLoading">
    <table>
      <tbody>
      <tr>
        <td>WeMatch Ansprechpartner:</td>
        <td v-if="confirmed">{{ wematchAnsprechpartnerName }}</td>
      </tr>
      <tr>
        <td>Projektpartner:</td>
        <td v-if="confirmed">{{ projektpartnerName }}</td>
      </tr>
      <tr>
        <td>Projektpartner Gesellschaft:</td>
        <td v-if="confirmed">{{ ppGesellschaft }}</td>
      </tr>
      <tr>
        <td>Projektpartner Adresse:</td>
        <td v-if="confirmed">{{ ppAdresse }}</td>
      </tr>
      <tr>
        <td>Kunde:</td>
        <td v-if="confirmed">{{ kunde }}</td>
      </tr>
      <tr>
        <td>Ansprechpartner Kunde:</td>
        <td v-if="confirmed">{{ ansprechpartnerKunde }}</td>
      </tr>
      <tr>
        <td>Adresse Kunde:</td>
        <td v-if="confirmed">{{ adresseKunde }}</td>
      </tr>
      <tr>
        <td>Startdatum:</td>
        <td v-if="confirmed">{{ startdatum }}</td>
      </tr>
      <tr>
        <td>Enddatum:</td>
        <td v-if="confirmed">{{ enddatum }}</td>
      </tr>
      <tr>
        <td>Kündigungsfrist:</td>
        <td v-if="confirmed">{{ kuendigungsfrist }}</td>
      </tr>
      <tr>
        <td>Zahlungsziel PP:</td>
        <td v-if="confirmed">{{ zahlungszielPP }}</td>
      </tr>
      <tr>
        <td>Zahlungsziel Kunde:</td>
        <td v-if="confirmed">{{ zahlungszielKunde }}</td>
      </tr>
      <tr>
        <td>Vergütungssatz:</td>
        <td v-if="confirmed">{{ verguetungssatz }}</td>
      </tr>
      <tr>
        <td>EK-Preis:</td>
        <td v-if="confirmed">{{ ek }}</td>
      </tr>
      <tr>
        <td>VK-Preis:</td>
        <td v-if="confirmed">{{ vk }}</td>
      </tr>
      <tr>
        <td>Auslastung:</td>
        <td v-if="confirmed">{{ auslastung }}</td>
      </tr>
      <tr>
        <td>Einsatzort:</td>
        <td v-if="confirmed">{{ einsatzort }}</td>
      </tr>
      <tr>
        <td>Position:</td>
        <td v-if="confirmed">{{ position }}</td>
      </tr>
      <tr style="vertical-align:top">
        <td>Aufgabenbeschreibung:</td>
        <td v-if="confirmed">{{ aufgabenbeschreibung }}</td>
      </tr>
      <tr style="vertical-align:top">
        <td>Zusätzliche Vereinbarungen:</td>
        <td v-if="confirmed">{{ addAgreements }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <button class="btn btn-outline-primary weiter-button-gen" v-bind:class="{'weiter-button': !confirmed, 'btn-primary': confirmed}" @click="goToChooseTemplate"><b>Weiter</b></button><br />
  <div id="buttonContainer">
    <button id="helpButton" class="btn btn-outline-primary"><b>Problem melden</b></button>
    <button id="logoutButton" class="btn btn-primary" @click="logout()"><b>Logout</b></button>
  </div>
</template>

<script>
import router from "@/router";
import BackendService from "@/services/BackendService";
import {logout} from "@/firebase-config";
import {sendHelpMail} from "@/services/MethodService";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";


export default {
  name: 'MatchIDInput',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
      ],
      matchIdFromInput: "",
      matches: [],
      confirmed: false,
      isLoading: false,
      wematchAnsprechpartnerName: "",
      wematchAnsprechpartnerMail: "",
      projektpartnerName: "",
      projektpartnerMail: "",
      ppGesellschaft: "",
      ppAdresse: "",
      kunde: "",
      ansprechpartnerKunde: "",
      adresseKunde: "",
      startdatum: "",
      enddatum: "",
      kuendigungsfrist: "",
      zahlungszielPP: "",
      zahlungszielKunde: "",
      verguetungssatz: "",
      ek: "",
      vk: "",
      auslastung: "",
      auslastungEng: "",
      einsatzort: "",
      position: "",
      aufgabenbeschreibung: "",
      addAgreements: "",
      jobOwner: "",
      preFix: "",
      vkOnSite:"",
      hoursperDay:""
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
        BackendService.getBullhornData(this.matchIdFromInput).then((response) => {
          try {
              this.matches = response.data;
              this.confirmClick();

              localStorage.setItem('match', this.matches);
              localStorage.setItem('projektpartnerName', this.matches.at(0) + " " + this.matches.at(1));
              this.projektpartnerName = this.matches.at(0) + " " + this.matches.at(1);
              localStorage.setItem('wematchAnsprechpartnerName', this.matches.at(33));
              this.wematchAnsprechpartnerName = this.matches.at(33);
              localStorage.setItem('projektpartnerMail', this.matches.at(22));
              this.projektpartnerMail = this.matches.at(22)
              localStorage.setItem('wematchAnsprechpartnerMail', this.matches.at(23))
              this.wematchAnsprechpartnerMail = localStorage.getItem('wematchAnsprechpartnerMail');
              localStorage.setItem('startdatum', this.dateFormatter(this.matches.at(11)));
              this.startdatum = this.dateFormatter(this.matches.at(11));
              localStorage.setItem('enddatum', this.dateFormatter(this.matches.at(12)));
              this.enddatum = this.dateFormatter(this.matches.at(12));
              localStorage.setItem('adresseKundeStr', this.matches.at(15) + " " + this.matches.at(16));
              localStorage.setItem('adresseKundeCity', this.matches.at(18) + " " + this.matches.at(17));
              localStorage.setItem('adresseKunde', this.matches.at(15) + " " + this.matches.at(16) + " " + this.matches.at(18) + " " + this.matches.at(17))
              this.adresseKunde = this.matches.at(15) + " " + this.matches.at(16) + " " + this.matches.at(18) + " " + this.matches.at(17);
              localStorage.setItem('ppGesellschaft', this.matches.at(2));
              this.ppGesellschaft = this.matches.at(2);
              localStorage.setItem('kunde', this.matches.at(14));
              this.kunde = this.matches.at(14);
              localStorage.setItem('kuendigungsfrist', this.matches.at(19));
              this.kuendigungsfrist = this.matches.at(19);
              localStorage.setItem('zahlungszielPP', this.matches.at(3));
              this.zahlungszielPP = this.matches.at(3);
              localStorage.setItem('zahlungszielKunde', this.matches.at(4) + " Tage");
              this.zahlungszielKunde = this.matches.at(4);
              localStorage.setItem('verguetungssatz', this.matches.at(5));
              this.verguetungssatz = this.matches.at(5);
              localStorage.setItem('einsatzort', this.matches.at(21));
              this.einsatzort = this.matches.at(21);
              localStorage.setItem('position', this.matches.at(13));
              this.position = this.matches.at(13);
              localStorage.setItem('aufgabenbeschreibung', this.matches.at(8));
              this.aufgabenbeschreibung = this.matches.at(8);
              localStorage.setItem('ek', this.preisFormatter(this.matches.at(6)));
              this.ek = this.preisFormatter(this.matches.at(6));
              localStorage.setItem('vk', this.preisFormatter(this.matches.at(7)));
              this.vk = this.preisFormatter(this.matches.at(7))
              localStorage.setItem('ansprechpartnerKunde', this.matches.at(24) + " " + this.matches.at(25));
              this.ansprechpartnerKunde = this.matches.at(24) + " " + this.matches.at(25);
              localStorage.setItem('matchID','EZ-' + this.matchIdFromInput);
              localStorage.setItem('ppStreet', this.matches.at(26) + " " + this.matches.at(27));
              localStorage.setItem('ppCity', this.matches.at(28) + " " + this.matches.at(29));
              localStorage.setItem('ppAdresse', this.matches.at(26) + " " + this.matches.at(27) + ", " + this.matches.at(28) + " " + this.matches.at(29))
              this.ppAdresse = this.matches.at(26) + " " + this.matches.at(27) + ", " + this.matches.at(28) + " " + this.matches.at(29)
              localStorage.setItem('auslastung', this.matches.at(31) * this.matches.at(30) + " Stunden pro Woche");
              this.auslastung = this.matches.at(31) * this.matches.at(30) + " Stunden pro Woche";
              localStorage.setItem('auslastungEng', this.matches.at(31) * this.matches.at(30) + " Hours per week");
              this.auslastungEng = this.matches.at(31) * this.matches.at(30) + " Hours per week";
              localStorage.setItem('addAgreements', this.matches.at(32));
              this.addAgreements = this.matches.at(32);
              localStorage.setItem('jobOwnerFirstName', this.matches.at(33));
              this.jobOwner = this.matches.at(33);
              localStorage.setItem('preFix', this.matches.at(34));
              this.preFix= this.matches.at(34);
              localStorage.setItem('vkOnSite', this.preisFormatter(this.matches.at(35)));
              this.vkOnSite = this.matches.at(35);
              localStorage.setItem('hoursperDay', this.matches.at(31));
              this.hoursperDay = this.matches.at(31);
              localStorage.setItem('prefixKunde', this.matches.at(36));
              localStorage.setItem('umbrellaMail', this.matches.at(37));
              localStorage.setItem('einstellungsArt', this.matches.at(38));

              this.isLoading = false;
          } catch(error) {
            alert("Die Match-ID ist nicht korrekt. Bitte gib die ID erneut ein.");
            this.isLoading = false;
          }
        });
      }, 3000);
    },

    confirmClick() {
      this.confirmed = true;
    },

    /**
     * Folgende Permissons haben folgende Zugriffe:
     * Permission 1:  Nutzer haben ausschließlich Zugriff auf die Erstellung von Projektpatner-Verträgen, die über DocuSing versendet werden.
     * Permission 2: Nutzer haben Zugriff auf die Erstellung von Kundenverträgen. Dabei sind folgende Vertragsarten inkludiert: Docx-Verträge, DocuSing-Verträge, Angebote und Kündingungen ( für Projektparnter als auch Kunden)
     * Permission 3: Nutzer haben Zugriff auf die Erstellung von Projektpartnerverträgen sowie Angeboten.
     */
    goToChooseTemplate() {
      if (localStorage.getItem('permission') === "2") {
        router.push('/format');
      } else if (localStorage.getItem('permission') === "3"){
        router.push('/leaders/type');
      } else {
        localStorage.setItem("vertragsart","Projektpartner")
        router.push('/consultants/docusign');
      }
    },

    /**
     * Das Datum aus dem response JSON wird in das deutsche Datumsformat umgewandelt.
     * @param timestamp Der Timestamp aus der response JSON.
     * @returns {string} Das umgewandelte Datum im deutschen Format.
     */
    dateFormatter(timestamp) {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
    },

    /**
     * Der Preis wird umformatiert, sodass er kein . sondern nur , enthält sowie wird ggf. 00 angehangen oder eine 0, wenn eine Nachkommstelle vorhanden ist.
     * @param preis Der gegebene Wert aus der response JSON.
     * @returns {string} Der umformatierte Wert im deutschen Format.
     */
    preisFormatter(preis) {
      let formatedValue = preis.toString().replace(/\./g, ',');
      if (formatedValue.indexOf(',') !== -1) {
        const nachkomma = formatedValue.split(',')[1].length;
        if (nachkomma === 1) {
          formatedValue = formatedValue + "0";
        } else if (nachkomma === 0) {
          formatedValue += "00";
        }
      }
      return formatedValue;
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

.error {
  color: red;
  margin-top: 15px;
}

.secondtitle {
  font-size: 0.8rem;
}

td {
  width: fit-content;
  padding-right: 10px;
}

.input-wrapper {
  display: flex;
  width: 100%;
}

.input-wrapper input {
  flex: 1;
  margin-right: 2px;
}

.input-wrapper button {
  flex: 1;
  padding-left: 20px!important;
  padding-right: 20px!important;
}

.input-group {
  width: 300px;
  margin: 0 auto;
}

.input-group input {
  border-radius: 0;
}

.btn-primary:active {
  box-shadow: #fff;
}

.valueTable {
  text-align: left;
}

.weiter-button {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
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
