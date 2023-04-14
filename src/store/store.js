import { create } from "zustand"; // create로 zustand를 불러옵니다.

const useAuth = create((set) => ({
  isLogin: window.localStorage.getItem("jwtToken") ? true : false,
  setIsLogin: () => {
    set((state) => ({
      isLogin: !state.isLogin,
    }));
  },
}));

export default useAuth;
