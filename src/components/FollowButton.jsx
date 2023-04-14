import React from "react";
import useAuth from "../store/store";
import { useNavigate } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../constants/constants";

const FollowButton = ({ articleDetail, ClickFollowButton, following, username }) => {
  const { isLogin } = useAuth();

  const navigator = useNavigate();

  return (
    <button type="button" onClick={() => (isLogin ? ClickFollowButton : navigator(PAGE_ENDPOINTS.AUTH.LOGIN))} className={"btn btn-sm action-btn" + (following ? " btn-secondary" : " btn-outline-secondary")}>
      <i className="ion-plus-round" />
      &nbsp; {following ? "Unfollow" : "Follow"} {articleDetail ? articleDetail.author.username : username}
    </button>
  );
};

export default FollowButton;
