import React from "react";
import { PAGE_ENDPOINTS } from "../constants/constants";
import { DeleteArticle } from "../api/API";
import { useNavigate } from "react-router-dom";

const DeleteArticleButton = ({ articleSlug }) => {
  const navigate = useNavigate();
  console.log(articleSlug);
  const clickDeleteArticleButton = () => {
    DeleteArticle(articleSlug);
    return navigate(PAGE_ENDPOINTS.ROOT);
  };
  return (
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      onClick={() => {
        clickDeleteArticleButton();
      }}
    >
      <i className="ion-trash-a" /> Delete Article
    </button>
  );
};

export default DeleteArticleButton;
