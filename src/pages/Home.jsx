import React from "react";
import ArticleList from "../components/ArticleList";
import { useLoaderData } from "react-router-dom";
import useAuth from "../store/store";

const Home = () => {
  const article = useLoaderData().data;

  return (
    <>
      <title>Home</title>

      <ArticleList article={article} />
    </>
  );
};

export default Home;
