import {Spinner} from "react-bootstrap";
import "./style.css"


export default function LoadingSpinner(){
    return(
        <div className="spinner">
            <Spinner animation="border" role="status"></Spinner>
            <p>Loading...</p>
        </div>
    )
}