import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";
import router from "@/router";

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {

        const token = result.user.multiFactor.user.accessToken

        const url = process.env.VUE_APP_BACKEND_URL +  `/private/saveUser`;
        const requestBody = {
            token: token,
            email: result.user.email.toString(),
        }
        saveUser(url, requestBody);
        localStorage.setItem("token", token);
        localStorage.setItem("userMail", result.user.email.toString())
        .then(router.push("/home"))

    }) .catch((error) => {
        console.log("error", error);
    });
}

function saveUser(url, requestBody) {
    axios.post(url, requestBody)
        .then(response => {
            console.log("saveUser POST reached with response: ", response.data);
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

function logout(email) {
    email = encodeURIComponent(email)
    const url = process.env.VUE_APP_BACKEND_URL + '/private/deleteUser/' + email;
    const requestBody = {
        token: localStorage.getItem("token")
    }
    console.log("Starting delete call with body: ",requestBody)
    axios.post(url, requestBody)
        .then(response => {
            if(response.status === 200) {
                console.log("user data deleted in backend")
                router.push("/login")
            } else {
                alert("Something went wrong...")
            }
        }).catch(error => {
            console.log("error: ",error)
    })
}

export { login };
export { saveUser };
export { logout };