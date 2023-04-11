import { json, redirect } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS, PAGE_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const handleLoginAction = async (ctx) => {
  const formData = await ctx.request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {};

  if (typeof email !== "string" || !email) {
    errors.email = "email이 공백입니다.";
  }

  if (typeof password !== "string" || !password) {
    errors.password = "password가 공백입니다.";
  }
  if (Object.keys(errors).length) {
    return json(errors);
  }

  try {
    const response = await instance.post(API_ENDPOINTS.AUTH.LOGIN, {
      user: {
        email,
        password,
      },
    });

    const authToken = response.data.user.token;
    localStorage.setItem("jwtToken", authToken);
    return redirect(PAGE_ENDPOINTS.ROOT);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);

      switch (error.response.status) {
        case 403:
          const axiosError = error.response.data.errors;
          console.log(axiosError);
          if (axiosError) {
            Object.keys(axiosError).map((key) => {
              console.log(key);
              if (axiosError[key]) {
                console.log("value:", axiosError[key]);
                errors[key] = axiosError[key][0];
              }
            });
            return json(errors);
          }
          break;
      }
    }
    if (error instanceof Error) {
      return console.log("error");
    }
  }
};

export default handleLoginAction;
