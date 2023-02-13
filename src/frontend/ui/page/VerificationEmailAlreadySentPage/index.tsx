import NavigationBar from "../../Component/NavigationBar";
import CompanyLogo from "../../images/FreeFox.svg";
import instagram from "../../images/instagram.png";
import tiktok from "../../images/tiktok.png";
import twitter from "../../images/twitter.png";
import email from "../../images/gmail.png";
import wechat from "../../images/wechat.png";
import React, {useRef, useState} from "react";
import "./style.css";
import {firebaseAuthServiceEmailVerification} from "../../../service/AuthService";
import {Alert} from "react-bootstrap";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

export default function VerificationEmailSentPage(){
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [emailVerificationSent,setEmailVerificationSent]=useState<boolean|undefined>(undefined);
    const [tooManyRequests,setTooManyRequests]=useState<boolean|undefined>(undefined);

    const handleResendEmailOnClick=()=>{
        firebaseAuthServiceEmailVerification(setEmailVerificationSent,setTooManyRequests);
    }

    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            {
                (emailVerificationSent===true)&&
                <Alert variant={"success"}>
                    A verification email has been resent to you!
                </Alert>
            }
            {
                (tooManyRequests===true)&&
                <Alert variant={"danger"}>
                    There are too many requests in a short interval!
                </Alert>
            }
            <body className={"verification-email-page-container"}>
                <img className={"company-logo"} src={CompanyLogo}/>
                <h3 className={"verification-email-message"}>A verification email has been sent to you!</h3>
                <div className={"email-message"}> If you do not receive any email, please check your spam box.
                    <br/>If the email still goes missing, press the following button to receive the verification email again.
                </div>
                <div className={"payment-page-proceed-button"}>
                    <div className={"payment-page-proceed-button"}>
                        <div className={"payment-page-confirm-button"}>
                            <button className={"payment-page-checkout-button"} onClick={handleResendEmailOnClick}>Resend Verification Email</button>
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
                            <img src={wechat} className={"wechat-logo"} ref={target} onClick={() => setShow(!show)}/>
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