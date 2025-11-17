import React from 'react'
import { Link } from 'react-router-dom'


const Adminside = () => {
  return (
    <>
    <div className=" h-200  py-40" >
        <div className="mx-10 p-4">
          <img
          className='rounded-full'
            src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
            alt=""
          />

          <h2 className="my-3 text-xl text-white text-center">User Name</h2>

          <ul className="mt-10 ">
            <li>
              <Link to={"/admin-home"} className="text-green-700 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/admin-review"} className="text-green-700 cursor-pointer">
                All Reviews/Users
              </Link>
            </li>
            <li className="text-green-700 cursor-pointer">
              <Link to={"/admin-settings"}>Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Adminside