import BackendService from "@/services/BackendService";



function sendHelpMail(){
    let subject = encodeURIComponent("Problem mit MatchMaker - MatchID: " + localStorage.getItem("matchID"));
    let body = encodeURIComponent("\n---\nmatch data: \n" +
        "User Permission Level=" + localStorage.getItem( `permission`) + "\n" +
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
        "Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') + "\n" +
        "Einsatzort=" + localStorage.getItem('einsatzort') + "\n" +

        "Position=" + localStorage.getItem('position') + "\n" +
        "Aufgabenbeschreibung=" + localStorage.getItem('aufgabenbeschreibung')
    );
    let mailtoLink = "mailto:teamoperations@wematch.de?subject=" + subject + "&body=" + body;
    window.open(mailtoLink, '_blank');
}

function absenderMail(){
    const name= localStorage.getItem('wematchAnsprechpartnerName');
    if(name!= null){
        const [firstName, lastName] = name.split(" "),
            mail = `${firstName[0].toLowerCase()}.${lastName.toLowerCase()}@wematch.de`;
        return mail;
    }
}
function umbrellaMail(){
    if(localStorage.getItem('einstellungsArt') === "Umbrella"){
        const email = localStorage.getItem('umbrellaMail');
        console.log(email);
        localStorage.setItem('projektpartnerMail', email );

        return localStorage.getItem('projektpartnerMail');
    } else {
        return localStorage.getItem('projektpartnerMail');
    }
}

/**
 * Prüft die Variable verguetungssatz und setzt den Wert der entsprechenden Variable stundensatz, tagessatz oder festpreis auf den ek (Einkaufspreis).
 * Die anderen Variablen bleiben beim Wert "X".
 */
function verguetungssatzSwitchPP(){
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

function tagessatzAgent() {
    let vkRemote = localStorage.getItem("vk");
    let vkOnSite = localStorage.getItem("vkOnSite");
    console.log("Vk:" +vkOnSite);



    if ((vkRemote !== null || vkRemote !== "") && (vkOnSite === null || vkOnSite === "")) {
        localStorage.setItem("tagessatzRemote", vkRemote + "€");
        localStorage.setItem("tagessatzOnSite", "-");
        return { tagessatz: parseFloat(localStorage.getItem("stundensatzRemote")) };
    } else if ((vkRemote === null || vkRemote === "") && (vkOnSite !== null|| vkOnSite !== "")) {
        localStorage.setItem("tagessatzOnSite", vkOnSite + "€");
        localStorage.setItem("tagessatzRemote", "-");
        return { taggessatz: parseFloat(localStorage.getItem("stundensatzOnSite")) };
    } else if ((vkRemote !== null || vkRemote !== "") && (vkOnSite !== null|| vkOnSite !== "")) {
        localStorage.setItem("tagessatzOnSite", vkOnSite + "€");
        localStorage.setItem("tagessatzRemote", vkRemote + "€");
        return {
            stundensatzRemote: localStorage.getItem("tagessatzRemote"),
            stundensatzOnSite: localStorage.getItem("tagessatzOnSite")
        };
    }
    return null;
}

function stundensatzAgent() {
    let vkRemote = localStorage.getItem("vk");
    let vkOnSite = localStorage.getItem("vkOnSite");

    if ((vkRemote !== null || vkRemote !== "") && (vkOnSite === null || vkOnSite === "")) {
        localStorage.setItem("stundensatzRemote", vkRemote + "€");
        localStorage.setItem("stundensatzOnSite", "-");
        return { stundensatz: parseFloat(localStorage.getItem("stundensatzRemote")) };
    } else if ((vkRemote === null || vkRemote === "") && (vkOnSite !== null|| vkOnSite !== "")) {
        localStorage.setItem("stundensatzOnSite", vkOnSite + "€");
        localStorage.setItem("stundensatzRemote", "-");
        return { stundensatz: parseFloat(localStorage.getItem("stundensatzOnSite")) };
    } else if ((vkRemote !== null || vkRemote !== "") && (vkOnSite !== null|| vkOnSite !== "")) {
        localStorage.setItem("stundensatzOnSite", vkOnSite + "€");
        localStorage.setItem("stundensatzRemote", vkRemote + "€");
        return {
            stundensatzRemote: localStorage.getItem("stundensatzRemote"),
            stundensatzOnSite: localStorage.getItem("stundensatzOnSite")
        };
    }
    return null;
}

/*function calculateOfferPricewithDailyRate() {
    let tagessatz = stundensatzAgent();
    console.log(tagessatz);
    let projectDays = localStorage.getItem("projectDays");

    projectDays = projectDays !== null ? parseFloat(projectDays) : null;
    console.log(projectDays);
    let totalPrice = 0;


    if (tagessatz !== null) {
        if (tagessatz.stundensatz !== undefined) {

            totalPrice = projectDays * tagessatz.stundensatz;
        } else {

            totalPrice = (tagessatz.stundensatzRemote * projectDays) * (projectDays * tagessatz.stundensatzOnSite);
        }
    }

    totalPrice = totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    localStorage.setItem("gesamtPreis", totalPrice);
    console.log(totalPrice);
    return totalPrice;
}



function calculateOfferPricewithHourlyRate(){
    let vk = localStorage.getItem("vk");
    let vkOnSite = localStorage.getItem("vkOnSite");
    let hours = localStorage.getItem("projectHours");
    let remoteHours = localStorage.getItem("remoteHours");
    let onSiteHours = localStorage.getItem("OnSiteHours");

    vk = vk !== "" ? parseFloat(vk) : null;
    vkOnSite = vkOnSite !== "" ? parseFloat(vkOnSite) : null;
    hours = hours !== "" ? parseFloat(hours) : null;
    remoteHours = remoteHours !== 0 ? parseInt(remoteHours, 10) : 0;
    onSiteHours = onSiteHours !== 0 ? parseInt(onSiteHours, 10) : 0;

    let totalPrice = 0.00;
    if (vk === null && vkOnSite !== null) {
        totalPrice = vkOnSite * hours;

    } else if (vkOnSite === null && vk !== null) {
        totalPrice = vk * hours;

    } else if (vk !== null && vkOnSite !== null) {
        totalPrice = (vkOnSite * remoteHours) + (vkOnSite * onSiteHours);

    }
     totalPrice = totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    console.log(totalPrice);
    return localStorage.setItem("gesamtPreis", totalPrice);
}*/



function verguetungssatzSwitchKunde(){
    localStorage.setItem("stundensatz", "X");
    localStorage.setItem("tagessatz", "X");
    localStorage.setItem("festpreis", "X");

    let vk = localStorage.getItem("vk");

    switch (localStorage.getItem('verguetungssatz')){
        case "Stundensatz":
            localStorage.setItem("stundensatz", vk);
            break;
        case "Tagessatz":
            localStorage.setItem("tagessatz", vk);
            break;
        case "Festpreis":
            localStorage.setItem("festpreis", vk);
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

//ToDO: Logik ändern
function getPPName() {
    if(localStorage.getItem("ppGesellschaft") == null || localStorage.getItem("ppGesellschaft") == ""){
        return localStorage.getItem("projektpartnerName");
    } else {
        return localStorage.getItem("ppGesellschaft") + " Projektinhaber: " + localStorage.getItem("projektpartnerName");
    }
}

function ppTermination(){
    if(localStorage.getItem("ppGesellschaft" )== null || localStorage.getItem("ppGesellschaft") === ""){
        return localStorage.getItem("projektpartnerName");
    } else{

        return localStorage.getItem("ppGesellschaft");
    }
}

/**
 * Alle nachfolgenden Methoden stellen mit Hilfe des BackendServices eine Anfrage an das Backend, um an den PowerForms-Link zu gelangen.
 * Anschließend werden an den erhaltenen Link alle benötigten Variablen aus dem localStorage angehangen und vorher encodiert, sodass die Übertragung per URI problemlos abläuft.
 * @param docId Beinhaltet die ID des zu erstellenden PDF-Dokuments (nur bei Rahmenverträgen (RV))
 */
// Rahmenvertrag Projektpartner
function crv(docId){
    let finalURL = "";
    let ppNameLocal = getPPName();
    BackendService.getPowerForm(docId)
        .then(response =>{
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Projektpartner_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Projektpartner_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&CC_UserName=" + encodeURIComponent(localStorage.getItem("ccName")) +
                "&CC_Email=" + encodeURIComponent(localStorage.getItem("ccMail")) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Adresse1=" + encodeURIComponent(localStorage.getItem('ppStreet')) +
                "&Adresse2=" + encodeURIComponent(localStorage.getItem('ppCity'));
            window.open(finalURL, "_blank")
        });
}

//EV Projektpartner
function cevpp(){
    let finalURL = "";
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
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
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
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
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
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
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
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
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
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
    let ppNameLocal = getPPName();
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
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('adresseKundeStr') + " " + localStorage.getItem('adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//RV Kunde
function crvk(docId){
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
                "&PPName=" + encodeURIComponent(localStorage.getItem('kunde')) +
                "&Adresse1=" + encodeURIComponent(localStorage.getItem('adresseKundeStr')) +
                "&Adresse2=" + encodeURIComponent(localStorage.getItem('adresseKundeCity'));
            window.open(finalURL, "_blank")
        });
}

//EV Kunde
function cevk(docId){
    let finalURL = "";
    let ppNameLocal = getPPName();
    BackendService.getPowerForm(docId)
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Kunde_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Kunde_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
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

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("Nach Abschätzung") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

function cevk2(docId){
    let finalURL = "";
    let ppNameLocal = getPPName();
    let absenderMail = localStorage.getItem('absenderMail');
    BackendService.getPowerForm(docId)
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(absenderMail) +
                "&Kunde_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Kunde_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&Kunde2_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName2')) +
                "&Kunde2_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail2')) +
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

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("Nach Abschätzung") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });
}

//EV Kunde Englisch
function cevkEng(docId){
    let finalURL = "";
    let ppNameLocal = getPPName();
    BackendService.getPowerForm(docId)
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Kunde_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Kunde_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
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

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("after estimation") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });

}

function cevkEng2(docId){
    let finalURL = "";
    let ppNameLocal = getPPName();
    BackendService.getPowerForm(docId)
        .then(response => {
            finalURL = response.data.toString() +
                "&Absender_UserName=" + encodeURIComponent(localStorage.getItem('absenderName')) +
                "&Absender_Email=" + encodeURIComponent(localStorage.getItem('absenderMail')) +
                "&Kunde_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName')) +
                "&Kunde_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail')) +
                "&Kunde2_UserName=" + encodeURIComponent(localStorage.getItem('empfaengerName2')) +
                "&Kunde2_Email=" + encodeURIComponent(localStorage.getItem('empfaengerMail2')) +
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

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("after estimation") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });

}

function docxEvk(){
    let ppNameLocal = getPPName();
    let data = [
        localStorage.getItem("matchID"),
        ppNameLocal,
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
        localStorage.getItem("auslastungEng"),
        localStorage.getItem("aufgabenbeschreibung"),
        localStorage.getItem("addAgreements"),
        localStorage.getItem("ppStreet"),
        localStorage.getItem("ppCity"),
        localStorage.getItem("projektpartnerName"),//21
        localStorage.getItem("projectHours"),
        localStorage.getItem("remotePercentage"),
        localStorage.getItem("daysPerWeek"),
        localStorage.getItem("ppGesellschaft")
    ]

    BackendService.postDocData(localStorage.getItem("docId"), data).then(response => {
            window.open(response.data.toString(), "_blank");
        }
    );
}

function docxTermination() {
    let ppNameLocal = ppTermination();
    let data = [
        localStorage.getItem("matchID"),
        ppNameLocal,
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
        localStorage.getItem("auslastungEng"),
        localStorage.getItem("aufgabenbeschreibung"),
        localStorage.getItem("addAgreements"),
        localStorage.getItem("ppStreet"),
        localStorage.getItem("ppCity"),
        localStorage.getItem("projektpartnerName"),//21
        localStorage.getItem("projectHours"),
        localStorage.getItem("remotePercentage"),
        localStorage.getItem("daysPerWeek"),
        localStorage.getItem("ppGesellschaft"),
        localStorage.getItem("preFix")
    ]

    BackendService.postDocData(localStorage.getItem("docId"), data).then(response => {
            window.open(response.data.toString(), "_blank");
        }
    );
}
function docxOffer() {
    let ppNameLocal = getPPName();
    let data = [
        localStorage.getItem("matchID"),
        ppNameLocal,
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
        localStorage.getItem("auslastung"),
        localStorage.getItem("aufgabenbeschreibung"),
        localStorage.getItem("projectHours"),
        localStorage.getItem("gesamtPreis"),
        localStorage.getItem("selectedPerson"),
        localStorage.getItem("zahlungszielKunde"),
        localStorage.getItem("stundensatzOnSite"),
        localStorage.getItem("stundensatzRemote"),
        localStorage.getItem("projectDays"),
        localStorage.getItem("auslastung"),
        localStorage.getItem("tagessatzOnSite"),
        localStorage.getItem("tagessatzRemote"),
        localStorage.getItem("prefixKunde")
    ]

    BackendService.postDocDataOffer(localStorage.getItem("docId"), data).then(response => {
            window.open(response.data.toString(), "_blank");
        }
    );
}
export { verguetungssatzSwitchPP };
export { verguetungssatzSwitchKunde };
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
export { docxTermination };
export { cevk2 };
export { cevkEng2 };
export { absenderMail };
export { crvk };
//export { calculateOfferPricewithDailyRate };
export { docxOffer };
//export { calculateOfferPricewithHourlyRate };
export { stundensatzAgent };
export { tagessatzAgent };
export { umbrellaMail };
