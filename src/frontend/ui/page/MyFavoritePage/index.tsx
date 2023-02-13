import "./style.css";
import Footer from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React, {useContext, useEffect, useRef, useState} from "react";
import NavigationBar from "../../Component/NavigationBar";
import HamburgerMenu from "../../Component/HamburgerMenu";
import {getAllLikeItems, getLikeStatus} from "../../../resource/EcommerceResource";
import {LikeItemData} from "../../../data/LikeItemData";
import ProductCard from "../../Component/ProductCard";
import {Alert} from "react-bootstrap";
import {LoginUserContext} from "../../Context/LoginUserContext";
import CloseButton from "../../images/close.png";
import QuantitySelector from "../../Component/Selector";
import {ProductDetailData} from "../../../data/ProductDetailData";
import {addCartItemDataOnShoppingPage} from "../../../resource/CartItemsResource";
import {getProductDetail} from "../../../resource/ProductDetailResource";
import LoadingSpinner from "../../Component/LoadingSpinner";



export default function MyFavoritePage(){
    const {currentUser}=useContext(LoginUserContext);
    const [addToShoppingCartStatus,setAddToShoppingCartStatus]=useState<boolean|undefined>(undefined);
    const [shoppingCartIsClicked, setShoppingCartIsClicked] = useState<boolean>(false);
    const [likeItems,setLikeItems]=useState<LikeItemData[]>([]);
    const [durationOverlayCloseButtonClicked, setDurationOverlayCloseButtonClicked]=useState<boolean>(true);
    const [duration,setDuration]=useState<string|undefined>(undefined);
    const [sizeOverlayCloseButtonClicked, setSizeOverlayCloseButtonClicked]=useState<boolean>(true);
    const [size,setSize]=useState<string|undefined>(undefined);
    const [quantity,setQuantity]=useState<number>(1);
    const [quantityOverlayCloseButtonClicked,setQuantityOverlayCloseButtonClicked]=useState<boolean>(true);
    const [productDetail,setProductDetail]=useState<ProductDetailData|undefined>(undefined);
    const [assignedPrice,setAssignedPrice]=useState<number|undefined>(undefined);
    const [needLoading,setNeedLoading]=useState<boolean|undefined>(undefined);
    const [putLikeStatus,setPutLikeStatus]=useState<boolean|undefined>(undefined);
    const [emailNotVerified,setEmailNotVerified]=useState<boolean|undefined>(undefined);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const handlePlusOneOnClick=(event: React.MouseEvent<Element, MouseEvent>)=>{
        if(quantity! >= (productDetail?.stock as number)){
            return;
        }else{
            setQuantity((currentQuantity)=>{return currentQuantity+1})
        }
    }

    const handleMinusOneOnClick=(event: React.MouseEvent<Element, MouseEvent>)=>{
        if(quantity===1){
            return;
        }else{
            setQuantity((currentQuantity)=>{return currentQuantity-1})
        }
    }

    const handleShoppingCartOnClicked=(pid:number)=>{
        getProductDetail(pid,setProductDetail);
    }


    const handleSizeOnClicked=(size:string)=>{
        setSize(size);
        setSizeOverlayCloseButtonClicked(true);
        setQuantityOverlayCloseButtonClicked(false)
        if(duration==="Short Duration: 1-3 days"){
            if(productDetail?.sizeOne===size){
                setAssignedPrice(productDetail?.shortLastingSellingPriceOne!*quantity);
            }else if(productDetail?.sizeTwo===size){
                setAssignedPrice(productDetail?.shortLastingSellingPriceTwo!*quantity);
            }else if(productDetail?.sizeThree===size){
                setAssignedPrice(productDetail?.shortLastingSellingPriceThree!*quantity);
            }else if(productDetail?.sizeFour===size){
                setAssignedPrice(productDetail?.shortLastingSellingPriceFour!*quantity);
            }else if(productDetail?.sizeFive===size){
                setAssignedPrice(productDetail?.shortLastingSellingPriceFive!*quantity);
            }
        }else{
            if(productDetail?.sizeOne===size){
                setAssignedPrice(productDetail?.longLastingSellingPriceOne!*quantity);
            }else if(productDetail?.sizeTwo===size){
                setAssignedPrice(productDetail?.longLastingSellingPriceTwo!*quantity);
            }else if(productDetail?.sizeThree===size){
                setAssignedPrice(productDetail?.longLastingSellingPriceThree!*quantity);
            }else if(productDetail?.sizeFour===size){
                setAssignedPrice(productDetail?.longLastingSellingPriceFour!*quantity);
            }else if(productDetail?.sizeFive===size){
                setAssignedPrice(productDetail?.longLastingSellingPriceFive!*quantity);
            }
        }
    }

    const handleSubmitButton=()=>{
        addCartItemDataOnShoppingPage(productDetail?.pid as number,quantity,duration as string,size as string,assignedPrice as number,setAddToShoppingCartStatus,setQuantityOverlayCloseButtonClicked,setQuantity);
    }



    const handleRemove=(pid:number)=>{
        setLikeItems((likeItemList)=>{
            let tempLikeItems:LikeItemData[]=[];
            let indexOfItemRemoved:number=0;
            likeItemList.map((likeItem,index)=>{
               if(likeItem.productResponseDto.pid!==pid){
                   tempLikeItems.push(likeItem);
               }else{
                   indexOfItemRemoved=index;
               }
           })
            setNeedLoading(false);
            tempLikeItems.map((likeItem,index)=>{
                return{
                    ...likeItem,
                    clickedLike:true,
                }
            })
            return tempLikeItems;
        })
        console.log(likeItems);
    }

    const productCardRef=useRef<HTMLDivElement>(null);


    useEffect( ()=> {
        getAllLikeItems(setLikeItems,setNeedLoading);
    },[])





    if(needLoading||needLoading==undefined){
        return(
            <LoadingSpinner/>
        )
    }else{
        return(
            <>
                <section className={"shop-duration-overlay"} style={durationOverlayCloseButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"duration-container"}>
                        <div className={"overlay-exit-button-container"}>
                            <img className={"duration-exit-button"} src={CloseButton} onClick={()=>{setDurationOverlayCloseButtonClicked(true);setQuantity(1)}}/></div>
                        <p className={"duration-overlay-card-title"}>Choose the duration:</p>
                        <div className={"duration-form"}>
                            {productDetail?.shortDuration?<div className={"duration-options"} onClick={()=>{setDuration("Short Duration: 1-3 days");setDurationOverlayCloseButtonClicked(true);setSizeOverlayCloseButtonClicked(false);}}>
                                <div className={"duration-input"}/>
                                <label className={"duration-label"}> Short Duration: 1-3 days</label>
                            </div>:null}
                            {productDetail?.longDuration?<div className={"duration-options"} onClick={()=>{setDuration("Long Duration: 2 weeks or more");setDurationOverlayCloseButtonClicked(true);setSizeOverlayCloseButtonClicked(false);}}>
                                <div className={"duration-input"}/>
                                <label className={"duration-label"}> Long Duration: 2 weeks or more</label>
                            </div>:null}
                        </div>
                    </div>
                </section>
                <section className={"shop-size-overlay"} style={sizeOverlayCloseButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"size-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"duration-exit-button"} src={CloseButton} onClick={()=>{setSizeOverlayCloseButtonClicked(true);setQuantity(1)}}/></div>
                        <p className={"size-overlay-card-title"}>Choose the size:</p>
                        <div className={"size-form"}>
                            {productDetail?.sizeOne?<div className={"size-options"} onClick={()=>{handleSizeOnClicked("extra small: 1 inch (ear, finger, toe, wrist)");}}>
                                <div className={"size-input"}/>
                                <label className={"size-label"}> extra small: 1 inch (ear, finger, toe, wrist)</label>
                            </div>:null}
                            {productDetail?.sizeTwo?<div className={"size-options"} onClick={()=>{handleSizeOnClicked("small: 1-3 inches (wrist, ankle, calf)");}}>
                                <div className={"size-input"}/>
                                <label className={"size-label"}> small: 1-3 inches (wrist, ankle, clavicle, calf)</label>
                            </div>:null}
                            {productDetail?.sizeThree?<div className={"size-options"} onClick={()=>{handleSizeOnClicked("medium: 3-5 inches (lower arm, neck, chest)");}}>
                                <div className={"size-input"}/>
                                <label className={"size-label"}> medium: 3-5 inches (lower arm, neck, chest)</label>
                            </div>:null}
                            {productDetail?.sizeFour?<div className={"size-options"} onClick={()=>{handleSizeOnClicked("large: 5-8 inches (upper arm, leg)");}}>
                                <div className={"size-input"}/>
                                <label className={"size-label"}> large: 5-8 inches (upper arm, leg)</label>
                            </div>:null}
                            {productDetail?.sizeFive?<div className={"size-options"} onClick={()=>{handleSizeOnClicked("extra large: 8-14 inches (back)");}}>
                                <div className={"size-input"}/>
                                <label className={"size-label"}> extra large: 8-14 inches (back)</label>
                            </div>:null}
                        </div>
                    </div>
                </section>
                <section className={"shop-duration-overlay"} style={quantityOverlayCloseButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"quantity-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"duration-exit-button"} src={CloseButton} onClick={()=>{setQuantityOverlayCloseButtonClicked(true);setQuantity(1)}}/></div>
                        <div className={"quantity-overlay-price"}>Total Price: {formatter.format(assignedPrice as number)}</div>
                        <div className={"quantity-overlay-container"}>
                            <p className={"quantity-overlay-card-title"}>Quantity:</p>
                            <div className={"overlay-quantity-selector-container"}>
                                <QuantitySelector quantity={quantity as number} handleMinusOneOnClick={handleMinusOneOnClick} handlePlusOneOnClick={handlePlusOneOnClick}/>
                            </div>
                        </div>
                        <div className={"product-card-submit-button-container"}>
                            <p className={"product-card-submit-button"} onClick={handleSubmitButton}>Submit</p>
                        </div>
                    </div>
                </section>
                <NavigationBar/>
                <HamburgerMenu/>
                {
                    (addToShoppingCartStatus)&&
                    <Alert variant={"success"}>
                        The product has been added to the shopping cart!
                    </Alert>
                }
                {
                    (shoppingCartIsClicked&&!currentUser?.emailVerified)&&
                    <Alert variant={"danger"}>
                        Your email has not been verified yet!
                    </Alert>
                }
                <body className={"my-favorite-page-container"}>
                <div>
                    <h3 className={"my-favorite-corner"}>My Favorite Corner</h3>
                    <div className={"my-favorite-corner-line-container"}>
                        <div className={"my-favorite-corner-line"}></div>
                    </div>
                    <div className={"my-favorite-items"} ref={productCardRef}>
                        {
                            likeItems?.map((likeItem)=>{
                                return(
                                    <ProductCard productResponseDtoList={likeItem.productResponseDto} setAddToShoppingCartStatus={setAddToShoppingCartStatus} setShoppingCartIsClicked={setShoppingCartIsClicked} setDurationOverlayCloseButtonClicked={setDurationOverlayCloseButtonClicked} handleShoppingCartOnClicked={handleShoppingCartOnClicked}
                                                 likeStatus={true} setNeedLoading={setNeedLoading} handleRemove={handleRemove} setPutLikeStatus={setPutLikeStatus}/>
                                )
                            })
                        }
                    </div>
                </div>
                </body>
                <Footer/>
                <BottomBar/>
            </>
        )
    }
}