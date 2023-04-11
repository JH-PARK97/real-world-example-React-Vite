import React from "react";
import PopularTags from "../components/PopularTag";
import { Outlet, useLoaderData } from "react-router-dom";
import classNames from "classnames";
import useAuth from "../store/store";

const HomeLayout = () => {
  const tags = useLoaderData().data?.tags ?? [];
  const filters = {
    tag: null,
  };
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLogin && (
                  <li className="nav-item">
                    <button
                      type="button"
                      className={classNames("nav-link", {
                        active: filters.feed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames("nav-link", {
                      active: !filters?.tag && !filters.feed,
                    })}
                  >
                    Global Feed
                  </button>
                </li>
                {filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters?.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <Outlet />
          </div>
          <div className="col-md-3">
            <PopularTags tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
