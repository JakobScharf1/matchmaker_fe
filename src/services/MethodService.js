import BackendService from "@/services/BackendService";
import {docxTypeToFields, contractTypeToFields, fieldNameToDocusignParameterName, helpMailFields} from "@/stores/PowerFormFields";

function getEncodedLocalStorageValue(key) {
    const value = localStorage.getItem(key);
    return value ? encodeURIComponent(value) : "";
}

function constructQueryParams(keys) {
    return keys
        .map(key => `${fieldNameToDocusignParameterName.get(key) || ""}=${getEncodedLocalStorageValue(key)}`)
        .join("&");
}

function openURL(url) {
    window.open(url, "_blank");
}

function handlePowerFormRequest(docId, additionalParams = "") {
    BackendService.getPowerForm(docId).then(response => {
        const baseURL = response.data.toString();
        openURL(`${baseURL}&${additionalParams}`);
    });
}

function constructEmailBody(keys) {
    return keys
        .map(key => `${key}=${localStorage.getItem(key) || ""}`)
        .join("\n");
}

function sendHelpMail() {
    const subject = encodeURIComponent(
        `Problem mit MatchMaker - MatchID: ${localStorage.getItem("matchID")}`
    );
    const body = encodeURIComponent(`\n---\nmatch data: \n${constructEmailBody(helpMailFields)}`);
    const mailtoLink = `mailto:teamoperations@wematch.de?subject=${subject}&body=${body}`;
    openURL(mailtoLink);
}

function umbrellaMail() {
    if (localStorage.getItem("einstellungsArt") === "Umbrella") {
        const email = localStorage.getItem("umbrellaMail");
        localStorage.setItem("projektpartnerMail", email);
    }
    return localStorage.getItem("projektpartnerMail");
}

function verguetungssatzSwitch(type) {
    localStorage.setItem("stundensatz", "X");
    localStorage.setItem("tagessatz", "X");
    localStorage.setItem("festpreis", "X");

    const value = localStorage.getItem(type === "PP" ? "ek" : "vk");
    const verguetungssatz = localStorage.getItem("verguetungssatz").toLowerCase();

    if (["stundensatz", "tagessatz", "festpreis"].includes(verguetungssatz)) {
        localStorage.setItem(verguetungssatz, value);
    }
}

function verguetungssatzSwitchPP(type) {
    verguetungssatzSwitch(type);
}

function kuendigungsfristTranslator() {
    const translations = {
        "Monatsende": "month end",
        "Tage": "days",
        "zum": "to",
        "Keine": "none",
        "Wochen": "weeks"
    };
    const kuendigungsfrist = localStorage.getItem("kuendigungsfrist");
    var kuendigungsfristEnglisch = kuendigungsfrist;
    for (const [key, value] of Object.entries(translations)) {
        if (kuendigungsfristEnglisch.includes(key)) {
            kuendigungsfristEnglisch = kuendigungsfristEnglisch.replace(key, value);
        }
    }
    localStorage.setItem("kuendigungsfristEnglisch", kuendigungsfristEnglisch);
}

function generatePowerForm(docId, exceptions) {
    const keys = contractTypeToFields.get(docId) || [];
    const queryParams = constructQueryParams(keys);
    const additionalParams = exceptions.map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}`
    ).join("&");
    const allParams = additionalParams ? `${queryParams}&${additionalParams}` : queryParams;
    handlePowerFormRequest(docId, allParams);
}

function setRates(remoteRate, onSiteRate, rateType) {
    const formattedRemoteRate = remoteRate ? `${remoteRate}€` : "-";
    const formattedOnSiteRate = onSiteRate ? `${onSiteRate}€` : "-";

    localStorage.setItem(`${rateType}Remote`, formattedRemoteRate);
    localStorage.setItem(`${rateType}OnSite`, formattedOnSiteRate);

    return {
        [`${rateType}Remote`]: formattedRemoteRate,
        [`${rateType}OnSite`]: formattedOnSiteRate,
    };
}

function generalRateAgent(rateType) {
    const vkRemote = localStorage.getItem("vk");
    const vkOnSite = localStorage.getItem("vkOnSite");
    return setRates(vkRemote || null, vkOnSite || null, rateType);
}

function tagessatzAgent() {
    return generalRateAgent("tagessatz");
}

function stundensatzAgent() {
    return generalRateAgent("stundensatz");
}

function calculateDailyPrice() {
    const vkRemote = parseFloat(localStorage.getItem("vk")) || null;
    const vkOnSite = parseFloat(localStorage.getItem("vkOnSite")) || null;

    const formatRate = (rate) =>
        rate
            ? (rate * 8).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + "€"
            : "-";

    const tagessatzRemote = formatRate(vkRemote);
    const tagessatzOnSite = formatRate(vkOnSite);

    localStorage.setItem("tagessatzRemote", tagessatzRemote);
    localStorage.setItem("tagessatzOnSite", tagessatzOnSite);

    return {
        tagessatzRemote,
        tagessatzOnSite,
    };
}

//ToDO: Logik ändern
function getPPName() {
    if (localStorage.getItem("ppGesellschaft") == null || localStorage.getItem("ppGesellschaft") == "") {
        return localStorage.getItem("projektpartnerName");
    } else {
        return localStorage.getItem("ppGesellschaft") + " Projektinhaber: " + localStorage.getItem("projektpartnerName");
    }
}

// function ppTermination() {
//     if (localStorage.getItem("ppGesellschaft") == null || localStorage.getItem("ppGesellschaft") === "") {
//         return localStorage.getItem("projektpartnerName");
//     } else {

//         return localStorage.getItem("ppGesellschaft");
//     }
// }

function cevpp() {
    generatePowerForm("c-ev-pp");
}

function crv() {
    generatePowerForm("c-rv");
}

function engevpp() {
    generatePowerForm("eng-ev-pp");
}

function projevpp() {
    generatePowerForm("proj-ev-pp");
}   

function cevppEng() {
    generatePowerForm("c-ev-pp-eng");
}   

function engevppEng() {
    generatePowerForm("eng-ev-pp-eng");
}

function crvk() {
    generatePowerForm("c-rv-kunde");
}

function cevk() {
    generatePowerForm("c-ev-kunde");
}

function cevk2() {
    generatePowerForm("c-ev-kunde", {
        Auslastung: "Nach Abschätzung",
    });
}

function cevkEng() {
    generatePowerForm("c-ev-kunde-eng", {
        PPName: getPPName(),
        Auslastung: "after estimation",
    });
}


function generalDocxOperation(type) {
    let ppNameLocal = getPPName();
    let fields = docxTypeToFields.get(type);
    let data = fields.map(field => localStorage.getItem(field));
    data.push(ppNameLocal);
    
    BackendService.postDocData(localStorage.getItem("docId"), data).then(response => {
        window.open(response.data.toString(), "_blank");
    }
    );
}

function docxContract() {
    generalDocxOperation("contract");
}

function docxTermination() {
    generalDocxOperation("termination");
}
function docxOffer() {
    generalDocxOperation("offer");

}

export { verguetungssatzSwitch };
export { verguetungssatzSwitchPP };
export { kuendigungsfristTranslator };
export { crv };
export { cevpp };
export { cevppEng };
export { engevpp };
export { projevpp };
export { engevppEng };
export { cevk };
export { cevkEng };
export { docxContract };
export { sendHelpMail };
export { docxTermination };
export { cevk2 };
// export { cevkEng2 };
export { crvk };
export { docxOffer };
export { stundensatzAgent };
export { tagessatzAgent };
export { umbrellaMail };
export { calculateDailyPrice };