import NavigationBar from "../../Component/NavigationBar";
import React, {useEffect, useState} from "react";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import "./style.css";
import AboutUsPic from "../../images/AboutUs.svg";
import Mission from "../../images/Mission.svg";
import Context from "../../images/Context.svg";
import Product from "../../images/Product.svg";
import {useRef} from "react";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function AboutUs(){
    const aboutUsRef=useRef<HTMLDivElement>(null);
    const missionPicRef=useRef<HTMLImageElement>(null);
    const missionContentRef=useRef<HTMLDivElement>(null);
    const contextContentRef=useRef<HTMLDivElement>(null);
    const contextPicRef=useRef<HTMLImageElement>(null);
    const productContentParagraphOneRef=useRef<HTMLImageElement>(null);
    const productContentParagraphTwoRef=useRef<HTMLImageElement>(null);
    const productIllustrationRef=useRef<HTMLImageElement>(null);
    useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    entry.target.classList.add("appear")
                    // observer.unobserve(entry.target)
                }else{
                    entry.target.classList.remove("appear");
                }
            })
        },{
            threshold: 0.3})
        observer.observe(aboutUsRef.current as HTMLDivElement);
        observer.observe(missionPicRef.current as HTMLImageElement);
        observer.observe(missionContentRef.current as HTMLDivElement);
        observer.observe(contextContentRef.current as HTMLDivElement);
        observer.observe(contextPicRef.current as HTMLImageElement);
        observer.observe(productContentParagraphOneRef.current as HTMLDivElement);
        observer.observe(productContentParagraphTwoRef.current as HTMLDivElement);
        observer.observe(productIllustrationRef.current as HTMLImageElement);
    },[])

    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <body className={"about-us-page-container"}>
                <div>
                    <div className="rectangle-and-about-us-part">
                        <div className="rectangle"></div>
                        <div className="about-us-part">About</div>
                    </div>
                    <div className="about-us-container" ref={aboutUsRef}>
                        <img src={AboutUsPic} className={"about-us-pic"}/>
                        <div className={"about-us-content-paragraph-one"}>FreeFox is a brand that hopes to <span className={"daily-fashion"}>incorporate temporary tattoos into people’s daily fashion</span> accessories.
                            Every day, according to your different outfit, FreeFox can always provide a design that makes you unique.
                        </div>
                    </div>
                </div>
                <div className={"title-and-mission-container"}>
                    <div className="rectangle-and-about-us-part">
                        <div className="rectangle"></div>
                        <div className="about-us-part">Mission</div>
                    </div>
                    <div className={"mission-container"}>
                        <img src={Mission} className={"mission-pic"} ref={missionPicRef}/>
                        <div className={"mission-content-container"} ref={missionContentRef}>
                            <div className={"mission-content"}>Our mission is to make unique and original temporary tattoos that show artists’ creativity. Growing up and abiding by rules sometimes devour my passion, creativity, and intuition, but a child without any such restrictions possess creativity beyond imagination. That is the most beautiful and powerful possession that humans can have.</div>
                        </div>
                    </div>
                </div>
                <div className={"context-container"}>
                    <div className={"context-content"} ref={contextContentRef}>In Asia, “artists” are manufactured from ossified educational centers and never try breaking through their scope of imagination. But that’s not what ART is - it is free and expressive; it is what you, me, and everyone can create; it is magical. Therefore, we hope to convey the spirit of freedom through temporary tattoos and the brand of FREEFOX.</div>
                    <img src={Context} className={"context-pic"} ref={contextPicRef}/>
                </div>
                <div className="rectangle-and-about-us-part">
                    <div className="rectangle"></div>
                    <div className="about-us-part">Product</div>
                </div>
                <div className={"products"} ref={productContentParagraphOneRef}>
                    <div className={"products-content-paragraph-one"}>Xmas, Halloween, el Día de los Muertos, Mid-Autumn festival are a few festivals we cater our temporary tattoos to!</div>
                </div>
                <img src={Product} className={"product-illustration"} ref={productIllustrationRef}/>
                <div className={"products-content-paragraph-two"} ref={productContentParagraphTwoRef}>
                    Temporary tattoos are so powerful as it can be easily erased by cleansing oil and allows you to change your personal tattoos at all times! A smily face can show your mood of the day. A butterfly can match your skirt outfit. A creative monster can add to your unique personality. You can attach the tattoo to all body parts, including your face, neck, arm, thigh, ankle, etc.
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}