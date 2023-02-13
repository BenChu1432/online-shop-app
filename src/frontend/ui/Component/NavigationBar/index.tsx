import "./style.css"
import Navbar from 'react-bootstrap/Navbar';
import {Alert, Button, Form} from "react-bootstrap";
import {ReactComponent as User} from "../../images/user.svg";
import {ReactComponent as ShoppingCart} from "../../images/shopping-cart.svg";
import {Link} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import {firebaseAuthServiceOnAuthStateChanged, firebaseAuthServiceSignOut} from "../../../service/AuthService";
import {UsernameContext} from "../../Context/UsernameContext";
import {LoginUserContext} from "../../Context/LoginUserContext";
import Stars from "../../images/stars.png";
import Menu from "../../images/menu.png";
import ColoredHeart from "../../images/coloredHeart.png";
import {HamburgerMenuContext} from "../../Context/HamburgerMenuContext";
import {ReactComponent as FreeFox} from "../../images/FreeFox.svg";

export default function NavigationBar(){
    const {username,setUsername}=useContext(UsernameContext);
    const {currentUser, setCurrentUser}=useContext(LoginUserContext);
    const {hamburgerMenuIsClicked,setHamburgerMenuIsClicked}=useContext(HamburgerMenuContext);
    const [isClicked,setIsClicked]=useState<boolean>(false);
    const [forgotToLogIn,setForgotToLogIn]=useState<boolean>(false);
    const [emailNotVerified,setEmailNotVerified]=useState<boolean|undefined>(undefined);

    const handleFavoriteOnClick=()=>{
        if(!currentUser){
            setForgotToLogIn(true);
            window.location.href="/#/login"
        }else if(currentUser&&!currentUser.emailVerified){
            setEmailNotVerified(true);
        }else{
            window.location.href="/#/myfavorite"
            setForgotToLogIn(false);
        }
    }

    const handleClickProfileFunction=()=>{
        if(isClicked){
            setIsClicked(false);
        }else{
            setIsClicked(true);
        }
    }

    const handleForgotToLogIn=(event: React.MouseEvent<HTMLButtonElement>)=>{
        setForgotToLogIn(true);
    }

    const handleMenuOnClick=()=>{
        setHamburgerMenuIsClicked(!hamburgerMenuIsClicked);
    }

    const renderLoginContainer=()=>{
        if(currentUser){
            return(
                <div className={"dropdown-menu"}>
                    <div> <Link to="/" className={"dropdown-menu-item"} onClick={firebaseAuthServiceSignOut}>Sign Out</Link></div>
                </div>
            )
        }else{
            return(
                <div className={"dropdown-menu"}>
                    <div><Link to="/login" className={"dropdown-menu-item" }>Log In</Link></div>
                    <div className={"line-height"}/>
                    <div><Link to="/register" className={"dropdown-menu-item"}>Register</Link></div>
                </div>
            )
        }
    }

    useEffect(()=>{
        firebaseAuthServiceOnAuthStateChanged(setCurrentUser,setUsername)}
        ,[])

    return(
        <>
            <Navbar className={"navbar"}>
                <div className={"navbar-container"}>
                    <Link to={"/"}><FreeFox className={"navbar-company-logo"}/></Link>
                    <Navbar.Brand className={"company-name"}>Free Fox Fashion</Navbar.Brand>
                    <div className={"subtitle"}>
                        {currentUser?.userType==="artist"||currentUser?.userType==="bothCustomerAndArtist"?
                            <div style={{position: "relative",paddingTop: "0.75rem"}}>
                                <Link to="/upload-prototype" className={"upload-wording"}>UPLOAD</Link>
                                <img src={Stars} className={"starry-decoration"}/>
                            </div> :
                            <Link to="/" className={"navbar-wording"}>HOME</Link>}
                        <Link to="/shop/general" className={"navbar-wording"}>SHOP</Link>
                        <Link to="/aboutus" className={"navbar-wording"}>ABOUT US</Link>
                    </div>
                </div>
                <div className={"right-navbar"}>
                    <div className={"search-bar-container"}>
                        <Form className={"search-bar"}>
                            <Form.Group className={"search-plus-button"} controlId="formBasicSearch">
                                <Form.Control type="search" placeholder="search" className={"search-input"}/>
                                <button className={"search-button"} type="submit">
                                    SEARCH
                                </button>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className={"username-logos-container"}>
                        {(currentUser)?(
                            <div className={"username-container"}>
                                <div className={"username"}>Welcome, {username}!</div>
                            </div>
                        ):(
                            <div className={"username-container"}>
                                <div className={"username"}>Not logged in yet</div>
                            </div>
                        )}
                        <div className={"logo-container"}>
                            <button className={"icon-circle"} onClick={handleFavoriteOnClick}>
                                <img src={ColoredHeart} className={"icon-logo"}/>
                            </button>
                            <button className={"icon-circle"} onClick={handleClickProfileFunction}>
                                <User className={"icon-logo"}/>
                                {isClicked?renderLoginContainer():null}
                            </button>
                            {(currentUser!=null)?(
                                <button className={"icon-circle"}>
                                    <Link to="/shoppingcart">
                                        <ShoppingCart className={"icon-logo"}/>
                                    </Link>
                                </button>
                            ):(
                                <button className={"icon-circle"} onClick={handleForgotToLogIn}>
                                    <Link to="/login">
                                        <ShoppingCart className={"icon-logo"}/>
                                    </Link>
                                </button>
                            )}
                            <div className={"menu-container"}>
                                <img src={Menu} className={"menu-logo"} onClick={handleMenuOnClick} style={hamburgerMenuIsClicked?{animation: "rotation 0.5s linear"}:{animation: "none"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Navbar>
            {
                (forgotToLogIn)&&
                <Alert variant={"danger"}>
                    You have not logged in yet!
                </Alert>
            }
            {
                (emailNotVerified)&&
                <Alert variant={"danger"}>
                    You need to have your email address verified!
                </Alert>
            }
        </>
    )
}