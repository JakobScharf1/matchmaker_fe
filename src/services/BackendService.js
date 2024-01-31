import axios from "axios";

const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
const token = localStorage.getItem("idToken");
const headers = {Authorization: "Bearer " + token};

class BackendService{
    getMatch(matchId){
        const requestURI = BACKEND_BASE_URL + "/match/" + matchId;
        console.log("Übermittelt an: " + requestURI);
        return axios.get(requestURI, {headers: headers});
    }

    getPowerForm(powerFormId){
        const requestURI = BACKEND_BASE_URL + "/powerforms/" + powerFormId;
        console.log("Übermittelt an: " + requestURI);
        return axios.get(requestURI, {headers: headers});
    }

    postDocData(docId, dataList){
        const requestData = [docId, dataList];
        const requestURI = BACKEND_BASE_URL + "/generateDoc";
        console.log("Übermittelt an: " + requestURI);
        return axios.post(requestURI, requestData);
    }
}

export default new BackendService()
