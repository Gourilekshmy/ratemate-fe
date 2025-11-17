import React, { useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeader";
import { deleteReviews, getAllUser, getReviews } from "../services/AllApi";
import { BaseUrl } from "../services/BaseUrl";
import { Link } from "react-router-dom";
import Adminside from "./components/Adminside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminReviews = () => {
  const [showReview, setShowReview] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [reviews, setReviews] = useState([]);
  const [users, SetAllUsers] = useState([]);

  useEffect(() => {
    loadReviews();
  }, [searchKey]);

  useEffect(() => {
    loadUsers();
  }, []);
  const loadReviews = async () => {
    let token = localStorage.getItem("token");

    let reqheader = { Authorization: `Bearer ${token}` };

    let apiResponse = await getReviews(reqheader, searchKey);
    setReviews(apiResponse.data);
  };

  const loadUsers = async () => {
    let token = localStorage.getItem("token");

    let reqheader = { Authorization: `Bearer ${token}` };
    let apiResponse = await getAllUser(reqheader);
    SetAllUsers(apiResponse.data);
  };

  const onDeleteClick = async (id) => {
    let token = localStorage.getItem("token");

    let reqheader = { Authorization: `Bearer ${token}` };
    let apiResponse = await deleteReviews(id, reqheader);
    if (apiResponse.status == 200) {
      alert("Successfully deleted");
      loadReviews();
    } else {
      alert("Error Occured");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_5fr]">
        {" "}
        <div >
          {" "}
          <  Adminside />
        </div>
        <div className="pt-30 ">
          <div className="flex justify-center my-5 gap-5 text-xl">
            <button
              onClick={() => setShowReview(true)}
              className="border rounded p-2 cursor-pointer"
            >
              All Books
            </button>
            <button
              onClick={() => setShowReview(false)}
              className="border rounded p-2 cursor-pointer"
            >
              All users
            </button>
          </div>
          {showReview ? (
            <div>
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                type="text"
                placeholder="Search for Reviews"
                className="border lg:mx-110 w-100 rounded p-2 text-green-900"
              />
              <div>
                {reviews?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:mx-20 my-8 mx-10">
                    {reviews?.map((eachReview) => (
                      <div className="shadow-xl/30 bg-linear-to-bl from-white to-lime-200 rounded-2xl w-80 p-5 my-5 py-5 ">
                        <div>
                          <div className="grid grid-cols-2 gap-10">
                            <div className="flex gap-3">
                              <img
                                className="w-25 mb-2"
                                src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                                alt=""
                              />
                              <h1 className="items-center mt-10">User</h1>
                            </div>
                            <div>
                              <button onClick={()=>onDeleteClick(eachReview._id)} className="rounded p-2 ms-20 text-red-500 ">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h1 className="my-3">
                              ⭐️⭐️⭐️⭐️⭐️ ({eachReview.rating}/5)
                            </h1>
                            <h1 className=" mb-3">
                              <span className="font-bold">Product:</span>{" "}
                              {eachReview.productName}
                            </h1>
                            {/* <h2 className="mb-5">"{eachReview.comment}"</h2> */}
                          </div>
                          <div>
                            <img
                              className="w-35 rounded-2xl mt-3"
                              src={`${BaseUrl}/uploads/${eachReview.uploadedImages[0]}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <Link
                          to={`/view-review/${eachReview._id}`}
                          className="font-bold  bg-green-500 rounded p-2 text-white"
                        >
                          Know More
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h1>No Reviews Found</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {users?.length > 0 ? (
                <div className="mx-6 grid gap-2 grid-cols-1 lg:grid-cols-3">
                  {users?.map((eachUser, index) => (
                    <div
                      key={index}
                      className=" bg-amber-50 border border-lime-700 rounded-xl"
                    >
                      <h2 className="text-pink-900 p-2 rounded-2xl font-bold bg-lime-100 text-xl">
                        Id : {eachUser._id}
                      </h2>
                      <hr />
                      <div className="flex">
                        <img
                          className="w-20"
                          src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-1024.png"
                          alt=""
                        />
                        <div className="mt-3 ms-4 text-xl ">
                          <h2>{eachUser.userName}</h2>
                          <h2>{eachUser.email}</h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Users Found</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReviews;
