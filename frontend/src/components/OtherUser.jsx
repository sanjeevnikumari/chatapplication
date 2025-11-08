import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);

  // Debug logs
  console.log("All online users from Redux:", onlineUsers);
  console.log("Current user ID:", user._id);

  // Ensure comparison as string
  const isOnline = onlineUsers?.map(id => id.toString()).includes(user._id.toString());
  console.log(`Is user ${user._id} online?`, isOnline);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`flex gap-2 items-center p-2 cursor-pointer rounded
          ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'}
          hover:bg-zinc-200 hover:text-black
        `}
      >
        {/* Avatar with green dot */}
        <div className="relative w-12 h-12">
          <img
            src={user?.profilePhoto}
            alt="user-profile"
            className="w-12 h-12 rounded-full"
          />
          {isOnline && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
          )}
        </div>

        {/* User info */}
        <div className="flex flex-col flex-1">
          <p>{user?.fullName}</p>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1'></div>
    </>
  );
};

export default OtherUser;
