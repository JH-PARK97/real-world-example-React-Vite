import React, { useEffect, useState } from "react";
import PopularTags from "../components/PopularTag";
import { Outlet, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../store/store";
import { API_ENDPOINTS, PAGE_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const HomeLayout = () => {
  const searchParams = new URLSearchParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));
  const tags = useLoaderData().data?.tags ?? [];

  const initialFilters = { tag: "", feed: false };

  const [articleType, setArticleType] = useState(null);
  const [qsTag, setQsTag] = useState(null);
  const [qsFeed, setQsFeed] = useState(false);
  const [filters, setFilters] = useState({ initialFilters, feed: isLogin });

  useEffect(() => {
    setFilters({ initialFilters, feed: false });
  }, []);

  const onTagClick = async (tag) => {
    searchParams.append("tag", tag);
    setFilters({ initialFilters, tag });

    setQsTag(searchParams.get("tag"));
    navigate("/?" + searchParams.toString());

    const apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}/?tag=${tag}`;

    const response = await instance.get(apiURL);
    setArticleType(response.data);
  };

  const onFeedClick = async () => {
    setQsTag(null);
    setQsFeed(true);
    searchParams.append("feed", true);

    setFilters({ initialFilters, feed: true });
    const apiURL = API_ENDPOINTS.ARTICLE.FEED;
    console.log(searchParams.toString());
    const response = await instance.get(apiURL);
    console.log("response.data feed : ", response.data);
    navigate("/?" + searchParams.toString());
    setArticleType(response.data);
  };

  const onGlobalFeedClick = async () => {
    setQsTag(null);
    setQsFeed(false);

    setFilters(initialFilters);
    const apiURL = API_ENDPOINTS.ARTICLE.ROOT;

    const response = await instance.get(apiURL);
    navigate(PAGE_ENDPOINTS.ROOT);
    setArticleType(response.data);
  };

  return (
    <div className="home-page">
      {!isLogin && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLogin && (
                  <li className="nav-item">
                    <button type="button" className={`nav-link` + (filters.feed ? " active" : "")} onClick={onFeedClick}>
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
            <Outlet context={{ qsTag, articleType, qsFeed }} />
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
