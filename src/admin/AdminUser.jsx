import React, { useEffect, useState } from "react";
import { getAllUser } from "../services/AllApi";
import Adminside from "./components/Adminside";
import AdminHeader from "./components/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export const AdminUser = () => {
  const [users, SetAllUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let token = localStorage.getItem("token");

    let reqheader = { Authorization: `Bearer ${token}` };
    let apiResponse = await getAllUser(reqheader);
    SetAllUsers(apiResponse.data);
  };
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr] pt-10">
        <div>
          <Adminside />
        </div>
        <div className="pt-15">
          <h1 className="text-center py-10 text-2xl font-bold text-green-700">
            RateMate Users
          </h1>
          {users?.length > 0 ? (
            <div className="mx-6">
              <div className="grid grid-cols-3 text-xl font-bold lg:text-center">
                <h1>UserId</h1>
                <h2>Name</h2>
                <h3>email</h3>
              </div>
              {users?.map((eachUser, index) => (
                <div key={index} className="space-y-3">
                  <div className="grid grid-cols-3">
                    <div className="md:flex">
                      <h1 className="mt-5">{index + 1}.</h1>
                      <img
                        className="w-20"
                        src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-1024.png"
                        alt=""
                      />

                      <h2 className="text-amber-600 rounded-2xl mt-7 font-bold  text-xl">
                        Id : {eachUser._id}
                      </h2>
                    </div>

                    <h2 className="lg:text-center mt-7">{eachUser.userName}</h2>
                    <h2 className="lg:text-center mt-7">{eachUser.email}</h2>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <h1>No Users Found</h1>
          )}
        </div>
      </div>
    </>
  );
};
