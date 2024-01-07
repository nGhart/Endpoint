

import { Home,Landing, Login, Register, UserPage } from "./page"
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {
  const router=createBrowserRouter([
   {
    path:'/',
    element:<Home/>,
    children:[
      {index:true, element:<Landing/>},
      {
        path: 'register',
        element:<Register/>
      },
      {path:"login",
    element:<Login/>},
    {path:"userpage",
  element:<UserPage/>}
    ]
   }

  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App