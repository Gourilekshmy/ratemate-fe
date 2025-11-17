import React from "react";
import Header from "../components/Header";

const Help = () => {
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl text-green-900 pt-30">Contact & Support</h1>
      
      <div>
        <h2 className="text-center text-xl mt-3 font-bold">We’re Here to Help</h2>
      <h3 className="text-center">Have a question, feedback, or need assistance? Our team is happy to help! Choose the option that best fits your needs below.</h3>
      </div>
      <div className=" grid grid-cols-2 mx-20  my-10">
        <div className="p-10 px-20">
          <h1 className="text-center text-3xl mb-10 italic text-green-600">Complaints</h1>
          <input
            className="text-gray-500 my-8 w-full p-2 border border-green-600  rounded block"
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            className="text-gray-500 my-8 w-full p-2 border border-green-600  rounded block"
            type="text"
            placeholder="Email Id"
          />
          <textarea
            className="text-gray-500 w-full my-8 p-2 border border-green-600  rounded block"
            name=""
            id=""
            placeholder="Complaints/Suggestions"
          ></textarea>
        </div>
        <div><img className="w-150" src="https://www.servicecrmindia.com/assets/img/complaint-management-software.webp" alt="" /></div>
      </div>
      <div className=" grid grid-cols-2 gap-5 mx-20  my-10">
        <div><img src="https://static.vecteezy.com/system/resources/previews/012/994/657/non_2x/call-center-agent-of-customer-service-or-hotline-operator-with-headsets-and-computers-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg" alt="" /></div>
        <div className=" rounded-2xl  shadow-xl/30 my-10 px-20 p-10">
        <h1 className="text-center text-3xl text-green-600">Contact Us</h1>
        <ul className="text-xl my-5 flex justify-between">
          <li className="my-2">Email : <br /> <span className="text-blue-500">ratemateapp@gmail.com</span></li>
          <li className="my-2">Phone : <br /> 984xxxxx56</li>
        </ul>
<h2 className="text-2xl mt-5 font-bold">Mail Address : </h2>
<ul className="text-xl"><li>RateMate office</li>
<li>123 Street,</li>
<li>Kerala,Trivandrum,</li>
<li>India</li></ul>

        </div>
      </div>
      <h1 className="text-center italic text-xl mb-10"><span className="text-green-700 font-bold">Response Time</span> : We aim to respond to all inquiries within 24 hours.</h1>
    </>
  );
};

export default Help;
