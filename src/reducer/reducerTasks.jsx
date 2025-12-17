import { useMemo } from "react"
import { storageDate } from "../js/storage"
import { ADD_TASK, EDIT_TASK, FAVORITE_TASK, REMOVE_TASK } from "../js/typeTasks"
import { object } from "yup"

export function reducerTasks(tasks,action){
    const {type,id,payload}=action
    switch(type){
        case ADD_TASK:
            storageDate([...tasks,payload])
           return [...tasks,payload]
        case FAVORITE_TASK :
            const favorites=tasks?.filter(t=>t.id===id)
            const orderFavorite=tasks?.filter(t=>t.id!==id)  
            const jean=favorites?.map(t=>{
                return {...t,favorite:!t.favorite}
            })
            storageDate([...jean,...orderFavorite])
            return  [...jean,...orderFavorite]
        case REMOVE_TASK:
            storageDate(tasks?.filter(t=>t.id!==id))
            return tasks?.filter(t=>t.id!==id)
        case EDIT_TASK :
            const userEdit=tasks?.filter(t=>t.id==payload.id)?.map(user=>{
                return {...user,name:payload.name,date:payload.date,favorite:payload.favorite}
            })
            const orderTasks=tasks?.filter(t=>t.id!==payload.id)
            storageDate([...orderTasks,...userEdit])
            return [...orderTasks,...userEdit]
        }


    }
