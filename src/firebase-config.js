import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";
import router from "@/router";

/**
 * Führt den Login per Firebase durch.
 * token: holt sich aus dem Firebase result den user.accessToken welcher bei jeder weiteren Abfrage ans Backend mitgegeben wird.
 * saveUser: hier wird der Token und die Email vom User an das Backend weitergegeben und anschließend im localStorage für die anderen Methoden hinterlegt.
 * Anschließend wird man zu chooseTemplate.vue weitergeleitet.
 */
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {

        const token = result.user.multiFactor.user.accessToken

        const url = process.env.VUE_APP_BACKEND_URL +  `/private/saveUser`;
        const requestBody = {
            token: token,
            email: result.user.email.toString(),
        }
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("userMail", result.user.email.toString())
        saveUser(url, requestBody);

    }) .catch((error) => {
        console.log("error", error);
    });
}

function saveUser(url, requestBody) {
    axios.post(url, requestBody)
        .then(response => {
            console.log("saveUser reponse: ", response.data.toString())
            if(response.status === 200 && response.data.toString().startsWith("Saved")){
                var permissionUrl =  process.env.VUE_APP_BACKEND_URL + "/private/getPermission/" + requestBody.email;
                axios.get(permissionUrl)
                    .then(response => {
                        console.log("permissionUrl response", response.data.toString())
                        localStorage.setItem("permission", response.data.toString());
                        if(response.data.toString() === "1" || response.data.toString() === "2"){
                            router.push("/start");
                        }
                    })
            } else {
                router.push("/login")
                alert("Login failed or permission denied.")
            }
        }).catch(error => {
        router.push("/login").then(r =>  console.log("error", error,r))
    })
}

function logout() {
    const email = encodeURIComponent(localStorage.getItem("userMail"))
    const url = process.env.VUE_APP_BACKEND_URL + '/private/deleteUser/' + email;
    const requestBody = {
        token: localStorage.getItem("token")
    }
    axios.post(url, requestBody)
        .then(response => {
            if(response.status === 200) {
                router.push("/login")
            } else {
                alert("Something went wrong...")
            }
        }).catch(error => {
            console.log("error: ",error)
    })
    localStorage.clear();
}

export { login };
export { saveUser };
export { logout };