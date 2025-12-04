import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getHomeReviews } from "../services/AllApi";

const Home = () => {
  const [reviewData, setReviewData] = useState([]);
  const[isLoggedin,setIsLoggedin]=useState(false)

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(()=>{
    let token=localStorage.getItem('token')
    if (token) {
      setIsLoggedin(true)
    }
  })
  const loadReviews = async () => {
    let apiResponse = await getHomeReviews();
    let data = apiResponse.data;
    setReviewData(data);
  };
  return (
    <>
      <Header />

      <div className="py-15 ">
        {/* <div id="welcome" className="text-center grid grid-cols-[3fr_2fr_3fr] ">
          <div></div>
          <div className="align text-center pt-80">
            <h1 className="text-4xl text-white pt-30">Wonderful Gifts</h1>
            <h2 className="mt-3 text-2xl head">
              Discover,Read and Write Reviews
            </h2>
            <input
              className="form-control flex justify-center border-amber-50 h-15 shadow-xl/20  rounded-4xl bg-white mt-5 "
              style={{
                display: "flex",
                justifyContent: "center",
                width: "600px",
              }}
              type="text"
              placeholder="  Search a Company,brand or Category... "
            />
            <FontAwesomeIcon
              style={{
                position: "absolute",
                marginTop: "-39px",
                marginLeft: "250px",
              }}
              className="text-xl text-blue-800"
              icon={faMagnifyingGlass}
            />
          </div>
          <div></div>
        </div> */}
        <div id="welcome" className="grid grid-cols-1 md:grid-cols-2 py-5 lg:py-25 bg-gradient-to-b 
        ">
          <div className="mx-6 sm:mx-12 md:mx-20 mt-10 md:mt-20 text-center md:text-left">
            {/* <h1 className="text-5xl font-bold">RateMate</h1> */}
            <h2 className="text-7xl sm:text-5xl md:text-7xl mt:3 lg:mt-10 italic">
              "Place Where <span className="text-green-700">Every Opinion</span>{" "}
              Counts"
            </h2>
            <h2 className="text-2xl font-bold mt-3 lg:mt-10 ">
              <span className="text-green-600">Review.</span>{" "}
              <span className="text-lime-700">Trust.</span>{" "}
              <span className="text-cyan-800">Repeat.</span>
            </h2>
          </div>
          <div>
            {/* <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/customer-review-3949821-3277282.png"
              alt=""
            /> */}
            <img className="lg:w-100 w-50 rounded-full ms-20" src="https://www.irpcommerce.com/IRPStrategyCenter/Interface/DisplayImages/55.jpg" alt="" />
          </div>
        </div>

        <div className="flex mt-50 mx-25 ">
          <img
            className="w-100 "
            style={{
              marginTop: "-200px",
              position: "absolute",
              marginLeft: "12px",
              zIndex: "-1",
            }}
            src="https://png.pngtree.com/png-clipart/20221229/original/pngtree-positive-customer-feedback-png-image_8824228.png"
            alt=""
          />
          <p className="text-xl text-justify italic ms-50">
            <span className="font-bold">RateMate</span> is your go-to app for
            writing and reading reviews on everything from restaurants to tech
            gadgets. Share your honest experiences to help others make smart
            choices, and explore thousands of real user reviews before making
            your own decisions. With a clean interface and helpful rating
            system, RateMate makes it easy to stay informed and be part of a
            trusted community built on feedback and transparency.
          </p>
          <div></div>
        </div>
        {reviewData?.length > 0 ? (
          <div className="grid  grid-cols-1  lg:grid-cols-3 gap-4 mx-50 mt-20 ">
           {reviewData?.map((eachReview)=>( <div className="shadow-xl/30 bg-linear-to-bl from-gray-300 to-white rounded-2xl w-70 p-5 py-10 text-center">
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
              <h1 className="my-3">⭐️⭐️⭐️⭐️⭐️ ({eachReview.rating}/5)</h1>
              <h2 className="mb-5">
                “{eachReview.comment}”
              </h2>
             {isLoggedin? <Link to={"/view-review"} className="font-bold  text-green-500">
                Click here to know More About this Review
              </Link>: <Link to={"/login"} className="font-bold  text-green-500">
                Click here to know More About this Review
              </Link>}
            </div>))}
            <div></div>
          </div>
        ) : (
          <h1>No Reviews Found</h1>
        )}
        <div className="grid grid-cols-2 gap-5 mt-30 mx-20 ">
          <div>
            {/* <img
              className=" rounded-2xl"
              style={{ maxWidth: "550px" }}
              src="https://img.freepik.com/premium-photo/time-review-text-notebook-gray-background-pencils-paper-clips-concept_284815-2776.jpg?w=2000"
              alt=""
            /> */}
            <p className="text-xl text-justify italic mt-25">
              Your experiences matter. Whether it’s a great meal, a handy
              gadget, or a local service, your honest reviews help others make
              better choices. Take a moment to write a quick review and be part
              of a community built on trust and real opinions.
            </p>
            <Link to={"/review"} className="rev p-3 w-35 rounded-xl mt-5">
              Leave a Review
            </Link>
          </div>
          <div>
            <img
              src="https://thumbs.dreamstime.com/b/user-reviews-laptop-woman-thumbs-up-customer-review-online-star-rating-feedback-bubble-vector-flat-illustration-252314717.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="grid grid-cols-2  mt-30 mx-20 mb-30">
          <img
            className=" rounded-2xl flex ms-25"
            style={{ maxWidth: "350px" }}
            src="https://png.pngtree.com/png-clipart/20230928/original/pngtree-illustration-of-a-flat-concept-for-online-reviews-featuring-star-ratings-png-image_12902091.png"
            alt=""
          />
          <div>
            {" "}
            <p className="text-xl text-justify italic mt-15">
              Discover real reviews from real people to help you make better
              choices every day. From products and services to companies and
              experiences, we’ve got the insights you need. Read what others
              have to say—or share your own and help someone else decide with
              confidence.
            </p>
            <Link
              to={"/categories"}
              className="serch truncate w-40 p-3 rounded-xl mt-5"
            >
              Search For Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
