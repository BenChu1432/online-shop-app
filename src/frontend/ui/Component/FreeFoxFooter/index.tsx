import "./style.css"
import {Button, Form} from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {LoginUserContext} from "../../Context/LoginUserContext";
import Toast from 'react-bootstrap/Toast';
import {updateEmailVerificationStatus, updateSubscribedStatus} from "../../../resource/UserResource";

export default function FreeFoxFooter(){
    const {currentUser}=useContext(LoginUserContext);
    const [loginStatus,setLoginStatus]=useState<boolean|undefined>(false);
    const [subscribedStatus,setSubscribedStatus]=useState<boolean|undefined>(false);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [showNotLoggedInError, setShowNotLoggedInError] = useState(false);
    const [showAlreadySubscribedError, setShowAlreadySubscribedError] = useState(false);
    const [showAlreadySubscribedSuccess,setShowAlreadySubscribedSuccess]= useState(false);
    const toggleShowNotLoggedInError = () => setShowNotLoggedInError(!showNotLoggedInError);
    const toggleShowAlreadySubscribedError=()=>setShowAlreadySubscribedError(!showAlreadySubscribedError);
    const toggleShowAlreadySubscribedSuccess=()=>setShowAlreadySubscribedSuccess(!showAlreadySubscribedSuccess);

    const handleOnSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(currentUser){
            setLoginStatus(true);
            updateSubscribedStatus(currentUser.email,setSubscribedStatus,toggleShowAlreadySubscribedError,toggleShowAlreadySubscribedSuccess);
        }else{
            setLoginStatus(false);
            toggleShowNotLoggedInError();
        }
    }
    return(
        <>
            <div className={"footer-container"}>
                <div className={"customer-care-and-social-media-plus-connect-container"}>
                    <div className={"customer-care-and-social-media"}>
                        <div className={"customer-care-container"}>
                            <h3 className={"customer-care"}>Customer Care</h3>
                            <Link to={"/FAQ"} className={"customer-care-items"}>FAQ</Link>
                            <Link to={"/shipping"} className={"customer-care-items"}>Shipping</Link>
                            <div className={"customer-care-items"}>Returns</div>
                            <a className={"link-styling"} href={"mailto:happyzhu0115@gmail.com"}>
                                <div className={"customer-care-items"}>Write To Us</div>
                            </a>
                            <div className={"customer-care-items"} ref={target} onClick={() => setShow(!show)}>Wechat</div>
                            <Overlay target={target.current} show={show} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Wechat ID: happy_leming_zhu
                                    </Tooltip>
                                )}
                            </Overlay>
                            <a className={"link-styling"} href={"https://wa.me/19496178859"}>
                                <div className={"customer-care-items"}>Whatsapp</div>
                            </a>
                        </div>
                        <div className={"footer-social-media-container"}>
                            <h3 className={"footer-social-media"}>Social Media</h3>
                            <a className={"link-styling"} href={"https://www.tiktok.com/@freefoxfashion?_t=8WPWb3Wjivu&_r=1"}>
                                <div className={"footer-social-media-item"}>TikTok</div>
                            </a>
                            <a className={"link-styling"} href={"https://www.instagram.com/freefoxfashion/?hl=zh-hk"}>
                                <div className={"footer-social-media-item"}>Instagram</div>
                            </a>
                            <a className={"link-styling"} href={"https://twitter.com/freefoxdesign"}>
                                <div className={"footer-social-media-item"}>Twitter</div>
                            </a>
                        </div>
                    </div>
                    <div className={"connect-container"}>
                        <h3 className={"connect"}>Connect</h3>
                        <div className={"connect-item"}>Partnerships</div>
                        <Link to={"/bulkorders"}  className={"connect-item"}>Bulk Orders</Link>
                    </div>
                </div>
                <div className={"stay-tuned-container"}>
                    <h3 className={"be-the-first-to-know"}>Be the first to know</h3>
                    <div className={"stay-tuned-message"}>Receive email updates about our latest collaborations,
                    new products & exclusive discounts.
                    </div>
                    <Form className={"stay-tuned-email"} onSubmit={handleOnSubmit}>
                        <Form.Group className={"stay-tuned-and-button"} controlId="formBasicSearch">
                            <Form.Control type="search" placeholder="Enter Email" className={"stay-tuned-input"}/>
                            <Button className={"stay-tuned-button"} type="submit">
                                SUBMIT
                            </Button>
                        </Form.Group>
                    </Form>
                    <Toast show={showNotLoggedInError} onClose={toggleShowNotLoggedInError}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Error</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>You have not signed in yet!</Toast.Body>
                    </Toast>
                    <Toast show={showAlreadySubscribedError} onClose={toggleShowAlreadySubscribedError}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Error</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>You have already subscribed via your email!</Toast.Body>
                    </Toast>
                    <Toast show={showAlreadySubscribedSuccess} onClose={toggleShowAlreadySubscribedError}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body>You have successfully subscribed!</Toast.Body>
                    </Toast>
                </div>
            </div>
        </>
    )
}