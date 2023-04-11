import { create } from "zustand"; // create로 zustand를 불러옵니다.
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const useAuth = create((set) => ({
  isLogin: window.localStorage.getItem("jwtToken") ? true : false,
  setIsLogin: () => {
    set((state) => ({
      isLogin: !state.isLogin,
    }));
  },
}));

export default useAuth;
