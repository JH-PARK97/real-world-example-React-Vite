import React from "react";

const PopularTags = ({ tags }) => {
  return (
    <div style={{}} className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags?.map((tag) => (
          <a href="#" key={tag} className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
