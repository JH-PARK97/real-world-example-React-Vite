import React from "react";

const FollowButton = ({ articleDetail, ClickFollowButton, following }) => {
  return (
    <button type="button" onClick={ClickFollowButton} className={"btn btn-sm action-btn" + (following ? " btn-secondary" : " btn-outline-secondary")}>
      <i className="ion-plus-round" />
      &nbsp; {following ? "Unfollow" : "Follow"} {articleDetail.author.username}
    </button>
  );
};

export default FollowButton;
