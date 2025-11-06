import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const signup = () => {
  return (
    <div className="min-w-96 mx-auto">
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center text-white '>signup</h1>
      <form action="">
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>fullname</span>
          </label>
          <input className='w-full input input-bordered h-10'
           type="text" placeholder='suhani'/>
        </div>
         <div>
          <label className='label p-2'>
            <span className='text-base label-text'>username</span>
          </label>
          <input className='w-full input input-bordered h-10'
           type="text" placeholder='username'/>
        </div>
         <div>
          <label className='label p-2'>
            <span className='text-base label-text'>password</span>
          </label>
          <input className='w-full input input-bordered h-10'
           type="password" placeholder='password'/>
        </div>
         <div>
          <label className='label p-2'>
            <span className='text-base label-text'>confirmpassword</span>
          </label>
          <input className='w-full input input-bordered h-10'
           type="password" placeholder='confirmpassword'/>
        </div>
        <div className='flex items-center my-4'>
        <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                //checked={user.gender === "male"}
                //onChange={() => handleCheckbox("male")}
               // defaultChecked
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                //checked={user.gender === "female"}
                //onChange={() => handleCheckbox("female")}
//defaultChecked
                className="checkbox mx-2" />
            </div>
            </div>
             <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
              <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
      </form>
    </div>
    </div>
   
  )
}

export default signup
