import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, json, redirect } from "react-router-dom";
import { Home, Settings, Login, Article, Auth, Profile, Register, Editor } from "./pages";
import { Layout } from "./components";
import "./App.css";

import { getArticlesDetail, getTagsList, getArticlesList, getCommentsList, getProfile } from "./api/API";
import HomeLayout from "./components/HomeLayout";
import ArticleComments from "./components/ArticleComments";
import axios from "axios";
import { API_ENDPOINTS, PAGE_ENDPOINTS } from "./constants/constants";
import instance from "./utils/interceptor";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route loader={getProfile} path="/" element={<Layout />}>
        {/* Home 화면에서 공통적으로 쓰이는 Layout이므로 HomeLayout이라는 Layout을 따로 
        만들어서 Outlet을 이용해서 게시글 리스트를 구현한다. */}
        <Route loader={getTagsList} element={<HomeLayout />}>
          <Route path={PAGE_ENDPOINTS.ROOT} loader={getArticlesList} element={<Home />} />
        </Route>
        <Route
          path={PAGE_ENDPOINTS.SETTINGS}
          action={async (ctx) => {
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
          }}
          element={<Settings />}
        />
        <Route
          path={PAGE_ENDPOINTS.AUTH.LOGIN}
          action={async (ctx) => {
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
          }}
          element={<Login />}
        />
        <Route
          path={PAGE_ENDPOINTS.AUTH.REGIS}
          // action은 async, await으로 작동. get은 loader로, 나머지는 action으로 처리
          // context의 request.formData();를 이용해서 <Form>태그에서 전달한 정보를
          // 가져온다.
          action={async (ctx) => {
            const formData = await ctx.request.formData();
            const email = formData.get("email");
            const username = formData.get("username");
            const password = formData.get("password");

            // useActionData를 이용해 errors를 처리한다.
            // client측 Validation Check를 함.
            // remix 환경에선 이 부분이 서버에서 작동. 지금은 아님

            const errors = {};

            if (typeof username !== "string" || !username) {
              errors.username = "username은 공백일 수 없습니다.";
            }
            if (typeof email !== "string" || !email.includes("@")) {
              errors.email = "이메일 양식이 맞지 않습니다.";
            }
            if (typeof password !== "string" || !password) {
              errors.password = "비밀번호가 공백일 수없습니다.";
            }
            // 에러가 존재하면 에러를 json형식으로 return.
            if (Object.keys(errors).length) {
              return json(errors);
            }

            // fetch에서 error는 항상 try - catch로 처리해야함
            //
            try {
              await instance.post(API_ENDPOINTS.AUTH.REGIS, {
                user: {
                  username,
                  email,
                  password,
                },
              });

              return redirect(PAGE_ENDPOINTS.AUTH.LOGIN);
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.log("2 error @@@@@ ", error);
                switch (error.response.status) {
                  case 422: {
                    // 실패
                    const data = error.response.data;
                    if (data.errors) {
                      console.log(data.errors);
                      Object.keys(data.errors).map((key) => {
                        console.log(key);
                        if (data.errors[key]) {
                          console.log("value:", data.errors[key]);
                          // key = data.errors[key];
                          errors[key] = data.errors[key][0];
                        }
                      });
                      console.log("errors : ", errors);
                      // [username, email, password]
                      return json(errors);
                    }
                    break;
                  }
                }
              }

              if (error instanceof Error) {
              }
              return console.log("error");
            }
          }}
          element={<Register />}
        />
        <Route path={PAGE_ENDPOINTS.PROFILE} element={<Profile />} />
        <Route path={PAGE_ENDPOINTS.EDITOR} element={<Editor />} />
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
