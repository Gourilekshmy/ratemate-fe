import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const PNF = () => {
  return (
    <>
      <Header></Header>
      <div className="py-30 grid grid-cols-3">
        <div></div>
        <div>
          <h2 className="text-3xl text-center text-amber-400 font-bold">
            Page You Are Looking For{" "}
          </h2>
          <img
            src="https://i.pinimg.com/originals/79/b3/03/79b30352d4a90ff977bb0eeb5ecfddc5.gif"
            alt=""
          />
          <h2 className="text-3xl text-center text-amber-400 mb-3 font-bold">
            Is Not Found{" "}
          </h2>
          <Link to={'/'} className="border border-amber-400 text-white bg-amber-400 p-2 px-4 rounded-3xl font-bold  md:ms-20 lg:mx-50">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PNF;
