import React, { useEffect, useState } from "react";
import PopularTags from "../components/PopularTag";
import { Outlet, useLoaderData } from "react-router-dom";
import useAuth from "../store/store";
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const HomeLayout = () => {
  const [articleType, setArticleType] = useState(null);
  const tags = useLoaderData().data?.tags ?? [];
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  const initialFilters = { tag: "", feed: false };

  const [filters, setFilters] = useState({ initialFilters, feed: isLogin });

  useEffect(() => {
    setFilters({ initialFilters, feed: false });
  }, [isLogin]);

  const onTagClick = async (tag) => {
    setFilters({ initialFilters, tag });

    const apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}/?tag=${tag}`;

    const response = await instance.get(apiURL);
    setArticleType(response.data);
  };

  const onFeedClick = async () => {
    setFilters({ initialFilters, feed: true });
    const apiURL = API_ENDPOINTS.ARTICLE.FEED;

    const response = await instance.get(apiURL);
    setArticleType(response.data);
  };

  const onGlobalFeedClick = async () => {
    setFilters(initialFilters);
    const apiURL = API_ENDPOINTS.ARTICLE.ROOT;

    const response = await instance.get(apiURL);
    setArticleType(response.data);
  };

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
                    <button type="button" className={`nav-link` + (filters.feed ? " active" : "")} onClick={() => onFeedClick()}>
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button onClick={onGlobalFeedClick} type="button" className={`nav-link` + (!filters?.tag && !filters.feed ? " active" : "")}>
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
            <Outlet context={articleType} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
