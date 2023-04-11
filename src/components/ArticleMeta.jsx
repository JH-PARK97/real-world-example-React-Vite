import React from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import FollowAuthorButton from "./FollowAuthorButton";
import FavoriteArticleButton from "./FavoriteArticleButton";
import DeleteArticleButton from "./DeleteArticleButton";

const ArticleMeta = ({ articleDetail, favorite, count, ClickFavoriteButton, ClickFollowButton, following }) => {
  const { userProfile } = useOutletContext();

  // const canUpdate = userProfile.username === articleDetail.author.username;
  const canUpdate = false;

  return (
    <div className="article-meta">
      <NavLink to={`/profile/${articleDetail?.author?.username}`}>
        <img src={articleDetail.author?.image} />
      </NavLink>
      <div className="info">
        <NavLink to={`/profile/${articleDetail?.author?.username}`} className="author">
          {articleDetail.author?.username}
        </NavLink>
        <span className="date">{new Date(articleDetail.createdAt).toDateString()}</span>
      </div>
      {canUpdate ? (
        <span>
          <NavLink className="btn btn-outline-secondary btn-sm" to={`/editor/${articleDetail.slug}`}>
            <i className="ion-edit" /> Edit Article
          </NavLink>
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </span>
      ) : (
        <>
          <FollowAuthorButton articleDetail={articleDetail} ClickFollowButton={ClickFollowButton} following={following}>
            &nbsp;&nbsp;
          </FollowAuthorButton>

          <FavoriteArticleButton favorite={favorite} count={count} ClickFavoriteButton={ClickFavoriteButton} />
        </>
      )}
    </div>
  );
};

export default ArticleMeta;
