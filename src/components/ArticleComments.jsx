import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import ArticleComment from "./ArticleComment";
import ArticleCommentForm from "./ArticleCommentForm";

const ArticleComments = () => {
  const commentsList = useLoaderData().data.comments;
  const isAuth = true;

  if (!isAuth) {
    return (
      <p>
        <NavLink to="/login">Sign in</NavLink> or <NavLink to="/register">sign up</NavLink> to add comments on this article.
      </p>
    );
  }
  return (
    <>
      <ArticleCommentForm />
      {commentsList.map((comment) => (
        <ArticleComment key={comment?.id} comment={comment} />
      ))}
    </>
  );
};

export default ArticleComments;
