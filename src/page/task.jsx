import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { useTheme } from '../context/themeContext'
import { useTasks } from '../context/taskContext'
import { validationTaskScheme } from '../validation/validationTask'
import { dateActually, dateMinuSeven, datePluSeven } from '../js/date'
export function TaskManagement(){

    const [sidebar,setSidebar]=useState(false)
    const [viewTask,setViewTask]=useState(false)
    const [loading,setLoading]=useState(false)
    const handleViewTask=()=>{
        setViewTask(!viewTask)
    }
    const handleSlidebar=()=>{
        setSidebar(!sidebar)
    }
         console.log(sidebar);
    const utilities=useTheme()
    const utility=useTasks()
    const {tasks,
        handleAddTasks,
        handleFavorite,
        handleDeteleTask,
        handleEditTask
        }=utility
    const {theme,toogleTheme}=utilities  
    const [formdata,setFormdata]=useState({
        task:'',
        date:'',
        favorite:false
    })
    const [errors,setErrors]=useState(null)
    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            await validationTaskScheme.validate(formdata,{abortEarly:false})
            if(formdata.id){
                handleEditTask(formdata.id,formdata.task,formdata.date,formdata.favorite)
                            setViewTask(true)
            }else{
               handleAddTasks(formdata.task,formdata.date,formdata.favorite)
                           setViewTask(true)
            }
            setFormdata({
                task:"",
                date:"",
                favorite:false
            })
        }catch(e){
            console.log(e);
            const newErrors={}
            e.inner?.forEach(err=>{
            newErrors[err.path]=err.message
                
            })
            setErrors(newErrors)
        }finally{
            setLoading(false)
        }
    }
    
    const handleSelectedTasks=(id)=>{
        setViewTask(false)
        const dataEdit=tasks?.filter(t=>t.id==id)
        setFormdata({
            id:dataEdit[0]?.id || '',
            task:dataEdit[0]?.name || '',
            date:dataEdit[0]?.date || ''
        })
        console.log("Donnée recupérée",formdata)
    }
    const [sidebarActive,setSidebarActive]=useState("Acceuil")
    const siderbar=[
        {
            id:1,
            description:"Acceuil",
            icone:<i class="ri-home-4-line"></i>
        },
        {
            id:2,
            description:"Aujourd'hui",
            icone:<i class="ri-sun-line"></i>
        },
        {
            id:3,
            description:"Semaine",
            icone:<i class="ri-attachment-line"></i>
        },
        {
            id:4,
            description:"Important",
            icone:<i class="ri-sun-line"></i>
        }
    ]    
    
    const handleSidebar=(sider)=>{
        switch(sider){
            case "Acceuil":
                setSidebarActive("Acceuil")
                 setSidebar(false)
                break;
            case "Semaine":
                setSidebarActive("Semaine")
                 setSidebar(false)
                break;
            case "Aujourd'hui":
                setSidebarActive("Aujourd'hui")
                setSidebar(false)
                break;
            case "Important":
                setSidebarActive("Important")
                 setSidebar(false)
        }
    }

    return <>
        <div className="min-h-screen overflow-hidden  ">
            
                <div className={`  ${theme==='light' ? 'bg-linear-to-r text-white  from-cyan-500 to-green-500 shadow-black' : 'bg-linear-to-r text-white from-cyan-800 to-green-700 shadow-white' } shadow-md   flex justify-between transition-all duration-1000 items-center p-4`}>
                    <div className=" h-full text-2xl font-serif">
                        TaskFlow 
                    </div>
                    <div>
                        {theme === "light " ? <i class="ri-sun-line text-2xl transition-all duration-700 text-white font-serif hover:cursor-pointer " onClick={toogleTheme}></i> : <i class="ri-moon-line transition-all duration-700 hover:cursor-pointer  text-2xl text-white font-serif" onClick={toogleTheme}></i>}
                    </div>
                </div>
                <div>
                    <div className="w-full  flex min-h-[calc(100vh-64px)] relative  ">
                        <div className ={` ${theme==="light" ? 'bg-white  shadow-black/20' : 'bg-gray-800 text-gray-400 shadow-white'}  
                                            ${sidebar ? ' fixed inset-0 left-0 right-0 backdrop-blur-2xl shrink-0 flex-1 sm:absolute  ' 
                                                : ' fixed  left-0 right-0 backdrop-blur-2xl overflow-x-hidden  shrink-0 flex-1 min-w-1/15 max-w-1/15 sm:relative sm:min-w-1/40 sm:max-w-1/40  md:min-w-1/65 md:max-w-1/65 ' } 
                                             overflow-hidden shadow-md shadow-black transition-all duration-1000 flex flex-col justify-between
                                             `} >
                            <div>
                                {
                                    sidebar ? (
                                        <h2 className={`${theme==="light" ? 'text-black ' : 'text-white'}  flex justify-between items-center font-bold text-2xl tracking-widest p-2 font-serif`} onClick={handleSlidebar}><span>TaskFlow</span> <i class="ri-arrow-left-s-line text-md font-normal"></i> </h2>
                                    ):
                                    <i class="ri-arrow-right-s-line text-md p-2  mt-4 hover:cursor-pointer flex-nowrap shrink-0" onClick={handleSlidebar}></i>
                                }
                                <ul className="mt-2 flex flex-col items-start font-serif ">
                                    {
                                        siderbar?.map(side=>(
                                            <li key={side.id} onClick={()=>handleSidebar(side.description)}   className={`flex ${sidebarActive===side.description ? 'border-l-4 bg-slate-100 border-green-500/50 rounded-l-sm' :'' }  justify-between hover:cursor-pointer py-2 px-1  items-center  w-full mt-2 ${
                                                theme==="light" ? ' hover:bg-gray-200 transition-all duration-1000' :
                                                'text-gray-400 hover:bg-gray-600 transition-all duration-1000'
                                                }`} >
                                                <span className='flex-nowrap shrink-0'> {side.icone} {side.description} </span>
                                            </li>
                                        ))
                                    }
                                </ul>   
                            </div>
                        </div>

                        {
                            sidebarActive=="Acceuil" && (
                            <div className={ `flex flex-col-reverse justify-center p-4 gap-4 items-center font-serif w-full 
                            ${theme==='light'? 'bg-slate-200 transition-all duration-1000' :'bg-gray-800 text-gray-400 transition-all duration-1000' }`}>
                            
                            {
                                viewTask==true && 
                                <div className={`shadow-md p-4 w-full md:w-1/2   max-h-116.5 overflow-y-scroll 
                                ${theme==="light" ? 'bg-white  shadow-gray-500  ' : 'bg-gray-800 shadow-white border-2' } ` }>
                                {tasks?.length > 0 ?
                                <div>
                                    <div className='flex items-center text-sm justify-between font-bold border-b border-black'>
                                        <div className='mb-2 '>
                                            Nom de la tâche
                                        </div>
                                        <div className='mb-2 '>
                                            Date 
                                        </div>
                                        <div className='mb-2 '>
                                            Editer
                                        </div>
                                        <div className='mb-2 '>
                                            Supprimer
                                        </div>
                                    </div>
                                    {tasks?.map(tas=>
                                        <div key={tas.id} className='flex items-center p-2 justify-between font-bold border-b border-black'>
                                            <div className='mb-2 ' >
                                              {tas.favorite ? <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer text-amber-300"></i> : <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer"></i> }  {tas.name}
                                            </div>
                                            <div className='mb-2 '>
                                                {tas.date}
                                            </div>
                                               <div>
                                                 <i class="ri-edit-box-line text-blue-500 hover:cursor-pointer rounded-md" onClick={()=>handleSelectedTasks(tas.id)}></i>
                                               </div>
                                               <div>
                                                <i class="ri-delete-bin-line  text-red-500 hover:cursor-pointer rounded-md" onClick={()=>handleDeteleTask(tas.id)}></i>
                                               </div>

                                        </div>
                                    )}
                                     <h2 onClick={handleViewTask} className='text-center hover:cursor-pointer mt-2 text-sm hover: underline'>Nouvelle tache</h2>
                                </div> 
                                :
                                <div className='min-h-60 flex items-center justify-center '>
                                     <h2 onClick={handleViewTask} className='text-center hover:cursor-pointer mt-2 text-sm hover: underline'>Nouvelle tâche</h2>
                                </div>
                                

                                }
                                
                           </div>
                            }
                            
                            {
                                viewTask==false && <form action="" className={`w-full md:w-1/2 max-h-116.5 flex flex-col  shadow-lg p-4
                                ${theme==="light" ? 'bg-white  shadow-gray-400 transition-all duration-1000' : 'bg-gray-8 shadow-white border-2  transition-all duration-1000' }
                            `}>
                                <h2 className='text-2xl font-bold text-center my-4'>Tache</h2>
                                <div className='flex flex-col mt-4'>
                                    <input type="text" className='w-full p-2 mt-2 rounded-md border-2' onChange={handleChange} value={formdata.task} name='task' placeholder='Entrez vos tache' />
                                        {errors && errors.task && <p className='text-red-500' > {errors.task} </p> }
                                    <input type="date"  className='w-full p-2 mt-2 rounded-md border-2' onChange={handleChange} name='date' value={formdata.date}/>
                                        {errors && errors.date && <p className='text-red-500' > {errors.date} </p> }
                                </div> 
                                {
                                    loading ? <div class="p-3 flex justify-center mt-2 items-center animate-spin drop-shadow-2xl bg-linear-to-bl from-cyan-500 via-blue-500 to-green-500 md:w-4 md:h-4 h-4 w-4 aspect-square rounded-full">
                                    <div class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
                                </div> :
                                <button onClick={handleSubmit} className='flex items-center mt-2 p-2 text-lg  rounded-md justify-center bg-linear-to-r text-white hover:cursor-pointer hover:bg-green-300 transition-all duration-1000 from-cyan-500 to-green-500/50'>
                                    <i class="ri-sticky-note-add-line"></i> {formdata.id ? "Modifier la tache" : "Ajouter une tâche"} 
                                </button>
                                }
                                
                                <h2 onClick={handleViewTask} className='text-center hover:cursor-pointer mt-2 text-sm hover: underline'>Voir Tache</h2>
                            </form>
                            }
                        </div>
                            )
                        }
                        {
                            sidebarActive ==="Semaine" && (
                                <div className={ `flex flex-col justify-center text-sm p-2 sm:flex-row sm:justify-around items-center font-serif w-full 
                            ${theme==='light'? 'bg-slate-200 transition-all duration-1000' :'bg-gray-800 text-gray-400 transition-all duration-1000' }`}>
                                <h2 className='text-center text-sm md:text-2xl my-4  text-black'> Tache du {dateActually.toLocaleDateString()} au {datePluSeven.toLocaleDateString()} </h2>
                           <div className={`shadow-md p-4 w-full md:w-1/2 max-h-116.5  overflow-y-scroll 
                            ${theme==="light" ? 'bg-white  shadow-gray-500  ' : 'bg-gray-800 shadow-white border-2' } ` }>
                                {tasks?.filter(t=>t.date >= dateActually.toLocaleDateString() && t.date <= datePluSeven.toLocaleDateString())?.length > 0 ?
                                <div>
                                    <div className='flex items-center justify-evenly font-bold border-b border-black'>
                                        <div className='mb-2 '>
                                            Nom de la tâche
                                        </div>
                                        <div className='mb-2 '>
                                            Date 
                                        </div>
                                    </div>
                                    {tasks?.filter(t=>t.date >= dateActually.toLocaleDateString() && t.date <= datePluSeven.toLocaleDateString())?.map(tas=>
                                        <div key={tas.id} className='flex items-center p-2 justify-evenly font-bold border-b border-black'>
                                            <div className='mb-2 '>
                                              {tas.favorite ? <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer text-amber-300"></i> : <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer"></i> }  {tas.name}
                                            </div>
                                            <div className='mb-2 '>
                                                {tas.date}
                                            </div>
                                        </div>
                                    )}
                                </div> 
                                :
                                <div className='min-h-60 flex items-center justify-center '>
                                    Aucune tâche entre {dateActually.toLocaleDateString()} et {datePluSeven.toLocaleDateString()} 
                                </div>
                                }
                                
                           </div>
                        </div>
                                
                            )
                        }

                        {
                            sidebarActive==="Aujourd'hui" && (
                            <div className={ `flex flex-col justify-center text-sm sm:flex-row p-2 sm:justify-around items-center font-serif w-full 
                            ${theme==='light'? 'bg-slate-200 transition-all duration-1000' :'bg-gray-800 text-gray-400 transition-all duration-1000' }`}>
                                <h2 className='text-center text-sm sm:text-2xl my-4 text-black'>Tache journalière {new Date().toLocaleDateString() } </h2>
                           <div className={`shadow-md p-4 w-full md:w-1/2 max-h-116.5 overflow-y-scroll 
                            ${theme==="light" ? 'bg-white  shadow-gray-500  ' : 'bg-gray-800 shadow-white border-2' } ` }>
                                {tasks?.length > 0 ?
                                <div>
                                    <div className='flex items-center justify-evenly font-bold border-b border-black'>
                                        <div className='mb-2 '>
                                            Nom de la tâche
                                        </div>
                                        <div className='mb-2 '>
                                            Date 
                                        </div>
                                    </div>
                                    {tasks?.map(tas=>
                                        <div key={tas.id} className='flex items-center p-2 justify-evenly font-bold border-b border-black'>
                                            <div className='mb-2 '>
                                              {tas.favorite ? <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer text-amber-300"></i> : <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer"></i> }  {tas.name}
                                            </div>
                                            <div className='mb-2 '>
                                                {tas.date}
                                            </div>
                                        </div>
                                    )}
                                </div> 
                                :
                                <div className='min-h-60 flex items-center justify-center '>
                                    Aucune Tâche
                                </div>
                                }
                                
                           </div>
                        </div>
                            )
                        }
                        {
                            sidebarActive=="Important" && (
                            <div className={ `flex justify-center  items-center p-2 sm:p-0 font-serif w-full 
                            ${theme==='light'? 'bg-slate-200 w-full transition-all duration-1000' :'bg-gray-800 text-gray-400 transition-all duration-1000' }`}>
                           <div className={`shadow-md p-4  w-full text-sm  sm:w-1/2 md:text-md max-h-116.5  overflow-y-scroll 
                            ${theme==="light" ? 'bg-white   shadow-gray-500  ' : ' bg-gray-800 shadow-white border-2' } ` }>
                                {tasks?.filter(t=>t.favorite==true)?.length > 0 ?
                                <div className=''>
                                    <div className='flex items-center justify-evenly font-bold border-b border-black'>
                                        <div className='mb-2 '>
                                            Nom de la tâche
                                        </div>
                                        <div className='mb-2 '>
                                            Date / heure
                                        </div>
                                    </div>
                                    {  tasks?.filter(t=>t.favorite==true)?.map(tas=>
                                        <div key={tas.id} className='flex items-center p-2 justify-evenly font-bold border-b border-black'>
                                            <div className='mb-2 '>
                                              {tas.favorite ? <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer text-amber-300"></i> : <i onClick={()=>handleFavorite(tas.id)} class="ri-star-line font-normal hover:cursor-pointer"></i> }  {tas.name}
                                            </div>
                                            <div className='mb-2 '>
                                                {tas.date}
                                            </div>
                                        </div>
                                    ) 
                                    }
                                </div> 
                                :
                                <div className='min-h-60 flex items-center justify-center '>
                                    Aucune Effectuée
                                </div>
                                }
                                
                           </div>
                        </div>
                            )
                        }
                    </div>
                </div>
        </div>
    </>
}