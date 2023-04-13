import React from "react";
import ArticleLayout from "../components/ArticleLayout";
import { useOutletContext } from "react-router-dom";

const Article = () => {
  const { userProfile } = useOutletContext();
  return (
    <>
      <ArticleLayout userProfile={userProfile} />
    </>
  );
};

export default Article;
