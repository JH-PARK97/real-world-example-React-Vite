import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData, useOutlet, useOutletContext, useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import instance from "../utils/interceptor";
import { API_ENDPOINTS } from "../constants/constants";
import FollowAuthorButton from "../components/FollowAuthorButton";

const Profile = () => {
  const { userProfile } = useOutletContext();
  const { username } = useParams();
  const canUpdateProfile = userProfile.username === username;
  const { data } = useLoaderData();
  const [userData, setUserData] = useState({});

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
                  <button type="button" className="nav-link ">
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link">
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList article={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
