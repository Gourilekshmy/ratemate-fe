import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import {
  faBars,
  faXmark,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { getCompanies } from "../services/AllApi";
import { BaseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthContext";

const Reviewpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [duplicateReviews, setDuplicatedReviews] = useState([]);
  const [company, setCompany] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const [searchKey, setSearchKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [logout, setLogout] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, [logout]);

  useEffect(() => {
    getAllComp();
  }, [searchKey]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUserDetails(user);
  }, []);

  const onLogoutClick = () => {
    logoutUser();
    setLogout(true);
    navigate("/");
  };

  let token = localStorage.getItem("token");

  const getAllComp = async (search) => {
    try {
      let reqHeader = { Authorization: `Bearer ${token}` };

      let apiResponse;
      if (search) {
        apiResponse = await getCompanies(reqHeader, searchKey);
        setIsSearching(true);
      } else {
        apiResponse = await getCompanies(reqHeader, "");
        setIsSearching(false);
      }
      let data = apiResponse.data;
      setReviews(data);
      setDuplicatedReviews(data);

      let companies = [];

      data.forEach((eachR) => {
        if (!companies.includes(eachR.company)) {
          companies.push(eachR.company);
        }
      });

      setCompany(companies);

      console.log(companies);
    } catch (error) {
      console.log(error);
    }

    const filtercomp = (cat) => {
      let filtered = duplicateReviews.filter((eachR) => eachR.company == cat);
      console.log(filtered);

      setReviews(filtered);
    };
  };
  return (
    <>
      <div>
        <nav className="bg-green-800 fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row */}
            <div className="flex justify-between items-center text-white py-3">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img
                  className="w-16"
                  src="./src/assets/golden-star_259293-2443-removebg-preview.png"
                  alt="RateMate Logo"
                />
                <h2 className="text-2xl name font-bold">RateMate</h2>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                <ul className="flex gap-10 text-white">
                  <li>
                    {isLoggedin ? <Link to="/allReview">All Reviews</Link> : ""}{" "}
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                </ul>

                <Link to="/help">Help</Link>

                <Link to="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>

                {isLoggedin ? (
                  <div className="relative group">
                    <img
                      className="rounded-full w-10 absolute cursor-pointer"
                      src="https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
                      alt="Profile"
                    />

                    <Dropdown
                      label="Options"
                      dismissOnClick={false}
                      className="text-transparent"
                    >
                      <DropdownItem>
                        <Link to="/profile" className="text-gray-600">
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem className="text-gray-600">
                        Logout
                      </DropdownItem>
                    </Dropdown>
                  </div>
                ) : (
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white"
              >
                <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden flex flex-col gap-4 pb-4 border-t border-green-700 pt-4 text-white">
                <Link to="/allReview" onClick={() => setIsOpen(false)}>
                  All Reviews
                </Link>
                <Link to="/categories" onClick={() => setIsOpen(false)}>
                  Categories
                </Link>
                <Link to="/help" onClick={() => setIsOpen(false)}>
                  Help
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon icon={faHouse} />
                </Link>

                {isLoggedin ? (
                  <div className="relative group">
                    <img
                      className="rounded-full w-10 absolute cursor-pointer"
                      src="https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
                      alt="Profile"
                    />
                    <Dropdown
                      label="Options"
                      dismissOnClick={false}
                      className="text-transparent"
                    >
                      <DropdownItem>
                        <Link to="/profile" className="text-black">
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <button onClick={onLogoutClick} className="text-black">
                          Logout
                        </button>
                      </DropdownItem>
                    </Dropdown>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
        {isLoggedin ? (
          <div
            id="review"
            className="text-center grid grid-cols-[3fr_2fr_3fr] "
          >
            <div></div>
            <div className="align text-center pt-63">
              <h2 className="mt-3 text-3xl font-bold  ">
                Discover,Read and Write Reviews
              </h2>
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                className="form-control text-2xl flex justify-center border-amber-50 h-15 shadow-xl/20 p-2 rounded-4xl bg-white mt-5 "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "600px",
                }}
                type="text"
                placeholder="  Search a Company or brand... "
              />
              <FontAwesomeIcon
                onClick={getAllComp}
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
      {!isSearching && isLoggedin ? (
        <div className="text-center mt-15 mb-10">
          <h1 className="text-2xl">Can't Find a Company ?</h1>
          <h2 className="text-xl my-3">
            It might not be listed on RateMate yet. Add it and be the first to
            write a review.
          </h2>
          <Link
            to={"/profile"}
            className="text-green-600 p-2 bg-white border rounded-4xl "
          >
            Add Company
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:mx-20 my-8 mx-10">
            {reviews?.map((eachReview) => (
              <div id="card" className="shadow-xl/30 rounded-2xl w-100 p-5 my-5 py-5 ">
                <div>
                  <div></div>
                  <div className="flex gap-5">
                    <img
                      className="w-25 mb-2 block"
                      src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                      alt=""
                    />
                    <h1 className="items-center mt-10">
                      {eachReview.userMail}
                    </h1>
                  </div>
                  <div></div>
                </div>
                <hr />

                <div className="grid gap-3">
                  <div>
                    <h1 className="my-3">
                      ⭐️⭐️⭐️⭐️⭐️ ({eachReview.rating}/5)
                    </h1>
                    <h2 className="font-bold my-2">{eachReview.company}</h2>
                    <h1 className=" mb-3">
                      <span className="font-bold">Product:</span>{" "}
                      {eachReview.productName}
                    </h1>
                    {/* <h2 className="mb-5">"{eachReview.comment}"</h2> */}
                  </div>
                  {/* <div>
                    <img
                      className="w-35 rounded-2xl mt-3"
                      src={`${BaseUrl}/uploads/${eachReview.uploadedImages[0]}`}
                      alt=""
                    />
                  </div> */}
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
        </div>
      )}
    </>
  );
};

export default Reviewpage;
