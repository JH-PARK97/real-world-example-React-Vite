import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ArticleMeta from "../components/ArticleMeta";
import { clickFavoriteButton, clickFollowButton } from "../api/API";
import useAuth from "../store/store";
import { PAGE_ENDPOINTS } from "../constants/constants";

const ArticleLayout = ({ userProfile }) => {
  const articleDetail = useLoaderData().data.article;
  const [favorite, setFavorite] = useState(articleDetail.favorited);
  const [count, setCount] = useState(articleDetail.favoritesCount);
  const [following, setFollowing] = useState(articleDetail.author.following);

  const { isLogin } = useAuth();

  const navigate = useNavigate();

  const ClickFavoriteButton = async () => {
    if (!isLogin) {
      return navigate(PAGE_ENDPOINTS.AUTH.LOGIN);
    }

    if (favorite) {
      try {
        const result = await clickFavoriteButton(articleDetail.slug, "delete");
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    } else {
      try {
        const result = await clickFavoriteButton(articleDetail.slug, "post");
        setFavorite(result.data.article.favorited);
        setCount(result.data.article.favoritesCount);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };

  const ClickFollowButton = async () => {
    console.log(following)
    if (!isLogin) {
      return navigate(PAGE_ENDPOINTS.AUTH.LOGIN);
    }
    if (following) {
      try {
        const result = await clickFollowButton(articleDetail.author.username, "delete");
        setFollowing(result.data.profile.following);
      
      } catch (e) {
        console.log(e);
        return e;
      }
    } else {
      try {
        const result = await clickFollowButton(articleDetail.author.username, "post");
        setFollowing(result.data.profile.following);
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
            <ArticleMeta ClickFollowButton={ClickFollowButton} following={following} articleDetail={articleDetail} favorite={favorite} count={count} ClickFavoriteButton={ClickFavoriteButton} />
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
            <ArticleMeta ClickFollowButton={ClickFollowButton} following={following} articleDetail={articleDetail} favorite={favorite} count={count} ClickFavoriteButton={ClickFavoriteButton} />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <Outlet context={{ userProfile }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleLayout;
