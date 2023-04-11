import React, { useEffect } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";
import useAuth from "../store/store";

const Layout = () => {
  const userProfile = useLoaderData().data?.user;
  const location = useLocation();
  const { setIsLogin, isLogin } = useAuth((state) => ({
    setIsLogin: state.setIsLogin,
    isLogin: state.isLogin,
  }));

  useEffect(() => {
    if (!isLogin) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        setIsLogin();
      }
    }
  }, [location.pathname, isLogin]);

  return (
    <div>
      {/* 해당 layout에서 공통으로 사용되는 Header를 선언해준다. */}
      <Navbar userProfile={userProfile} />
      {/* Content 영역 */}
      <main>
        {/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
        {<Outlet context={{ userProfile }} />}
      </main>
      {/* 해당 layout에서 공통으로 사용되는 Footer를 선언해준다. */}
      <Footer />
    </div>
  );
};

export default Layout;
