import View from "../../images/view.png";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import "./style.css"
import {ProductData, ProductResponseDtoList} from "../../../data/ProductData";
import ShoppingCart from "../../images/shopping-cart.svg"
import Heart from "../../images/heart.png";
import ColoredHeart from "../../images/coloredHeart.png";
import {LoginUserContext} from "../../Context/LoginUserContext";
import {getLikeStatus, putLikeStatus} from "../../../resource/EcommerceResource";
import SkeletonLoading from "../SkeletonLoading"

type Props={
    productResponseDtoList: ProductResponseDtoList|undefined;
    setAddToShoppingCartStatus:(status:boolean)=>void;
    setShoppingCartIsClicked:(status:boolean)=>void;
    setDurationOverlayCloseButtonClicked:(durationOverlayCloseButtonClicked:boolean)=>void;
    setHashtagFilter?:(priceFilter:boolean)=>void;
    setSizeFilter?:(priceFilter:boolean)=>void;
    setThemeFilter?:(priceFilter:boolean)=>void;
    setColorFilter?:(priceFilter:boolean)=>void;
    handleShoppingCartOnClicked:(pid:number)=>void;
    likeStatus:boolean;
    setPutLikeStatus:(putLikeStatus:boolean)=>void;
    setNeedLoading?:(needLoading:boolean)=>void;
    setNeedLoggingInMessage?:(needLoggingInMessage:boolean)=>void;
    handleRemove?:(pid:number)=>void;
    setEmailNotVerified?:(emailNotVerified:boolean)=>void;
}

export default function ProductCard(props:Props){
    const {currentUser}=useContext(LoginUserContext);
    const [isHovering, setIsHovering]=useState<boolean>(false);
    const [hoverID, setHoverID]=useState<number|undefined>(undefined);
    const [likeStatus,setLikeStatus]=useState<boolean|undefined>(props.likeStatus);

    const handleMouseOverFunction=(id:number)=>{
        setIsHovering(true);
        setHoverID(id);
    };

    const handleMouseOutFunction=(id:number)=>{
        setIsHovering(false);
        setHoverID(id);
    }

    const handleShoppingCart=(id:number)=>{
        props.setShoppingCartIsClicked(true);
        if(currentUser&&currentUser.emailVerified){
            props.handleShoppingCartOnClicked(id);
            props.setDurationOverlayCloseButtonClicked(false);
            props.setHashtagFilter&&props.setHashtagFilter(false);
            props.setSizeFilter&&props.setSizeFilter(false);
            props.setThemeFilter&&props.setThemeFilter(false);
            props.setColorFilter&&props.setColorFilter(false);
        }else if(currentUser&&!currentUser.emailVerified){
            props.setEmailNotVerified&&props.setEmailNotVerified(true);
        }else{
            props.setNeedLoggingInMessage&&props.setNeedLoggingInMessage(true);
        }
    }

    const handleLikeOnClick=()=>{
        if(!currentUser){
            props.setNeedLoggingInMessage&&props.setNeedLoggingInMessage(true);
        }else if(currentUser&&!currentUser.emailVerified){
            props.setEmailNotVerified&&props.setEmailNotVerified(true);
        } else{
            props.setNeedLoading&&props.setNeedLoading(true);
            putLikeStatus(props.productResponseDtoList!.pid,props.setPutLikeStatus);
            if(likeStatus){
                //To remove it from the ui
                props.handleRemove&&props.handleRemove(props.productResponseDtoList!.pid);
                //Show if the heart is red or transparent
                setLikeStatus(false);
            }else{
                setLikeStatus(true);
            }
        }
    }

    if(props.productResponseDtoList){
        return(
            <div className={"product-card"}
                 onMouseOver={() => handleMouseOverFunction(props.productResponseDtoList!.pid)}
                 onMouseOut={() => handleMouseOutFunction(props.productResponseDtoList!.pid)}>
                <div className={"product-info-pop-up"}>
                    {isHovering && props.productResponseDtoList!.pid === hoverID &&
                        <div>
                            <div className={"view-icon-square"}>
                                <img className={"pop-up-icon"} src={View}/>
                                <Link to={`/productdetail/${props.productResponseDtoList!.pid}`}
                                      className={"product-detail-link"}></Link>
                            </div>
                            <div className={"shopping-cart-icon-square"} onClick={()=>{handleShoppingCart(props.productResponseDtoList!.pid)}}>
                                <img className={"pop-up-icon"} src={ShoppingCart}/>
                            </div>
                            <div className={"view-like-square"} onClick={handleLikeOnClick}>
                                {likeStatus&&<img className={"pop-up-icon"} src={ColoredHeart}/>}
                                {!likeStatus&&<img className={"pop-up-icon"} src={Heart}/>}
                            </div>
                        </div>
                    }
                </div>
                <div className={"product-size"}>
                    <div className={"product-card-top"}>
                        <div className={"card-image-and-name-container"}>
                            <img src={props.productResponseDtoList!.imageUrl} className={"card-image"}/>
                            <div className={"products-name-container"}>
                                <div className={"product-name"}>{props.productResponseDtoList!.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className={"product-card"}>
                <div className={"product-size"}>
                    <div className={"product-card-top"}>
                        <div className={"card-image-and-name-container"}>
                            <SkeletonLoading className={"card-image"}/>
                            <div className={"products-name-container"}>
                                <SkeletonLoading className={"product-name"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}