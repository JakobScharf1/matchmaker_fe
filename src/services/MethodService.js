import BackendService from "@/services/BackendService";

function sendHelpMail(){
    let subject = encodeURIComponent("Problem mit MatchMaker - MatchID: " + localStorage.getItem("matchID"));
    let body = encodeURIComponent("\n---\nmatch data: \n" +
        "Absender_UserName=" + localStorage.getItem('absenderName') + "\n" +
        "Absender_Email=" + localStorage.getItem('absenderMail') + "\n" +
        "Projektpartner_UserName=" + localStorage.getItem('empfaengerName') + "\n" +
        "Projektpartner_Email=" + localStorage.getItem('empfaengerMail') + "\n" +
        "CC_UserName=" + localStorage.getItem("ccName") + "\n" +
        "CC_Email=" + localStorage.getItem("ccMail") + "\n" +

        "Wematch_Ansprechpartner=" + localStorage.getItem('wematchAnsprechpartnerName') + "\n" +
        "PPName=" + localStorage.getItem('ppGesellschaft') + " " + localStorage.getItem('projektpartnerName') + "\n" +
        "MatchID=" + localStorage.getItem('matchID') + "\n" +

        "Tagessatz=" + localStorage.getItem('tagessatz') + "\n" +
        "Stundensatz=" + localStorage.getItem('stundensatz') + "\n" +
        "Festpreis=" + localStorage.getItem('festpreis') + "\n" +

        "Startdatum=" + localStorage.getItem('startdatum') + "\n" +
        "Enddatum=" + localStorage.getItem('enddatum') + "\n" +
        "Kuendigungsfrist=" + localStorage.getItem('kuendigungsfrist') + "\n" +

        "Endkunde=" + localStorage.getItem('kunde') + "\n" +
        "Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') + "\n" +
        "Einsatzort=" + localStorage.getItem('einsatzort') + "\n" +

        "Position=" + localStorage.getItem('position') + "\n" +
        "Aufgabenbeschreibung=" + localStorage.getItem('aufgabenbeschreibung')
    );
    let mailtoLink = "mailto:teamoperations@wematch.de?subject=" + subject + "&body=" + body;
    window.open(mailtoLink, '_blank');
}

/**
 * Prüft die Variable verguetungssatz und setzt den Wert der entsprechenden Variable stundensatz, tagessatz oder festpreis auf den ek (Einkaufspreis).
 * Die anderen Variablen bleiben beim Wert "X".
 */
function verguetungssatzSwitch(){
    localStorage.setItem("stundensatz", "X");
    localStorage.setItem("tagessatz", "X");
    localStorage.setItem("festpreis", "X");

    let ek = localStorage.getItem("ek");

    switch (localStorage.getItem('verguetungssatz')){
        case "Stundensatz":
            localStorage.setItem("stundensatz", ek);
            break;
        case "Tagessatz":
            localStorage.setItem("tagessatz", ek);
            break;
        case "Festpreis":
            localStorage.setItem("festpreis", ek);
            break;
        default:
            break;
    }
}

/**
 * Die Methode nimmt den Wert kuendigungsfrist und prüft, welcher Wert hinterlegt.
 * Entsprechend dem Wert, der hinterlegt ist wird das englischen Pendant in die Variable kuendigungsfristEnglisch geschrieben.
 */
function kuendigungsfristTranslator(){
    var kuendigungsfristEnglisch;

    switch (localStorage.getItem("kuendigungsfrist")) {
        case "Keine":
            kuendigungsfristEnglisch = "none";
            break;
        case "0 Tage":
            kuendigungsfristEnglisch = "0 days";
            break;
        case "5 Tage":
            kuendigungsfristEnglisch = "5 days";
            break;
        case "7 Tage":
            kuendigungsfristEnglisch = "7 days";
            break;
        case "14 Tage":
            kuendigungsfristEnglisch = "14 days";
            break;
        case "14 Tage zum Monatsende":
            kuendigungsfristEnglisch = "14 days to month end";
            break;
        case "28 Tage":
            kuendigungsfristEnglisch = "28 days";
            break;
        case "30 Tage":
            kuendigungsfristEnglisch = "30 days";
            break;
        case "6 Wochen":
            kuendigungsfristEnglisch = "6 weeks";
            break;
        case "90 Tage":
            kuendigungsfristEnglisch = "90 days";
            break;
    }
    localStorage.setItem("kuendigungsfirstEnglisch", kuendigungsfristEnglisch);
}

/**
 * Eine Test-Methode für die Prod-Umgebung, um zu schauen, ob alle Werte im localStorage korrekt übertragen wurden.
 */
function valueMappingTest(){
    console.log(
        "absenderName: " + localStorage.getItem('absenderName') + '\n' +
        "absenderMail: " + localStorage.getItem('absenderMail') + '\n' +
        "empfaengerName: " + localStorage.getItem('empfaengerName') + '\n' +
        "empfaengerMail: " + localStorage.getItem('empfaengerMail') + '\n' +
        "ccName: " + localStorage.getItem('ccName') + '\n' +
        "ccMail: " + localStorage.getItem('ccMail') + '\n' +
        "ppGesellschaft: " + localStorage.getItem('ppGesellschaft') + '\n' +
        "projektpartnerName: " + localStorage.getItem('projektpartnerName') + '\n' +
        "ppStreet: " + localStorage.getItem('ppStreet') + '\n' +
        "ppCity: " + localStorage.getItem('ppCity') + '\n' +
        "wematchAnsprechpartnerName: " + localStorage.getItem('wematchAnsprechpartnerName') + '\n' +
        "matchID: " + localStorage.getItem('matchID') + '\n' +
        "tagessatz: " + localStorage.getItem('tagessatz') + '\n' +
        "stundensatz: " + localStorage.getItem('stundensatz') + '\n' +
        "festpreis: " + localStorage.getItem('festpreis') + '\n' +
        "startdatum: " + localStorage.getItem('startdatum') + '\n' +
        "enddatum: " + localStorage.getItem('enddatum') + '\n' +
        "kuendigungsfrist: " + localStorage.getItem('kuendigungsfrist') + '\n' +
        "kuendigungsfristEnglisch: " + localStorage.getItem('kuendigungsfristEnglisch') + '\n' +
        "kunde: " + localStorage.getItem('kunde') + '\n' +
        "adresseKundeStr: " + localStorage.getItem('adresseKundeStr') + '\n' +
        "adresseKundeCity: " + localStorage.getItem('adresseKundeCity') + '\n' +
        "ccName: " + localStorage.getItem('ccName') + '\n' +
        "einsatzort: " + localStorage.getItem('einsatzort') + '\n' +
        "position: " + localStorage.getItem('position') + '\n' +
        "aufgabenbeschreibung: " + localStorage.getItem('aufgabenbeschreibung')

    );
}

/**
 * Alle nachfolgenden Methoden stellen mit Hilfe des BackendServices eine Anfrage an das Backend, um an den PowerForms-Link zu gelangen.
 * Anschließend werden an den erhaltenen Link alle benötigten Variablen aus dem localStorage angehangen und vorher encodiert, sodass die Übertragung per URI problemlos abläuft.
 * @param docId Beinhaltet die ID des zu erstellenden PDF-Dokuments (nur bei Rahmenverträgen (RV))
 */
// Rahmenvertrag Projektpartner
function crv(docId){
    let finalURL = "";
    BackendService.getPowerForm(docId)
        .then(response =>{
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Adresse1=" + encodeURIComponent(localStorage.getItem('ppStreet')) +
                "&Adresse2=" + encodeURIComponent(localStorage.getItem('ppCity'));
            window.open(finalURL, "_blank")
        });
}

//EV Projektpartner
function cevpp(){
    let finalURL = "";
    BackendService.getPowerForm("c-ev-pp")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner - Engineering
function engevpp(){
    let finalURL = "";
    BackendService.getPowerForm("eng-ev-pp")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner - Projects
function projevpp(){
    let finalURL = "";
    BackendService.getPowerForm("proj-ev-pp")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch
function cevppEng(){
    let finalURL = "";
    BackendService.getPowerForm("c-ev-pp-eng")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch - Engineering
function engevppEng(){
    let finalURL = "";
    BackendService.getPowerForm("eng-ev-pp-eng")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch - Projects
function projevppEng(){
    let finalURL = "";
    BackendService.getPowerForm("proj-ev-pp-eng")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Kunde
function cevk(){
    BackendService.getPowerForm("c-ev-k")
        .then(response => {
            this.finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Kunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Auslastung=" + encodeURIComponent(localStorage.getItem('auslastung')) +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(this.finalURL, "_blank");
        });
}

//EV Kunde Englisch
function cevkEng(){
    BackendService.getPowerForm("c-ev-k-eng")
        .then(response => {
            this.finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +

                "&Kunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEng')) +

                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Auslastung=" + encodeURIComponent(localStorage.getItem('auslastung')) +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(this.finalURL, "_blank");
        });
}


//EV Kunde - DOCX
function docxEvk(){
    let data = [
        localStorage.getItem("matchId"),
        localStorage.getItem("ppGesellschaft") + " " + localStorage.getItem("projektpartnerName"),
        localStorage.getItem("wematchAnsprechpartnerName"),
        localStorage.getItem("startdatum"),
        localStorage.getItem("enddatum"),
        localStorage.getItem("adresseKundeStr"),
        localStorage.getItem("adresseKundeCity"),
        localStorage.getItem("kunde"),
        localStorage.getItem("kuendigungsfrist"),
        localStorage.getItem("einsatzort"),
        localStorage.getItem("position"),
        localStorage.getItem("ansprechpartnerKunde"),
        localStorage.getItem("tagessatz"),
        localStorage.getItem("stundensatz"),
        localStorage.getItem("festpreis"),
        localStorage.getItem("auslastung"),
        localStorage.getItem("aufgabenbeschreibung")
    ]

    BackendService.postDocData("docxEv", data).then(response => {
            window.open(response.data.toString(), "_blank");
        }
    );
}

function docxEvPP() {

}

export { verguetungssatzSwitch };
export { kuendigungsfristTranslator };
export { crv };
export { cevpp };
export { cevppEng };
export { engevpp };
export { projevpp };
export { engevppEng };
export { projevppEng };
export { cevk };
export { valueMappingTest };
export { cevkEng };
export { docxEvk };
export { sendHelpMail };
export { docxEvPP };