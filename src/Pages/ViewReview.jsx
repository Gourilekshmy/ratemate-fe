import React, { useEffect, useState } from "react";
import { getSingleReview } from "../services/AllApi";
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../services/BaseUrl";

const ViewReview = () => {
  const [reviewDetails, setReviewDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    }
  }, []);

  let { id } = useParams();
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let token = localStorage.getItem("token");

    let reqheader = { Authorization: `Bearer ${token}` };
    let apiResponse = await getSingleReview(id, reqheader);
    setReviewDetails(apiResponse.data);
  };
  return (
    <>
      <div>
        <div className="mx-30 my-30 border rounded-2xl ">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_2fr] py-5 rounded gap-5">
            <div>
              <h1 className="text-center font-bold text-3xl ">
                {" "}
                {reviewDetails?.productName}
              </h1>
            </div>
            <div>
              <div className="flex md:justify-center gap-2 ms-10 ">
                <h1 className="text-2xl text-black mt-2">
                  {reviewDetails?.userMail}
                </h1>
                <img
                  className="w-10 h-10"
                  src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  alt=""
                />
              </div>
              <h2 className="text-blue-500">
                Created At :{reviewDetails?.createdAt}
              </h2>
            </div>
          </div>
          <hr />
          <div className="grid lg:grid-cols-[5fr_1fr] gap-5 py-5">
            <div className="mt-5 px-20">
              <div>
                <h2 className="text-2xl text-lime-600 font-bold italic">
                  <span className="text-black">Company:</span>{" "}
                  {reviewDetails?.company}
                </h2>
              </div>
              <div className="mt-5 ">
                <h2 className="text-2xl italic">
                  Price :{" "}
                  <span className=" text-xl">₹{reviewDetails?.price}</span>
                </h2>
                <h2 className="text-2xl italic mt-5">
                  Category :{reviewDetails?.category}{" "}
                </h2>
                <h2 className="mt-5">Reviewed By :{reviewDetails?.userMail}</h2>
              </div>
              <p className="mt-5 text-2xl italic">"{reviewDetails.comment}"</p>
              <div className="flex justify-end gap-5">
                <Link
                  to={"/"}
                  className="bg-blue-600 rounded-xl text-white p-2 "
                >
                  {" "}
                  Go Back{" "}
                </Link>
              </div>
            </div>
            <div className="p-5">
              <img
                src={`${BaseUrl}/uploads/${reviewDetails?.uploadedImages?.[0]}`}
                alt="Image of Review"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReview;
