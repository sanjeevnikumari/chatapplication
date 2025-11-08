import Signup from './components/Signup';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { io } from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';




import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/Signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])



function App() {
 // const[socket,setsocket]=useState(null);
  const {authUser}=useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(authUser){
      const socket=io(`http://localhost:8000/`,{
        query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socket));
       socket?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    }
     
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])











  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
   <RouterProvider router={router}/>
    </div>
  );
}

export default App;
