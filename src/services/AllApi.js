import { BaseUrl } from "./BaseUrl";
import commonApi from "./commonApi";

export const createUser = async (reqbody) => {
  return await commonApi("post", `${BaseUrl}/register`, reqbody);
};

export const loginUser = async (reqbody) => {
  return await commonApi("post", `${BaseUrl}/login`, reqbody);
};

export const googleLogin = async (reqbody) => {
  return await commonApi("post", `${BaseUrl}/google-auth`, reqbody);
};

export const createReview = async (reqbody, header) => {
  return await commonApi("post", `${BaseUrl}/createReview`, reqbody, header);
};

export const getReviews = async (reqheader) => {
  return await commonApi("get", `${BaseUrl}/getAllReviews`, "", reqheader);
};

export const getCategories = async (reqheader, searchKey) => {
  return await commonApi(
    "get",
    `${BaseUrl}/getAllCategories${searchKey ? `?search=${searchKey}` : ""}`,
    "",
    reqheader
  );
};

export const getCompanies = async (reqheader, searchKey) => {
  return await commonApi(
    "get",
    `${BaseUrl}/getAllCompanies/?search=${searchKey}`,
    "",
    reqheader
  );
};

export const updateReview = async (id, reqbody, reqheader) => {
  return await commonApi(
    "put",
    `${BaseUrl}/${id}/editReview`,
    reqbody,
    reqheader
  );
};

export const getHomeReviews = async () => {
  return await commonApi("get", `${BaseUrl}/getHomeReviews`, "");
};

export const updateProfile = async (reqbody, reqheader, id) => {
  return await commonApi(
    "put",
    `${BaseUrl}/${id}/updateUser`,
    reqbody,
    reqheader
  );
};

export const getUserReviews = async (reqheader) => {
  return await commonApi("get", `${BaseUrl}/getUserReview`, "", reqheader);
};

export const getSingleReview = async (id, reqheader) => {
  return await commonApi(
    "get",
    `${BaseUrl}/${id}/getSingleBook`,
    "",
    reqheader
  );
};

export const getAllUser = async (reqheader) => {
  return await commonApi("get", `${BaseUrl}/allUser`, "", reqheader);
};

export const deleteReviews = async (id, reqheader) => {
  return await commonApi(
    "delete",
    `${BaseUrl}/${id}/deleteReview`,
    {},
    reqheader
  );
};
