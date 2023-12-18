import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8081"

class BackendService{
    getMatch(matchId){
        console.log("Übermittelt match ID: " + matchId);
        const requestURI = BACKEND_BASE_URL + "/match/" + matchId;
        console.log("Übermittelt an: " + requestURI);
        return axios.get(requestURI);
    }
}

export default new BackendService()
