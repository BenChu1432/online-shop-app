import "./style.css";
import NavigationBar from "../../Component/NavigationBar";
import HamburgerMenu from "../../Component/HamburgerMenu";
import React, {FormEvent, useEffect, useReducer, useState} from "react";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import {Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface State {
    count: number;
}

interface Action {
    type: "increment" | "decrement";
}

const reducer = (state:State, action:Action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
};


export default function UploadPrototypePage(){
    const [tattooName, setTattooName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [descriptionWordCount,setDescriptionWordCount]= useState<number>(0);
    const [tattooNameWordCount,setTattooNameWordCount]= useState<number>(0);
    const [theme,setTheme] = useState<string>('');
    const [color,setColor]= useState<string>('');
    const [shortDuration,setShortDuration]=useState<boolean>(false);
    const [longDuration,setLongDuration]=useState<boolean>(false);
    const [sizeOne,setSizeOne]= useState<string>("");
    const [sizeTwo,setSizeTwo]= useState<string>("");
    const [sizeCount, setSizeCount] = useReducer(reducer, { count: 0 });
    const [sizeChange,setSizeChange]=useState<string|undefined>(undefined);
    const [shortLastingAndSizeOneSellingPrice,setShortLastingAndSizeOneSellingPrice]=useState<string>("");
    const [shortLastingAndSizeTwoSellingPrice,setShortLastingAndSizeTwoSellingPrice]=useState<string>("");
    const [longLastingAndSizeOneSellingPrice,setLongLastingAndSizeOneSellingPrice]=useState<string>("");
    const [longLastingAndSizeTwoSellingPrice,setLongLastingAndSizeTwoSellingPrice]=useState<string>("");
    const [tempSize,setTempSize]=useState<string|undefined>(undefined);
    const [hashTagInput, setHashTagInput] = useState<string>('');
    const [hashTagCount, setHashTagCount] = useState(0);
    const [fileUploaded, setFileUploaded] = useState<FileList | null>(null);
    const [needLoggingInMessage,setNeedLoggingInMessage]=useState<boolean>(false);
    const [descriptionMoreThanThirtyFiveWordsError,setDescriptionMoreThanThirtyFiveWordsError]=useState<boolean>(false);
    const [tattooNameMoreThanFiveWords,setTattooNameMoreThanFiveWords]=useState<boolean>(false);
    const [themeNotChosenError,setThemeNotChosenError]=useState<boolean>(false);
    const [colorNotChosenError,setColorNotChosenError]=useState<boolean>(false);
    const [tattooNameHasNonLettersError, setTattooNameHasNonLettersError] = useState(false);
    const [descriptionHasNonLettersError, setDescriptionHasNonLettersError] = useState(false);
    const [durationNotChosenError,setDurationNotChosenError]= useState(false);
    const [sizeNotChosenError,setSizeNotChosenError]= useState(false);
    const [idealPricesNotGivenError,setIdealPricesNotGivenError]= useState(false);
    const [fewerThanTwoHashtagsError,setFewerThanTwoHashtagsError]= useState(false);
    const [moreThanSixHashtagsError,setMoreThanSixHashtagsError]= useState(false);
    const [imageNotUploadedError,setImageNotUploadedError]= useState(false);


    const handleTattooDesignSubmitOnClick=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(hashTagCount>6){
            setMoreThanSixHashtagsError(true);
        }else{
            setMoreThanSixHashtagsError(false);
        }
        if(hashTagCount<3){
            setFewerThanTwoHashtagsError(true);
        }else{
            setFewerThanTwoHashtagsError(false);
        }
        if(tattooNameWordCount>5){
            setTattooNameMoreThanFiveWords(true)
        }if(descriptionWordCount>35){
            setDescriptionMoreThanThirtyFiveWordsError(true);
        }if(theme===""){
            setThemeNotChosenError(true);
        }if(color===""){
            setColorNotChosenError(true);
        }
        if(!shortDuration&&!longDuration){
            setDurationNotChosenError(true);
        }
        if(sizeOne===""&&sizeTwo===""){
            setSizeNotChosenError(true);
        }
        if(fileUploaded==undefined){
            setImageNotUploadedError(true);
        }
        if(longDuration){
            //Only one size
            if(sizeOne&&sizeTwo===""){
                if(longLastingAndSizeOneSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
                //Two sizes
            }else if(sizeTwo){
                if(longLastingAndSizeOneSellingPrice===""&&longLastingAndSizeTwoSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
            }
        }else if(shortDuration){
            //Only one size
            if(sizeOne&&sizeTwo===""){
                if(shortLastingAndSizeOneSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
                //Two sizes
            }else if(sizeTwo){
                if(shortLastingAndSizeOneSellingPrice===""&&shortLastingAndSizeTwoSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
            }
        }else if(longDuration&&shortDuration){
            //Only one size
            if(sizeOne&&sizeTwo===""){
                if(shortLastingAndSizeOneSellingPrice===""&&longLastingAndSizeOneSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
                //Two sizes
            }else if(sizeTwo){
                if(shortLastingAndSizeOneSellingPrice===""&&shortLastingAndSizeTwoSellingPrice===""&&longLastingAndSizeOneSellingPrice===""&&longLastingAndSizeTwoSellingPrice===""){
                    setIdealPricesNotGivenError(true);
                }else{
                    setIdealPricesNotGivenError(false);
                }
            }
        }
        if(!tattooNameHasNonLettersError&&!tattooNameMoreThanFiveWords&&!themeNotChosenError&&!colorNotChosenError
            &&!descriptionHasNonLettersError&&!descriptionMoreThanThirtyFiveWordsError&&!durationNotChosenError
        &&!sizeNotChosenError&&!idealPricesNotGivenError&&!moreThanSixHashtagsError&&!fewerThanTwoHashtagsError
        &&!imageNotUploadedError){

        }
    }

    const handleTattooNameOnChange= (event: React.ChangeEvent<HTMLInputElement>)=>{
        setTattooName(event.target.value);
        const inputValue = event.target.value;
        const words = inputValue.split(' ').filter(word => word !== '');
        setDescriptionWordCount(words.length);
        // Check if the input contains any non-letter characters
        const pattern = /[^a-zA-Z\s]/;
        setTattooNameHasNonLettersError(pattern.test(inputValue));
    }

    const handleDescriptionOnChange=(event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDescription(event.target.value);
        const inputValue = event.target.value;
        const words = inputValue.split(' ').filter(word => word !== '');
        setDescriptionWordCount(words.length);
        // Check if the input contains any non-letter characters
        const pattern = /[^a-zA-Z\s]/;
        setDescriptionHasNonLettersError(pattern.test(inputValue));
    }

    const handleHashTagChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHashTagInput(event.target.value);
        const hashRegex = /^#/;
        const hashtags = event.target.value.split(' ').filter(word => word.match(hashRegex));
        setHashTagCount(hashtags.length);
    };

    const handleSizeOnClicked=(size:string,index:number,event?: React.ChangeEvent<HTMLInputElement>)=>{
        setTempSize(size);
        if(event?.target.checked){
            setSizeChange("increment")
            setSizeCount({ type: "increment" })
        }else{
            setSizeChange("decrement")
            setSizeCount({ type: "decrement" })
        }
    }


    useEffect(()=>{
        if(sizeChange==="increment"){
            if(sizeCount.count===1){
                setSizeOne(tempSize as string)
            }else if(sizeCount.count===2){
                setSizeTwo(tempSize as string)
            }
        }else if(sizeChange==="decrement"){
            if(sizeCount.count===0){
                setSizeOne("")
            }else if(sizeCount.count===1){
                setSizeTwo("")
            }
        }
    },[sizeCount])

    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            {(needLoggingInMessage)&&
            <Alert variant={"danger"}>
                You need to log in first!
            </Alert>}
            {(descriptionMoreThanThirtyFiveWordsError)&&
                <Alert variant={"danger"}>
                    You have entered more than 35 words!
                </Alert>}
            <body className={"upload-page-container"} style={!shortDuration&&!longDuration?{height: "74rem"}: {height: "87rem"}}>
            <h4>Upload Your Tattoo Designs here!</h4>
            <form className={"upload-form"} onSubmit={(event)=>{handleTattooDesignSubmitOnClick(event)}}>
                <div className={"upload-form-tattoo-name"} style={themeNotChosenError?{marginBottom: "1rem"}:{marginBottom: "2rem"}}>
                    <label>Tattoo's name:</label>
                    <input required={true} onChange={(event)=>{handleTattooNameOnChange(event)}}/>
                    <span className={"upload-error-message"}>{tattooNameMoreThanFiveWords?"You have entered more than 5 characters":null}</span>
                    <span className={"upload-error-message"}>{tattooNameHasNonLettersError?"Symbols and numbers are not allowed":null}</span>
                </div>
                <div className={"upload-form-theme"} style={themeNotChosenError?{flexDirection: "column"}:{flexDirection: "row"}}>
                    <header>Theme:</header>
                    <div className={"upload-form-themes-container"}>
                        <input type={"radio"} name={"theme"} onChange={()=>{setTheme("horoscope");setThemeNotChosenError(false)}}/><label>Horoscope</label>
                        <input type={"radio"} name={"theme"} onChange={()=>{setTheme("universe");setThemeNotChosenError(false)}}/><label>Universe</label>
                        <input type={"radio"} name={"theme"} onChange={()=>{setTheme("nature");setThemeNotChosenError(false);}}/><label>Nature</label>
                    </div>
                    <span className={"upload-error-message"}>{themeNotChosenError?"You have not chosen any theme":null}</span>
                </div>
                <div className={"upload-form-color"} style={colorNotChosenError?{flexDirection: "column"}:{flexDirection: "row"}}>
                    <header>Color:</header>
                    <div className={"upload-form-colors-container"}>
                        <input type={"radio"} name={"color"} onChange={()=>{setColor("black-and-white");setColorNotChosenError(false)}}/><label>Black-And-White</label>
                        <input type={"radio"} name={"color"} onChange={()=>{setColor("full color");setColorNotChosenError(false)}}/><label>Full Color</label>
                    </div>
                    <span className={"upload-error-message"}>{colorNotChosenError?"You have not chosen any color":null}</span>
                </div>
                <div className={"upload-form-description"}>
                    <label>Description (No more than 35 words):
                        <span className={"upload-error-message"}>{descriptionHasNonLettersError?"Symbols and numbers are not allowed":null}</span>
                        <span className={"upload-error-message"}><br/>{descriptionMoreThanThirtyFiveWordsError?"The word count has exceeded 35 words":null}</span>
                    </label>
                    <br/>
                    <textarea required={true} name={"tattoo-description"} onChange={(event)=>{handleDescriptionOnChange(event)}}/>
                </div>
                <header className={"upload-form-duration-header"}>Duration (1-2 durations):
                    <span className={"upload-error-message"}>{durationNotChosenError?"You have not chosen any duration yet":null}</span>
                </header>
                <div className={"upload-form-duration"}>
                    <input type={"checkbox"} onChange={(event)=>{if(event.target.checked){
                        setLongDuration(true)
                        setDurationNotChosenError(false);
                    }else{
                        setLongDuration(false)
                    }
                    }}/><label>Long Duration</label>
                    <input type={"checkbox"} onChange={(event)=>{if(event.target.checked){
                        setShortDuration(true);
                        setDurationNotChosenError(false);
                    }else{
                        setShortDuration(false)
                    }
                    }}/><label>Short Duration</label>
                </div>
                <div className={"upload-form-size"}>
                    <header>Size (1-2 sizes):
                        <span className={"upload-error-message"}>{sizeNotChosenError?"You have not chosen any duration yet":null}</span>
                    </header>
                    <div className={"upload-form-each-size"}>
                        <input type={"checkbox"} onChange={(event)=>{handleSizeOnClicked("extra small: 1 inch (ear, finger, toe, wrist)",0,event);setSizeNotChosenError(false)}}/><label>extra small: 1 inch (ear, finger, toe, wrist)</label>
                    </div>
                    <div className={"upload-form-each-size"}>
                        <input type={"checkbox"} onChange={(event)=>{handleSizeOnClicked("small: 1-3 inches (wrist, ankle, clavicle, calf)",1,event);setSizeNotChosenError(false)}}/><label>small: 1-3 inches (wrist, ankle, clavicle, calf)</label>
                    </div>
                    <div className={"upload-form-each-size"}>
                        <input type={"checkbox"} onChange={(event)=>{handleSizeOnClicked("medium: 3-5 inches (lower arm, neck, chest)",2,event);setSizeNotChosenError(false)}}/><label>medium: 3-5 inches (lower arm, neck, chest)</label>
                    </div>
                    <div className={"upload-form-each-size"}>
                        <input type={"checkbox"} onChange={(event)=>{handleSizeOnClicked("large: 5-8 inches (upper arm, leg)",3,event);setSizeNotChosenError(false)}}/><label>large: 5-8 inches (upper arm, leg)</label>
                    </div>
                    <div className={"upload-form-each-size"}>
                        <input type={"checkbox"} onChange={(event)=>{handleSizeOnClicked("extra large: 8-14 inches (back)",4,event)}}/><label>extra large: 8-14 inches (back)</label>
                    </div>
                </div>
                <header className={"upload-form-ideal-size-header"}>Ideal prices for the following sizes:
                    <span className={"upload-error-message"}>{idealPricesNotGivenError?"You have not filled in all the ideal prices yet":null}</span>
                </header>
                <div className={"upload-form-tattoo-short-duration-sizes-container"}>
                    {shortDuration?<div className={"upload-form-tattoo-short-duration-sizes"}>
                        <p>Short Duration:</p>
                        {sizeOne?
                            <div>
                                <label>{sizeOne?sizeOne+" : ":"Unknown"}</label>
                                <input onChange={(event)=>{setShortLastingAndSizeOneSellingPrice(event.target.value)}}/>
                            </div>
                            :""}
                        <br/>
                        {sizeTwo?
                            <div>
                                <label>{sizeTwo?sizeTwo+" : ":"Unknown"}</label>
                                <input onChange={(event)=>{setShortLastingAndSizeTwoSellingPrice(event.target.value)}}/>
                            </div>
                            :""}
                    </div>:null}
                    {longDuration?<div className={"upload-form-tattoo-short-duration-sizes"}>
                        <p>Long Duration:</p>
                        {sizeOne?
                            <div>
                                <label>{sizeOne?sizeOne+" : ":"Unknown"}</label>
                                <input onChange={(event)=>{setLongLastingAndSizeOneSellingPrice(event.target.value)}}/>
                            </div>
                            :""}
                        <br/>
                        {sizeTwo?
                            <div>
                                <label>{sizeTwo?sizeTwo+" : ":"Unknown"}</label>
                                <input onChange={(event)=>{setLongLastingAndSizeTwoSellingPrice(event.target.value)}}/>
                            </div>
                            :""}
                    </div>:null}
                </div>
                <div className={"upload-form-hashtags"}>
                    <label>Hashtag (No more than 5 hashtags):
                        <span className={"upload-error-message"}>{moreThanSixHashtagsError||fewerThanTwoHashtagsError?"(Only) 2-6 hashtags are needed":null}</span>
                    </label>
                    <br/>
                    <textarea value={hashTagInput} onChange={handleHashTagChange}/>
                </div>
                <div className={"upload-form-image"}>
                    <label>Image (only accept png and jpeg):
                        <span className={"upload-error-message"}>{imageNotUploadedError?"There is no tattoo design uploaded":null}</span>
                    </label>
                    <input type={"file"} accept="image/png, image/jpeg" name={"tattoo-design"} onChange={(event)=>{setFileUploaded(event.target.files);setImageNotUploadedError(false)}}/>
                </div>
                <Button variant="danger" type="submit" className={"upload-button"}>
                    Submit
                </Button>
            </form>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}