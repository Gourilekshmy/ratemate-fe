import { createContext, useState } from "react";


export const AuthContext=createContext()


export const AuthProvider=({children})=>{
    const[token,setToken]=useState(localStorage.getItem('token'))

    const saveToken=(newToken)=>{
        setToken(newToken)
        localStorage.setItem('token',newToken)
    }
    const logoutUser=()=>{
        setToken(null)
        localStorage.clear()
    }

    return(
        <AuthContext.Provider value={{token,saveToken,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}