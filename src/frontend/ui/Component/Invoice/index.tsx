import "./style.css"
import Skeleton from "react-loading-skeleton";

type Props={
    calculateNumOfItems:()=>number|undefined;
    calculateTotal:()=>number|undefined;
}

export default function Invoice(props:Props){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return(
        <div className={"invoice-container"}>
            <div className={"number-of-items"}>{props.calculateNumOfItems()||<Skeleton/>} items</div>
            <div className={"show-details"}>Show Details</div>
            <div className={"subtotal-container"}>
                <div className={"subtotal"}>Subtotal</div>
                {/*Put in a function that returns a number*/}
                <div className={"subtotal-number"}>{formatter.format(props.calculateTotal() as number)||<Skeleton/>}</div>
            </div>
            <div className={"shopping-cart-top-line"}></div>
            <div className={"total-cost-container"}>
                <div className={"total-cost"}>Total</div>
                <div className={"total-cost-number"}>{formatter.format(props.calculateTotal() as number)||<Skeleton/>}</div>
            </div>
        </div>
    )
}