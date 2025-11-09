import React , { useState }from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
//import OtherUser from './OtherUser';
import OtherUsers from './OtherUsers';
import { setMessages } from '../redux/messageSlice';

import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } from '../redux/userSlice';
//import { setMessages } from '../redux/messageSlice';
import { setSocket } from '../redux/socketSlice'; 
import { USER_API_BASE_URL } from '../utils/constant';




const Sidebar = () => {
        const {otherUsers} = useSelector(store=>store.user);
          const { socket } = useSelector(store => store.socket || {}); // ✅ safely get socket if exists

                    const dispatch = useDispatch();


        const [search, setSearch] = useState("");


     const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
             if (socket) {
        socket.disconnect();
        console.log("🔌 Socket disconnected from client side");
        dispatch(setSocket(null));
         }
            const res = await axios.get(`${USER_API_BASE_URL}/logout`);
            
            
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
            dispatch(setOnlineUsers([]));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
   return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                   value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 
            <OtherUsers/> 
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm bg-slate-200'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar
