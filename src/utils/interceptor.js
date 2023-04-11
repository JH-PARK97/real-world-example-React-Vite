import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.realworld.io/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    // 요청을 보내기 전에 수행할 일
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    // 오류 요청을 보내기전 수행할 일

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공, .then()으로 이어진다.
    return response;
  },
  (error) => {
    // 오류 응답을 처리, .catch()으로 이어진다.

    return Promise.reject(error);
  }
);

export default instance;
