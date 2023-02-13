import axios, {AxiosResponse} from "axios";
import {ProductData} from "../data/ProductData";
import {ProductDetailData} from "../data/ProductDetailData";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import {RatingItemData} from "../data/RatingItemData";

export const getAndSetProductListDataByPid=(pid: string, setProductDetailData: (data:ProductDetailData)=>void,setAssignedPrice:(assignedPrice:number)=>void,setMarkedPrice:(markedPrice:number)=>void,setChosenSize:(chosenSize:string)=>void,setChosenDuration:(chosenDuration:string)=>void)=>{
    const url=`http://localhost:8080/product/${pid}`
    axios.get(url)
        .then(function (response: AxiosResponse<ProductDetailData>) {
            setProductDetailData(response.data);
            if(response.data.shortDuration){
                if(response.data.sizeOne){
                    setMarkedPrice(response.data.shortLastingMarkedPriceOne);
                    setAssignedPrice(response.data.shortLastingSellingPriceOne);
                    setChosenDuration("short duration: 1-3 days")
                    setChosenSize(response.data.sizeOne);
                }else if(response.data.sizeTwo){
                    setMarkedPrice(response.data.shortLastingMarkedPriceTwo);
                    setAssignedPrice(response.data.shortLastingSellingPriceTwo);
                    setChosenDuration("short duration: 1-3 days")
                    setChosenSize(response.data.sizeTwo);
                }else if(response.data.sizeThree){
                    setMarkedPrice(response.data.shortLastingMarkedPriceThree);
                    setAssignedPrice(response.data.shortLastingSellingPriceThree);
                    setChosenDuration("short duration: 1-3 days")
                    setChosenSize(response.data.sizeThree);
                }else if(response.data.sizeFour){
                    setMarkedPrice(response.data.shortLastingMarkedPriceFour);
                    setAssignedPrice(response.data.shortLastingSellingPriceFour);
                    setChosenDuration("short duration: 1-3 days")
                    setChosenSize(response.data.sizeFour);
                }else if(response.data.sizeFive){
                    setMarkedPrice(response.data.shortLastingMarkedPriceFive);
                    setAssignedPrice(response.data.shortLastingSellingPriceFive);
                    setChosenDuration("short duration: 1-3 days")
                    setChosenSize(response.data.sizeFive);
                }
            }else{
                if(response.data.sizeOne){
                    setMarkedPrice(response.data.longLastingMarkedPriceOne);
                    setAssignedPrice(response.data.longLastingSellingPriceOne);
                    setChosenDuration("long duration: 2 weeks or more")
                    setChosenSize(response.data.sizeOne);
                }else if(response.data.sizeTwo){
                    setMarkedPrice(response.data.longLastingMarkedPriceTwo);
                    setAssignedPrice(response.data.longLastingSellingPriceTwo);
                    setChosenDuration("long duration: 2 weeks or more")
                    setChosenSize(response.data.sizeTwo);
                }else if(response.data.sizeThree){
                    setMarkedPrice(response.data.longLastingMarkedPriceThree);
                    setAssignedPrice(response.data.longLastingSellingPriceThree);
                    setChosenDuration("long duration: 2 weeks or more")
                    setChosenSize(response.data.sizeThree);
                }else if(response.data.sizeFour){
                    setMarkedPrice(response.data.longLastingMarkedPriceFour);
                    setAssignedPrice(response.data.longLastingSellingPriceFour);
                    setChosenDuration("long duration: 2 weeks or more")
                    setChosenSize(response.data.sizeFour);
                }else if(response.data.sizeFive){
                    setMarkedPrice(response.data.longLastingMarkedPriceFive);
                    setAssignedPrice(response.data.longLastingSellingPriceFive);
                    setChosenDuration("long duration: 2 weeks or more")
                    setChosenSize(response.data.sizeFive);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getProductDetail=(pid: number, setProductDetailData: (data:ProductDetailData)=>void)=>{
    const url=`http://localhost:8080/product/${pid}`
    axios.get(url)
        .then(function (response: AxiosResponse<ProductDetailData>) {
            setProductDetailData(response.data);

        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getGeneralRating=(pid:number, setAverageRating:(averageRating:number)=>void)=>{
    const url=`http://localhost:8080/product/general/rating/${pid}`;
    axios.get(url)
        .then((response:AxiosResponse<RatingItemData>)=>{
            setAverageRating(response.data.averageStars.valueOf());
            console.log("Average rating has been set!");
        }).catch((error)=>{
            console.log(error.data);
    })
}

export const getSpecificRating=(pid:number, setAverageRating:(averageRating:number)=>void)=>{
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        axios.get(`http://localhost:8080/product/specific/rating/${pid}`,{ headers: {Authorization : `Bearer ${token}`}})
            .then((response:AxiosResponse<RatingItemData>)=>{
                setAverageRating(response.data.averageStars);
                console.log("Average rating has been set!");
            }).catch((error)=>{
            console.log(error.data);
        })
    })
}

export const addAndUpdateRating=(pid: number, ratingValue: number, comment:string,setRatingStatus:(ratingStatus:boolean)=>void,setCloseButtonClicked:(closeButtonClicked:boolean)=>void)=>{
    firebaseAuthServiceGetAccessToken()?.then( (token) => {
        axios.put(`http://localhost:8080/product/specific/rating/${pid}/${ratingValue}/${comment}`, {}, {headers: {Authorization: `Bearer ${token}`}})
            .then((response: AxiosResponse<RatingItemData>) => {
                console.log(response)
                setRatingStatus(true);
                setCloseButtonClicked(true);
            }).catch((error) => {
                console.log(error);
                setRatingStatus(false);
                setCloseButtonClicked(false);
            })
    })
}
