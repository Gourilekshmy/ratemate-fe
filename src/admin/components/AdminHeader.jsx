import React from "react";
import { Link } from "react-router-dom";


const AdminHeader = () => {
  return (
    <>
      <div className="flex justify-between px-10 bg-green-800 fixed w-full z-50 text-white">
        <div className="flex items-center gap-2 ">
          <img
            className="w-20 -pt-5 "
            src="./src/assets/golden-star_259293-2443-removebg-preview.png"
            alt="RateMate Logo"
          />
          <Link to={'/'} className="text-3xl name font-bold">RateMate</Link>
        </div>
        <div>
          <button className="text-white mt-5 border border-white rounded-xl p-2">
            LogOut
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
