import NavigationBar from "../../Component/NavigationBar";
import Footer from "../../Component/FreeFoxFooter";
import Questions from "../../images/Questions.svg";
import "./style.css";
import Accordion from 'react-bootstrap/Accordion';
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React from "react";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function FAQ(){
    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <body className={"FAQ-page-container"}>
                <h2 className={"FAQ"}>FAQ</h2>
                <img src={Questions} className={"questions-logo"}/>
                {/*Part 2*/}
                <h3 className={"applying-tattoos"}>Tattoo sizes:</h3>
                <Accordion className={"FAQ-container"}>
                    <Accordion.Item eventKey="0" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>What size(s) can I choose for each tattoo?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            ✨We only provide 4 size options and size options depend on each category.<br/>
                            <br/>Size options:
                            <br/>extra small: 1 inch (ear, finger, toe, wrist)
                            <br/>small: 1-3 inches (wrist, ankle, clavicle, calf)
                            <br/>medium: 3-5 inches (lower arm, neck, chest)
                            <br/>large: 5-8 inches (upper arm, leg)
                            <br/>extra large: 8-14 inches (back)
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {/*Part 2*/}
                <h3 className={"applying-tattoos"}>Before Applying Tattoos:</h3>
                <Accordion className={"FAQ-container"}>
                    <Accordion.Item eventKey="0" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>Do I need to prepare anything before I apply a tattoo?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            Nothing major - but there are a few things to keep in mind 🤓
                            <br/>
                            <br/>Before You Begin:
                            <br/>．Moisturize your skin 1 hour before you apply the tattoo.
                            <br/>．Use the primer wipe included in your kit before applying your tattoo.
                            <br/>．Apply your tattoo in a comfortable room temperature.
                            <br/>．Don’t apply your tattoo on areas of the body that will move or crease (e.g. elbow).
                            <br/>．Stay as still as possible for the hour while the applicator is on your skin.
                            <br/>
                            <br/>Things To Avoid:
                            <br/>．Avoid areas with dense hair, or shave the area 24 hours prior to application.
                            <br/>．Avoid scars, moles, and stretch marks.
                            <br/>．Avoid sensitive areas like the neck, face, upper chest, inner biceps, etc.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>Does applying a Free Fox Fashion tattoo hurt?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            <br/>Nope! We're all about tattoos without the pain. 😉
                            <br/>
                            <br/>The only discomfort you may experience is from taking off the applicator, which is similar to peeling off a bandage.
                            <br/>
                            <br/>Here are a few tips for removing the applicator as seamlessly as possible:
                            <br/>
                            <br/>．Hold the skin taut before beginning to peel.
                            <br/>．Peel swiftly in a continuous motion.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>How do I prevent my tattoo from smudging?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
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
                    <Accordion.Item eventKey="3" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>Should I shave? How long should I wait to apply after shaving?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            <br/>If you have coarse or dense hair, we recommend shaving prior to application. This is because hair acts as a barrier between the ink and skin (so the tattoo won't adhere directly!). This can cause the ink to leak, smudge, or for the tattoo to be underdeveloped.
                            <br/>
                            <br/>Light hair on the application area is fine and allows for a good transfer, but the more hair there is, the more room there is for error. If you are questioning whether or not to shave the application area, we suggest shaving it.
                            <br/>
                            <br/>💡 If you shave, we recommend waiting 24 hours before applying your tattoo.
                            <br/>
                            <br/>Shaving can cause micro-cuts in the skin that put the skin at higher risk of irritation. Post shaving, we suggest moisturizing the skin to heal any damage and keep it healthy for application.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {/*Part 3*/}
                <h3 className={"applying-tattoos"}>After Applying Tattoos:</h3>
                <Accordion className={"FAQ-container"}>
                    <Accordion.Item eventKey="0" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>Can I swim or workout after applying my tattoo?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            Free Fox Fashhion tattoos are water resistant! Because our ink sinks into the top layer of the skin, it can withstand exposure to water and sweat.
                            <br/>
                            <br/>✅ A few things to note:
                            <br/>．Wait at least 8 hours post-application before working out, showering, or going for a swim.
                            <br/>．Swimming in chlorinated water will impact the longevity of your tattoo - so will extended exposure to water. To protect your tattoo when swimming, apply some balm (such as petroleum jelly) over the tattoo before hopping into the water. 🌊
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>Can I tan with a Free Fox Fashion tattoo?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            <br/>An Free Fox tattoo and a spray tan have very similar reactions: both contain active ingredients that react with the amino acids in the first layer of the skin to change its color. We recommend applying your Inkbox prior to getting a spray tan to ensure the tattoo will reach peak darkness.
                            <br/>
                            <br/>💡 When wearing an Inkbox tattoo in the sun, you might get a tan mark of the tattoo.

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>How can I remove my tattoo?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            <br/>The best way to remove your tattoo is to lightly exfoliate with one of the following:
                            <br/>
                            <br/>．Warm salt water - we find that this works best!
                            <br/>．A body scrub
                            <br/>
                            <br/>💡 Be gentle with your skin and stop scrubbing if you feel any discomfort.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className={"FAQ-item"}>
                        <Accordion.Header className={"FAQ-header"}>How can I keep my tattoo looking fresh?</Accordion.Header>
                        <Accordion.Body className={"FAQ-body"}>
                            <br/>You applied your tattoo, it looks flawless, and now you'r wondering ... how can I keep it fresh for as long as possible?
                            <br/>
                            <br/>Here are our top tips for tattoo aftercare:
                            <br/>
                            <br/>．Don’t sweat or shower at least 8 hours post application
                            <br/>．Keep your tattoo moisturized, using a water based moisturizer
                            <br/>．After 24 hours, moisturize the area daily
                            <br/>．If you’re going to swim, cover your tattoo with a balm/jelly
                            <br/>．Don’t scrub or exfoliate the area
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}