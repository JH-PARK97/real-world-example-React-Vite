import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import ArticleMeta from "../components/ArticleMeta";
import { clickFavoriteButton, clickUnFavoriteButton } from "../api/API";

const ArticleLayout = () => {
  const articleDetail = useLoaderData().data.article;
  const [favorite, setFavorite] = useState(articleDetail.favorited);
  const [count, setCount] = useState(articleDetail.favoritesCount);
  console.log(articleDetail);

  const ClickFavoriteButton = async () => {
    if (favorite) {
      try {
        const result = await clickUnFavoriteButton(articleDetail.slug);
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    } else {
      try {
        const result = await clickFavoriteButton(articleDetail.slug);
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };

  return (
    <>
      <title>{articleDetail.title}</title>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articleDetail.title}</h1>
            <ArticleMeta articleDetail={articleDetail} favorite={favorite} count={count} ClickFavoriteButton={ClickFavoriteButton} />
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{articleDetail.description}</p>
              <p>{articleDetail.body}</p>
            </div>
          </div>
          <div>
            <ul className="tag-list">
              {articleDetail.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="article-actions">
            <ArticleMeta articleDetail={articleDetail} favorite={favorite} count={count} ClickFavoriteButton={ClickFavoriteButton} />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleLayout;
