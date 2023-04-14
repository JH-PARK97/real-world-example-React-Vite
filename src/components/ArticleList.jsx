import React from "react";
import { NavLink } from "react-router-dom";
import FeedArticleFavoriteButton from "./FeedArticleFavoriteButton";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/store";

const ArticleList = ({ article }) => {
  const limit = 10;
  const navigate = useNavigate();


  // Change page
  const clickPageButton = (pageNumber) => {
    // 페이지 버튼 클릭시 URLSearchParams를 이용해서 URL에 queryString으로 parameter를 붙여줌
    const searchParams = new URLSearchParams();

    searchParams.append("pageNo", pageNumber.toString());
    searchParams.append("offset", (limit * (pageNumber - 1)).toString());
    navigate("/?" + searchParams.toString());
  };

  return (
    <>
      <ul
        style={{
          listStyleType: "none",
          marginLeft: "-35px",
        }}
      >
        {article?.articles?.map((article) => (
          <div key={article.slug} className="article-preview">
            <div className="article-meta">
              <div className="info" style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <img src={article.author.image} />

                  <div>
                    <NavLink
                      to={`/profile/${article?.author?.username}`}
                      className="author ng-binding"
                      style={{
                        color: "#5CB85C",
                      }}
                    >
                      {article.author.username}
                    </NavLink>

                    <p className="date">{new Date(article.createdAt).toDateString()}</p>
                  </div>
                </div>

                <FeedArticleFavoriteButton className="pull-xs-right" favorited={article.favorited} slug={article.slug} favoritesCount={article.favoritesCount} />
              </div>
            </div>
            <NavLink to={`/article/${article.slug}`} className="preview-link">
              <h1 className="ng-binding">{article.title}</h1>
              <span
                className="ng-binding"
                style={{
                  fontSize: 16,
                }}
              >
                {article.description}
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <p>Read more...</p>
                <ul className="tag-list">
                  {article.tagList.map((tag) => (
                    <li key={tag} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </NavLink>
          </div>
        ))}
        <Pagination limit={limit} totalCount={article?.articlesCount} clickPageButton={clickPageButton} />
      </ul>
    </>
  );
};

export default ArticleList;
