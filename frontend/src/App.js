import Signup from './components/Signup';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])



function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
   <RouterProvider router={router}/>
    </div>
  );
}

export default App;
