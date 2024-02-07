import BackendService from "@/services/BackendService";


// --- ChooseTemplate.vue ---
function verguetungssatzSwitch(stundensatz, tagessatz, festpreis){
    var ek = "";
    switch (localStorage.getItem('verguetungssatz')){
        case "Stundensatz":
            stundensatz = ek;
            break;
        case "Tagessatz":
            tagessatz = ek;
            break;
        case "Festpreis":
            festpreis = ek;
            break;
        default:
            break;
    }
    return [stundensatz, tagessatz, festpreis];
}

function kuendigungsfristTranslator(kuendigungsfristPP){
    var kuendigungsfristPPEnglisch = "";

    switch (kuendigungsfristPP) {
        case "0 Tage":
            kuendigungsfristPPEnglisch = "0 days";
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
        case "30 Tage":
            kuendigungsfristPPEnglisch = "30 days";
            break;
        case "6 Wochen":
            kuendigungsfristPPEnglisch = "6 weeks";
            break;
        case "12 Wochen":
            kuendigungsfristPPEnglisch = "12 weeks";
            break;
    }
    return kuendigungsfristPPEnglisch;
}

function crv(ccName, ccMail, docId){
    let finalURL = "";
    BackendService.getPowerForm(docId)
        .then(response =>{
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('projektpartnerMail')) +
                "&CC_UserName=" + encodeURIComponent(ccName) +
                "&CC_Email=" + encodeURIComponent(ccMail) +
                "&PPName=" + encodeURIComponent(localStorage.getItem('ppGesellschaft')) + " " + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Adresse1=" + encodeURIComponent(localStorage.getItem('ppStreet')) +
                "&Adresse2=" + encodeURIComponent(localStorage.getItem('ppCity'));
            window.open(finalURL, "_blank")
        });
}

function cevpp(ccName, ccMail, tagessatz, stundensatz, festpreis){
    let finalURL = "";
    BackendService.getPowerForm("c-ev-pp")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('projektpartnerMail')) +
                "&CC_UserName=" + encodeURIComponent(ccName) +
                "&CC_Email=" + encodeURIComponent(ccMail) +
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

function cevppEng(ccName, ccMail, tagessatz, stundensatz, festpreis, fristEng){
    let finalURL = "";
    BackendService.getPowerForm("c-ev-pp")
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('wematchAnsprechpartnerMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('projektpartnerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('projektpartnerMail')) +
                "&CC_UserName=" + encodeURIComponent(ccName) +
                "&CC_Email=" + encodeURIComponent(ccMail) +
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