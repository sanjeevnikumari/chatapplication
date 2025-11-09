import React,{useEffect} from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { USER_API_BASE_URL } from '../utils/constant';
const useGetOtherUsers = () => {
        const dispatch = useDispatch();

 useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${USER_API_BASE_URL}`);
                // store
               // console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers
