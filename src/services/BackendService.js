import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8081";
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
}

export default new BackendService()
