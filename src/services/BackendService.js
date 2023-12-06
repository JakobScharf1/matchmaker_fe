import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8081"

class BackendService{
    getMatch(){
        return axios.get(BACKEND_BASE_URL + "/match");
    }
}

export default new BackendService()
