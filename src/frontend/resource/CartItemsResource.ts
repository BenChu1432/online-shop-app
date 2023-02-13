import axios, {AxiosResponse} from "axios";
import {CartItemData} from "../data/CartItemData";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import {promises} from "dns";


export const retrieveCartItemListData=(setOriginalCartItemList:(data:CartItemData[])=>void,setCartItemList: (data:CartItemData[])=>void)=> {
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
                return axios.get(`http://localhost:8080/cart`,{ headers: {Authorization : `Bearer ${token}`}})
            })
        .then(function (response: AxiosResponse<CartItemData[]>) {
        setCartItemList(response.data);
        setOriginalCartItemList(response.data);
        console.log(response.data);})
        .catch(function (error) {
            console.log(error);
        })
}

export const addCartItemDataOnDetailPage=(pid:number, quantity: number, chosenDuration:string,chosenSize: string, assignedPrice:number, setAddToShoppingCartStatus: (status: boolean)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        console.log(token);
        return axios.put(`http://localhost:8080/cart/${pid}/${quantity}/${chosenDuration}/${chosenSize}/${assignedPrice}`,{},{ headers: {Authorization : `Bearer ${token}`}})
    })
        .then(function (response: AxiosResponse<string>) {
            setAddToShoppingCartStatus(true);
            console.log(response.data);})
        .catch(function (error) {
            console.log(error);
            setAddToShoppingCartStatus(false);
        })
}

export const addCartItemDataOnShoppingPage=(pid:number, quantity: number, chosenDuration:string, chosenSize: string, assignedPrice:number, setAddToShoppingCartStatus: (status: boolean)=>void,setQuantityOverlayCloseButtonClicked:(quantityOverlayCloseButtonClicked:boolean)=>void,setQuantity:(quantity:number)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        console.log(token);
        return axios.put(`http://localhost:8080/cart/${pid}/${quantity}/${chosenDuration}/${chosenSize}/${assignedPrice}`,{},{ headers: {Authorization : `Bearer ${token}`}})
    })
        .then(function (response: AxiosResponse<string>) {
            setAddToShoppingCartStatus(true);
            setQuantityOverlayCloseButtonClicked(true);
            setQuantity(1);
            console.log(response.data);})
        .catch(function (error) {
            console.log(error);
            setAddToShoppingCartStatus(false);
            setQuantityOverlayCloseButtonClicked(true);
        })
}

export const updateCartItemData=(updateItem:CartItemData)=>{
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        console.log(token);
        return axios.patch(`http://localhost:8080/cart/${updateItem.pid}/${updateItem.cartQuantity}/${updateItem.chosenDuration}/${updateItem.chosenSize}/${updateItem.assignedPrice}`,{},{ headers: {Authorization : `Bearer ${token}`}})
    })
        .then(function (response: AxiosResponse<CartItemData>) {
            console.log(response.data);})
        .catch(function (error) {
            console.log(error);
        })
}

export const updateCartItemChosenSizeData=(pid:number, updatedChosenSize:string)=> {
    firebaseAuthServiceGetAccessToken()?.then((token) => {
        console.log(token);
        return axios.patch(`http://localhost:8080/cart/chosenSize/${pid}/${updatedChosenSize}`, {}, {headers: {Authorization: `Bearer ${token}`}})
    })
        .then((response: AxiosResponse<CartItemData>)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.log(error.data);
    })
}

export const deleteCartItemData=(pid:number,setDeleteStatus: (status: boolean)=>void)=>{
    firebaseAuthServiceGetAccessToken()?.
    then((token)=>{
        console.log(pid);
        return axios.delete(`http://localhost:8080/cart/pid/${pid}`,{ headers: {Authorization : `Bearer ${token}`}})
    })
        .then(function (response) {
            console.log(response.data)
            setDeleteStatus(true);})
        .catch(function (error) {
            console.log(error)
            setDeleteStatus(false);
        })
}

export const deleteRepeatedCartItem=(cid:number)=>{
    firebaseAuthServiceGetAccessToken()?.
    then((token)=>{
        return axios.delete(`http://localhost:8080/cart/cid/${cid}`,{ headers: {Authorization : `Bearer ${token}`}})
    })
        .then(function (response) {
            console.log(response.data);})
        .catch(function (error) {
            console.log(error)
        })
}

