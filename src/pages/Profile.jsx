import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate, useOutlet, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import instance from "../utils/interceptor";
import { API_ENDPOINTS } from "../constants/constants";
import FollowAuthorButton from "../components/FollowAuthorButton";

const Profile = () => {
  const { data } = useLoaderData();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const { userProfile } = useOutletContext();
  const navigator = useNavigate();

  const [userData, setUserData] = useState({});
  const [articleType, setArticleType] = useState(data);
  const [myArticles, setMyArticles] = useState(searchParams.get("author"));
  const [favoritedArticles, setFavoritedArticles] = useState(searchParams.get("favorited"));

  const canUpdateProfile = userProfile.username === username;

  useEffect(() => {
    getUserNameProfile();
    setArticleType(data);
  }, [data]);

  const getUserNameProfile = async () => {
    const response = await instance.get(`${API_ENDPOINTS.PROFILES.ROOT(username)}`);
    setUserData(response.data.profile);
  };

  const clickMyArticlesButton = async () => {
    setMyArticles(true);
    setFavoritedArticles(false);
    navigator(`/profile/${username}/?author=${true}`);

    const response = await instance.get(`${API_ENDPOINTS.ARTICLE.ROOT}?author=${username}`);

    setArticleType(response.data);
  };

  const clickFavoritedArticlesButton = async () => {
    setMyArticles(false);
    setFavoritedArticles(true);
    navigator(`/profile/${username}/?favorited=${true}`);

    const response = await instance.get(`${API_ENDPOINTS.ARTICLE.ROOT}?favorited=${username}`);
    setArticleType(response.data);
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={userData?.image} className="user-img" />
              <h4>{userData?.username}</h4>
              <p>{userData?.bio}</p>
              {canUpdateProfile ? (
                <NavLink className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" /> Edit Profile Settings
                </NavLink>
              ) : (
                <FollowAuthorButton username={userData?.username} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button onClick={() => clickMyArticlesButton()} type="button" className={`nav-link` + (myArticles ? " active" : "")}>
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => clickFavoritedArticlesButton()} type="button" className={`nav-link` + (favoritedArticles ? " active" : "")}>
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList article={articleType} myArticles={myArticles} username={username} favoritedArticles={favoritedArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
