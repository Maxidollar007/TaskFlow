import { createContext, useContext, useReducer, useState } from "react";
import { reducerThemeChange } from "../reducer/reducerTheme";
import { LIGHT } from "../js/theme";

const themeContext=createContext()

export function ThemeContextProvider({children}){
    const [theme,dispatchTheme]=useReducer(reducerThemeChange,'light')
    const toogleTheme=()=>{
        dispatchTheme({
            type: LIGHT,
        })
    }
    const utilities={
        toogleTheme,
        theme
    }
    return <themeContext.Provider value={utilities}>
        {children}

    </themeContext.Provider>
}

export function useTheme(){
    const theme=useContext(themeContext)
    if(!theme){
        console.error("Not theme Consumer")
    }else{
        return theme
    }
}