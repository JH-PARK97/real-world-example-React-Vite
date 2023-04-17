import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { Home, Settings, Login, Article, Auth, Profile, Register, Editor } from "./pages";
import { Layout } from "./components";
import "./App.css";

import { getArticlesDetail, getTagsList, getArticlesList, getCommentsList, getProfile, getProfileArticlesList } from "./api/API";
import HomeLayout from "./components/HomeLayout";
import ArticleComments from "./components/ArticleComments";
import { PAGE_ENDPOINTS } from "./constants/constants";
import { handleArticleSubmit, handleSettingsAction, handleLoginAction, handleRegisterAction } from "./actions";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route loader={getProfile} path="/" element={<Layout />}>
        {/* Home 화면에서 공통적으로 쓰이는 Layout이므로 HomeLayout이라는 Layout을 따로 
        만들어서 Outlet을 이용해서 게시글 리스트를 구현한다. */}
        <Route loader={getTagsList} element={<HomeLayout />}>
          <Route path={PAGE_ENDPOINTS.ROOT} loader={getArticlesList} element={<Home />} />
        </Route>
        <Route path={PAGE_ENDPOINTS.SETTINGS} action={(ctx) => handleSettingsAction(ctx)} element={<Settings />} />
        <Route path={PAGE_ENDPOINTS.AUTH.LOGIN} action={(ctx) => handleLoginAction(ctx)} element={<Login />} />
        <Route path={PAGE_ENDPOINTS.AUTH.REGIS} action={(ctx) => handleRegisterAction(ctx)} element={<Register />} />
        <Route path={PAGE_ENDPOINTS.PROFILE} loader={getProfileArticlesList} element={<Profile />} />
        <Route path={PAGE_ENDPOINTS.EDITOR} loader={getArticlesDetail} action={(ctx) => handleArticleSubmit(ctx)} element={<Editor />} />
        <Route loader={getArticlesDetail} element={<Article />}>
          <Route path={PAGE_ENDPOINTS.ARTICLE} loader={getCommentsList} element={<ArticleComments />} />
        </Route>
        <Route path={PAGE_ENDPOINTS.AUTH.ROOT} element={<Auth />} />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
