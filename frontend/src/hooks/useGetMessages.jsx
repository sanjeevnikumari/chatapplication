import React, { useEffect } from 'react'
import axios from "axios";
 import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '..';
import { MESS_API_BASE_URL } from '../utils/constant';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
  if (!selectedUser?._id) return; // prevent fetching if no user selected

  const fetchMessages = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${MESS_API_BASE_URL}/${selectedUser._id}`);
      //console.log(res); // check console
     dispatch(setMessages(res.data))

    } catch (error) {
      console.log(error);
    }
  }

  fetchMessages();
}, [selectedUser?._id]);

}

export default useGetMessages