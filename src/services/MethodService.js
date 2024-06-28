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
    console.log(name);
    if(name!= null){
        const [firstName, lastName] = name.split(" ");
        var mail = `${firstName[0].toLowerCase()}.${lastName.toLowerCase()}@wematch.de`;
        localStorage.setItem('absenderMail',mail);
        console.log(mail);
        return mail;
    }
    return "";
}

/**
 * Prüft die Variable verguetungssatz und setzt den Wert der entsprechenden Variable stundensatz, tagessatz oder festpreis auf den ek (Einkaufspreis).
 * Die anderen Variablen bleiben beim Wert "X".
 */
function verguetungssatzSwitchPP(){
    localStorage.setItem("match:stundensatz", "X");
    localStorage.setItem("match:tagessatz", "X");
    localStorage.setItem("match:festpreis", "X");

    let ek = localStorage.getItem("match:ek");

    switch (localStorage.getItem('match:verguetungssatz')){
        case "Stundensatz":
            localStorage.setItem("match:stundensatz", ek);
            break;
        case "Tagessatz":
            localStorage.setItem("match:tagessatz", ek);
            break;
        case "Festpreis":
            localStorage.setItem("match:festpreis", ek);
            break;
        default:
            break;
    }
}

function verguetungssatzSwitchKunde(){
    localStorage.setItem("match:stundensatz", "X");
    localStorage.setItem("match:tagessatz", "X");
    localStorage.setItem("match:festpreis", "X");

    let vk = localStorage.getItem("vk");

    switch (localStorage.getItem('match:verguetungssatz')){
        case "Stundensatz":
            localStorage.setItem("match:stundensatz", vk);
            break;
        case "Tagessatz":
            localStorage.setItem("match:tagessatz", vk);
            break;
        case "Festpreis":
            localStorage.setItem("match:festpreis", vk);
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

    switch (localStorage.getItem("match:kuendigungsfrist")) {
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
    localStorage.setItem("match:kuendigungsfirstEnglisch", kuendigungsfristEnglisch);
}

/*function calculateTermination() {

    var terminationdate;

   switch (localStorage.getItem("kuendigungsfrist")){
       case "Keine":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate());
           break;
       case "0 Tage":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate());
           break;
       case "5 Tage":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate() + 5);
           break;
       case "7 Tage":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate() + 7);
           break;
       case "14 Tage":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate() + 14);
           break;
       case "14 Tage zum Monatsende":
           terminationdate = new Date();
           terminationdate = terminationdate.setDate(terminationdate.getDate() + );
           break;
       case "28 Tage":
           terminationdate = "28 days";
           break;
       case "30 Tage":
           terminationdate = "30 days";
           break;
       case "6 Wochen":
           terminationdate = "6 weeks";
           break;
       case "90 Tage":
           terminationdate = "90 days";
           break;
   }
   }

}*/

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
        "ppGesellschaft: " + localStorage.getItem('match:ppGesellschaft') + '\n' +
        "projektpartnerName: " + localStorage.getItem('match:projektpartnerName') + '\n' +
        "ppStreet: " + localStorage.getItem('match:ppStreet') + '\n' +
        "ppCity: " + localStorage.getItem('match:ppCity') + '\n' +
        "wematchAnsprechpartnerName: " + localStorage.getItem('match:wematchAnsprechpartnerName') + '\n' +
        "matchID: " + localStorage.getItem('match:matchID') + '\n' +
        "tagessatz: " + localStorage.getItem('match:tagessatz') + '\n' +
        "stundensatz: " + localStorage.getItem('match:stundensatz') + '\n' +
        "festpreis: " + localStorage.getItem('match:festpreis') + '\n' +
        "startdatum: " + localStorage.getItem('match:startdatum') + '\n' +
        "enddatum: " + localStorage.getItem('match:enddatum') + '\n' +
        "kuendigungsfrist: " + localStorage.getItem('match:kuendigungsfrist') + '\n' +
        "kuendigungsfristEnglisch: " + localStorage.getItem('match:kuendigungsfristEnglisch') + '\n' +
        "kunde: " + localStorage.getItem('match:kunde') + '\n' +
        "adresseKundeStr: " + localStorage.getItem('match:adresseKundeStr') + '\n' +
        "adresseKundeCity: " + localStorage.getItem('match:adresseKundeCity') + '\n' +
        "ccName: " + localStorage.getItem('match:ccName') + '\n' +
        "einsatzort: " + localStorage.getItem('match:einsatzort') + '\n' +
        "position: " + localStorage.getItem('match:position') + '\n' +
        "aufgabenbeschreibung: " + localStorage.getItem('match:aufgabenbeschreibung')

    );
}

//ToDO: Logik ändern
function getPPName() {
    if(localStorage.getItem("match:ppGesellschaft") == null || localStorage.getItem("match:ppGesellschaft") == ""){
        return localStorage.getItem("match:projektpartnerName");
    } else {
        return localStorage.getItem("match:ppGesellschaft") + " Projektinhaber: " + localStorage.getItem("match:projektpartnerName");
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
                "&Adresse1=" + encodeURIComponent(localStorage.getItem('match:ppStreet')) +
                "&Adresse2=" + encodeURIComponent(localStorage.getItem('match:ppCity'));
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfrist')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfristEnglisch')) +

                "&Endkunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&Endkunde_Adresse=" + localStorage.getItem('match:adresseKundeStr') + " " + localStorage.getItem('match:adresseKundeCity') +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&addAgreements=" + encodeURIComponent(localStorage.getItem('match:addAgreements')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
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

                "&Kunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('match:adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('match:adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('match:ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfrist')) +

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("Nach Abschätzung") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Kunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('match:adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('match:adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('match:ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfrist')) +

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("Nach Abschätzung") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Kunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('match:adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('match:adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('match:ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfristEng')) +

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("after estimation") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
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

                "&Kunde=" + encodeURIComponent(localStorage.getItem('match:kunde')) +
                "&KundeAdresse1=" + encodeURIComponent(localStorage.getItem('match:adresseKundeStr')) +
                "&KundeAdresse2=" + encodeURIComponent(localStorage.getItem('match:adresseKundeCity')) +

                "&Wematch_Ansprechpartner=" + encodeURIComponent(localStorage.getItem('match:wematchAnsprechpartnerName')) +
                "&Ansprechpartner_Kunde=" + encodeURIComponent(localStorage.getItem('match:ansprechpartnerKunde')) +
                "&MatchID=" + encodeURIComponent(localStorage.getItem('match:matchID')) +

                "&Tagessatz=" + encodeURIComponent(localStorage.getItem('match:tagessatz')) +
                "&Stundensatz=" + encodeURIComponent(localStorage.getItem('match:stundensatz')) +
                "&Festpreis=" + encodeURIComponent(localStorage.getItem('match:festpreis')) +

                "&Startdatum=" + encodeURIComponent(localStorage.getItem('match:startdatum')) +
                "&Enddatum=" + encodeURIComponent(localStorage.getItem('match:enddatum')) +
                "&Kuendigungsfrist=" + encodeURIComponent(localStorage.getItem('match:kuendigungsfristEng')) +

                "&PPName=" + encodeURIComponent(ppNameLocal) +
                "&Auslastung=" + encodeURIComponent("after estimation") +
                "&Einsatzort=" + encodeURIComponent(localStorage.getItem('match:einsatzort')) +

                "&Position=" + encodeURIComponent(localStorage.getItem('match:position')) +
                "&Aufgabenbeschreibung=" + encodeURIComponent(localStorage.getItem('match:aufgabenbeschreibung').replace(/(\r\n|\n|\r)/gm, " "))
            ;
            window.open(finalURL, "_blank");
        });

}


//EV Kunde - DOCX
function docxEvk(){
    let ppNameLocal = getPPName();
    let data = [
        localStorage.getItem("match:matchID"),
        ppNameLocal,
        localStorage.getItem("match:wematchAnsprechpartnerName"),
        localStorage.getItem("match:startdatum"),
        localStorage.getItem("match:enddatum"),
        localStorage.getItem("match:adresseKundeStr"),
        localStorage.getItem("match:adresseKundeCity"),
        localStorage.getItem("match:kunde"),
        localStorage.getItem("match:kuendigungsfrist"),
        localStorage.getItem("match:einsatzort"),
        localStorage.getItem("match:position"),
        localStorage.getItem("match:ansprechpartnerKunde"),
        localStorage.getItem("match:tagessatz"),
        localStorage.getItem("match:stundensatz"),
        localStorage.getItem("match:festpreis"),
        localStorage.getItem("match:auslastung"),
        localStorage.getItem("match:auslastungEng"),
        localStorage.getItem("match:aufgabenbeschreibung"),
        localStorage.getItem("match:addAgreements"),
    ]

    BackendService.postDocData(localStorage.getItem("docId"), data).then(response => {
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
export { cevk2 };
export { cevkEng2 };
export { absenderMail };
//export{ calculateTermination };
