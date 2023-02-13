import {UserData} from "../../data/UserData";
import {createContext, useContext} from "react";

export type HamburgerMenuContent={hamburgerMenuIsClicked:boolean, setHamburgerMenuIsClicked:(hamburgerMenuIsClickedStatus:boolean)=>void}

export const HamburgerMenuContext=createContext<HamburgerMenuContent>({
    hamburgerMenuIsClicked: false,
    setHamburgerMenuIsClicked:()=>{}
});

export const useHamburgerMenuContext=()=>useContext(HamburgerMenuContext);