import { json } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const handleSettingsAction = async (ctx) => {
  const formData = await ctx.request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const image = formData.get("image");
  const bio = formData.get("bio");
  const username = formData.get("username");
  const errors = {};

  try {
    const response = await instance.put(API_ENDPOINTS.USER.ROOT, {
      user: {
        email,
        password,
        image,
        bio,
        username,
      },
    });
    localStorage.setItem("jwtToken", response.data.user.token);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);

      switch (error.response.status) {
        case 500:
          const axiosError = error.response.data;
          if (axiosError) {
            errors["username"] = "해당 username이 이미 존재합니다.";
            return json(errors);
          }
          break;
      }
    }
  }
};

export default handleSettingsAction;
