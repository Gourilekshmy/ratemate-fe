import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "../services/AllApi";
import Header from "../components/Header";

const Categories = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [category, setCategory] = useState([]);
  const [review, setReview] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [duplicateReviews, setDuplicateReviews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedin(true);
      getAllCategories();
    }
  }, [searchKey]);

  const getAllCategories = async () => {
    try {
      let token = localStorage.getItem("token");
      let reqheader = { Authorization: `Bearer ${token}` };

      let apiResponse;

      // let apiResponse = await getCategories(reqheader);

      if (searchKey.trim() == "") {
        apiResponse = await getCategories(reqheader);

        setIsSearching(false);
      } else {
        apiResponse = await getCategories(reqheader, searchKey);

        setIsSearching(true);
      }
      let data = apiResponse.data;

      setReview(data);
      setDuplicateReviews(data);

      if (searchKey.trim() === "") {
        let categories = [];

        data.forEach((eachReview) => {
          if (!categories.includes(eachReview.category)) {
            categories.push(eachReview.category);
          }
        });
        setCategory(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterReviews = (cat) => {
    let filteredReviews = duplicateReviews.filter(
      (eachReview) => eachReview.category == cat
    );
    setReview(filteredReviews);
  };

  return (
    <>
      <Header />
      <div>
        {isLoggedin ? (
          <div>
            <div id="cat" className=" h-100">
              <div className="text-center grid grid-cols-[3fr_2fr_3fr] ">
                <div></div>
                <div className="align text-center pt-40">
                  {/* <h1 className="text-4xl text-white pt-30">Wonderful Gifts</h1> */}

                  <input
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="form-control flex justify-center border-amber-50 h-15 shadow-xl/20 p-2  rounded-4xl bg-white mt-5 "
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "600px",
                    }}
                    type="text"
                    placeholder="  Search Category... "
                  />
                  <FontAwesomeIcon
                    onClick={getAllCategories}
                    style={{
                      position: "absolute",
                      marginTop: "-39px",
                      marginLeft: "250px",
                    }}
                    className="text-xl text-blue-800"
                    icon={faMagnifyingGlass}
                  />
                </div>
              </div>
            </div>
            {!isSearching ? (
              <div>
                <div className="my-20 mx-20 gap-8 grid md:grid-cols-2 lg:grid-cols-4">
                  {category?.map((eachCat, index) => (
                    <div>
                      <div id="card" className="border rounded-xl" key={index}>
                        <h1 className="text-2xl text-center rounded-xl  p-2">
                          {eachCat}
                        </h1>
                        <hr />
                        <ul className="text-xl mx-10 my-5">
                          {review
                            .filter((eachR) => eachR.category == eachCat)
                            .map((eachR, i) => (
                              <Link className="block my-3" key={i}>
                                {eachR.productName}
                              </Link>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <div className="grid  grid-cols-1  lg:grid-cols-3 gap-4 mx-50 mt-20 ">
                  {review?.map((eachReview) => (
                    <div className="shadow-xl/30 bg-linear-to-bl from-gray-300 to-white rounded-2xl w-70 p-5 pb-10 my-5 text-center">
                      <div className="grid grid-cols-3">
                        <div></div>
                        <div>
                          <img
                            className="w-25 mb-5 block"
                            src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                            alt=""
                          />
                        </div>
                        <div></div>
                      </div>
                      <hr />
                      <h1 className="my-3">
                        ⭐️⭐️⭐️⭐️⭐️ ({eachReview.rating}/5)
                      </h1>
                      <h2 className="mb-5">“{eachReview.comment}”</h2>
                      <Link
                        to={`/view-review/${eachReview._id}`}
                        className="font-bold  bg-green-500 rounded p-2 text-white"
                      >
                        Know More
                      </Link>
                    </div>
                  ))}
                  <div></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-30 grid grid-cols-3">
            <div></div>
            <Link to={"/login"}>
              <img
                src="https://cdnl.iconscout.com/lottie/premium/thumb/account-login-9631529-7874172.gif"
                alt=""
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
