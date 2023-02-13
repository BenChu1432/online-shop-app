import {createContext, useContext} from 'react';
import {UserData} from "../../data/UserData";

export type LoginUserContent={currentUser:UserData | null | undefined, setCurrentUser:(currentUser:UserData | null | undefined)=>void}

export const LoginUserContext=createContext<LoginUserContent>({
    currentUser: undefined,
    setCurrentUser:()=>{}
});

export const useLoginUserContext=()=>useContext(LoginUserContext);