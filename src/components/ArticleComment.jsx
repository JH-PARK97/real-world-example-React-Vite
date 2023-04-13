import React from "react";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { deleteComment } from "../api/API";
import instance from "../utils/interceptor";
import { API_ENDPOINTS } from "../constants/constants";

const ArticleComment = ({ comment, getComments }) => {
  const { userProfile } = useOutletContext();
  const canDelete = comment.author.username === userProfile.username;
  const params = useParams();

  const clickDeleteCommentButton = async () => {
    await deleteComment(params.slug, comment.id);
    const commentList = await instance.get(`${API_ENDPOINTS.ARTICLE.COMMENT.ROOT(params.slug)}`);
    getComments(commentList.data.comments);
  };
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
              <i className="ion-trash-a" onClick={() => clickDeleteCommentButton()} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleComment;
