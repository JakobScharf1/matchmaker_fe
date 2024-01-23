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
            saveUser(url, token);
            localStorage.setItem("userMail", result.user.email.toString())
        })
            .then(router.push("/home"))
    }) .catch((error) => {
        console.log("error", error);
    });
}

function saveUser(url, token) {
    axios.get(url, { 'headers': { 'Authorization': token } })
        .then(response => {
            if(response.status === 200){
                alert("Logged-In successfully")
            } else {
                router.push("/login").then(r =>  console.log("Login failed!",r))
            }
        }).catch(error => {
        router.push("/login").then(r =>  console.log("error", error,r))
    })
        .then(router.push("/home"))
}

export { login };
export { saveUser };
