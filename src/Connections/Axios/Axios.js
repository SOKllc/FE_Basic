import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(
  (req) => {
    // console.log("Instance", req);
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject("Instance", err);
  }
);

instance.interceptors.response.use(
    (res) => {
      // console.log("Instance", res);
      return res;
    },
    (err) => {
      console.log(err);
      return Promise.reject("Instance", err);
    }
  );

export default instance;
