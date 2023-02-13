import {createContext, useContext} from 'react';

export type UsernameContent={username:string|undefined,setUsername:(username:string|undefined)=>void}

export const UsernameContext=createContext<UsernameContent>({
    username: undefined,
    setUsername:()=>{}
});

export const useUsernameContext=()=>useContext(UsernameContext);
