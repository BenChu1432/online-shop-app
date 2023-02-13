import "./style.css";
import {Link} from "react-router-dom";
import Home from "../../images/home.png";
import Upload from "../../images/upload.png";
import Ecommerce from "../../images/online-store.png";
import AboutUs from "../../images/AboutUs.png";
import React, {useContext, useEffect, useState} from "react";
import {HamburgerMenuContext} from "../../Context/HamburgerMenuContext";
import { slide as Menu } from 'react-burger-menu';
import CloseButton from "../../images/close.png";
import {LoginUserContext} from "../../Context/LoginUserContext";
import firebase from "firebase/compat";
import Login from "../../images/login.png";
import ShoppingCart from "../../images/shopping-cart.svg";
import {firebaseAuthServiceSignOut} from "../../../service/AuthService";
import ColoredHeart from "../../images/coloredHeart.png";

type Props={

}

export default function HamburgerMenu(props:Props){
    const {currentUser}=useContext(LoginUserContext);
    const {hamburgerMenuIsClicked, setHamburgerMenuIsClicked}=useContext(HamburgerMenuContext);


    return(
        <>
            <div className={"hamburger-overlay"} style={!hamburgerMenuIsClicked?{visibility:"hidden", opacity:"0", transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                <div className={"hamburger-container"}>
                    <div className={"hamburger-content-container"}>
                        <img className={"exit-button"} src={CloseButton} onClick={()=>{setHamburgerMenuIsClicked(false)}}/>
                        <ul>
                            <li style={currentUser?{display: "none"}:{display: "flex"}} className={"side-bar-login-button"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                <Link to={"/login"} className={"side-bar-login-item"}>
                                    <img src={Login} className={"side-bar-login-logo"}/>
                                    <div className={"side-bar-items-name"}>Login</div>
                                </Link>
                            </li>
                            <li className={"side-bar-home-button"}>
                                <Link to={"/"} className={"side-bar-items"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={Home} className={"side-bar-home-logo"}/>
                                    <div className={"side-bar-items-name"}>Home</div>
                                </Link>
                            </li>
                            <li className={"side-bar-upload-button"}>
                                <Link to={"/upload-prototype"} className={"side-bar-shop-item"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={Upload} className={"side-bar-upload-logo"}/>
                                    <div className={"side-bar-items-name"}>Upload</div>
                                </Link>
                            </li>
                            <li className={"side-bar-shop-button"}>
                                <Link to={"/shop/general"} className={"side-bar-shop-item"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={Ecommerce} className={"side-bar-shop-logo"}/>
                                    <div className={"side-bar-items-name"}>Shop</div>
                                </Link>
                            </li>
                            <li className={"side-bar-about-us-button"}>
                                <Link to={"/aboutus"} className={"side-bar-items"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={AboutUs} className={"side-bar-about-us-logo"}/>
                                    <div className={"side-bar-items-name"}>About Us</div>
                                </Link>
                            </li>
                            <li className={"side-bar-shopping-cart-button"}>
                                <Link to={currentUser?"/shoppingcart":"/login"} className={"side-bar-shopping-cart-item"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={ShoppingCart} className={"side-bar-shopping-cart-logo"}/>
                                    <div className={"side-bar-items-name"}>Shopping Cart</div>
                                </Link>
                            </li>
                            <li className={"side-bar-favorite-button"}>
                                <Link to={"/myfavorite"} className={"side-bar-items"} onClick={()=>{setHamburgerMenuIsClicked(false)}}>
                                    <img src={ColoredHeart} className={"side-bar-favorite-logo"}/>
                                    <div className={"side-bar-items-name"}>Favorite Corner</div>
                                </Link>
                            </li>
                            <li style={!currentUser?{display: "none"}:{display: "flex"}} className={"side-bar-logout-button"} onClick={()=>{firebaseAuthServiceSignOut();setHamburgerMenuIsClicked(false)}}>
                                <img src={Login} className={"side-bar-logout-logo"}/>
                                <div className={"side-bar-logout-name"}>Logout</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}