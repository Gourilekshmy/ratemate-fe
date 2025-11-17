import { faBars, faXmark, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [logout, setLogout] = useState(false);
    const { logoutUser } = useContext(AuthContext);


  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    } else {
      setUserDetails({});
    }
  }, [logout]);

  const onLogoutClick = () => {
    logoutUser();
    setLogout(true);
    navigate("/");
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
                    <Link to="/review">Write A Review</Link>
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
                      <DropdownItem onClick={onLogoutClick} className="text-gray-600">
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
                <Link to="/review" onClick={() => setIsOpen(false)}>
                  Write A Review
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
      </div>
    </>
  );
};

export default Header;
