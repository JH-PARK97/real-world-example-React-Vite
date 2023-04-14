import React from "react";

const PopularTags = ({ tags, onTagClick }) => {

  
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      className="sidebar"
    >
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags?.map((tag) => (
          <a
            onClick={() => {
              onTagClick(tag);
            }}
            key={tag}
            className="tag-pill tag-default"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
