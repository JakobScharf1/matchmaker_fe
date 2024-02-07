import BackendService from "@/services/BackendService";

function verguetungssatzSwitch(verguetungssatz, stundensatz, tagessatz, festpreis){
    var ek = "";
    switch (verguetungssatz){
        case "Stundensatz":
            ek = stundensatz;
            break;
        case "Tagessatz":
            ek = tagessatz;
            break;
        case "Festpreis":
            ek = festpreis;
            break;
    }
    return ek;
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

function crvpp(ccName, ccMail){
    let finalURL = "";
    BackendService.getPowerForm("c-rv-pp")
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

export { verguetungssatzSwitch };
export { kuendigungsfristTranslator };
export { crvpp };