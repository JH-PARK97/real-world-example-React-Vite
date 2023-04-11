import classNames from "classnames";
import React from "react";

const FollowButton = ({ articleDetail }) => {
  const following = articleDetail.author.following;
  return (
    <button
      type="button"
      className={classNames("btn btn-sm action-btn", {
        "btn-outline-secondary": !following,
        "btn-secondary": following,
      })}
    >
      <i className="ion-plus-round" />
      &nbsp; {following ? "Unfollow" : "Follow"} {articleDetail.author.username}
    </button>
  );
};

export default FollowButton;
