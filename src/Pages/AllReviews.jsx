import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getReviews } from "../services/AllApi";
import { BaseUrl } from "../services/BaseUrl";

const AllReviews = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
  

  const [category, setCategory] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
    getAllReviews();
  }, []);
   useEffect(() => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserDetails(user);
      }
      ;
    }, []);

  const getAllReviews = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = { Authorization: `Bearer ${token}` };
      let apiResponse = await getReviews(header);
      let data = apiResponse.data;
      setReview(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {isLoggedin ? (
        <div className="pt-25">
          <h1 className="text-3xl text-center text-green-600 font-bold">
            Reviews
          </h1>
          {review?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:mx-20 my-8 mx-10">
              {review?.map((eachReview) => (
                <div className="shadow-xl/30 bg-linear-to-bl from-gray-300 to-white rounded-2xl w-100 p-5 my-5 py-5 ">
                  <div>
                    <div></div>
                    <div className="flex gap-5">
                      <img
                        className="w-25 mb-2 block"
                        src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                        alt=""
                      />
                      <h1 className="items-center mt-10">{eachReview.userMail}</h1>
                    </div>
                    <div></div>
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
              <h1 className="text-4xl items-center text-pink-800">
                No Reviews Found
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            <img
              src="https://cdnl.iconscout.com/lottie/premium/thumb/account-login-9631529-7874172.gif"
              alt=""
            />
          </div>
          <h1 className="text-3xl">
            Please{" "}
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
            To Explore More
          </h1>
        </div>
      )}
    </>
  );
};

export default AllReviews;
