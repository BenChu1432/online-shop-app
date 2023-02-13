import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from "../../Component/NavigationBar";
import "./style.css"
import React, {ChangeEvent,useState} from "react";
import {
    firebaseAuthServiceSignInWithEmailAndPassword, firebaseAuthServiceSignInWithFacebook,
    firebaseAuthServiceSignInWithGoogle
} from "../../../service/AuthService";
import {Alert} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import SignUpForm from "../../Component/SignUpForm";
import GoogleButton from "../../images/GoogleButton.png";
import FacebookButton from "../../images/FacebookButton.png";
import Footer from "../../Component/FreeFoxFooter";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function LoginPage(){
    const navigate=useNavigate();
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [isLoginSuccess, setIsLoginSuccess]=useState<boolean | undefined>();

    const handleEmail=(event: ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value);
    }
    const handlePassword=(event: ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value);
    }
    const handleOnSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        firebaseAuthServiceSignInWithEmailAndPassword(email,password,onLoadedLoginSuccess);
    }

    const onLoadedLoginSuccess=(isSuccess: boolean)=>{
        setIsLoginSuccess(isSuccess);
        if(isSuccess){
            navigate("/");
        }
    }

    const handleGoogleSignInOnClick=()=>{
        firebaseAuthServiceSignInWithGoogle(onLoadedLoginSuccess);
    }
    const handleFacebookSignInOnClick=()=>{
        firebaseAuthServiceSignInWithFacebook(onLoadedLoginSuccess)
    }


    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            {
                (isLoginSuccess===false)&&
                <Alert variant={"danger"}>
                    Wrong email or password!
                </Alert>
            }
            <body className={"login-page-container"}>
                <h3 className={"login-shoutout"}>Log In To Your Account</h3>
                <div className={"login-form-general-width"}>
                    <div className={"login-form-outer-container"}>
                        <div className={"login-form-inner-container"}>
                            <Form className={"login-form"} onSubmit={handleOnSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className={"login-form-item"}>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} value={email}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className={"login-form-item"}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={handlePassword} value={password}/>
                                </Form.Group>
                                <Button variant="danger" type="submit" className={"login-in-submit-button"}>
                                    Submit
                                </Button>
                                <div className={"google-sign-in-container"}>
                                    <img className={"google-sign-in-button"} src={GoogleButton} onClick={handleGoogleSignInOnClick}/>
                                    <img className={"facebook-sign-in-button"} src={FacebookButton} onClick={handleFacebookSignInOnClick}/>
                                </div>
                                <div className={"login-assistant-container"}>
                                    <Link to="/forgotpassword" className={"login-assistant"}>Forgot password</Link>
                                    <Link to="/register" className={"login-assistant"}>Registration</Link>
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