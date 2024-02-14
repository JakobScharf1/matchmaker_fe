import axios from "axios";

class BackendService{

    /**
     * Stellt eine Anfrage ans Backend, um die Match-Daten zu erhalten.
     * Hierbei wird eine Anfrage an matchmaker.wematch-intern.de/backend/match/xxx gestellt mit dem token im Body
     * @param matchId Die entsprechende MatchID
     * @returns {Promise<axios.AxiosResponse<any>>} Der Return enthält die Daten des entsprechenden Matches.
     */
    getMatch(matchId){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const requestURI = BACKEND_BASE_URL + "/match/" + matchId;
        const token = localStorage.getItem("token");
        const requestBody = {
            token: token
        }
        return axios.post(requestURI, requestBody);
    }

    /**
     * Stellt wie auch getMatch eine Anfrage ans Backend, jedoch an die URL matchmaker.wematch-intern.de/backend/powerforms/xxx
     * Ebenfalls mit dem token aus Firebase im Request Body.
     * @param powerFormId Die entsprechende ID der powerform, welche im Backend verarbeitet wird.
     * @returns {Promise<axios.AxiosResponse<any>>} Der Return-Wert enthält die PowerForms-URL.
     */
    getPowerForm(powerFormId){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const requestURI = BACKEND_BASE_URL + "/powerforms/" + powerFormId;
        const token = localStorage.getItem("token");
        const requestBody = {
            token: token
        }
        return axios.post(requestURI, requestBody);
    }

    /**
     * Die Methode stellt eine Anfrage an matchmaker.wematch-intern.de/backend/generateDoc mit der docID und der dataList im Body.
     * @param docId Die ID des Dokument das erstellt werden soll, die im Backend weiterverarbeitet wird, um die korrekte Methode auszuführen.
     * @param dataList Die Liste der Daten, die in das Dokument eingefügt werden soll bzw. die Match-Daten.
     * @returns {Promise<axios.AxiosResponse<any>>} Enthält die URL des erstellen DOCX-Dokuments.
     */
    postDocData(docId, dataList){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const token = localStorage.getItem("token");
        const requestBody = {
            docId: docId,
            dataList: dataList,
            token: token
        };
        const requestURI = BACKEND_BASE_URL + "/generateDoc";
        console.log("Übermittelt an: " + requestURI);
        return axios.post(requestURI, requestBody);
    }
}

export default new BackendService()
