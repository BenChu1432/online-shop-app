import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";
import {UserData} from "../data/UserData";
import {firebaseConfig} from "./FirebaseConfig";
import 'firebase/compat/auth';
import {getAccount, postAccount, updateEmailVerificationStatus} from "../resource/UserResource";

//We're using the firebase SDK
export const firebaseAuthServiceInit = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // Initialize Firebase
    initializeApp(firebaseConfig);
}

export const firebaseAuthServiceSignUpWithEmailAndPassword=async (userType:string,username:string,email: string, password: string, subscribed:string,callback: (isSuccess:boolean)=>void) =>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then(async ( userCredential) => {
            // Signed in
            const user = await userCredential.user;
            await postAccount(userType,username, email, password, user.uid, subscribed);
            callback(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            callback(false);
            // ..
        });
}

export const firebaseAuthServiceEmailVerification=(setEmailVerificationSent:(isSuccess:boolean|undefined)=>void,setTooManyRequests?:(tooManyRequests:boolean)=>void)=>{
    const auth = getAuth();
    if (auth.currentUser) {
        console.log("auth.currentUser.email: "+auth.currentUser.email);
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                setEmailVerificationSent(true);
                if (setTooManyRequests) {
                    setTooManyRequests(false);
                }
                console.log("Email Verification has been sent!");
            }).catch((error)=>{
                console.log(error.code);
                if(error.code==="auth/too-many-requests"){
                    if (setTooManyRequests) {
                        setTooManyRequests(true);
                    }
                }
                setEmailVerificationSent(false);
        });
    }else{
        console.log("You have not logged in yet!")
    }
}


// https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
export const firebaseAuthServiceSignInWithEmailAndPassword = (email: string, password: string, callback: (isSuccess: boolean) => void) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log(user.emailVerified);
            if(user.emailVerified){
                updateEmailVerificationStatus(user.uid)
            }
            callback(true);
        }).catch((error) => {
        console.log(error);
        callback(false);
    });
}

// https://firebase.google.com/docs/auth/web/google-signin#before_you_begin
export const firebaseAuthServiceSignInWithGoogle = (callback: (isSuccess: boolean) => void,userType?:string) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log("Google signin successful!")
            if(userType){
                postAccount(userType,result.user.displayName as string, result.user.email as string, "none", result.user.uid,"subscribed");
            }else{
                postAccount("tattoo buyer",result.user.displayName as string, result.user.email as string, "none", result.user.uid,"subscribed");
            }
            callback(true);
        }).catch((error) => {
        // // Handle Errors here.
        console.log(error)
        callback(false);
    });
}

export const firebaseAuthServiceSignInWithFacebook= (callback: (isSuccess: boolean) => void,userType?:string)=>{
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            if(userType){
                postAccount(userType,result.user.displayName as string, result.user.email as string, "none", result.user.uid,"subscribed");
            }else{
                postAccount("tattoo buyer",result.user.displayName as string, result.user.email as string, "none", result.user.uid,"subscribed");
            }
            callback(true);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            callback(false);
        });
}

// export const firebaseAuthServiceSignInWithApple=(callback: (isSuccess: boolean) => void)=>{
//     const auth = getAuth();
//     const provider = new OAuthProvider('apple.com');
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // The signed-in user info.
//             postAccount(result.user.displayName as string, result.user.email as string, "none", result.user.uid,"unsubscribed");
//             callback(true);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The credential that was used.
//             const credential = OAuthProvider.credentialFromError(error);
//             console.log(errorCode);
//             console.log(errorMessage);
//             console.log(email);
//             callback(false);
//             // ...
//         });
// }

export const firebaseAuthServiceEmailVerifiedStatus=()=>{
    const auth = getAuth();
    auth.currentUser?.reload().then(()=>{
        if(auth.currentUser?.emailVerified as boolean){
            console.log("email has been verified");
        }else{
            console.log("email has not been verified");
        }
    })
}

export const firebaseServiceResetPassword=(email:string,setResetPasswordEmailSent:(emailSentStatus:boolean)=>void)=>{
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setResetPasswordEmailSent(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setResetPasswordEmailSent(false);
            // ..
        });

}


// https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
export const firebaseAuthServiceOnAuthStateChanged = (setCurrentUser: (user: UserData | null) => void,setUsername:(username:string|undefined)=>void) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        let loginUser: UserData | null;
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            await getAccount(user.uid,setUsername,setCurrentUser);
        } else {
            // User is signed out
            loginUser = null;
            setCurrentUser(loginUser);
        }
    });
};

export const firebaseAuthServiceGetAccessToken = () => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
        return null;
    }
    return currentUser.getIdToken(false);
}

export const firebaseAuthServiceSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.reload();
        console.log("Sign-out successful");
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}
