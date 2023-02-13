import NavigationBar from "../../Component/NavigationBar";
import "./style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
    firebaseAuthServiceEmailVerification,
    firebaseAuthServiceSignInWithFacebook,
    firebaseAuthServiceSignInWithGoogle,
    firebaseAuthServiceSignUpWithEmailAndPassword
} from "../../../service/AuthService";
import {Alert} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import GoogleButton from "../../images/GoogleButton.png";
import FacebookButton from "../../images/FacebookButton.png";
import AppleButton from "../../images/AppleSignInButton.png";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import {postAccount} from "../../../resource/UserResource";
import {getGeneralRating} from "../../../resource/ProductDetailResource";
import HamburgerMenu from "../../Component/HamburgerMenu";
import CloseButton from "../../images/close.png";
import RatingStarsForRating from "../../Component/RatingStarsForRating";


export default function RegisterPage(){
    const navigate=useNavigate();
    const [userOverlayOnClicked,setUserOverlayOnClicked]=useState<boolean>(false);
    const [userType,setUserType]=useState<string|undefined>(undefined);
    const [username,setUsername]=useState<string|undefined>(undefined);
    const [email,setEmail]=useState<string|undefined>(undefined);
    const [password,setPassword]=useState<string>("");
    const [subscribedStatus,setSubscribedStatus]=useState<boolean>(true);
    const [secondPassword,setSecondPassword]=useState<string>("");
    const [usernameExists,setUsernameExists]=useState<boolean|undefined>(undefined);
    const [emailExists,setEmailExists]=useState<boolean|undefined>(undefined);
    const [passwordsMatched,setPasswordsMatched]=useState<boolean|undefined>(undefined);
    const [passwordExists,setPasswordExists]=useState<boolean|undefined>(undefined);
    const [secondPasswordExists,setSecondPasswordExists]=useState<boolean|undefined>(undefined);
    const [signupSuccess,setSignupSuccess]=useState<boolean|undefined>(undefined);
    const [emailVerificationSent,setEmailVerificationSent]=useState<boolean|undefined>(undefined);

    const handleUsernameOnChange=(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setUsername(event.target.value);
        setUsernameExists(true);
    }

    const handleEmailOnChange=(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setEmail(event.target.value);
        setEmailExists(true);
    }

    const handlePasswordOnChange=(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setPassword(event.target.value);
        setPasswordExists(true);
    }

    const handleSecondPasswordOnChange=(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSecondPassword(event.target.value);
        if(password===secondPassword){
            setPasswordsMatched(true);
        }
        setSecondPasswordExists(true);
    }

    const handleSubscribedStatus=(event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.checked){
            setSubscribedStatus(true);
        }else{
            setSubscribedStatus(false);
        }
    }


    const handleOnSubmit=async () => {
        console.log("userType:"+userType);
        if (password !== secondPassword) {
            setPasswordsMatched(false);
            console.log("passwords matched when password!==secondPassword:" + passwordsMatched);
        } else if (!username) {
            setUsernameExists(false);
        } else if (!email) {
            setEmailExists(false);
        } else if (!password || !secondPassword) {
            setPasswordExists(false);
        } else {
            if (subscribedStatus) {
                let subscribed: string = "subscribed";
                await firebaseAuthServiceSignUpWithEmailAndPassword(userType as string,username, email, password, subscribed, handleSignupSuccess);
            } else {
                let subscribed: string = "unsubscribed";
                await firebaseAuthServiceSignUpWithEmailAndPassword(userType as string,username, email, password, subscribed, handleSignupSuccess);
            }
        }
    }

    const handleSignupSuccess=(signupStatus:boolean|undefined)=>{
        setSignupSuccess(signupStatus);
        if(signupStatus){
            firebaseAuthServiceEmailVerification(setEmailVerificationSent);
            navigate("/verification-email");
        }
    }

    const handleGoogleSignInOnClick=()=>{
        firebaseAuthServiceSignInWithGoogle(handleSignupSuccess,userType);
    }

    const handleFacebookSignInOnClick=()=>{
        firebaseAuthServiceSignInWithFacebook(handleSignupSuccess,userType)
    }



    useEffect(()=>{

    },[])




    return(
        <>
            <section className={"user-type-overlay"} style={userOverlayOnClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                <div className={"user-type-container"}>
                    <p>What kind of user do you want to register as?</p>
                    <div className={"user-type-form"}>
                        <div className={"user-type-options"} onClick={()=>{setUserType("tattoo buyer");setUserOverlayOnClicked(true)}}>
                            <div className={"user-type-input"}/>
                            <label className={"user-type-label"}>Tattoo Buyer</label>
                        </div>
                        <div className={"user-type-options"} onClick={()=>{setUserType("tattoo artist");setUserOverlayOnClicked(true)}}>
                            <div className={"user-type-input"}/>
                            <label className={"user-type-label"}>Tattoo Artist</label>
                        </div>
                    </div>
                </div>
            </section>
            <NavigationBar />
            <HamburgerMenu/>
            {
                (passwordsMatched===false)&&
                <Alert variant={"danger"}>
                    The passwords you entered do not match!
                </Alert>
            }
            {
                (signupSuccess===false)&&
                <Alert variant={"danger"}>
                    The email may have already existed!
                </Alert>
            }
            {
                (usernameExists===false)&&
                <Alert variant={"danger"}>
                    You have not entered your username yet!
                </Alert>
            }
            {
                (emailExists===false)&&
                <Alert variant={"danger"}>
                    You have not entered your email yet!
                </Alert>
            }
            {
                (passwordExists===false||secondPasswordExists===false)&&
                <Alert variant={"danger"}>
                    You have not entered your password yet!
                </Alert>
            }
            <body className={"signup-page-container"}>
                <div className={"signup-form-outer-container"}>
                    <div className={"other-sign-up-options-container"}>
                        <div className={"other-signup-form-container"}>
                            <h4 className={"signup-shoutout"}>Other Sign-Up Methods</h4>
                            <div className={"other-signup-form"}>
                                <img className={"google-sign-in-button"} src={GoogleButton} onClick={handleGoogleSignInOnClick}/>
                                <img className={"facebook-sign-in-button"} src={FacebookButton} onClick={handleFacebookSignInOnClick}/>
                            </div>
                        </div>
                    </div>
                    <div className={"email-signup-form-inner-container"}>
                        <div className={"signup-form-container"}>
                            <Form className={"signup-form"} onSubmit={handleOnSubmit}>
                                <h4 className={"signup-shoutout"}>Sign Up With Email</h4>
                                <Form.Group className="mb-3 input-container" controlId="formBasicUsername">
                                    <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameOnChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3 input-container" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailOnChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3 input-container" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordOnChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3 input-container" controlId="formBasicSecondPassword">
                                    <Form.Control type="password" placeholder="Re-enter password" value={secondPassword} onChange={handleSecondPasswordOnChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type={"checkbox"}
                                        id={`default-checkbox`}
                                        label={`subscribe to our updates via email`}
                                        checked={subscribedStatus}
                                        onChange={handleSubscribedStatus}
                                    />
                                </Form.Group>
                                <div className={"signup-submit-button-container"}>
                                    <Button variant="danger" type="submit" className={"signup-submit-button"}>
                                        Submit
                                    </Button>
                                </div>
                                <div className={"signup-assistant-container"}>
                                    <Link className={"signup-assistant"} to={"/login"}>Already have an account?</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}