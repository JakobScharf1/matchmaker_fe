import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8081"

class BackendService{
    getMatch(matchId){
        console.log("Übermittelt match ID: " + matchId);
        return axios.get(BACKEND_BASE_URL + "/match/" + matchId);
    }
}

export default new BackendService()
