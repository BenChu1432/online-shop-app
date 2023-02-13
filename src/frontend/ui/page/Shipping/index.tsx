import NavigationBar from "../../Component/NavigationBar";
import Footer from "../../Component/FreeFoxFooter";
import packageArrived from "../../images/Shipping.svg";
import "./style.css";
import FreeFoxFooter from "../../Component/FreeFoxFooter";
import BottomBar from "../../Component/BottomBar";
import React from "react";
import HamburgerMenu from "../../Component/HamburgerMenu";

export default function Shipping(){
    return(
        <>
            <NavigationBar/>
            <HamburgerMenu/>
            <body className={"shipping-page-container"}>
                <h2 className={"shipping-title"}>Shipping</h2>
                <img src={packageArrived} className={"package-arrived-pic"}/>
                <div className={"shipping-page-content"}>
                    <div className={"shipping-page-paragraph-one"}>
                        Our shipping destinations are limited to the United States, Canada, mainland China,
                        <br/>Taiwan and Hong Kong. If your country is not included, feel free to email us at
                        <br/><a href={"mailto:happyzhu0115@gmail.com"}>happyzhu0115@gmail.com</a> and we will work out shipment accordingly.
                    </div>
                    <div>
                        <br/>
                        <h3 className={"processing-time"}>Processing Time</h3>
                        <div>Our processing time for non-custom tattoos will be 1-3 days before shipping.
                            <br/>For custom tattoos, it usually takes 3-5 days for processing once the design is
                            <br/>confirmed.
                        </div>
                        <br/>
                        <h3>Shipping Rates</h3>
                        <table className={"table-one"}>
                            <tr className={"first-tree"}>
                                <th className={"tree-1st-slot"}>US</th>
                                <th className={"tree-2nd-slot"}>USPS (4-8 Business Days)</th>
                            </tr>
                            <tr className={"second-tree"}>
                                <td>Less than $35 USD $7 USD</td>
                                <td>$7 USD</td>
                            </tr>
                            <tr className={"third-tree"}>
                                <td>More than $75 USD</td>
                                <td>FREE Standard Shipping</td>
                            </tr>
                        </table>

                        <table className={"table-two"}>
                            <tr className={"first-tree"}>
                                <th className={"tree-1st-slot"}>Canada</th>
                                <th className={"tree-2nd-slot"}>FedEx Economy (2-5 Business Days)</th>
                            </tr>
                            <tr className={"second-tree"}>
                                <td>Less than $70 USD</td>
                                <td>From $9 USD</td>
                            </tr>
                            <tr className={"third-tree"}>
                                <td>More than $75 USD</td>
                                <td>FREE Standard Shipping</td>
                            </tr>
                        </table>

                        <table className={"table-three"}>
                            <tr className={"first-tree"}>
                                <th className={"tree-1st-slot"}>Hong Kong</th>
                                <th className={"tree-2nd-slot"}>Hong Kong Post (2-4 Business Days)</th>
                            </tr>
                            <tr className={"second-tree"}>
                                <td>Less than 100 HKD</td>
                                <td>From 10 HKD
                                </td>
                            </tr>
                            <tr className={"third-tree"}>
                                <td>More than 100 HKD</td>
                                <td>FREE Standard Shipping</td>
                            </tr>
                        </table>
                        <table className={"table-four"}>
                            <tr className={"first-tree"}>
                                <th className={"tree-1st-slot"}>Mainland China</th>
                                <th className={"tree-2nd-slot"}>Hong Kong Post (2-4 Business Days)</th>
                            </tr>
                            <tr className={"second-tree"}>
                                <td>Less than 66 RMB</td>
                                <td>From 2.5 RMB
                                </td>
                            </tr>
                            <tr className={"third-tree"}>
                                <td>More than 66 RMB</td>
                                <td>FREE Standard Shipping</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
            <FreeFoxFooter/>
            <BottomBar/>
        </>
    )
}