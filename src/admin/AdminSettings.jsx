import React, { useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeader";
import Adminside from "./components/Adminside";
import { updateProfile } from "../services/AllApi";


const AdminSettings = () => {

  let user = localStorage.getItem("user");

  let userDetails = JSON.parse(user);
  const [preview, setPreview] = useState("");
  const[id,setId]=useState("")
  
  useEffect(()=>{
    setId(userDetails._id)
  },[])

  const [profileData, setProfileData] = useState({
    userName: userDetails.userName,
    password: userDetails.password,
    cnfPassword: userDetails.password,
    email: userDetails.email,
    profile: userDetails.profile,
    bio: userDetails.bio,
  });

  const onResetClick = () => {
    setProfileData({
      userName: "",
      password: "",
      cnfPassword: "",
      email: userDetails.email,
      profile: "",
      bio: userDetails.bio,
    });
  };

  const handleFileChange = (file) => {
    console.log(file);

    setPreview(URL.createObjectURL(file));

    setProfileData({...profileData,profile:file})
  };
console.log(profileData);
 const onUpdate = async () => {
    let reqbody = new FormData();

    reqbody.append("userName", profileData.userName);
    reqbody.append("email", profileData.email);
    reqbody.append("password", profileData.password);
    reqbody.append("profile", profileData.profile);
    reqbody.append("bio", profileData.bio);

    if (
      profileData.userName == "" ||
      profileData.password == "" ||
      profileData.cnfPassword == ""
    ) {
      alert("Please Fill The Form");
    } else {
      //api calling
      if (profileData.password == profileData.cnfPassword) {
        //proceed to api

        let token = localStorage.getItem("token");

        let reqHeader = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        let apiResponse = await updateProfile(
          reqbody,
          reqHeader,
          id
        );
        if(apiResponse.status==200){
          localStorage.setItem('user',JSON.stringify(apiResponse.data))
          alert("Successfuly Updated")
        }else{
          alert(apiResponse.data.message)
        }
      } else {
        alert("Password Mismatched");
      }
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_5fr]">
        <Adminside />
        <div>
          <h1 className="text-center pt-25 text-2xl">Settings</h1>

          <div className="grid grid-cols-2">
            <div className="mx-8 mt-15">
              <p className="my-6 text-justify">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                sapiente rem excepturi, ex optio neque pariatur illo nulla
                obcaecati enim maxime reiciendis voluptatum ea, necessitatibus
                numquam dignissimos fugiat quae quasi. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Tempore libero fugit
                architecto quia deserunt labore nihil, tenetur maiores, aperiam
                corrupti ab dolores molestiae quae totam aut natus? Alias,
                obcaecati ullam.
              </p>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae suscipit, corrupti accusamus autem repellendus a nam
                cumque aperiam laudantium sapiente, blanditiis incidunt
                perferendis sit similique. Impedit mollitia quam facilis soluta.
              </p>
            </div>
            <div className="bg-green-600 rounded-2xl mx-15 mt-7 py-5 ">
              <div>
                <label className="px-50" htmlFor="inp">
                  <input
                    className="text-transparent"
                    type="file"
                    id="inp"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  {preview ? (
                    <img className="px-50" src={preview} alt="" />
                  ) : (
                    <img
                      className="px-50 rounded-2xl"
                      src="https://tse2.mm.bing.net/th/id/OIP.aiDGdmdUAX_iNgRMERipyQHaHF?pid=Api&P=0&h=180"
                      alt=""
                    />
                  )}
                </label>
              </div>
              <div className="p-2 ms-7">
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, userName: e.target.value })
                  }
                  value={profileData.userName}
                  className="bg-white my-2 p-2 w-full"
                  type="text"
                  placeholder="UserName"
                />
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  value={profileData.password}
                  className="bg-white my-2 p-2 w-full"
                  type="password"
                  placeholder="Password"
                />
                <input
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      cnfPassword: e.target.value,
                    })
                  }
                  value={profileData.cnfPassword}
                  className="bg-white mt-2 p-2 w-full"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onResetClick}
                  className="p-3 rounded m-2 bg-red-800 text-white hover:bg-amber-600"
                >
                  Reset
                </button>
                <button
                  onClick={onUpdate}
                  className="p-3 rounded m-2 bg-blue-600 text-white hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
