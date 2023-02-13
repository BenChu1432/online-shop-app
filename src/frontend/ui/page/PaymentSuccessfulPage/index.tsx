import NavigationBar from "../../Component/NavigationBar";
import React, {useEffect, useRef, useState} from "react";
import tick from "../../images/check.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import wechat from "../../images/wechat.png";
import tiktok from "../../images/tiktok.png";
import email from "../../images/gmail.png";
import "./style.css";
import {getCheckoutSessionDetails} from "../../../resource/CheckoutSessionResource";
import {changeTransactionStatusToFinished, getTransactionDetailData} from "../../../resource/TransactionDetailResource";
import {Link, useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";
import LoadingSpinner from "../../Component/LoadingSpinner";



type params={
    tid: string;
}


export default function PaymentSuccessfulPage(){
    const domain=window.location.href;
    const sessionId=domain.split("=")[1];
    const params=useParams<params>();
    const [paymentStatus,setPaymentStatus]=useState<boolean|undefined>(undefined);
    const [show, setShow] = useState(false);
    const target = useRef(null);


    if(paymentStatus){
        changeTransactionStatusToFinished(parseInt(params.tid as string))
    }

    if(paymentStatus==undefined){
        getCheckoutSessionDetails(params.tid as string,sessionId,setPaymentStatus);
    }



        return(
            <>
                <NavigationBar/>
                <HamburgerMenu/>
                <body className={"transaction-process-page-container"}>
                    <div className={"transaction-process-container"}>
                        <div className={"transaction-process-step-one-checkout"}>
                            <div className={"transaction-process"}>
                                <div className={"transaction-not-in-process-icon"}>1</div>
                            </div>
                            <div className={"transaction-process-step-one-name"}>Checkout</div>
                        </div>
                        <div className={"division-line"}></div>
                        <div className={"transaction-process-step-two-payment"}>
                            <div className={"transaction-process"}>
                                <div className={"transaction-not-in-process-icon"}>2</div>
                            </div>
                            <div className={"transaction-process-step-two-name"}>Payment</div>
                        </div>
                        <div className={"division-line"}></div>
                        <div className={"transaction-process-step-three-completion"}>
                            <div className={"transaction-process"}>
                                <div className={"transaction-in-process-icon"}>3</div>
                            </div>
                            <div className={"transaction-process-step-three-name"}>Transaction Status</div>
                        </div>
                    </div>
                    <img className={"tick-image"} src={tick}/>
                    <h3 className={"payment-successful-message"}>PAYMENT SUCCESSFUL</h3>
                    <div className={"email-message"}> Thank you for patronizing our shop!
                        <br/>A confirmation email has been sent to you via the email address that you used to create this account in our platform</div>
                    <div className={"payment-page-proceed-button"}>
                        <div className={"payment-page-proceed-button"}>
                            <div className={"payment-page-confirm-button"}>
                                <button onClick={()=>{window.location.href="http://localhost:3000/"}}>Complete Transaction</button>
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