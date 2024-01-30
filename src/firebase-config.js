import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";
import router from "@/router";

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log("result", result);
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
            localStorage.setItem("idToken", idToken);
            const token = "Bearer " + idToken
            const url = process.env.VUE_APP_BACKEND_URL +  `/private/saveUser`;
            const requestBody = {
                email: result.user.email.toString(),
                //TODO Token ergänzen und im BE Logik zum Prüfen hinterlegen
            }
            saveUser(url, token, requestBody);
            localStorage.setItem("userMail", result.user.email.toString())
        })
            .then(router.push("/home"))
    }) .catch((error) => {
        console.log("error", error);
    });
}

function saveUser(url, token, requestBody) {
    axios.post(url, requestBody, { 'headers': { 'Authorization': token } })
        .then(response => {
            if(response.status === 200){
                router.push("/home")
            } else {
                router.push("/login")
                alert("Login failed.")
            }
        }).catch(error => {
        router.push("/login").then(r =>  console.log("error", error,r))
    })
}

export { login };
export { saveUser };
