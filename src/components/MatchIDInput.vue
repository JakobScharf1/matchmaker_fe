<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>

  <p class="secondtitle">
    Wenn du Fehler in den Werten unterhalb findest, ändere diese bitte in
    Bullhorn und gib dann die Match-ID erneut ein.<br />Sonst kannst du auch
    alle Felder gleich im Vertrag in DocuSign ändern.
  </p>
  <div class="input-group mb-3">
    <div class="input-wrapper">
      <input
        placeholder="Match ID"
        v-model="matchIdFromInput"
        id="MatchID"
        name="Match ID"
        class="form-control"
        aria-describedby="basic-addon2"
        @keyup.enter="getMatch()"
      />
      <button class="btn btn-primary" @click="getMatch()">
        <b>Bestätigen</b>
      </button>
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
        <tr style="vertical-align: top">
          <td>Aufgabenbeschreibung:</td>
          <td v-if="confirmed">{{ aufgabenbeschreibung }}</td>
        </tr>
        <tr style="vertical-align: top">
          <td>Zusätzliche Vereinbarungen:</td>
          <td v-if="confirmed">{{ addAgreements }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button
    class="btn btn-outline-primary weiter-button-gen"
    v-bind:class="{ 'weiter-button': !confirmed, 'btn-primary': confirmed }"
    @click="goToChooseTemplate"
  >
    <b>Weiter</b></button
  ><br />
</template>

<script>
import router from "@/router";
import BackendService from "@/services/BackendService";
import { logout } from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";
import { provide } from "vue";
import { useGlobalStore } from "@/stores/global";

export default {
  name: "MatchIDInput",
  components: { BreadCrumbs },
  setup() {
    provide("isLogin", false);
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: "ID-Input",
          path: this.$router.resolve({ name: "ID-Input" }).href,
        },
      ],
      gStore: useGlobalStore(),
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
      vkOnSite: "",
      hoursperDay: "",
    };
  },
  beforeMount() {
    this.gStore.updateIsLogin(false);
  },
  methods: {
    logout,
    /**
     * Fragt die Daten eines Matches mit Hilfe des BackendServices ab und verarbeitet die Response.
     * Zeitgleich wird ein Timeout gesetzt, sodass bei zu langer Wartezeit der Vorgang abgebrochen wird.
     * Wenn als Rückgabe ein HTML-Code kommt, wird dieser anhang "DOCTYPE html" erkannt und es wird eine Fehlermeldung geworfen.
     * Sonst werden die Daten aus der Response den lokalen Variablen zugeordnet und in den localStorage geschrieben.
     */
    async getMatch() {
      this.isLoading = true;
      setTimeout(async () => {
        await BackendService.getSalesforceData(this.matchIdFromInput).then(
          async (response) => {
            try {
              const responseData = JSON.parse(JSON.stringify(response.data));
              this.matches = responseData;
              console.log(this.matches);
              this.confirmClick();

              Object.entries(this.matches).forEach(([key, value]) => {
                localStorage.setItem(key, value);
              });

              this.projektpartnerName = [
                this.matches.candidateFirstName,
                this.matches.candidateLastName,
              ].join(" ");
              this.projektpartnerMail = this.matches.candidateEmail;

              this.wematchAnsprechpartnerName = [
                this.matches.ownerFirstName,
                this.matches.ownerLastName,
              ].join(" ");
              this.wematchAnsprechpartnerMail = this.matches.ownerEmail;
              this.startdatum = this.dateFormatter(this.matches.dateBegin);
              this.enddatum = this.dateFormatter(this.matches.dateEnd);

              // TODO: field mapping
              this.adresseKunde = "";
              this.ppGesellschaft = "";
              this.kunde = "";
              this.kuendigungsfrist = "";
              this.zahlungszielPP = "";
              this.zahlungszielKunde = "";
              this.verguetungssatz = "";
              this.einsatzort = "";
              this.position = "";
              this.aufgabenbeschreibung = "";
              this.ek = this.preisFormatter(this.matches.ek);
              this.vk = this.preisFormatter(this.matches.vk);
              this.ansprechpartnerKunde = "";
              this.ppAdresse = "";
              this.auslastung = " Stunden pro Woche";
              this.auslastungEng = " Hours per week";
              this.addAgreements = "";
              this.jobOwner = "";
              this.preFix = "";
              this.vkOnSite = "";
              this.hoursperDay = "";

              this.isLoading = false;
            } catch (error) {
              alert(
                "Die Match-ID ist nicht korrekt. Bitte gib die ID erneut ein."
              );
              this.isLoading = false;
            }
          }
        );
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
      // TODO implement permission based routing
      if (localStorage.getItem("permission") === "2") {
        router.push("/format");
      } else if (localStorage.getItem("permission") === "3") {
        router.push("/leaders/type");
      } else {
        localStorage.setItem("vertragsart", "Projektpartner");
        router.push("/consultants/docusign");
      }
    },

    /**
     * Das Datum aus dem response JSON wird in das deutsche Datumsformat umgewandelt.
     * @param timestamp Der Timestamp aus der response JSON.
     * @returns {string} Das umgewandelte Datum im deutschen Format.
     */
    dateFormatter(timestamp) {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    /**
     * Der Preis wird umformatiert, sodass er kein . sondern nur , enthält sowie wird ggf. 00 angehangen oder eine 0, wenn eine Nachkommstelle vorhanden ist.
     * @param preis Der gegebene Wert aus der response JSON.
     * @returns {string} Der umformatierte Wert im deutschen Format.
     */
    preisFormatter(preis) {
      let formattedValue = preis.toString().replace(/\./g, ",");

      if (formattedValue.includes(",")) {
        const decimalPartLength = formattedValue.split(",")[1].length;

        for (let i = decimalPartLength; i < 2; i++) {
          formattedValue += "0";
        }
      }

      return formattedValue;
    },
  },
};
</script>

<style scoped>
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
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.input-group {
  width: 300px;
  margin: 0 auto;
}

.input-group input {
  border-radius: 0;
  border: 0;
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
</style>
