import React from "react";
import ArticleList from "../components/ArticleList";
import { useLoaderData, useOutletContext } from "react-router-dom";
import useAuth from "../store/store";

const Home = () => {
  const article = useLoaderData().data;

  const tagsArticle = useOutletContext();

  return (
    <>
      <title>Home</title>

      <ArticleList article={tagsArticle ? tagsArticle : article} />
    </>
  );
};

export default Home;
