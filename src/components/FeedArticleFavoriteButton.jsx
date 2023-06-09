import React, { useState } from "react";
import { clickFavoriteButton } from "../api/API";
import useAuth from "../store/store";
import { useNavigate } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../constants/constants";

const FeedArticleFavoriteButton = ({ favoritesCount, favorited, slug }) => {
  const [count, setCount] = useState(favoritesCount);
  const [favorite, setFavorite] = useState(favorited);

  const { isLogin } = useAuth((state) => ({
    isLogin: state.isLogin,
  }));

  const navigate = useNavigate();
  const ClickFavoriteButton = async () => {
    if (!isLogin) {
      return navigate(PAGE_ENDPOINTS.AUTH.LOGIN);
    }
    if (favorite) {
      try {
        const result = await clickFavoriteButton(slug, "delete");
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    } else {
      try {
        const result = await clickFavoriteButton(slug, "post");
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };
  return (
    <button
      style={{ height: 30 }}
      onClick={() => {
        ClickFavoriteButton();
      }}
      type="button"
      className={"btn btn-sm" + (favorite ? " btn-primary" : " btn-outline-primary")}
    >
      <i className="ion-heart" />
      &nbsp; <span className="counter">{count}</span>
    </button>
  );
};

export default FeedArticleFavoriteButton;
