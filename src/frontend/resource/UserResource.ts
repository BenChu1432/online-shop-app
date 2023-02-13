import axios from "axios";
import {UserData} from "../data/UserData";

export const postAccount=(userType:string,username:string,email:string,password:string,firebaseUid:string,subscribedStatus:string)=>{
    return axios.post(`http://localhost:8080/user/${userType}/${username}/${email}/${password}/${firebaseUid}/${subscribedStatus}`
    )
        .then((res)=>{
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
}

export const getAccount=(email:String,setUsername:(username:string|undefined)=>void,setCurrentUser: (user: UserData | null)=>void)=>{
    axios.get(`http://localhost:8080/user/${email}`)
        .then((res)=>{
            setUsername(res.data.username);
            setCurrentUser(res.data);
    }).catch((error)=>{
        console.log(error);
        })
}

export const updateEmailVerificationStatus=(firebaseUid:string)=>{
    axios.patch(`http://localhost:8080/user/updateEmailVerified/${firebaseUid}`)
        .then( (res)=>{
            console.log(res.data);
            console.log("Update email verification succeeded")
        }).catch((error)=>{
            console.log(error);
            console.log("Update email verification failed")
    })
}

export const updateSubscribedStatus=(email:string,setSubscribedStatus:(subscribedStatus:boolean)=>void,toggleShowAlreadySubscribedError:()=>void,toggleShowAlreadySubscribedSuccess:()=>void)=>{
    axios.patch(`http://localhost:8080/user/updateSubscribedStatus/${email}`)
        .then((res)=>{
            console.log(res.data);
            setSubscribedStatus(true);
            // console.log(res.data);
            if(res.data.response==="FAILURE"){
                toggleShowAlreadySubscribedError();
            }else{
                toggleShowAlreadySubscribedSuccess();
            }
        }).catch((error)=>{
            console.log(error);
            setSubscribedStatus(false);
    })
}