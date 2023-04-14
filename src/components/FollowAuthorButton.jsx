import React from "react";
import FollowButton from "./FollowButton";
const FollowAuthorButton = ({ articleDetail, ClickFollowButton, following, username }) => {
  return <FollowButton articleDetail={articleDetail} username={username} ClickFollowButton={ClickFollowButton} following={following} />;
};

export default FollowAuthorButton;
