import {TransactionDetailData} from "../data/TransactionDetailData";
import axios, {AxiosResponse} from "axios";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import {postTransactionDetailsAndGetSessionUrl} from "./CheckoutSessionResource";


export const prepareTransactionDetailData=async (setReadyToProceed:(setReadyToProceed:boolean)=>void,setPreparedTransactionDetail:(data: TransactionDetailData)=>void)=> {
    await firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.post(`http://localhost:8080/transaction/prepare`,{},{ headers: {Authorization : `Bearer ${token}`}})
    }).then((response:AxiosResponse<TransactionDetailData>)=>{
        setPreparedTransactionDetail(response.data);
        setReadyToProceed(true);
        console.log("prepareTransactionDetailData:"+response.data);
        console.log(response);
    }).catch((response)=>{
        console.log(response);
    })
}

export const getTransactionDetailData=(tid:number,setPreparedTransactionDetail:(data: TransactionDetailData)=>void)=> {
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.get(`http://localhost:8080/transaction/${tid}`,{ headers: {Authorization : `Bearer ${token}`}})
    }).then((response:AxiosResponse<TransactionDetailData>)=>{
        setPreparedTransactionDetail(response.data);
        console.log(response);
    }).catch((response)=>{
        console.log(response);
    })
}

export const changeTransactionStatusToPay=(setNeedLoading:(needLoading:boolean)=>void,preparedTransactionDetail:TransactionDetailData)=>{
    firebaseAuthServiceGetAccessToken()?.then((token)=>{
        return axios.patch(`http://localhost:8080/transaction/${preparedTransactionDetail.tid}/pay`,{},{ headers: {Authorization : `Bearer ${token}`}})
    }).then((response:AxiosResponse<String>)=>{
        setNeedLoading(false);
        console.log("changeTransactionStatusToPay");
        console.log(response);
    }).catch((response)=>{
        console.log(response);
        setNeedLoading(false);
    })
}
//
export const changeTransactionStatusToFinished=(tid:number)=>{
    firebaseAuthServiceGetAccessToken()?.then((token)=> {
        console.log(token);
        return axios.patch(
            `http://localhost:8080/transaction/${tid}/finish`, {}, {headers: {Authorization: `Bearer ${token}`}})
    }).then((response:AxiosResponse<TransactionDetailData>)=>{
        console.log(response);
    }).catch((response)=>{
        console.log(response);
    })
}

