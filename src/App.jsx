import { createBrowserRouter, RouterProvider,Link } from "react-router-dom"
import { ThemeContextProvider } from "./context/themeContext"
import { Landing } from "./page/landing"
import { TaskManagement } from "./page/task"

const router=createBrowserRouter([
  {
    path:'/',
    element:<Landing/>
  },{
    path:'/Taches',
    element:<TaskManagement/>
  }
])

function App() {
  return <>
        <RouterProvider router={router}/>
      </>
}

export default App
