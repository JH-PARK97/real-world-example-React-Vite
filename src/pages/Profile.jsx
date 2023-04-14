import React from "react";
import { NavLink, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";

const Profile = () => {
  const { userProfile } = useOutletContext();
  const canUpdateProfile = true;

  const { data } = useLoaderData();

  console.log(data);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={userProfile.image} className="user-img" />
              <h4>{userProfile.username}</h4>
              <p>{userProfile.bio}</p>
              {canUpdateProfile ? (
                <NavLink className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" /> Edit Profile Settings
                </NavLink>
              ) : (
                <FollowProfileButton />
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
                  <button type="button" className={"nav-link"}>
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className={"nav-link"}>
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
