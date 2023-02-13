import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import PlusSign from "../../images/plus-small.png";
import MinusSign from "../../images/minus-small.png";

type Props = {
    quantity: number,
    handleMinusOneOnClick?: (event: React.MouseEvent) => void,
    handlePlusOneOnClick?: (event: React.MouseEvent) => void,
    handleMinusOneOnClickForCart?: (pid: number, quantity: number|undefined)=>void,
    handlePlusOneOnClickForCart?: (pid: number, quantity: number|undefined, stock: number)=>void

}

export default function QuantitySelector(props: Props) {
    return (
        <>
            <div className={"quantity-plus-one-container"} onClick={props.handlePlusOneOnClick}><img className={"quantity-plus-one"} src={PlusSign}/></div>
            <div className={"current-quantity-container"}>
                {props.quantity}
            </div>
            <div className={"quantity-minus-one-container"} onClick={props.handleMinusOneOnClick}><img className={"quantity-minus-one"} src={MinusSign} /></div>
        </>
    );

}
