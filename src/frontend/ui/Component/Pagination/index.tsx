import "./style.css";
import {useEffect, useState} from "react";

type Props={
    postsPerPage: number;
    totalPosts:number;
    currentPage:number;
    setCurrentPage:(currentPage:number)=>void;
}

export default function Pagination(props:Props){
    const pageNumbers=[];

    for(let i=1;i<=Math.ceil(props.totalPosts/props.postsPerPage);i++){
        pageNumbers.push(i);
    }

    const handlePrevOnClick=()=>{
        if(props.currentPage!=1){
            let currentPage=props.currentPage;
            props.setCurrentPage(currentPage-1);
        }
    }

    const handleNextOnClick=()=>{
        if(props.currentPage!=pageNumbers.length){
            let currentPage=props.currentPage;
            props.setCurrentPage(currentPage+1);
        }
    }
    let tempPageNumbers:(number | string)[];

    if(pageNumbers.length===0||pageNumbers.length===1){
        tempPageNumbers=[1];
    }else if(pageNumbers.length===2){
        tempPageNumbers=[1,2];
    }else if(pageNumbers.length===3){
        tempPageNumbers=[1,2,3];
    }else if(pageNumbers.length===4){
        tempPageNumbers=[1,2,3,4];
    }else if(pageNumbers.length===5){
        tempPageNumbers=[1,2,3,4,5];
    }else if(pageNumbers.length===6){
        tempPageNumbers=[1,2,3,4,5,6];
    }else if(pageNumbers.length>=7&&props.currentPage>=1&&props.currentPage<=4){
        tempPageNumbers=[1,2,3,4,5,"...",pageNumbers.length];
    }else if(props.currentPage>=5&&props.currentPage+4<=pageNumbers.length){
        tempPageNumbers=["1...",props.currentPage-2,props.currentPage-1,props.currentPage,props.currentPage+1,props.currentPage+2,"...",pageNumbers.length];
    }else{
        tempPageNumbers=["1...",pageNumbers.length-4,pageNumbers.length-3,pageNumbers.length-2,pageNumbers.length-1,pageNumbers.length];
    }


    return(
        <div className={"pagination-container"}>
            <div className={"pages-container"}>
                <div className={"each-page"} onClick={handlePrevOnClick}>
                    <div className={"page-number"}>
                        Prev
                    </div>
                </div>
                {tempPageNumbers.map((page)=>{
                    if(page==="1..."){
                        return(
                            <div className={"each-page"} onClick={()=>{props.setCurrentPage(1)}}>
                                <div className={"page-number"}>
                                    {page}
                                </div>
                            </div>
                        )
                    }else if(page===props.currentPage){
                        return(
                            <div className={"current-page"} onClick={()=>{props.setCurrentPage(page as number)}}>
                                <div className={"current-page-number"}>
                                    {page}
                                </div>
                            </div>
                        )
                    }else if(page==="..."){
                        return(
                            <div className={"dot-dot-page"}>
                                <div className={"page-number"}>
                                    {page}
                                </div>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className={"each-page"} onClick={()=>{props.setCurrentPage(page as number)}}>
                                <div className={"page-number"}>
                                    {page}
                                </div>
                            </div>
                        )
                    }
            })}
                <div className={"each-page"} onClick={handleNextOnClick}>
                    <div className={"page-number"}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )

}