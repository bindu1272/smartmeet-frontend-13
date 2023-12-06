import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import axios from 'axios';
import get from 'lodash/get';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPmWZUp3g0WbjJZCt4FAg1JsGPUVEmxnw",
  authDomain: "smartmeet-front.firebaseapp.com",
  projectId: "smartmeet-front",
  storageBucket: "smartmeet-front.appspot.com",
  messagingSenderId: "73729412353",
  appId: "1:73729412353:web:fb3e11d40427b09918df00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle =()=>{
    signInWithPopup(auth,provider).then((result)=>{
        console.log(result)
        result.user.getIdToken()
          .then(function (FirebaseToken) {
            console.log(FirebaseToken);
            const data = {
              token_id : FirebaseToken,
              email : result.user.email
            }
            axios.post('http://localhost:9700/api/v1/patients/gmail-login', {
              token_id : FirebaseToken,
              email : result.user.email
            }).then((result)=>{
              console.log(result);
              jwt({
                token: get(result, 'data.data.access_token'),
               user:result.data.data.user,
              }).then((response)=>{
                console.log("jwt",response);

                session(response,response.user,response.token).then((res)=>{
                  console.log("session",res);
                  location.reload();
                })
                .catch((error)=>{
                  console.log(error);
                })
              })
            }).catch((error)=>{
              console.log(error);
            })
            // setFirebaseToken(FirebaseToken);
           
          })
        
    }).catch((error)=>{
        console.log(error)
    })
}

const jwt =  async (token, user, account, profile, isNewUser) => {
  console.log("JWT callback", token, user, account, profile, isNewUser);
  user && (token.user = user);
  return Promise.resolve(token); // ...here
}
const session = async (session, user, sessionToken) => {
  //  "session" is current session object

  // session.user = user.user;
  sessionStorage.setItem("user",JSON.stringify({'user':user}));


  return Promise.resolve(session);
}