import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateProfile } from "../services/AllApi";

const EditProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [pswd, setPswd] = useState("");
  const [repPswd, setRepPswd] = useState("");
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

 

  const handleFileChange = (file) => {
    console.log(file);
    setUserDetails({ ...userDetails, profile: file });
    let url = URL.createObjectURL(file);
    setPreview(url);
  };
  
   useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
          setId(user._id);

    }
    let token1 = localStorage.getItem("token");
    setToken(token1);
  }, []);

  const handleSave = async () => {
    if (pswd == repPswd) {
      //api
      let reqheader = {
        Authorization: `Bearer ${token}`,
      };
      if (preview) {
        //proceed as form-data

        setUserDetails({ ...userDetails, password: pswd });

        let reqbody = new FormData();
        for (let key in userDetails) {
          reqbody.append(key, userDetails[key]);
        }
        let apiResponse = await updateProfile(reqbody, reqheader, id);
        console.log(apiResponse);
      } else {
        //normal json data
        let { bio, email, password, profile, userName } = userDetails;
        let apiResponse = await updateProfile(
          { bio, email, password, profile, userName },
          reqheader,
          id
        );
        console.log(apiResponse);
      }
    } else {
      alert("Password Mismatch");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setOpenModal(true)}
          className="border border-blue-500 text-blue-500 text-xl rounded p-2 "
        >
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </button>
        <Modal
          className="w-110"
          dismissible
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="bg-green-950">
            <h1 className="text-2xl text-white">Edit Profile</h1>
          </ModalHeader>
          <ModalBody className="p-5">
            <div className="space-y-6">
              <label htmlFor="img">
                <input
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ display: "none" }}
                  accept="image/png,image/jpeg,image/jpg"
                  type="file"
                  name=""
                  id="img"
                />
                {preview ? (
                  <img className="my-2 w-50 mx-15" src={preview} />
                ) : (
                  <img
                    className=" w-50 mx-15"
                    src="https://static.vecteezy.com/system/resources/previews/008/149/271/large_2x/user-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-free-vector.jpg"
                    alt=""
                  />
                )}
              </label>

              <div className="space-y-3">
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, userName: e.target.value })
                  }
                  value={userDetails.userName}
                  className="border w-full p-2 rounded"
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  value={userDetails.email}
                  className="border w-full p-2 rounded"
                  type="text"
                  placeholder="Email Id"
                />
                <input
                  onChange={(e) => setPswd(e.target.value)}
                  value={userDetails?.password}
                  className="border w-full p-2 rounded"
                  type="password"
                  placeholder="New Password"
                />
                <input
                  onChange={(e) => setRepPswd(e.target.value)}
                  value={userDetails?.password}
                  className="border w-full p-2 rounded"
                  type="password"
                  placeholder="Repeat New Password"
                />
                <textarea
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, bio: e.target.value })
                  }
                  value={userDetails.bio}
                  className="border w-full p-2 rounded"
                  placeholder="Bio"
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className=" flex justify-center gap-3 py-5">
            <Button
              className="rounded p-2 bg-green-500 text-white"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              className="rounded p-2 bg-red-500 text-white"
              onClick={() => setOpenModal(false)}
            >
              Decline
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default EditProfile;
