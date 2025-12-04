import React, { use, useEffect, useState } from "react";
import Header from "../components/Header";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import {
  createReview,
  deleteReviews,
  getCategories,
  getUserReviews,
} from "../services/AllApi";
import EditProfile from "../components/EditProfile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditReview from "../components/EditReview";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [preview, setPreview] = useState("");

  const [previewList, setPreviewlist] = useState([]);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    }
    loadUserReviews();
  }, []);

  const [showReviews, SetShowReviews] = useState(true);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(rating) {
    return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
  }

  // const [value, setValue] = React.useState(0);

  const [hover, setHover] = React.useState(-1);

  const [reviewData, setReviewData] = useState({
    company: "",
    category: "",
    imageUrl: "",
    productName: "",
    price: 0,
    rating: 0,
    comment: "",
    createdAt: new Date(),
    ReviewPictures: [],
  });

  console.log(reviewData);

  const handlFileChange = (e) => {
    let imgFile = e.target.files[0];
    console.log(imgFile);
    setPreview(URL.createObjectURL(imgFile));

    setPreviewlist([...previewList, URL.createObjectURL(imgFile)]);

    let reviewImage = reviewData.ReviewPictures;
    reviewImage.push(imgFile);

    setReviewData({ ...reviewData, ReviewPictures: reviewImage });
  };
  const handleSubmit = async () => {
    const {
      company,
      category,
      imageUrl,
      productName,
      price,
      rating,
      comment,
      createdAt,
      ReviewPictures,
    } = reviewData;

    if (
      company == "" ||
      category == "" ||
      imageUrl == "" ||
      productName == "" ||
      price == "" ||
      rating == "" ||
      comment == "" ||
      ReviewPictures == []
    ) {
      alert("Please make sure you filled all the details");
    } else {
      //api
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      let reqbody = new FormData();
      for (let key in reviewData) {
        if (key !== "ReviewPictures") {
          reqbody.append(key, reviewData[key]);
        } else {
          reviewData.ReviewPictures.forEach((eachImage) => {
            reqbody.append("ReviewPictures", eachImage);
          });
        }
      }

      let apiResponse = await createReview(reqbody, header);
      console.log(apiResponse);
      alert("Successfully Reviewed");
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value == "add-new") {
      setNewCategory(true);
    } else {
      setReviewData({ ...reviewData, category: e.target.value });
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];
    setCategory(saved);
    getAllCategories();
  }, []);

  const addCategory = () => {
    if (categoryName == "") {
      setReviewData({ ...reviewData, category: "" });
      setNewCategory(false);
      return;
    }
    if (category.includes(categoryName)) {
      alert("Category already exists!");
      return;
    }
    const updated = [...category, categoryName];

    setCategory(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    setCategoryName(""); // clear input
    setNewCategory(false);
  };

  const getAllCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const reqheader = { Authorization: `Bearer ${token}` };

      const apiResponse = await getCategories(reqheader);
      const data = apiResponse.data;

      let categories = [];

      data.forEach((eachReview) => {
        if (eachReview.category && !categories.includes(eachReview.category)) {
          categories.push(eachReview.category);
        }
      });
      const savedLocal = JSON.parse(localStorage.getItem("categories")) || [];

      const allCategories = [...savedLocal];
      categories.forEach((item) => {
        if (!allCategories.includes(item)) {
          allCategories.push(item);
        }
      });

      setCategory(allCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserReviews = async () => {
    let token = localStorage.getItem("token");
    let reqheader = { Authorization: `Bearer ${token}` };
    let apiResponse = await getUserReviews(reqheader);
    setUserReviews(apiResponse.data);
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
      <Header />
      <div>
        <div className="bg-gray-300 h-40 pt-60"></div>
        <div
          style={{ width: "250px", marginTop: "-140px", marginLeft: "80px" }}
        >
          <img
            className="profile w-50"
            src="https://static.vecteezy.com/system/resources/previews/008/149/271/large_2x/user-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-free-vector.jpg"
            alt=""
          />
        </div>
        <div className="flex justify-between mx-10">
          <div className="flex m-2">
            <h2 className="text-3xl">
              {userDetails ? userDetails.userName : "User"}
            </h2>{" "}
            <img
              className="w-10"
              src="https://www.pngall.com/wp-content/uploads/8/Verification-Blue-Tick-PNG.png"
              alt=""
            />
          </div>

          <div>
            <EditProfile />
          </div>
        </div>
        <div className="mx-10">
          <h2 className="text-2xl">{userDetails.bio}</h2>
        </div>
        <div className="flex justify-center rounded-2xl gap-5">
          <button
            onClick={() => SetShowReviews(true)}
            className="text-xl focus:border-green-700 hover:text-green-700 focus:text-white focus:bg-green-600 border rounded-2xl p-2 cursor-pointer"
          >
            Post Review
          </button>
          <button
            onClick={() => SetShowReviews(false)}
            className="text-xl border focus:border-green-700 hover:text-green-700 focus:text-white focus:bg-green-600 rounded-2xl p-2 cursor-pointer"
          >
            My Reviews
          </button>
        </div>
        {showReviews ? (
          <div>
            <div className="my-10 mx-25 p-15  bg-linear-to-b from-gray-300 to-amber-100 rounded-2xl shadow-xl/30">
              <h1 className="text-3xl text-cyan-900 text-center font-bold">
                Write a New Review
              </h1>
              <div className="grid lg:grid-cols-2 gap-15 py-8">
                <div>
                  <input
                    onChange={(e) =>
                      setReviewData({ ...reviewData, company: e.target.value })
                    }
                    className="border p-2 my-5 w-full"
                    type="text"
                    placeholder="Company Name"
                  />
                  <div>
                    {" "}
                    <label
                      className="font-bold text-xl text-green-900"
                      htmlFor="prducts"
                    >
                      Category :
                    </label>
                    <select
                      className="px-3 font-bold italic"
                      name=""
                      id="products"
                      value={reviewData.category}
                      label="Choose"
                      onChange={handleCategoryChange}
                    >
                      <option className="font-bold" value="">
                        Choose Any
                      </option>
                      {category?.map((cat, i) => (
                        <option className="font-bold" key={i} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option
                        className="text-blue-700 font-bold"
                        value="add-new"
                      >
                        ➕ Add New
                      </option>
                    </select>
                    {newCategory && (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter new category"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          className="border px-2 py-1 rounded"
                        />

                        <button
                          onClick={addCategory}
                          className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        productName: e.target.value,
                      })
                    }
                    className="border w-full p-2 my-5"
                    type="text"
                    name=""
                    id=""
                    placeholder="Product Name"
                  />
                  <input
                    onChange={(e) =>
                      setReviewData({ ...reviewData, price: e.target.value })
                    }
                    className="border w-full p-2 my-5"
                    type="number"
                    name=""
                    id=""
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setReviewData({ ...reviewData, imageUrl: e.target.value })
                    }
                    className="border w-full p-2 my-5"
                    placeholder="Enter Image Url/link.Write none if no link to add"
                  />

                  <textarea
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    className="border w-full my-5 p-2"
                    name=""
                    id=""
                    placeholder="Comment Your Experience..."
                  ></textarea>
                </div>
                <div>
                  <div className="mx-20">
                    <label htmlFor="imageInput">
                      <input
                        onChange={(e) => handlFileChange(e)}
                        style={{ visibility: "hidden" }}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        id="imageInput"
                      />
                      <img
                        className="w-80"
                        src={
                          preview
                            ? preview
                            : "https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png"
                        }
                        alt=""
                      />
                    </label>
                    <div className="flex mt-5 gap-2">
                      {preview
                        ? previewList?.map((eachPreview) => (
                            <img
                              className="w-25"
                              src={eachPreview}
                              alt="previews"
                            />
                          ))
                        : ""}
                      {previewList?.length < 3 && previewList?.length > 0 ? (
                        <label htmlFor="imageInput">
                          <input
                            onChange={(e) => handlFileChange(e)}
                            style={{ visibility: "hidden" }}
                            type="file"
                            accept="image/png,image/jpg,image/jpeg"
                            id="imageInput"
                          />
                          <img
                            className="w-20"
                            src="https://icon-library.com/images/add-image-icon/add-image-icon-27.jpg"
                            alt=""
                          />
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center text-2xl mt-3">
                    <label className="text-amber-500 font-bold" htmlFor="">
                      Rate :{" "}
                    </label>
                    <Box
                      sx={{ width: 200, display: "flex", alignItems: "center" }}
                    >
                      <Rating
                        name="hover-feedback"
                        size="large"
                        value={reviewData.rating}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setReviewData({ ...reviewData, rating: newValue });
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        // emptyIcon={
                        //   <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                        // }
                      />
                      {reviewData.rating !== null && (
                        <Box sx={{ ml: 2 }}>
                          {labels[hover !== -1 ? hover : reviewData.rating]}
                        </Box>
                      )}
                    </Box>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div></div>
                <button
                  onClick={handleSubmit}
                  className="rounded bg-green-600 text-white font-bold p-3 lg:mx-20"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid  grid-cols-1  lg:grid-cols-3 gap-4 mx-50 mt-20 ">
              {userReviews?.map((eachReview) => (
                <div className="shadow-xl/30 bg-gradient-to-b from-white to-blue-200 rounded-2xl w-70 p-5 pb-10 my-5 text-center">
                  {/* <div className="flex justify-between"><button
                        onClick={() => onDeleteClick(eachReview._id)}
                        className=" text-red-500 "
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="text-blue-600">
                        {" "}
                        <EditReview />
                      </button>{" "}</div> */}
                  <div className="grid grid-cols-3">
                    <div></div>
                    <div>
                      <img
                        className="w-25 mb-5 block"
                        src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => onDeleteClick(eachReview._id)}
                        className=" text-red-500 "
                      >
                        {" "}
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
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
    </>
  );
};

export default Profile;
