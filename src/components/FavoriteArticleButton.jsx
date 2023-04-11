import React from "react";

const FavoriteArticleButton = ({ favorite, count, ClickFavoriteButton }) => {
  return (
    <button
      onClick={() => {
        ClickFavoriteButton();
      }}
      type="button"
      className={"btn btn-sm" + (favorite ? " btn-primary" : " btn-outline-primary")}
    >
      <i className="ion-heart" />
      &nbsp; {favorite ? "Unfavorite" : "Favorite"} Article <span className="counter">({count})</span>
    </button>
  );
};

export default FavoriteArticleButton;
