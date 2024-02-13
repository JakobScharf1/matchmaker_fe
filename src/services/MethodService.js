import BackendService from "@/services/BackendService";

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

function kuendigungsfristTranslator(){
    var kuendigungsfristPPEnglisch;

    switch (localStorage.getItem("kuendigungsfristPP")) {
        case "Keine":
            kuendigungsfristPPEnglisch = "none";
            break;
        case "0 Tage":
            kuendigungsfristPPEnglisch = "0 days";
            break;
        case "5 Tage":
            kuendigungsfristPPEnglisch = "5 days";
            break;
        case "7 Tage":
            kuendigungsfristPPEnglisch = "7 days";
            break;
        case "14 Tage":
            kuendigungsfristPPEnglisch = "14 days";
            break;
        case "14 Tage zum Monatsende":
            kuendigungsfristPPEnglisch = "14 days to month end";
            break;
        case "28 Tage":
            kuendigungsfristPPEnglisch = "28 days";
            break;
        case "30 Tage":
            kuendigungsfristPPEnglisch = "30 days";
            break;
        case "6 Wochen":
            kuendigungsfristPPEnglisch = "6 weeks";
            break;
        case "90 Tage":
            kuendigungsfristPPEnglisch = "90 days";
            break;
    }
    localStorage.setItem("kuendigungsfirstPPEnglisch", kuendigungsfristPPEnglisch);
}

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

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

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