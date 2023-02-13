import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React from "react";
import NavigationBar from "../../Component/NavigationBar";
import Error from "../../images/Error.png";
import instagram from "../../images/instagram.png";
import tiktok from "../../images/tiktok.png";
import twitter from "../../images/twitter.png";
import email from "../../images/gmail.png";
import wechat from "../../images/wechat.png";
import "./style.css";
import HamburgerMenu from "../../Component/HamburgerMenu";


export default function ErrorPage(){
    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <body className={"verification-email-page-container"}>
                <img className={"error-logo"} src={Error}/>
                <h3 className={"verification-email-message"}>ERROR 404</h3>
                <div className={"email-message"}> The page cannot be found
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
                            <a>
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
                            <img src={wechat} className={"social-media-logos"}/>
                            <div className={"wechat-mobile"}>Wechat ID: happy_leming_zhu</div>
                        </div>
                    </div>
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}