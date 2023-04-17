import React from "react";
import ArticleList from "../components/ArticleList";
import { useLoaderData, useOutletContext } from "react-router-dom";

const Home = () => {
  const article = useLoaderData().data;

  const { tagsArticle, qsTag, qsFeed } = useOutletContext();

  return (
    <>
      <title>Home</title>

      <ArticleList article={tagsArticle ? tagsArticle : article} qsTag={qsTag} qsFeed={qsFeed} />
    </>
  );
};

export default Home;
