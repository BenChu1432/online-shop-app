import axios, {AxiosResponse} from "axios";
import {ProductData, ProductResponseDtoList} from "../data/ProductData";
import {LikeItemData} from "../data/LikeItemData";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";

export const getAndSetProductListData=(setProductData: (data:ProductResponseDtoList[])=>void)=> {
    axios.get('http://localhost:8080/products')
        .then(function (response: AxiosResponse<ProductData>) {
            setProductData(response.data.productResponseDtoList);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getAndSetProductSortedList=(setProductResponseDtoList: (data:ProductResponseDtoList[])=>void, setTotalProducts:(totalProducts:number)=>void, designer:string ,hashtag:string,horoscope:boolean, universe:boolean, nature:boolean,blackAndWhite:boolean, fullColor:boolean, sizeOne:boolean, sizeTwo:boolean, sizeThree:boolean, sizeFour:boolean, sizeFive:boolean, pageSize:number, pageNumber:number, setNeedLoading:(needLoading:boolean)=>void)=>{
    console.log("hashtag:"+hashtag)
    axios.get('http://localhost:8080/products/sort',{params:{
            designer:designer,
            hashtag: hashtag,
            horoscope: horoscope,
            universe: universe,
            nature: universe,
            blackAndWhite: blackAndWhite,
            fullColor: fullColor,
            sizeOne: sizeOne,
            sizeTwo: sizeTwo,
            sizeThree: sizeThree,
            sizeFour: sizeFour,
            sizeFive: sizeFive,
            pageSize:pageSize,
            pageNumber:pageNumber
        }})
        .then(function (response: AxiosResponse<ProductData>) {
            setProductResponseDtoList(response.data.productResponseDtoList);
            setTotalProducts(response.data.numOfProducts);
            setNeedLoading(false);
            console.log(pageNumber);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            setNeedLoading(false);
        }
        )
}

export const getAllLikeItems=(setLikeItemList:(likeItemList:LikeItemData[])=>void,setNeedLoading?:(needLoading:boolean)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.
    then((token)=>{
        return axios.get(`http://localhost:8080/product/like`,{ headers: {Authorization : `Bearer ${token}`}})
    }).then(function (response:AxiosResponse<LikeItemData[]>) {
        let tempLikeItemList:LikeItemData[]=[];
        response.data.map((likeItem)=>{
            if(likeItem.clickedLike){
                tempLikeItemList.push(likeItem);
            }
        })
        setLikeItemList(tempLikeItemList);
        setNeedLoading&&setNeedLoading(false);
        console.log(response.data);
    })
        .catch(function (error) {
            setNeedLoading&&setNeedLoading(false);
            console.log(error);
        })
}

export const getLikeStatus=(pid:number,setLikeStatus:(likeStatus:boolean)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.
    then((token)=>{
        return axios.get(`http://localhost:8080/product/like/${pid}`,{ headers: {Authorization : `Bearer ${token}`}})
    }).then(function (response) {
        if(response.data.response==="TRUE"){
            setLikeStatus(true);
        }else{
            setLikeStatus(false);
        }
    })
        .catch(function (error) {
            console.log(error);
        })
}

export const putLikeStatus=(pid:number,setPutLikeStatus?:(putLikeStatus:boolean)=>void)=>{
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.put(`http://localhost:8080/product/like/${pid}`,{},{headers: {Authorization : `Bearer ${token}`}})
    }).then(function(response){
        setPutLikeStatus&&setPutLikeStatus(true);
        console.log(response);
    }).catch(function (error){
        console.log(error);
        setPutLikeStatus&&setPutLikeStatus(false);
    })
}