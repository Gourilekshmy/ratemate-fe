import React, { useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeader";
import Adminside from "./components/Adminside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUsers } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCategories } from "../services/AllApi";

faList;

const AdminHome = () => {
  const [data, setData] = useState([]);

  const CategoryData = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = { Authorization: `Bearer ${token}` };

    let apiResponse = await getCategories(reqHeader);
    let rawReviews = apiResponse.data; // array of all reviews

    console.log(rawReviews);

    // 🔥 Build a category-count object
    let counts = {};

    rawReviews.forEach((item) => {
      if (!counts[item.category]) {
        counts[item.category] = 1;
      } else {
        counts[item.category] += 1;
      }
    });

    // Convert to chart format
    let formatted = Object.keys(counts).map((category) => ({
      name: category,
      reviews: counts[category],
    }));

    setData(formatted);
  };
  useEffect(() => {
    CategoryData();
  }, []);

  return (
    <>
      <div>
        <AdminHeader />
        <div className="grid grid-cols-[1fr_5fr]">
          <Adminside />
          <div>
            <div className="flex justify-evenly mt-30">
              <div className="box bg-blue-900 rounded p-5 flex items-center justify-center text-xl text-white">
                <FontAwesomeIcon className="text-2xl mx-2" icon={faList} />
                <div className="text-center">
                  <h2> Total Number of Reviews</h2>
                  <h2>100+</h2>
                </div>
              </div>
              <div className="box bg-green-900 rounded p-5 flex items-center justify-center text-xl text-white">
                <FontAwesomeIcon className="text-2xl mx-2" icon={faUsers} />
                <div className="text-center">
                  <h2> Total Number of Users</h2>
                  <h2>100+</h2>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 ">
              <div className="mt-15" style={{ width: "100%", height: "400px" }}>
                {" "}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    // style={{
                    //   width: "100%",
                    //   maxWidth: "700px",
                    //   maxHeight: "70vh",
                    //   aspectRatio: 1.618,
                    // }}

                    data={data}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    {/* <YAxis width="auto" /> */}
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reviews" fill="#1E3A8A" />
                    {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" background /> */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/355/228/non_2x/vector-checklist-icon.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
