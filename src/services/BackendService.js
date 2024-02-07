import axios from "axios";

class BackendService{

    getMatch(matchId){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const requestURI = BACKEND_BASE_URL + "/match/" + matchId;
        const token = localStorage.getItem("token");
        const requestBody = {
            token: token
        }
        return axios.post(requestURI, requestBody);
    }

    getPowerForm(powerFormId){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const requestURI = BACKEND_BASE_URL + "/powerforms/" + powerFormId;
        const token = localStorage.getItem("token");
        const requestBody = {
            token: token
        }
        return axios.post(requestURI, requestBody);
    }

    postDocData(docId, dataList){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
        const token = localStorage.getItem("token");
        docId
        dataList //TODO fertig machen
        BACKEND_BASE_URL
        token
    }
}

export default new BackendService()
