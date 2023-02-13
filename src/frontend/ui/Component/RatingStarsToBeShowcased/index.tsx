import "./style.css";
import {FaStar, FaStarHalf} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import {getGeneralRating, addAndUpdateRating} from "../../../resource/ProductDetailResource"
import {LoginUserContext} from "../../Context/LoginUserContext";

type Props={
    pid: number;
    averageRating: number|undefined;
    setAverageRating:(averageRating:number)=>void;
    setCloseButtonClicked:(closeButtonClicked:boolean)=>void;
    setGiveRatingStatus:(giveRatingStatus:boolean)=>void;
    setUserEmailNotVerified:(userEmailNotVerified:boolean|undefined)=>void;
}

export default function RatingStarsToBeShowcased(props:Props){
    const {currentUser}=useContext(LoginUserContext);
    const [rating,setRating]=useState<number|null>(null);

    const handleStarOnClick=()=>{
        if(!currentUser){
            props.setGiveRatingStatus(false);
        }else if(currentUser&&currentUser.emailVerified){
            props.setCloseButtonClicked(false);
        }else{
            props.setUserEmailNotVerified(true);
        }
    }

    useEffect(()=>{
        if(props.averageRating){
            setRating(props.averageRating);
        }
    })


    return(
        <div className={"rating-stars-container"}>
            {[...Array(5)].map((star,index)=>{
                index=index+1;
                const firstHalfRatingValue=index-0.5;
                const secondHalfRatingValue=index;
                return (
                    <>
                        <label className={"rating-stars-label"}>
                            <input type="radio" name="rating" value={firstHalfRatingValue} style={{display: "none"}} onClick={handleStarOnClick}/>
                            <FaStarHalf color={firstHalfRatingValue<=(rating!)?"#ffc107":"#e4e5e9"} size={20} className={"half-star"}/>
                        </label>
                        <label>
                            <input type="radio" name="rating"  value={secondHalfRatingValue} style={{display: "none"}} onClick={handleStarOnClick}/>
                            <FaStar  color={secondHalfRatingValue<=(rating!)?"#ffc107":"#e4e5e9"} size={20} className={"star"}
                            />
                        </label>
                    </>
            )
            })}
        </div>
    )
}