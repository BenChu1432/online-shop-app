import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"
import NavigationBar from "../../Component/NavigationBar";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React, {useContext, useState} from "react";
import HamburgerMenu from "../../Component/HamburgerMenu";
import MainPageTattoo from "../../images/MainPageTattoo.jpeg";
import {HamburgerMenuContext} from "../../Context/HamburgerMenuContext";
import { Link } from 'react-router-dom';

export default function MainPage(){
    const {hamburgerMenuIsClicked, setHamburgerMenuIsClicked}=useContext(HamburgerMenuContext);
    const [horoscopeCardStackOnClick,setHoroscopeCardStackOnClick]=useState<boolean>(false);
    const [natureCardStackOnClick,setNatureCardStackOnClick]=useState<boolean>(false);

    const handleHoroscopeCardStackOnclick=()=>{
        if(!horoscopeCardStackOnClick){
            setHoroscopeCardStackOnClick(true);
        }
    }

    const handleNatureCardStackOnClick=()=>{
        setNatureCardStackOnClick(true);
    }


    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <div className={"main-page-container"}>
                <section className={"welcome-session"}>
                    <h4 className={"main-page-opening-slogan"}>Temporary tattoos,
                        <br/>a highlight for your daily fashion</h4>
                    <img src={MainPageTattoo} className={"main-page-opening-tattoo"}/>
                    <div className={"main-page-opening-background"}></div>
                </section>
                <section id={"horoscope-section"}>
                    <div className={"section-title"}>
                        <div className={"section-marker"}></div>
                        <h3>Horoscope</h3>
                    </div>
                    <div className={"card-stack-section"}>
                        <div className={"cards-group"} onClick={handleHoroscopeCardStackOnclick} style={{cursor:"pointer"}}>
                            <div className={"little-card card " + (horoscopeCardStackOnClick&&"little-card-one-spread")}
                                 onClick={()=>{if(horoscopeCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/36"}}}
                            >

                            </div>
                            <div className={"big-card card"}
                                 style={horoscopeCardStackOnClick?{transform: "translate(-150%, 20%) rotate(-30deg)"}:{transform: "translateX(-10%) rotate(-6deg)"}}
                                 onClick={()=>{
                                     if(horoscopeCardStackOnClick){
                                         window.location.href="http://localhost:3000/#/productdetail/5"
                                     }}}
                            >
                            </div>
                            <div className={"little-card card "+(horoscopeCardStackOnClick&&"little-card-two-spread")}
                                 onClick={()=>{if(horoscopeCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/83"}}}>

                            </div>
                            <div className={"big-card card "} style={horoscopeCardStackOnClick?{transform: "translate(-50%) rotate(-10deg)"}:{transform: "translateX(-3%) rotate(-2deg)"}}
                                 onClick={()=>{
                                     if(horoscopeCardStackOnClick){window.location.href="http://localhost:3000/#/productdetail/6"}}}>

                            </div>
                            <div className={"little-card card "+(horoscopeCardStackOnClick&&"little-card-three-spread")}
                                 onClick={()=>{if(horoscopeCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/46"}}}>

                            </div>
                            <div className={"big-card card"} style={horoscopeCardStackOnClick?{transform: "translate(50%) rotate(10deg)"}:{transform: "translateX(2%) rotate(+2deg)"}}
                                 onClick={()=>{if(horoscopeCardStackOnClick){window.location.href="http://localhost:3000/#/productdetail/1"}}}>

                            </div>
                            <div className={"little-card card "+(horoscopeCardStackOnClick&&"little-card-four-spread")}
                                 onClick={()=>{if(horoscopeCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/28"}}}>

                            </div>
                            <div className={"big-card card"} style={horoscopeCardStackOnClick?{transform: "translate(150%, 25%) rotate(30deg)"}:{transform: "translateX(6%) rotate(+6deg)"}}
                                 onClick={()=>{if(horoscopeCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/7"}}}>

                            </div>
                        </div>
                    </div>
                    <div className={"horoscope-button"}>
                        <button><Link to="/shop/horoscope" className={"horoscope-link"}>Browse</Link></button>
                    </div>
                </section>
                <section id={"nature-section"}>
                    <div className={"section-title"}>
                        <div className={"section-marker"}></div>
                        <h3>Nature</h3>
                    </div>
                    <div className={"card-stack-section"}>
                        <div className={"cards-group"} onClick={handleNatureCardStackOnClick} style={{cursor:"pointer"}}>
                            <div className={"little-card card"} style={natureCardStackOnClick?{transform: "translate(350%, -85%) rotate(-10deg)"}:{}}
                                 onClick={()=>{if(natureCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/36"}}}
                            >

                            </div>
                            <div className={"big-card card"}
                                 style={natureCardStackOnClick?{transform: "translate(-150%, 20%) rotate(-30deg)"}:{transform: "translateX(-10%) rotate(-6deg)"}}
                                 onClick={()=>{
                                     if(natureCardStackOnClick){
                                         window.location.href="http://localhost:3000/#/productdetail/5"
                                     }}}
                            >
                            </div>
                            <div className={"little-card card"} style={natureCardStackOnClick?{transform: "translate(450%, 265%) rotate(16deg)", zIndex: "1"}:{}}
                                 onClick={()=>{if(natureCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/83"}}}>

                            </div>
                            <div className={"big-card card"} style={natureCardStackOnClick?{transform: "translate(-50%) rotate(-10deg)"}:{transform: "translateX(-3%) rotate(-2deg)"}}
                                 onClick={()=>{
                                     if(natureCardStackOnClick){window.location.href="http://localhost:3000/#/productdetail/6"}}}>

                            </div>
                            <div className={"little-card card"} style={natureCardStackOnClick?{transform: "translate(-310%, -82%) rotate(3deg)"}:{}}
                                 onClick={()=>{if(natureCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/46"}}}>

                            </div>
                            <div className={"big-card card"} style={natureCardStackOnClick?{transform: "translate(50%) rotate(10deg)"}:{transform: "translateX(2%) rotate(+2deg)"}}
                                 onClick={()=>{if(natureCardStackOnClick){window.location.href="http://localhost:3000/#/productdetail/1"}}}>

                            </div>
                            <div className={"little-card card"} style={natureCardStackOnClick?{transform: "translate(-450%, 225%) rotate(-10deg)"}:{}}
                                 onClick={()=>{if(natureCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/28"}}}>

                            </div>
                            <div className={"big-card card"} style={natureCardStackOnClick?{transform: "translate(150%, 25%) rotate(30deg)"}:{transform: "translateX(6%) rotate(+6deg)"}}
                                 onClick={()=>{if(natureCardStackOnClick){
                                     window.location.href="http://localhost:3000/#/productdetail/7"}}}>

                            </div>
                        </div>
                    </div>
                    <div className={"horoscope-button"}>
                        <button><Link to="/shop/horoscope" className={"horoscope-link"}>Browse</Link></button>
                    </div>
                </section>
            </div>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}