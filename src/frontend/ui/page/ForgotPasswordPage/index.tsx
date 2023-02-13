import NavigationBar from "../../Component/NavigationBar";
import React, {useRef, useState} from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "../../images/GoogleButton.png";
import FacebookButton from "../../images/FacebookButton.png";
import {Link, useNavigate} from "react-router-dom";
import {firebaseServiceResetPassword} from "../../../service/AuthService";
import {Alert} from "react-bootstrap";
import instagram from "../../images/instagram.png";
import tiktok from "../../images/tiktok.png";
import twitter from "../../images/twitter.png";
import email from "../../images/gmail.png";
import wechat from "../../images/wechat.png";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function ForgotPasswordPage(){

    const navigate=useNavigate();
    const [inputEmail,setInputEmail]=useState<string>("");
    const [resetPasswordEmailSent,setResetPasswordEmailSent]=useState<boolean|undefined>(undefined);
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleOnSubmit=()=>{
        firebaseServiceResetPassword(inputEmail,setResetPasswordEmailSent);
        console.log(resetPasswordEmailSent);
    }



    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            {
                (resetPasswordEmailSent===false)&&
                <Alert variant={"danger"}>
                    The email may not have existed!
                </Alert>
            }
            {
                (resetPasswordEmailSent===true)&&
                <Alert variant={"success"}>
                    An email has been sent for your to reset your password!
                </Alert>
            }
            <body className={"forgot-password-page"}>
                <h3>Reset Email</h3>
                <div className={"forgot-password-form-general-width"}>
                    <div className={"forgot-password-form-outer-container"}>
                        <div className={"forgot-password-form-inner-container"}>
                            <Form className={"forgot-password-form"} onSubmit={handleOnSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className={"forgot-password-email"}>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{setInputEmail(event.target.value)}} value={inputEmail}/>
                                </Form.Group>
                                <Button variant="danger" type="submit" className={"forgot-password-submit-button"}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={"social-media-logos-and-customer-service-container"}>
                    <div className={"social-media-container"}>
                        <div className={"social-media"}>
                            Follow Us on Social Media
                        </div>
                        <div className={"social-media-logos-container"}>
                            <a href={"https://www.instagram.com/freefoxfashion/?hl=zh-hk"}>
                                <img src={instagram} className={"social-media-logos"}/>
                            </a>
                            <a href={" https://www.tiktok.com/@freefoxfashion?_t=8WPWb3Wjivu&_r=1"}>
                                <img src={tiktok} className={"social-media-logos"}/>
                            </a>
                            <a href={"https://twitter.com/freefoxdesign"}>
                                <img src={twitter} className={"social-media-logos"}/>
                            </a>
                        </div>
                    </div>
                    <div className={"customer-service-container"}>
                        <div className={"social-media"}>Customer Service</div>
                        <div className={"social-media-logos-container"}>
                            <a href={"mailto:happyzhu0115@gmail.com"}>
                                <img src={email} className={"social-media-logos"}/>
                            </a>
                            <img src={wechat} className={"social-media-logos"} ref={target} onClick={() => setShow(!show)}/>
                            <Overlay target={target.current} show={show} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Wechat ID: happy_leming_zhu
                                    </Tooltip>
                                )}
                            </Overlay>
                        </div>
                    </div>
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}