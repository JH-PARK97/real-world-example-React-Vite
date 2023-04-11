import React from "react";
import FollowButton from "./FollowButton";
const FollowAuthorButton = ({ articleDetail, ClickFollowButton, following }) => {
  return <FollowButton articleDetail={articleDetail} ClickFollowButton={ClickFollowButton} following={following} />;
};

export default FollowAuthorButton;
