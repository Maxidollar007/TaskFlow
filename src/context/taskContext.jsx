import { createContext, useContext, useReducer } from "react";
import { reducerTasks } from "../reducer/reducerTasks";
import { v4 as uuidv4 } from 'uuid';
import { ADD_TASK, EDIT_TASK, FAVORITE_TASK, REMOVE_TASK } from "../js/typeTasks";

const taskContext=createContext([])

export function TaskContextProvider({children}){
    const [tasks,dispatchTasks]=useReducer(reducerTasks,JSON.parse(localStorage.getItem("data"))||[])
    const handleAddTasks=(name,date,favorite)=>{
        dispatchTasks({
            type:ADD_TASK,
            payload:{
                id:uuidv4(),
                name:name,
                date:date,
                favorite:favorite
            }
        })
        }

    const handleFavorite=(id)=>{
        dispatchTasks({
            type:FAVORITE_TASK,
            id:id
        })
    }

    const handleDeteleTask=(id)=>{
        dispatchTasks({
            type:REMOVE_TASK,
            id:id
        })
    }
    const handleEditTask=(id,name,date,favorite)=>{
        dispatchTasks({
            type:EDIT_TASK,
            payload:{
                id:id,
                name:name,
                date:date,
                favorite:favorite || false
            }
        })
    }


    const taskUtilities={
        handleAddTasks,
        handleFavorite,
        handleDeteleTask,
        handleEditTask,
        tasks
    }
    return <taskContext.Provider value={taskUtilities}>
                {children}
            </taskContext.Provider>
}

export function useTasks(){
    const task=useContext(taskContext)
    if(task){
        return task
    }else{
        console.error("Not consummer tasks");
    }
}


