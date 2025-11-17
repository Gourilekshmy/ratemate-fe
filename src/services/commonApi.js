import axios from "axios";

const commonApi = async (reqMethod, url, reqbody,reqheader) => {
  let configObj = {
    method: reqMethod,
    data: reqbody,
    url: url,
    headers:reqheader
  };

  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonApi