import BackendService from "@/services/BackendService";

// --- ChooseTemplate.vue ---
function verguetungssatzSwitch(verguetungssatz, stundensatz, tagessatz, festpreis, ek){
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

function kuendigungsfristTranslator(kuendigungsfristPP){
    var kuendigungsfristPPEnglisch = "";

    switch (kuendigungsfristPP) {
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
    return kuendigungsfristPPEnglisch;
}

// Rahmenvertrag Projektpartner
function crv(ccName, ccMail, docId){
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
function cevpp(ccName, ccMail, tagessatz, stundensatz, festpreis){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristPP')) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner - Engineering
function engevpp(ccName, ccMail, tagessatz, stundensatz, festpreis){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristPP')) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner - Projects
function projevpp(ccName, ccMail, tagessatz, stundensatz, festpreis){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristPP')) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch
function cevppEng(ccName, ccMail, tagessatz, stundensatz, festpreis, fristEng){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(fristEng) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch - Engineering
function engevppEng(ccName, ccMail, tagessatz, stundensatz, festpreis, fristEng){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(fristEng) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
        });
}

//EV Projektpartner Englisch - Projects
function projevppEng(ccName, ccMail, tagessatz, stundensatz, festpreis, fristEng){
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
                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(fristEng) +
                "&Tagessatz=" + encodeURIComponent(tagessatz) +
                "&Stundensatz=" + encodeURIComponent(stundensatz) +
                "&Festpreis=" + encodeURIComponent(festpreis) +
                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + ", " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +
                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " ")) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID'));
            window.open(finalURL, "_blank");
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