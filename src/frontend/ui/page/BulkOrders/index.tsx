import NavigationBar from "../../Component/NavigationBar";
import BulkOrdersPic from "../../images/BulkOrders.svg";
import Footer from "../../Component/FreeFoxFooter";
import "./style.css";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React from "react";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function BulkOrders(){
    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <body className={"shipping-page-container"}>
                <h2>Bulk Orders</h2>
                <img src={BulkOrdersPic} className={"package-arrived-pic"}/>
                <div className={"bulk-orders-content"}>
                    <div>For bulk orders, please send us the following information to <a href={"mailto:happyzhu0115@gmail.com"}>happyzhu0115@gmail.com</a>
                        <br/>and we will get back to you within 48 hours.
                        <br/>
                        <br/>For your bulk orders, please inform us with the following information:
                        <br/>1. Your name
                        <br/>2. When do you need this by?
                        <br/>3. Where do you want it to be shipped to?
                        <br/>4. How many tattoos do you need?
                        <br/>5. For what event are the tattoos for?
                        <br/>6. What design(s) do you want? (Your own design is also fine)
                        <br/>
                        <br/>Usually, the minimum is $150 and the lead time is 10 days.
                    </div>
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}