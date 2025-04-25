import axios from "axios";

class BackendService {
  async verifyUser() {
    try {
      const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
      const requestURI = BACKEND_BASE_URL + "/private/verifyUser";
      const token = localStorage.getItem("token");
      const requestBody = {
        token: token,
      };

      const response = await axios.post(requestURI, requestBody);
      if (response.data === 200) {
        console.log("200 - VerifyUser successful");
        return true;
      } else if (response.data === 403) {
        console.log("403 - VerifyUser unsuccessful");
        return false;
      }
    } catch (e) {
      console.log("error catch in verifyUser");
      throw new e();
    }
  }

  /**
   * Stellt eine Anfrage ans Backend, um die Match-Daten zu erhalten.
   * Hierbei wird eine Anfrage an matchmaker.wematch-intern.de/backend/match/xxx gestellt mit dem token im Body
   * @param dataId Die entsprechende MatchID
   * @param type "match" or "kunde" or "projektpartner"
   * @returns {Promise<axios.AxiosResponse<any>>} Der Return enthält die Daten des entsprechenden Matches.
   */
  async getSalesforceData(dataId) {
    try {
      const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
      const requestURI = BACKEND_BASE_URL + "/match/" + dataId;
      const token = localStorage.getItem("token");
      const requestBody = {
        token: token,
      };
      const response = await axios.post(requestURI, requestBody);

      return response;
    } catch (error) {
      console.log("Error in getMatch BackendService: ", error);
    }
  }

  async getConsultantNames() {
    try {
      const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
      const requestURI = BACKEND_BASE_URL + "/consultants/";
      const token = localStorage.getItem("token");
      const requestBody = {
        token: token,
      };
      const response = await axios.get(requestURI, requestBody);

      return response;
    } catch (error) {
      console.log("Error fetching consultant names: ", error);
    }
  }

  /**
   * Stellt wie auch getMatch eine Anfrage ans Backend, jedoch an die URL matchmaker.wematch-intern.de/backend/powerforms/xxx
   * Ebenfalls mit dem token aus Firebase im Request Body.
   * @param powerFormId Die entsprechende ID der powerform, welche im Backend verarbeitet wird.
   * @returns {Promise<axios.AxiosResponse<any>>} Der Return-Wert enthält die PowerForms-URL.
   */
  getPowerForm(powerFormId) {
    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
    const requestURI = BACKEND_BASE_URL + "/powerforms/" + powerFormId;
    const token = localStorage.getItem("token");
    const requestBody = {
      token: token,
    };
    return axios.post(requestURI, requestBody);
  }

  /**
   * Die Methode stellt eine Anfrage an matchmaker.wematch-intern.de/backend/generateDoc mit der docID und der dataList im Body.
   * @param docId Die ID des Dokument das erstellt werden soll, die im Backend weiterverarbeitet wird, um die korrekte Methode auszuführen.
   * @param dataList Die Liste der Daten, die in das Dokument eingefügt werden soll bzw. die Match-Daten.
   * @returns {Promise<axios.AxiosResponse<any>>} Enthält die URL des erstellen DOCX-Dokuments.
   */
  async postDocData(docId, dataList) {
    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
    const token = localStorage.getItem("token");
    const requestBody = {
      dataList: dataList,
      token: token,
    };
    const requestURI = BACKEND_BASE_URL + "/generateDocx/" + docId;
    console.log("Übermittelt an: " + requestURI);
    return axios.post(requestURI, requestBody);
  }

  async postDocDataOffer(docId, dataList) {
    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL;
    const token = localStorage.getItem("token");
    const requestBody = {
      dataList: dataList,
      token: token,
    };
    const requestURI = BACKEND_BASE_URL + "/generateDocxOffer/" + docId;
    console.log("Übermittelt an: " + requestURI);
    return axios.post(requestURI, requestBody);
  }
}

export default new BackendService();
