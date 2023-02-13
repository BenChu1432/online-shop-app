import {useEffect, useState} from "react";
import {FaStar, FaStarHalf} from "react-icons/fa";

type Props={
    pid: number;
    setRatingStars:(ratingStars:number)=>void;
}

export default function RatingStarsToBeShowcased(props:Props){
    const [rating,setRating]=useState<number|null>(null);
    const [hover,setHover]=useState<number|null>(null);
    const [size,setSize]=useState<number|null>(40);

    const handleRatingStarHover=(ratingOnHover:number|null)=>{
        setHover(ratingOnHover);
    }

    const handleRatingStarOnClick=(ratingOnClick:number|null)=>{
        setRating(ratingOnClick);
        props.setRatingStars(ratingOnClick as number);
    }

    const maxSize = window.matchMedia('(min-width: 750px)');
    const miniSize = window.matchMedia('(max-width: 500px)');



    return(
        <div className={"rating-stars-container"}>
            {[...Array(5)].map((star,index)=>{
                index=index+1;
                if(miniSize.matches){
                    return (
                        <>
                            <label className={"rating-stars-label"}>
                                <input type="radio" name="rating" value={index} style={{display: "none"}} onClick={()=>{handleRatingStarOnClick(index)}}/>
                                <FaStar color={index<=(hover!|rating!)?"#ffc107":"#e4e5e9"} size={20}
                                        onMouseEnter={()=>{handleRatingStarHover(index)}}
                                        onMouseLeave={()=>{handleRatingStarHover(null)}}/>
                            </label>
                        </>
                    )
                }else if(maxSize.matches){
                    return (
                        <>
                            <label className={"rating-stars-label"}>
                                <input type="radio" name="rating" value={index} style={{display: "none"}} onClick={()=>{handleRatingStarOnClick(index)}}/>
                                <FaStar color={index<=(hover!|rating!)?"#ffc107":"#e4e5e9"} size={50}
                                        onMouseEnter={()=>{handleRatingStarHover(index)}}
                                        onMouseLeave={()=>{handleRatingStarHover(null)}}/>
                            </label>
                        </>
                    )
                }{
                    return (
                        <>
                            <label className={"rating-stars-label"}>
                                <input type="radio" name="rating" value={index} style={{display: "none"}} onClick={()=>{handleRatingStarOnClick(index)}}/>
                                <FaStar color={index<=(hover!|rating!)?"#ffc107":"#e4e5e9"} size={30}
                                        onMouseEnter={()=>{handleRatingStarHover(index)}}
                                        onMouseLeave={()=>{handleRatingStarHover(null)}}/>
                            </label>
                        </>
                    )
                }
            })}
        </div>
    )
}