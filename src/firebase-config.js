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
            const url = `http://localhost:8081/private/saveUser`;
            saveUser(url, token);
        })
            .then(router.push("/home"))
    }) .catch((error) => {
        console.log("error", error);
    });
}

function saveUser(url, token) {
    axios.get(url, { 'headers': { 'Authorization': token } })
        .then(response => {
            console.log("response", response);
            if(response.status === 200){
                alert("Logged-In successfully")
            } else {
                console.log("Login failed")
                alert("Login failed")
            }
        }).catch(error => {
        console.log("error", error);
    })
        .then(router.push("/home"))
}

export { login };
export { saveUser };
