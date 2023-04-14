import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData, useOutlet, useOutletContext, useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import instance from "../utils/interceptor";
import { API_ENDPOINTS } from "../constants/constants";
import FollowAuthorButton from "../components/FollowAuthorButton";

const Profile = () => {
  const { data } = useLoaderData();
  const { username } = useParams();
  const { userProfile } = useOutletContext();

  const [filters, setFilters] = useState({ author: true, favorited: "" });
  const [userData, setUserData] = useState({});
  const [articleType, setArticleType] = useState(data);

  const canUpdateProfile = userProfile.username === username;

  useEffect(() => {
    getUserNameProfile();
    getUserNameArticles();
  }, []);

  const getUserNameArticles = async () => {
    await instance.get(`${`${API_ENDPOINTS.ARTICLE.ROOT}?author=${username}`}`);
  };

  const getUserNameProfile = async () => {
    const response = await instance.get(`${API_ENDPOINTS.PROFILES.ROOT(username)}`);
    setUserData(response.data.profile);
  };

  const clickMyArticlesButton = async () => {
    setFilters({ author: true, favorited: "" });
    const response = await instance.get(`${API_ENDPOINTS.ARTICLE.ROOT}?author=${username}`);
    console.log(response.data);
    setArticleType(response.data);
  };

  const clickFavoritedArticlesButton = async () => {
    setFilters({ author: "", favorited: true });
    const response = await instance.get(`${API_ENDPOINTS.ARTICLE.ROOT}?favorited=${username}`);
    console.log(response.data);
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
                  <button onClick={() => clickMyArticlesButton()} type="button" className={`nav-link` + (filters.author ? " active" : "")}>
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={() => clickFavoritedArticlesButton()} type="button" className={`nav-link` + (filters.favorited ? " active" : "")}>
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList article={articleType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
