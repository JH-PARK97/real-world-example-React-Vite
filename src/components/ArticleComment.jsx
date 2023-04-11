import React from "react";
import { NavLink } from "react-router-dom";

const ArticleComment = ({ comment }) => {
  const canDelete = true;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      {comment.id && (
        <div className="card-footer">
          <NavLink to={`/profile/${comment.author?.username}`} className="comment-author">
            <img src={comment.author?.image} className="comment-author-img" />
          </NavLink>
          &nbsp;
          <NavLink to={`/profile/${comment.author?.username}`} className="comment-author">
            {comment.author?.username}
          </NavLink>
          <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
          {canDelete && (
            <span className="mod-options">
              <i className="ion-trash-a" onClick={() => mutate({ commentId: comment.id })} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleComment;
