import NavigationBar from "../../Component/NavigationBar";
import "./style.css";
import ShoppingCart from "../../images/darked-shopping-cart.png";
import MockData from "./response.json";
import {CartItemData} from "../../../data/CartItemData";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Alert, Form} from "react-bootstrap";
import TrashCan from "../../images/trash-bin.png";
import {
    deleteRepeatedCartItem,
    retrieveCartItemListData,
    updateCartItemChosenSizeData
} from "../../../resource/CartItemsResource";
import LoadingSpinner from "../../Component/LoadingSpinner";
import PlusSign from "../../images/plus-small.png";
import MinusSign from "../../images/minus-small.png";
import {updateCartItemData} from "../../../resource/CartItemsResource";
import {deleteCartItemData} from "../../../resource/CartItemsResource"
import {Link} from "react-router-dom";
import {changeTransactionStatusToPay, prepareTransactionDetailData} from "../../../resource/TransactionDetailResource";
import Invoice from "../../Component/Invoice"
import {TransactionDetailData} from "../../../data/TransactionDetailData";
import {postTransactionDetailsAndGetSessionUrl} from "../../../resource/CheckoutSessionResource";
import {wait} from "@testing-library/user-event/dist/utils";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";


export default function ShoppingCartPage(){
    const [needLoading,setNeedLoading]=useState<boolean>(false);
    const [originalCartItemList,setOriginalCartItemList]=useState<CartItemData[]|undefined>(undefined);
    const [cartItemList, setCartItemList]=useState<CartItemData[]|undefined>(undefined);
    const [readyToProceed,setReadyToProceed]=useState<boolean>(false);
    const [preparedTransactionDetail,setPreparedTransactionDetail]=useState<TransactionDetailData|undefined>(undefined);
    const [attemptToGoBelowOneStatus, setAttemptToGoBelowOneStatus]=useState<boolean>(false);
    const [attemptToGoBeyondStockStatus, setAttemptToGoBeyondStockStatus]=useState<boolean>(false);
    const [buttonStatus, setButtonStatus] = useState<boolean>(false);
    const [deleteStatus, setDeleteStatus]=useState<undefined|boolean>(undefined);
    const [confirmStatus, setConfirmStatus]=useState<undefined|boolean>(false);
    const [chosenDuration,setChosenDuration]=useState<string|undefined>(undefined);
    const [chosenSize,setChosenSize]=useState<string|undefined>(undefined);
    const [checkoutSessionOpen,setCheckoutSessionOpen]=useState<boolean|undefined>(undefined);
    const [repeatedCartItems,setRepeatedCartItems]=useState<CartItemData[]|undefined>(undefined);


    //Problem: The DOM doesn't render itself into the virtual DOM
    const handleQuantityPlus = (value:CartItemData , index:number) => {
        console.log(JSON.stringify(value , null ,4))
        let clonedItem;
        if(value){
            clonedItem = value;
            clonedItem.cartQuantity += 1;
            if(cartItemList) {
                let updatedCartItemList = cartItemList;
                updatedCartItemList[index] = clonedItem;
                setCartItemList(cartItemList);
                // console.log(JSON.stringify(updatedCartItemList[index]))
                // console.log(JSON.stringify(cartItemList, null , 4))
            }
        }
        setButtonStatus(!buttonStatus)
    }

    const handleQuantityMinus = (value:CartItemData , index:number) => {
        let clonedItem;
        if(value){
            clonedItem = value;
            clonedItem.cartQuantity -= 1;
            if(cartItemList) {
                let updatedList = cartItemList;
                updatedList[index] = clonedItem;

                setCartItemList(updatedList);
            }
        }
    }
    // new trial function
    const handleQuantityPlusById = (id: number) => {
        setCartItemList(cartItemList!.map((item) => {
            if(item.pid === id&&(item.cartQuantity+1<item.stock)) {
                let quantity=item.cartQuantity+1;
                return {
                    //...item=>other attributes stay the same
                    ...item,
                    //attribute : value
                    cartQuantity: quantity,
                    assignedPrice: item.assignedPrice
                }
            }
            else {
                return item;
            }
        }))
    }

    const handleQuantityMinusById=(id: number)=>{
        setCartItemList(cartItemList!.map((item) =>{
            if(item.pid===id&&!(item.cartQuantity-1===0)){
                let quantity=item.cartQuantity-1;
                return{
                    ...item,
                    cartQuantity: quantity,
                    assignedPrice: item.assignedPrice
                }
            }else{
                return item
            }
        }))
    }

    const handleTattooDuration=(pid:number,quantity:number,oldDuration:string, chosenDuration:string,chosenSize:string,shortDurationPriceOne:number,shortDurationPriceTwo:number,shortDurationPriceThree:number,shortDurationPriceFour:number,shortDurationPriceFive:number,longDurationPriceOne:number,longDurationPriceTwo:number,longDurationPriceThree:number,longDurationPriceFour:number,longDurationPriceFive:number)=>{
        let chosenPrice:number=999999;
        if(chosenDuration==="Short Duration: 1-3 days"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                chosenPrice=shortDurationPriceOne;
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                chosenPrice=shortDurationPriceTwo;
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                chosenPrice=shortDurationPriceThree;
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                chosenPrice=shortDurationPriceFour;
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                chosenPrice=shortDurationPriceFive;
            }
        }else if(chosenDuration==="Long Duration: 2 weeks or more"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                chosenPrice=longDurationPriceOne;
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                chosenPrice=longDurationPriceTwo;
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                chosenPrice=longDurationPriceThree;
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                chosenPrice=longDurationPriceFour;
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                chosenPrice=longDurationPriceFive;
            }
        }
        //Find the item and change one entity of the item
        setChosenDuration(chosenDuration);
        setCartItemList(cartItemList?.map((cartItem)=>{
            if(cartItem.pid===pid&&cartItem.chosenDuration===oldDuration&&cartItem.chosenSize===chosenSize){
                return{
                    ...cartItem,
                    chosenDuration:chosenDuration,
                    assignedPrice:chosenPrice
                }
            }else{
                return cartItem
            }
        }))
        //Get rid of repeated items
        let numOfRepeatedItemFound:number=0;
        cartItemList?.map((cartItem,index)=>{
            if(cartItem.pid===pid&&cartItem.chosenDuration===chosenDuration&&cartItem.chosenSize===chosenSize){
                numOfRepeatedItemFound=numOfRepeatedItemFound+1;
            }else{
                return cartItem;
            }
        })
        let tempCartItemList:CartItemData[]=[],deletedCartItemList:CartItemData[]=[],repeatedItemFound:boolean=false;
        if(numOfRepeatedItemFound>0){
            cartItemList?.map((cartItem,index)=>{
                if(cartItem.pid===pid&&cartItem.chosenDuration===oldDuration&&cartItem.chosenSize===chosenSize){
                    deletedCartItemList.push(cartItem);
                    delete cartItemList[index]
                    numOfRepeatedItemFound=numOfRepeatedItemFound-1;
                    repeatedItemFound=true;
                }else{
                    tempCartItemList.push(cartItem);
                    return cartItem;
                }
            })
        }
        if(repeatedItemFound){
            setCartItemList(tempCartItemList);
            setRepeatedCartItems(deletedCartItemList);
            repeatedItemFound=false;
        }
        numOfRepeatedItemFound=0;
    }

    const handleTattooSize=(pid:number,quantity:number, chosenDuration:string,oldSize:string, chosenSize:string,shortDurationPriceOne:number,shortDurationPriceTwo:number,shortDurationPriceThree:number,shortDurationPriceFour:number,shortDurationPriceFive:number,longDurationPriceOne:number,longDurationPriceTwo:number,longDurationPriceThree:number,longDurationPriceFour:number,longDurationPriceFive:number)=>{
        let chosenPrice:number=9999999;
        if(chosenDuration==="Short Duration: 1-3 days"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                chosenPrice=shortDurationPriceOne;
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                chosenPrice=shortDurationPriceTwo;
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                chosenPrice=shortDurationPriceThree;
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                chosenPrice=shortDurationPriceFour;
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                chosenPrice=shortDurationPriceFive;
            }
        }else if(chosenDuration==="Long Duration: 2 weeks or more"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                chosenPrice=longDurationPriceOne;
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                chosenPrice=longDurationPriceTwo;
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                chosenPrice=longDurationPriceThree;
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                chosenPrice=longDurationPriceFour;
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                chosenPrice=longDurationPriceFive;
            }
        }
        setChosenSize(chosenSize);
        setCartItemList(cartItemList?.map((cartItem)=>{
            if(cartItem.pid===pid&&cartItem.chosenDuration===chosenDuration&&cartItem.chosenSize===oldSize){
                return{
                    ...cartItem,
                    chosenSize:chosenSize,
                    assignedPrice:chosenPrice
                }
            }else{
                return cartItem
            }
        }))
        //Get rid of repeated items
        let numOfRepeatedItemFound:number=0;
        cartItemList?.map((cartItem,index)=>{
            if(cartItem.pid===pid&&cartItem.chosenDuration===chosenDuration&&cartItem.chosenSize===chosenSize){
                numOfRepeatedItemFound=numOfRepeatedItemFound+1;
            }else{
                return cartItem;
            }
        })
        let tempCartItemList:CartItemData[]=[],deletedCartItemList:CartItemData[]=[],repeatedItemFound:boolean=false;
        if(numOfRepeatedItemFound>0){
            cartItemList?.map((cartItem,index)=>{
                if(cartItem.pid===pid&&cartItem.chosenDuration===chosenDuration&&cartItem.chosenSize===oldSize){
                    deletedCartItemList.push(cartItem);
                    delete cartItemList[index]
                    numOfRepeatedItemFound=numOfRepeatedItemFound-1;
                    repeatedItemFound=true;
                }else{
                    tempCartItemList.push(cartItem);
                    return cartItem;
                }
            })
        }
        if(repeatedItemFound){
            setCartItemList(tempCartItemList);
            setRepeatedCartItems(deletedCartItemList);
            repeatedItemFound=false;
        }
        numOfRepeatedItemFound=0;
    }

    const handleTrashcanOnClick=(pid:number)=>{
        deleteCartItemData(pid,setDeleteStatus);
        let clonedCartItemList:(CartItemData)[];
        clonedCartItemList=cartItemList!.filter((item)=>item.pid!=pid);
        setCartItemList([...clonedCartItemList]);
    }

    const handleConfirmOnClick= (setNeedLoading:(needLoading:boolean)=>void)=>{
        setNeedLoading(true);
        repeatedCartItems?.map(async (repeatedCartItem)=>{
            await deleteRepeatedCartItem(repeatedCartItem.cid)
        })
        originalCartItemList?.map(async(originalItem)=>{
            await cartItemList?.forEach( (updatedItem) =>{
                if(updatedItem.cartQuantity!=originalItem.cartQuantity||updatedItem.chosenSize!=originalItem.chosenSize||updatedItem.chosenDuration!=originalItem.chosenDuration){
                     updateCartItemData(updatedItem);
                }
            })
        })
        setConfirmStatus(true);
        setNeedLoading(false);
    }


    const handleCheckoutOnClick=async()=>{
        setConfirmStatus(false);
        setNeedLoading(true);
        await prepareTransactionDetailData(setReadyToProceed,setPreparedTransactionDetail);
    }



    //simply put in a function that return a number
    const calculateTotal=(): number|undefined=>{
        return cartItemList?.reduce((subtotal,currentItem)=>subtotal+currentItem.assignedPrice*currentItem.cartQuantity,0)
    }

    const calculateNumOfItems=():number|undefined=>{
        return cartItemList?.length;
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    useEffect(()=>(
        retrieveCartItemListData(setOriginalCartItemList,setCartItemList)
    ),[])

    useEffect( ()=>{
        if(preparedTransactionDetail){
            postTransactionDetailsAndGetSessionUrl(setCheckoutSessionOpen,setNeedLoading, preparedTransactionDetail as TransactionDetailData);
        }
    },[preparedTransactionDetail])

    useEffect(()=>{
        if(checkoutSessionOpen){
            changeTransactionStatusToPay(setNeedLoading,preparedTransactionDetail as TransactionDetailData);
        }
    },[checkoutSessionOpen])



    if(cartItemList&&!needLoading){
        return(
            <>
                <NavigationBar/>
                <HamburgerMenu/>
                {
                    (attemptToGoBeyondStockStatus)&&
                    <Alert variant={"danger"}>
                        You have exceeded the current total stock!
                    </Alert>
                }
                {
                    (attemptToGoBeyondStockStatus)&&
                    <Alert variant={"danger"}>
                        There is something wrong with the Stripe checkout session!
                    </Alert>
                }
                {
                    (attemptToGoBelowOneStatus)&&
                    <Alert variant={"danger"}>
                        The quantity cannot be zero nor negative!
                    </Alert>
                }
                {
                    (confirmStatus)&&
                    <Alert variant={"success"}>
                        The cart items have been updated!
                    </Alert>
                }
                {
                    (deleteStatus)&&
                    <Alert variant={"success"}>
                        The item has been deleted successfully!
                    </Alert>
                }
                <body className={"transaction-process-container"}>
                    <div className={"transaction-process-step-one-checkout"}>
                        <div className={"transaction-process"}>
                            <div className={"transaction-in-process-icon"}>1</div>
                        </div>
                        <div className={"transaction-process-step-one-name"}>Checkout</div>
                    </div>
                    <div className={"division-line"}></div>
                    <div className={"transaction-process-step-two-payment"}>
                        <div className={"transaction-process"}>
                            <div className={"transaction-not-in-process-icon"}>2</div>
                        </div>
                        <div className={"transaction-process-step-two-name"}>Payment</div>
                    </div>
                    <div className={"division-line"}></div>
                    <div className={"transaction-process-step-three-completion"}>
                        <div className={"transaction-process"}>
                            <div className={"transaction-not-in-process-icon"}>3</div>
                        </div>
                        <div className={"transaction-process-step-three-name"}>Transaction Status</div>
                    </div>
                </body>
                <div className={"shopping-cart-page-container"}>
                    <div className={"shopping-cart-container"}>
                        <div className={"shopping-cart-title-container"}>
                            <img src={ShoppingCart} className={"shopping-cart-image"}/>
                            Shopping Cart
                        </div>
                        <div className={"shopping-cart-top-line"}></div>
                        {(cartItemList)&&(cartItemList.map((value,index)=>{
                            return(
                                <div className={"shopping-cart-item-list"}>
                                    <div><img src={value.imageUrl} className={"shopping-cart-item-image"}/></div>
                                    <div className={"shopping-cart-item-details"}>
                                        <div className={"shopping-cart-item-details-name"}>{value.name}</div>
                                        <div className={"shopping-cart-item-details-price"}>{formatter.format(value.assignedPrice as number)}</div>
                                    </div>
                                    <div className={"shopping-cart-item-details-quantity"}>
                                        <div className={"quantity-plus-one-container"} onClick={() => handleQuantityPlusById(value.pid)}><img className={"quantity-plus-one"} src={PlusSign}/></div>
                                        <div className={"current-quantity-container"}>
                                            {value.cartQuantity}
                                        </div>
                                        <div className={"quantity-minus-one-container"} onClick={() => handleQuantityMinusById(value.pid)}><img className={"quantity-minus-one"} src={MinusSign} /></div>
                                    </div>
                                    <div className={"shopping-cart-item-details-duration"}>
                                        <Form.Group className="tattoo-size-search-container" controlId="formBasicPassword">
                                            <Form.Label className="label">Tattoo Duration</Form.Label>
                                            <Form.Select id="disabledSelect" value={value.chosenDuration} onChange={(event)=>{handleTattooDuration(value.pid,value.cartQuantity,value.chosenDuration,event.target.value,value.chosenSize,value.shortLastingSellingPriceOne,value.shortLastingSellingPriceTwo,value.shortLastingSellingPriceThree,value.shortLastingSellingPriceFour,value.shortLastingSellingPriceFive,value.longLastingSellingPriceOne,value.longLastingSellingPriceTwo,value.longLastingSellingPriceThree, value.longLastingSellingPriceFour, value.longLastingSellingPriceFive)}}>
                                                {value.shortDuration?<option value="Short Duration: 1-3 days">Short Duration: 1-3 days</option>:null}
                                                {value.longDuration?<option value="Long Duration: 2 weeks or more">Long Duration: 2 weeks or more</option>:null}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className={"shopping-cart-item-details-size"}>
                                        <Form.Group className="tattoo-size-search-container" controlId="formBasicPassword">
                                            <Form.Label className="label">Tattoo Size</Form.Label>
                                            <Form.Select id="disabledSelect" value={value.chosenSize} onChange={(event)=>{handleTattooSize(value.pid, value.cartQuantity, value.chosenDuration, value.chosenSize, event.target.value,value.shortLastingSellingPriceOne,value.shortLastingSellingPriceTwo,value.shortLastingSellingPriceThree,value.shortLastingSellingPriceFour,value.shortLastingSellingPriceFive,value.longLastingSellingPriceOne,value.longLastingSellingPriceTwo,value.longLastingSellingPriceThree, value.longLastingSellingPriceFour, value.longLastingSellingPriceFive)}}>
                                                {value.sizeOne?<option value="extra small: 1 inch (ear, finger, toe, wrist)">{value.sizeOne}</option>:null}
                                                {value.sizeTwo?<option value="small: 1-3 inches (wrist, ankle, clavicle, calf)">{value.sizeTwo}</option>:null}
                                                {value.sizeThree?<option value="medium: 3-5 inches (lower arm, neck, chest)">{value.sizeThree}</option>:null}
                                                {value.sizeFour?<option value="large: 5-8 inches (upper arm, leg)">{value.sizeFour}</option>:null}
                                                {value.sizeFive?<option value="extra large: 8-14 inches (back)">{value.sizeFive}</option>:null}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className={"shopping-cart-item-details-total-price"}>
                                        <div className={"total-price"}>total price</div>
                                        <div className={"total-price-detail"}>{formatter.format(value.assignedPrice*value.cartQuantity)}</div>
                                    </div>
                                    <div className={"shopping-cart-item-details-trashcan"}>
                                        <div onClick={()=>handleTrashcanOnClick(value.pid)}>
                                            <img src={TrashCan} className={"trashcan"}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}
                        {cartItemList?.length===0&&
                            <div className={"empty-shopping-cart"}>
                                Your Shopping Cart Is Empty!
                            </div>
                        }
                        {((cartItemList?.length!=0))&&
                            <div className={"confirm-and-checkout-button"}>
                                <div className={"confirm-and-checkout-button"}>
                                    <div className={"button-container"} onClick={()=>{handleConfirmOnClick(setNeedLoading)}}>
                                        <button className={"confirm-button"}>Confirm</button>
                                    </div>
                                </div>
                                {((cartItemList?.length!=0))&&confirmStatus&&
                                    <div className={"proceed-button"}>
                                        <div className={"proceed-button"}>
                                            <div className={"confirm-button"}>
                                                <button className={"checkout-button"} onClick={handleCheckoutOnClick}>Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <Invoice calculateNumOfItems={calculateNumOfItems} calculateTotal={calculateTotal}/>
                </div>
                <FreeFoxFooter/>
                <BottomBar/>
            </>
        )
    }else{
        return(
            <LoadingSpinner/>
        )
    }
}