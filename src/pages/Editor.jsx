import React, { useState } from "react";
import { Form, useActionData, useFetcher, useLoaderData } from "react-router-dom";

const Editor = () => {
  const errors = useActionData();
  const articleUpdateData = useLoaderData().data.article;
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const fetcher = useFetcher();
  const handleTagInputChange = (event) => {
    setTagInputValue(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTags([...tags, tagInputValue]);
      setTagInputValue("");
    }
  };

  console.log(tags);

  if (errors) {
    console.log(errors);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("tagList", JSON.stringify(tags));
    fetcher.submit(formData, { method: "post" });
  };

  console.log(articleUpdateData);
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form method="post" onSubmit={onSubmit}>
              <fieldset className="form-group">
                <input
                  style={{
                    marginBottom: 15,
                    marginTop: 15,
                  }}
                  type="text"
                  name="title"
                  className="form-control form-control-lg"
                  placeholder="Article Title"
                  defaultValue={articleUpdateData?.title}
                />
                {errors?.title && <span>{errors.title}</span>}
              </fieldset>
              <fieldset className="form-group">
                <input name="description" type="text" className="form-control" placeholder="What's this article about?" defaultValue={articleUpdateData?.description} />
                {errors?.description && <span>{errors.description}</span>}
              </fieldset>
              <fieldset className="form-group">
                <textarea name="body" className="form-control" rows={8} placeholder="Write your article (in markdown)" defaultValue={articleUpdateData?.body} />
                {errors?.body && <span>{errors.body}</span>}
              </fieldset>
              <fieldset className="form-group">
                <input type="text" className="form-control" placeholder="Enter tags" value={tagInputValue} onChange={handleTagInputChange} onKeyDown={handleTagInputKeyDown} />
                <div className="tag-list">
                  {tags.map((tag) => (
                    <span className="tag-default tag-pill">
                      <i className="ion-close-round" onClick={() => setTags(tags.filter((item) => item !== tag))} />
                      {tag}
                    </span>
                  ))}
                </div>
              </fieldset>
              <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
