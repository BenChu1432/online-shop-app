import {CartItemData} from "../data/CartItemData";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import axios, {AxiosResponse} from "axios";
import {TransactionDetailData} from "../data/TransactionDetailData";
import {changeTransactionStatusToFinished, changeTransactionStatusToPay} from "./TransactionDetailResource";

export const postTransactionDetailsAndGetSessionUrl=async (setCheckoutSessionOpen:(checkoutSessionOpen:boolean)=>void,setNeedLoading:(needLoading:boolean)=>void,transactionDetailData: TransactionDetailData)=> {
    const transactionCartItems=transactionDetailData.items;
    await firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.post(`http://localhost:3001/create-checkout-session?tid=${transactionDetailData.tid}`,{transactionCartItems}
        )
    })
        .then(function (response) {
            window.open(response.data.url,"_self")
            setCheckoutSessionOpen(true);
            console.log(response);})
        .catch(function (error) {
            console.log(error);
            setCheckoutSessionOpen(false);
            setNeedLoading(false);
        })
}

export const getCheckoutSessionDetails=(tid:string,sessionId:string,setPaymentStatus:(status:boolean)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.get(`http://localhost:3001/transaction/success?session_id=${sessionId}`
        )
    })
        .then(function (response) {
            console.log(response);
            if(response.data.payment_status==="paid"){
                setPaymentStatus(true);
            }else if(response.data.payment_status==="unpaid"){
                setPaymentStatus(false);
            }
            }
        )
        .catch(function (error) {
            console.log(error);
        })
}