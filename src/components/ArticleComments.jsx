import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData, useOutletContext } from "react-router-dom";
import ArticleComment from "./ArticleComment";
import ArticleCommentForm from "./ArticleCommentForm";
import useAuth from "../store/store";

const ArticleComments = () => {
  const data = useLoaderData().data.comments;
  const [commentsList, setCommentList] = useState(data);
  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  const getComments = (data) => {
    setCommentList(data);
  };

  console.log(commentsList);
  if (!isLogin) {
    return (
      <p>
        <NavLink to="/login">Sign in</NavLink> or <NavLink to="/register">sign up</NavLink> to add comments on this article.
      </p>
    );
  }
  return (
    <>
      <ArticleCommentForm getComments={getComments} />
      {commentsList.map((comment) => (
        <ArticleComment key={comment?.id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
