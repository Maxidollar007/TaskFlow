import { LIGHT } from "../js/theme";

export function reducerThemeChange(theme,action){
    const {type}=action
    switch(type){
        case LIGHT:
            return theme ==="light" ? "dark" :"light"
        default:
            return !theme
    }
    
    

}