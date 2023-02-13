import NavigationBar from "../../Component/NavigationBar"
import "./style.css"
import {ProductData, ProductResponseDtoList} from "../../../data/ProductData";
import {FormEvent, FormEventHandler, useContext, useEffect, useMemo, useRef, useState} from "react";
import "../../../resource/EcommerceResource"
import {
    getAllLikeItems,
    getAndSetProductListData,
    getAndSetProductSortedList,
    getLikeStatus
} from "../../../resource/EcommerceResource";
import React from "react";
import LoadingSpinner from "../../Component/LoadingSpinner";
import ProductCard from "../../Component/ProductCard";
import {Alert} from "react-bootstrap";
import {LoginUserContext} from "../../Context/LoginUserContext";
import Footer from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import HamburgerMenu from "../../Component/HamburgerMenu";
import Pagination from "../../Component/Pagination";
import Arrow from "../../images/down-arrow.png";
import CloseButton from "../../images/close.png";
import {getProductDetail} from "../../../resource/ProductDetailResource";
import {ProductDetailData} from "../../../data/ProductDetailData";
import QuantitySelector from "../../Component/Selector";
import {addCartItemDataOnShoppingPage} from "../../../resource/CartItemsResource";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {LikeItemData} from "../../../data/LikeItemData";
import {useParams} from "react-router-dom";
import GreenTick from "../../images/green-tick.png";

type params={
    theme: string|undefined;
}


export default function Shop(){
    const params=useParams<params>();
    const {currentUser}=useContext(LoginUserContext);
    const [productResponseDtoList,setProductResponseDtoList]=useState<ProductResponseDtoList[]>([]);
    const [totalProducts,setTotalProducts]=useState<number>(0);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const [postsPerPage,setPostsPerPage]=useState<number>(20);
    const [horoscopeFilter, setHoroscopeFilter]=useState<boolean>(false);
    const [universeFilter,setUniverseFilter]=useState<boolean>(false);
    const [natureFilter,setNatureFilter]=useState<boolean>(false);
    const [colorFilter,setColorFilter]=useState<boolean>(false);
    const [blackAndWhiteFilter,setBlackAndWhiteFilter]=useState<boolean>(false);
    const [fullColorFilter,setFullColorFilter]=useState<boolean>(false);
    const [themeFilter,setThemeFilter]=useState<boolean>(false);
    const [sizeFilter,setSizeFilter]=useState<boolean>(false);
    const [designerFilter,setDesignerFilter]=useState<boolean>(false);
    const [hashtagFilter,setHashtagFilter]=useState<boolean>(false);
    const [extraSmallFilter,setExtraSmallFilter]=useState<boolean>(false);
    const [smallFilter,setSmallFilter]=useState<boolean>(false);
    const [mediumFilter,setMediumFilter]=useState<boolean>(false);
    const [largeFilter,setLargeFilter]=useState<boolean>(false);
    const [extraLargeFilter,setExtraLargeFilter]=useState<boolean>(false);
    const [designer,setDesigner]=useState<string>("");
    const [hashtag,setHashtag]=useState<string>("");
    const [addToShoppingCartStatus,setAddToShoppingCartStatus]=useState<boolean|undefined>(undefined);
    const [shoppingCartIsClicked, setShoppingCartIsClicked] = useState<boolean>(false);
    const [durationOverlayCloseButtonClicked, setDurationOverlayCloseButtonClicked]=useState<boolean>(true);
    const [duration,setDuration]=useState<string|undefined>(undefined);
    const [sizeOverlayCloseButtonClicked, setSizeOverlayCloseButtonClicked]=useState<boolean>(true);
    const [size,setSize]=useState<string|undefined>(undefined);
    const [quantity,setQuantity]=useState<number>(1);
    const [quantityOverlayCloseButtonClicked,setQuantityOverlayCloseButtonClicked]=useState<boolean>(true);
    const [productDetail,setProductDetail]=useState<ProductDetailData|undefined>(undefined);
    const [assignedPrice,setAssignedPrice]=useState<number|undefined>(undefined);
    const [needLoggingInMessage,setNeedLoggingInMessage]=useState<boolean|undefined>(undefined);
    const [putLikeStatus,setPutLikeStatus]=useState<boolean|undefined>(undefined);
    const [likeItemList,setLikeItemList]=useState<LikeItemData[]>([]);
    const [needLoading,setNeedLoading]=useState<boolean>(true);
    const [emailNotVerified,setEmailNotVerified]=useState<boolean|undefined>(undefined);


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const handleColorFilterOnClick=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setColorFilter(!colorFilter)
        setThemeFilter(false);
        setSizeFilter(false);
        setHashtagFilter(false);
        setDesignerFilter(false);
    }

    const handleThemeFilterOnClick=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setThemeFilter(!themeFilter)
        setColorFilter(false);
        setSizeFilter(false);
        setHashtagFilter(false);
        setDesignerFilter(false);
    }

    const handleDesignerFilterOnClick=()=>{
        setThemeFilter(false)
        setColorFilter(false);
        setSizeFilter(false);
        setHashtagFilter(false);
        setDesignerFilter(!designerFilter);
    }

    const handleHashTagFilterOnClick=()=>{
        setThemeFilter(false)
        setColorFilter(false);
        setSizeFilter(false);
        setHashtagFilter(!hashtagFilter);
        setDesignerFilter(false);
    }


    const handleSizeOnClick=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setSizeFilter(!sizeFilter);
        setThemeFilter(false);
        setColorFilter(false);
        setHashtagFilter(false);
        setDesignerFilter(false);
    }


    const handleShoppingCartOnClicked=(pid:number)=>{
        getProductDetail(pid,setProductDetail);
    }

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


    const handleSubmitButton=()=>{
         addCartItemDataOnShoppingPage(productDetail?.pid as number,quantity,duration as string,size as string,assignedPrice as number,setAddToShoppingCartStatus,setQuantityOverlayCloseButtonClicked,setQuantity);
    }
    const handleExtraSmallOnClick=()=>{
        setExtraSmallFilter(!extraSmallFilter);
        setCurrentPage(1);
    }

    const handleSmallOnClick=()=>{
        setSmallFilter(!smallFilter);
        setCurrentPage(1);
    }

    const handleMediumOnClick=()=>{
        setMediumFilter(!mediumFilter);
        setCurrentPage(1);
    }

    const handleLargeOnClick=()=>{
        setLargeFilter(!largeFilter);
        setCurrentPage(1);
    }
    const handleExtraLargeOnClick=()=>{
        setExtraLargeFilter(!extraLargeFilter);
        setCurrentPage(1);
    }

    const handleDesignerSubmitButtonOnClick=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setNeedLoading(true);
        getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);
    }

    const handleHashtagSubmitButtonOnClick=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setNeedLoading(true);
        getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);
    }


    if(durationOverlayCloseButtonClicked||sizeOverlayCloseButtonClicked||quantityOverlayCloseButtonClicked){
        document.body.style.overflow='auto'
    }else{
        document.body.style.overflow='hidden'
    }

    const indexOfLastPost=currentPage*postsPerPage;
    const indexOfFirstPost=indexOfLastPost-postsPerPage;


    //Check if the user enters the page by clicking the horoscope browse button
    useEffect(()=>{
        getAllLikeItems(setLikeItemList);
        if(params){
            if(params.theme==="horoscope"){
                setHoroscopeFilter(true);
            }
        }}
        , []
    )
    //Check if the user has clicked any of the page number
    useEffect(()=>{
        setNeedLoading(true);
        getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);
    },[currentPage])
    //Keep track of any buttons clicked on
    useEffect(()=>{
        setNeedLoading(true);
        getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);
    },[horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter])


    //Check if there's any chance in the productList
    useEffect(()=>{
        if(productResponseDtoList){
            setNeedLoading(false);
        }
    },[productResponseDtoList])

    useEffect(()=>{
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
    },[quantity])

    if(!needLoading){
        return(
            <div className={"ecommerce-page"}>
                <section className={"shop-duration-overlay"} style={durationOverlayCloseButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"duration-container"}>
                        <div className={"overlay-exit-button-container"}>
                            <img className={"duration-exit-button"} src={CloseButton} onClick={()=>{setDurationOverlayCloseButtonClicked(true);setQuantity(1)}}/></div>
                        <p className={"duration-overlay-card-title"}>Choose the duration:</p>
                        <div className={"duration-form"}>
                            {productDetail?.shortDuration?<div className={"duration-options"} onClick={()=>{setDuration("Short Duration: 1-3 days");setDurationOverlayCloseButtonClicked(true);setSizeOverlayCloseButtonClicked(false);}}>
                                <input className={"duration-input"}/>
                                <label className={"duration-label"}> Short Duration: 1-3 days</label>
                            </div>:null}
                            {productDetail?.longDuration?<div className={"duration-options"} onClick={()=>{setDuration("Long Duration: 2 weeks or more");setDurationOverlayCloseButtonClicked(true);setSizeOverlayCloseButtonClicked(false);}}>
                                <input className={"duration-input"}/>
                                <label className={"duration-label"}> Long Duration: 2 weeks or more</label>
                            </div>:null}
                        </div>
                    </div>
                </section>
                <section className={"shop-quantity-overlay"} style={quantityOverlayCloseButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"quantity-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"duration-exit-button"} src={CloseButton} onClick={()=>{setQuantityOverlayCloseButtonClicked(true);setQuantity(1)}}/></div>
                        <div className={"quantity-overlay-price"}>Total Price: {formatter.format(assignedPrice as number)}</div>
                        <div className={"quantity-overlay-container"}>
                            <p className={"quantity-overlay-card-title"}>Quantity:</p>
                            <div className={"overlay-quantity-selector-container"}>
                                <QuantitySelector quantity={quantity as number} handleMinusOneOnClick={handleMinusOneOnClick} handlePlusOneOnClick={handlePlusOneOnClick} />
                            </div>
                        </div>
                        <div className={"product-card-submit-button-container"}>
                            <button className={"product-card-submit-button"} onClick={handleSubmitButton}>Submit</button>
                        </div>
                    </div>
                </section>
                <section className={"shop-theme-overlay"} style={themeFilter?{visibility:"visible",opacity:"1", transform: "translateX(0%)"}:{visibility:"hidden",transform: "translateX(-40%)"}}>
                    <div className={"theme-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"theme-exit-button"} src={CloseButton} onClick={()=>{setThemeFilter(false)}}/></div>
                        <div className={"theme-overlay-title"}>Theme:</div>
                        <div className={"theme-options"} onClick={()=>{setHoroscopeFilter(!horoscopeFilter);setNeedLoading(true);setThemeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"theme-input"}>{horoscopeFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"theme-label"}> Horoscope</label>
                        </div>
                        <div className={"theme-options"} onClick={()=>{setUniverseFilter(!universeFilter);setNeedLoading(true);setThemeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer, hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"theme-input"}>{universeFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"theme-label"}> Universe</label>
                        </div>
                        <div className={"theme-options"} onClick={()=>{setNatureFilter(!natureFilter);setNeedLoading(true);setThemeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"theme-input"}>{natureFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"theme-label"}> Nature</label>
                        </div>
                    </div>
                </section>
                <section className={"shop-color-overlay"} style={colorFilter?{visibility:"visible",opacity:"1", transform: "translateX(0%)"}:{visibility:"hidden",transform: "translateX(-40%)"}}>
                    <div className={"color-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"color-exit-button"} src={CloseButton} onClick={()=>{setColorFilter(false)}}/></div>
                        <div className={"color-overlay-title"}>Color:</div>
                        <div className={"color-options"} onClick={()=>{setBlackAndWhiteFilter(!blackAndWhiteFilter);setNeedLoading(true);setColorFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"color-input"}>{blackAndWhiteFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"color-label"}> Black-and-white</label>
                        </div>
                        <div className={"color-options"} onClick={()=>{setFullColorFilter(!fullColorFilter);setNeedLoading(true);setColorFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"color-input"}>{fullColorFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"color-label"}> Full color</label>
                        </div>
                    </div>
                </section>
                <section className={"shop-size-overlay"} style={sizeFilter?{visibility:"visible",opacity:"1", transform: "translateX(0%)"}:{visibility:"hidden",transform: "translateX(-40%)"}}>
                    <div className={"overlay-size-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"size-exit-button"} src={CloseButton} onClick={()=>{setSizeFilter(false)}}/></div>
                        <div className={"size-overlay-title"}>Size:</div>
                        <div className={"overlay-size-options"} onClick={()=>{setExtraSmallFilter(!extraSmallFilter);setNeedLoading(true);setSizeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"size-input"}>{extraSmallFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"overlay-size-label"}> extra small: 1 inch (ear, finger, toe, wrist)</label>
                        </div>
                        <div className={"overlay-size-options"} onClick={()=>{setSmallFilter(!smallFilter);setNeedLoading(true);setSizeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"size-input"}>{smallFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"overlay-size-label"}> small: 1-3 inches (wrist, ankle, clavicle, calf)</label>
                        </div>
                        <div className={"overlay-size-options"} onClick={()=>{setMediumFilter(!mediumFilter);setNeedLoading(true);setSizeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"size-input"}>{mediumFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"overlay-size-label"}> medium: 3-5 inches (lower arm, neck, chest)</label>
                        </div>
                        <div className={"overlay-size-options"} onClick={()=>{setLargeFilter(!largeFilter);setNeedLoading(true);setSizeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"size-input"}>{largeFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"overlay-size-label"}> large: 5-8 inches (upper arm, leg)</label>
                        </div>
                        <div className={"overlay-size-options"} onClick={()=>{setExtraLargeFilter(!largeFilter);setNeedLoading(true);setSizeFilter(false);
                            getAndSetProductSortedList(setProductResponseDtoList,setTotalProducts,designer,hashtag,horoscopeFilter,universeFilter,natureFilter,blackAndWhiteFilter,fullColorFilter,extraSmallFilter,smallFilter,mediumFilter,largeFilter,extraLargeFilter,20,currentPage,setNeedLoading);}}>
                            <div className={"size-input"}>{extraLargeFilter?<img src={GreenTick}/>:null}</div>
                            <label className={"overlay-size-label"}> extra large: 8-14 inches (back)</label>
                        </div>
                    </div>
                </section>
                <section className={"shop-designer-overlay"} style={designerFilter?{visibility:"visible",opacity:"1", transform: "translateX(0%)"}:{visibility:"hidden",transform: "translateX(-40%)"}}>
                    <div className={"overlay-designer-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"designer-exit-button"} src={CloseButton} onClick={()=>{setDesignerFilter(false)}}/></div>
                        <div className={"designer-overlay-title"}>Designer:</div>
                        <form className={"overlay-designer-filter-form"} onSubmit={(event)=>{handleDesignerSubmitButtonOnClick(event);setDesignerFilter(false)}}>
                            <input type="text" id="hashtag" name="hashtag" value={designer} placeholder="Bernie" className={"overlay-designer-filter-input"} onChange={(event)=>{setDesigner(event.target.value)}}/>
                            <button type="submit" className={"overlay-designer-filter-submit-button"}>Submit</button>
                        </form>
                    </div>
                </section>
                <section className={"shop-hashtag-overlay"} style={hashtagFilter?{visibility:"visible",opacity:"1", transform: "translateX(0%)"}:{visibility:"hidden",transform: "translateX(-40%)"}}>
                    <div className={"overlay-hashtag-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"hashtag-exit-button"} src={CloseButton} onClick={()=>{setHashtagFilter(false)}}/></div>
                        <div className={"hashtag-overlay-title"}>Hashtag:</div>
                        <form className={"overlay-hashtag-filter-form"} onSubmit={(event)=>{handleHashtagSubmitButtonOnClick(event);setDesignerFilter(false)}}>
                            <input type="text" id="hashtag" name="hashtag" value={hashtag} placeholder="Chinoiserie" className={"overlay-hashtag-filter-input"} onChange={(event)=>{setHashtag(event.target.value)}}/>
                            <button type="submit" className={"overlay-hashtag-filter-submit-button"}>Submit</button>
                        </form>
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
                    (emailNotVerified)&&
                    <Alert variant={"danger"}>
                        You need to have your email address verified!
                    </Alert>
                }
                {
                    (needLoggingInMessage)&&
                    <Alert variant={"danger"}>
                        You need to log in first!
                    </Alert>
                }
                <body className={"ecommerce-page-container"}>
                    <div className={"all-products"}>All Products ({totalProducts})</div>
                    <div className={"filter-container"}>
                        <div className={"filter-bar"}>
                            <div className={"each-filter"}>
                                <div className={"theme-filter"} onClick={handleThemeFilterOnClick}>
                                    Theme
                                    <img src={Arrow} className={"filter-arrow"} style={themeFilter?{transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}/>
                                    <div className={"filters-overlay"} style={themeFilter?{visibility:"visible", opacity:"100"}:{visibility:"hidden", opacity:"0"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={horoscopeFilter} onChange={()=>{setHoroscopeFilter(!horoscopeFilter);setCurrentPage(1);setNeedLoading(true);}}/>
                                            Horoscope
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={universeFilter} onChange={()=>{setUniverseFilter(!universeFilter);setCurrentPage(1);setNeedLoading(true);}}/>
                                            Universe
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={natureFilter} onChange={()=>{setNatureFilter(!natureFilter);setCurrentPage(1);setNeedLoading(true);}}/>
                                            Nature
                                        </label>
                                    </div>
                                </div>
                                <div className={"color-filter"} onClick={handleColorFilterOnClick}>Color<img src={Arrow} className={"filter-arrow"} style={colorFilter?{transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}/>
                                    <div className={"filters-overlay"} style={colorFilter?{visibility:"visible", opacity:"100"}:{visibility:"hidden", opacity:"0"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={blackAndWhiteFilter} onChange={()=>{setBlackAndWhiteFilter(!blackAndWhiteFilter);setCurrentPage(1);setNeedLoading(true);}}/>
                                            Black-and-white
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={fullColorFilter} onChange={()=>{setFullColorFilter(!fullColorFilter);setCurrentPage(1);setNeedLoading(true)}}/>
                                            Full color
                                        </label>
                                    </div>
                                </div>
                                <div className={"size-filter"} onClick={handleSizeOnClick}>Size<img src={Arrow} className={"filter-arrow"} style={sizeFilter?{transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}/>
                                    <div className={"size-filter-overlay"} style={sizeFilter?{visibility:"visible", opacity:"100"}:{visibility:"hidden", opacity:"0"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={extraSmallFilter} onClick={handleExtraSmallOnClick}/>
                                            Extra small: 1 inch
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={smallFilter} onClick={handleSmallOnClick}/>
                                            Small: 1-3 inches
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={mediumFilter} onClick={handleMediumOnClick}/>
                                            Medium: 3-5 inches
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={largeFilter} onClick={handleLargeOnClick}/>
                                            Large: 5-8 inches
                                        </label>
                                        <label className="label-container">
                                            <input type="checkbox" className={"checkbox"} checked={extraLargeFilter} onClick={handleExtraLargeOnClick}/>
                                            Extra large: 8-14 inches
                                        </label>
                                    </div>
                                </div>
                                <div className={"designer-filter"} onClick={handleDesignerFilterOnClick}>
                                    Designer
                                    <img src={Arrow} className={"filter-arrow"} style={designerFilter?{transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}/>
                                    <div className={"designer-overlay"} style={designerFilter?{visibility:"visible", opacity:"100"}:{visibility:"hidden", opacity:"0"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <form className={"designer-filter-form"} onSubmit={handleDesignerSubmitButtonOnClick}>
                                            <input type="text" id="designer" name="designer" value={designer} placeholder="Bernie" className={"designer-filter-input"} onChange={(event)=>{setDesigner(event.target.value)}}/>
                                            <button type="submit" className={"designer-filter-submit-button"}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                                <div className={"hashtag-filter"} onClick={handleHashTagFilterOnClick}>
                                    Hashtag
                                    <img src={Arrow} className={"filter-arrow"} style={hashtagFilter?{transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}/>
                                    <div className={"hashtag-overlay"} style={hashtagFilter?{visibility:"visible", opacity:"100"}:{visibility:"hidden", opacity:"0"}} onClick={(event)=>{event.stopPropagation()}}>
                                        <form className={"hashtag-filter-form"} onSubmit={handleHashtagSubmitButtonOnClick}>
                                            <input type="text" id="hashtag" name="hashtag" value={hashtag} placeholder="Chinoiserie" className={"hashtag-filter-input"} onChange={(event)=>{setHashtag(event.target.value)}}/>
                                            <button type="submit" className={"hashtag-filter-submit-button"}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"chosen-filter"}></div>
                    </div>

                    {/*Below is the part where productCards from a variable containing all product cards get rendered.*/}
                    <div className={"product-showcase-container"}>
                        {
                            (productResponseDtoList.map((product)=>{
                                let likeStatus:boolean=false;
                                likeItemList?.map((likeItem)=>{
                                    if(likeItem.productResponseDto.pid===product.pid){
                                        if(likeItem.clickedLike){
                                            likeStatus=true;
                                        }
                                    }
                                })
                                if(likeStatus){
                                    return(
                                        <ProductCard productResponseDtoList={product} setAddToShoppingCartStatus={setAddToShoppingCartStatus} setShoppingCartIsClicked={setShoppingCartIsClicked} setDurationOverlayCloseButtonClicked={setDurationOverlayCloseButtonClicked}
                                                     setHashtagFilter={setHashtagFilter} setSizeFilter={setSizeFilter} setThemeFilter={setThemeFilter} setColorFilter={setColorFilter} handleShoppingCartOnClicked={handleShoppingCartOnClicked} setPutLikeStatus={setPutLikeStatus} likeStatus={true} setNeedLoggingInMessage={setNeedLoggingInMessage} setEmailNotVerified={setEmailNotVerified}/>
                                    )
                                }else{
                                    return(
                                        <ProductCard productResponseDtoList={product} setAddToShoppingCartStatus={setAddToShoppingCartStatus} setShoppingCartIsClicked={setShoppingCartIsClicked} setDurationOverlayCloseButtonClicked={setDurationOverlayCloseButtonClicked}
                                                     setHashtagFilter={setHashtagFilter} setSizeFilter={setSizeFilter} setThemeFilter={setThemeFilter} setColorFilter={setColorFilter} handleShoppingCartOnClicked={handleShoppingCartOnClicked} setPutLikeStatus={setPutLikeStatus} likeStatus={false} setNeedLoggingInMessage={setNeedLoggingInMessage} setEmailNotVerified={setEmailNotVerified}/>
                                    )
                                }

                            }))
                        }
                    </div>
                </body>
                <Pagination postsPerPage={postsPerPage} totalPosts={totalProducts as number} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                <Footer/>
                <BottomBar/>
            </div>)
    }else{
        return(
            <LoadingSpinner/>
        )
    }
}