import "./style.css"
import {ProductDetailData} from "../../../data/ProductDetailData";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    addAndUpdateRating,
    getAndSetProductListDataByPid,
    getGeneralRating
} from "../../../resource/ProductDetailResource"
import NavigationBar from "../../Component/NavigationBar";
import {useParams} from "react-router-dom";
import AddToCart from "../../images/add-cart.png";
import LoadingSpinner from "../../Component/LoadingSpinner";
import {Alert, Form} from "react-bootstrap";
import QuantitySelector from "../../Component/Selector";
import {addCartItemDataOnDetailPage} from "../../../resource/CartItemsResource";
import {LoginUserContext} from "../../Context/LoginUserContext";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import RatingStarsToBeShowcased from "../../Component/RatingStarsToBeShowcased";
import RatingStarsForRating from "../../Component/RatingStarsForRating";
import CloseButton from "../../images/close.png";
import Button from "react-bootstrap/Button";
import HamburgerMenu from "../../Component/HamburgerMenu";
import Accordion from "react-bootstrap/Accordion";
import {Link} from "react-router-dom";
import ColoredHeart from "../../images/coloredHeart.png";
import {getLikeStatus, putLikeStatus} from "../../../resource/EcommerceResource";
import Heart from "../../images/white-heart.png";

type params={
    productId: string;
}


export default function ProductDetailPage(){
    const params=useParams<params>();
    const {currentUser}=useContext(LoginUserContext);
    const [productDetail, setProductDetailData]=useState<ProductDetailData|undefined|null>(undefined);
    const [averageRating,setAverageRating]=useState<number|undefined>(undefined)
    const [chosenDuration, setChosenDuration]=useState<string|undefined>(undefined);
    const [chosenSize,setChosenSize]=useState<string|undefined>(undefined);
    const [assignedPrice,setAssignedPrice]=useState<number|undefined>(undefined);
    const [markedPrice,setMarkedPrice]=useState<number|undefined>(undefined);
    const [quantity,setQuantity]=useState<number>(1);
    const [ratingStars,setRatingStars]=useState<number|undefined>(undefined);
    const [comment,setComment]=useState<undefined|string>(undefined);
    const [ratingStatus,setRatingStatus]=useState<boolean|undefined>(false);
    const [userEmailNotVerified,setUserEmailNotVerified]=useState<boolean|undefined>(undefined);
    const [closeButtonClicked, setCloseButtonClicked]=useState<boolean>(true);
    const [attemptToGoBelowOneStatus, setAttemptToGoBelowOneStatus]=useState<boolean>(false);
    const [attemptToGoBeyondStockStatus, setAttemptToGoBeyondStockStatus]=useState<boolean>(false);
    const [addToShoppingCartIsClicked,setAddToShoppingCartIsClicked]=useState<boolean>(false);
    const [addToShoppingCartStatus,setAddToShoppingCartStatus]=useState<boolean|undefined>(undefined);
    const [signInStatus,setSignInStatus]=useState<boolean|undefined>(undefined);
    const [giveStarsStatus,setGiveStarsStatus]=useState<boolean|undefined>(undefined);
    const [likeStatus,setLikeStatus]=useState<boolean|undefined>(undefined);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const handleOnSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        setRatingStatus(undefined);
        if(!ratingStars){
            setGiveStarsStatus(false);
            setCloseButtonClicked(true);
            setRatingStatus(false);
        }else{
            await addAndUpdateRating(productDetail?.pid as number,ratingStars as number, comment as string,setRatingStatus,setCloseButtonClicked);
            setGiveStarsStatus(true);
        }
    }



    const handlePlusOneOnClick=(event: React.MouseEvent<Element, MouseEvent>)=>{
        if(quantity >= (productDetail?.stock as number)){
            setAttemptToGoBeyondStockStatus(true);
        }else{
            setQuantity(quantity+1);
            setAttemptToGoBelowOneStatus(false);
        }
    }

    const handleMinusOneOnClick=(event: React.MouseEvent<Element, MouseEvent>)=>{
        if(quantity===1){
            setAttemptToGoBelowOneStatus(true);
            return;
        }else{
            setQuantity(quantity-1);
            setAttemptToGoBeyondStockStatus(false);
        }
    }
    const handleAddToShoppingCart=()=>{
        if(currentUser&&currentUser.emailVerified){
            setAttemptToGoBelowOneStatus(false);
            setAttemptToGoBeyondStockStatus(false);
            setAddToShoppingCartIsClicked(true);
            if(currentUser?.emailVerified){
                addCartItemDataOnDetailPage(parseInt(params.productId as string),quantity,chosenDuration as string, chosenSize as string, assignedPrice as number,setAddToShoppingCartStatus);
            }
        }
        else if(currentUser&&!currentUser.emailVerified){
            setUserEmailNotVerified(true);
        }else{
            setSignInStatus(false)
        }
    }


    const handleChosenSize=(chosenSize:string)=>{
        setChosenSize(chosenSize);
        if(chosenDuration==="short duration: 1-3 days"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceOne as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceOne as number);
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceTwo as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceTwo as number);
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceThree as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceThree as number);
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceFour as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceFour as number);
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceFive as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceFive as number);
            }
        }else{
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceOne as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceOne as number);
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceTwo as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceTwo as number);
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceThree as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceThree as number);
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceFour as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceFour as number);
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceFive as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceFive as number);
            }
        }
    }

    const handleChosenDuration=(chosenDuration:string)=>{
        setChosenDuration(chosenDuration);
        if(chosenDuration==="short duration: 1-3 days"){
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceOne as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceOne as number);
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceTwo as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceTwo as number);
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceThree as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceThree as number);
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceFour as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceFour as number);
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                setMarkedPrice(productDetail?.shortLastingMarkedPriceFive as number);
                setAssignedPrice(productDetail?.shortLastingSellingPriceFive as number);
            }
        }else{
            if(chosenSize==="extra small: 1 inch (ear, finger, toe, wrist)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceOne as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceOne as number);
            }else if(chosenSize==="small: 1-3 inches (wrist, ankle, clavicle, calf)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceTwo as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceTwo as number);
            }else if(chosenSize==="medium: 3-5 inches (lower arm, neck, chest)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceThree as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceThree as number);
            }else if(chosenSize==="large: 5-8 inches (upper arm, leg)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceFour as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceFour as number);
            }else if(chosenSize==="extra large: 8-14 inches (back)"){
                setMarkedPrice(productDetail?.longLastingMarkedPriceFive as number);
                setAssignedPrice(productDetail?.longLastingSellingPriceFive as number);
            }
        }
    }

    const handleLikeOnClick=()=>{
        if(currentUser&&currentUser.emailVerified){
            putLikeStatus(productDetail?.pid as number);
            if(likeStatus){
                setLikeStatus(false);
            }else{
                setLikeStatus(true);
            }
        }else if(currentUser&&!currentUser.emailVerified){
            setUserEmailNotVerified(true);
        }else{
            setSignInStatus(false);
        }
    }




    useEffect(()=>{
        if(params.productId){
            getAndSetProductListDataByPid(params.productId as string,setProductDetailData,setAssignedPrice,setMarkedPrice,setChosenSize,setChosenDuration)
            getGeneralRating(parseInt(params.productId),setAverageRating);
            getLikeStatus(parseInt(params.productId),setLikeStatus);
        }
    },[])

    if(!productDetail) {
        return(
            <LoadingSpinner/>
        )
    }if(ratingStatus==undefined){
        return(
            <LoadingSpinner/>
        )
    }else{
        return(
            <div>
                <section className={"overlay"} style={closeButtonClicked?{visibility:"hidden",transform: "translateX(-40%)"}:{visibility:"visible",opacity:"1", transform: "translateX(0%)"}}>
                    <div className={"rating-container"}>
                        <div className={"overlay-exit-button-container"}><img className={"exit-button"} src={CloseButton} onClick={()=>{setCloseButtonClicked(true)}}/></div>
                        <h4 className={"rating-intro"}>Write your review on this product!</h4>
                        <div className={"rating-stars"}>
                            <RatingStarsForRating pid={productDetail.pid as number} setRatingStars={setRatingStars}/>
                        </div>
                        <form className={"comments"} onSubmit={handleOnSubmit}>
                            <textarea placeholder="Your comment" id="comment" name="comment" className={"comments-input"} value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
                            <Button variant="danger" type="submit" className={"rating-submit-button"}>
                                Submit
                            </Button>
                        </form>
                    </div>
                </section>
                <NavigationBar/>
                <HamburgerMenu/>
                {
                    (attemptToGoBeyondStockStatus)&&
                    <Alert variant={"danger"}>
                        You have exceeded the current total stock!
                    </Alert>
                }
                {
                    (userEmailNotVerified)&&
                    <Alert variant={"danger"}>
                        You need to have your email address verified!
                    </Alert>
                }
                {
                    (attemptToGoBelowOneStatus)&&
                    <Alert variant={"danger"}>
                        The quantity cannot be zero nor negative!
                    </Alert>
                }
                {
                    (addToShoppingCartStatus)&&
                    <Alert variant={"success"}>
                        The item has been added to the shopping cart successfully!
                    </Alert>
                }
                {
                    (signInStatus===false)&&
                    <Alert variant={"danger"}>
                        You need to sign in first!
                    </Alert>
                }
                {
                    (giveStarsStatus===false)&&
                    <Alert variant={"danger"}>
                        You have not selected any star yet!
                    </Alert>
                }
                {
                    ratingStatus&&
                    <Alert variant={"success"}>
                        Your rating has been posted!
                    </Alert>
                }
                <body className={"product-detail-page-container"}>
                    <div className={"product-type-and-name-container"}>
                        <div className={"top-product-type-container"}>
                            <div className={"product-type"}>
                                Home/{productDetail?.theme}
                            </div>
                        </div>
                        <div className={"top-product-name-container"}>
                            <div className={"product-name"}>
                                {productDetail?.name}
                            </div>
                        </div>
                    </div>
                    <div className={"product-image-container"}>
                        <img src={productDetail?.imageUrl as string} className={"product-image"}/>
                    </div>
                    <div className={"product-detail-container"}>
                        <div className={"product-type-container"}>
                            <div className={"product-type"}>
                                Home/{productDetail?.theme}
                            </div>
                        </div>
                        <div className={"product-name-container"}>
                            <div className={"product-name"}>
                                {productDetail?.name}
                            </div>
                        </div>
                        <div className={"product-price-container"}>
                            <h5 className={"product-selling-price"}>
                                {formatter.format(assignedPrice as number)}
                            </h5>
                            <p className={"product-marked-price"}>
                                {formatter.format(markedPrice as number)}
                            </p>
                        </div>
                        <Form.Group className="tattoo-duration-container" controlId="formBasicPassword">
                            <Form.Label className="label">Duration:</Form.Label>
                            <Form.Select style={{width: "11.5rem"}} id="disabledSelect" value={chosenDuration} onChange={(event)=>{handleChosenDuration(event.target.value)}}>
                                {productDetail.shortDuration?<option value="short duration: 1-3 days">short duration: 1-3 days</option>:null}
                                {productDetail.longDuration?<option value="long duration: 2 weeks and more">long duration: 2 weeks and more</option>:null}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="tattoo-size-container" controlId="formBasicPassword">
                            <Form.Label className="label">Tattoo size:</Form.Label>
                            <Form.Select style={{width: "11.5rem"}} id="disabledSelect" value={chosenSize} onChange={(event)=>{handleChosenSize(event.target.value)}}>
                                {productDetail?.sizeOne?<option value="extra small: 1 inch (ear, finger, toe, wrist)">{productDetail?.sizeOne}</option>:null}
                                {productDetail?.sizeTwo?<option value="small: 1-3 inches (wrist, ankle, clavicle, calf)">{productDetail?.sizeTwo}</option>:null}
                                {productDetail?.sizeThree?<option value="medium: 3-5 inches (lower arm, neck, chest)">{productDetail?.sizeThree}</option>:null}
                                {productDetail?.sizeFour?<option value="large: 5-8 inches (upper arm, leg)">{productDetail?.sizeFour}</option>:null}
                                {productDetail?.sizeFive?<option value="extra large: 8-14 inches (back)">{productDetail?.sizeFive}</option>:null}
                            </Form.Select>
                        </Form.Group>
                        <div className={"rating-and-average-container"}>
                            <RatingStarsToBeShowcased pid={productDetail?.pid as number} averageRating={averageRating} setAverageRating={setAverageRating} setCloseButtonClicked={setCloseButtonClicked} setGiveRatingStatus={setSignInStatus} setUserEmailNotVerified={setUserEmailNotVerified}/>
                            {averageRating?
                                <div className={"average"}>({averageRating})</div>:
                                <div className={"no-rating"}>(No rating)</div>}
                        </div>
                        <div className={"product-stock-container"}>
                            <div className={"product-stock"}>current stock: {productDetail?.stock}</div>
                        </div>
                        <div className={"product-quantity-selector-container"}>
                            <QuantitySelector quantity={quantity} handleMinusOneOnClick={handleMinusOneOnClick} handlePlusOneOnClick={handlePlusOneOnClick}/>
                        </div>
                        <div className={"product-add-to-cart-container"} onClick={handleAddToShoppingCart}>
                            <div className={"product-add-to-cart"}>
                                <img src={AddToCart} className={"add-to-cart-image"}/>
                                <p>ADD TO CART</p>
                            </div>
                        </div>
                        <div className={"product-like-container"} onClick={handleLikeOnClick}>
                            {likeStatus &&<div className={"product-like"}><img src={ColoredHeart} className={"like-product-image"}/><p>LIKE PRODUCT</p></div>}
                            {!likeStatus &&<div className={"product-like"}><img src={Heart} className={"like-product-image"}/><p>LIKE PRODUCT</p></div>}

                        </div>
                        <div className={"product-details-container"}>
                            <p className={"product-details"}>Product details:</p>
                            <p className={"product-details-content"}>
                                {productDetail?.description}
                            </p>
                            <p className={"product-hashtag"}>
                                {productDetail?.hashtags?productDetail?.hashtags:null}
                            </p>
                        </div>
                    </div>
                </body>
                <Accordion className={"product-FAQ-container"}>
                    <div className={"product-common-questions"}>Common questions:</div>
                    <Accordion.Item eventKey="0" className={"product-FAQ-top-item"}>
                        <Accordion.Header className={"product-FAQ-header"}>How do I apply a Freefox temporary tattoo?</Accordion.Header>
                        <Accordion.Body className={"product-FAQ-body"}>
                            Actually, very simple - there are a few things to keep in mind 🤓
                            <br/>
                            <br/> Before You Begin:
                            <br/>．Moisturize your skin 1 hour before you apply the tattoo.
                            <br/>．Use the primer wipe included in your kit before applying your tattoo.
                            <br/>．Find a comfortable room temperature to apply your tattoo.
                            <br/>．Don’t apply your tattoo on areas of the body that will move or crease (e.g. elbow).
                            <br/>
                            <br/> While applying:
                            <br/>．Take out the sticker/applicator.
                            <br/>．Peel off the backing.
                            <br/>．Gently cover the body part with the sticker, sticky side down.
                            <br/>．Make sure that no air got into the inside of the applicator.
                            <br/>
                            <br/> After applying:
                            <br/>．Stay as still as possible for an hour.
                            <br/>．Hold the skin taut before beginning to peel the applicator.
                            <br/>．Peel swiftly in a continuous motion.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className={"product-FAQ-item"}>
                        <Accordion.Header className={"product-FAQ-header"}>How much does the shipping cost?</Accordion.Header>
                        <Accordion.Body className={"product-FAQ-body"}>
                            <br/>It depends on where you live! 😉
                            <br/>
                            <br/>Please check out the table in the following page:<Link to={"/shipping"} className={"click-me"}> Click me</Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className={"product-FAQ-item"}>
                        <Accordion.Header className={"product-FAQ-header"}>Do we have any return&exchange policies?</Accordion.Header>
                        <Accordion.Body className={"product-FAQ-body"}>
                            <br/>Generally, smudging is the result of too much moisture being trapped in the applicator. This happens if your body is too hot before you put on the tattoo, or there's excessive movement while the tattoo is developing.
                            <br/>
                            <br/>✅ The most important things to remember are:
                            <br/>
                            <br/>．Moisturize the area 1 hour before application - it's best to use a water-based moisturizer!
                            <br/>．Use the Primer Wipe before applying your tattoo to make sure your skin is exfoliated and prepped for application.
                            <br/>．Don't reposition or reapply the tattoo once it's on your skin.
                            <br/>．Once the tattoo is developing:
                            <br/>．Avoid any excessive movement and heat
                            <br/>．Wear short sleeves to avoid any heat/sweat
                            <br/>．When going to bed the first night after application, wear loose fitting clothes over the tattooed area to avoid transferring overnight.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className={"product-FAQ-item"}>
                        <Accordion.Header className={"product-FAQ-header"}>More information about the duration of Freefox tattoos</Accordion.Header>
                        <Accordion.Body className={"product-FAQ-body"}>
                            <br/>Generally, smudging is the result of too much moisture being trapped in the applicator. This happens if your body is too hot before you put on the tattoo, or there's excessive movement while the tattoo is developing.
                            <br/>
                            <br/>✅ The most important things to remember are:
                            <br/>
                            <br/>．Moisturize the area 1 hour before application - it's best to use a water-based moisturizer!
                            <br/>．Use the Primer Wipe before applying your tattoo to make sure your skin is exfoliated and prepped for application.
                            <br/>．Don't reposition or reapply the tattoo once it's on your skin.
                            <br/>．Once the tattoo is developing:
                            <br/>．Avoid any excessive movement and heat
                            <br/>．Wear short sleeves to avoid any heat/sweat
                            <br/>．When going to bed the first night after application, wear loose fitting clothes over the tattooed area to avoid transferring overnight.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <FreeFoxFooter/>
                <BottomBar/>
            </div>
        )
    }
}