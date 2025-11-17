import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faSquareLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <div
        className="bg-green-800 w-full sm:px-12 md:px-20 lg:px-30"
        style={{ color: "white" }}
      >
        <div className="pt-5 flex gap-2 mb-5">
          <img
            className="w-20 "
            style={{ marginTop: "-20px" }}
            src="./src/assets/golden-star_259293-2443-removebg-preview.png"
            alt=""
          />
          <h2 className="name text-3xl ">RateMate</h2>
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5 mx-10 sm:mx-10">
          <div className="my-5">
            <h2 className="text-2xl mb-5">About Us</h2>
            <p>
              At RateMate, we believe that honest feedback drives better
              choices. Our platform empowers users to share real experiences and
              discover trustworthy reviews on products, services, and places —
              all in one place. Whether you're deciding what to buy or where to
              go, our goal is to help you make smarter, informed decisions
              through community-powered insights.
            </p>
          </div>
          <div className="my-5 lg:mx-15">
            <h2 className="text-2xl mb-5 ">Community</h2>
            <ul className="mt-2">
              <li className="mt-2">Trust in reviews</li>
              <li className="mt-2">Help Centre</li>
              <li className="mt-2">Sign In</li>
            </ul>
          </div>
          <div className="my-5 ">
            <h2 className="text-2xl mb-5 ">Follow Us</h2>
            <ul className="text-2xl ">
              <li>
                <FontAwesomeIcon icon={faXTwitter} />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
                <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
                <FontAwesomeIcon icon={faSquareLinkedin} />
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xs text-white py-10">
            © 2025 RateMate, Inc. All rights reserved.
          </h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
