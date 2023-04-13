import React, { useState } from "react";
import { Form, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getCommentsList, postComment } from "../api/API";
import { API_ENDPOINTS, PAGE_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const ArticleCommentForm = ({ getComments }) => {
  const { userProfile } = useOutletContext();
  const [commentValue, setCommentValue] = useState("");
  const params = useParams();

  const handleCommentInput = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postComment(params.slug, commentValue);
    setCommentValue("");
    const commentList = await instance.get(`${API_ENDPOINTS.ARTICLE.COMMENT.ROOT(params.slug)}`);
    getComments(commentList.data.comments);
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="card comment-form"
      method="post"
    >
      <div className="card-block">
        <textarea value={commentValue} onChange={handleCommentInput} name="body" required className="form-control" placeholder="Write a comment..." rows={3} />
      </div>
      <div className="card-footer">
        <img src={userProfile?.image} className="comment-author-img" />
        <button type="submit" className="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </Form>
  );
};

export default ArticleCommentForm;
