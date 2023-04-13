import React from "react";
import { PAGE_ENDPOINTS } from "../constants/constants";
import { deleteArticle } from "../api/API";
import { useNavigate, useOutletContext } from "react-router-dom";

const DeleteArticleButton = ({ articleSlug }) => {

  const navigate = useNavigate();

  const clickdeleteArticleButton = () => {
    deleteArticle(articleSlug);
    return navigate(PAGE_ENDPOINTS.ROOT);
  };
  return (
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      onClick={() => {
        clickdeleteArticleButton();
      }}
    >
      <i className="ion-trash-a" /> Delete Article
    </button>
  );
};

export default DeleteArticleButton;
