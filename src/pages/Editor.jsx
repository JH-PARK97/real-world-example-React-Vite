import React from "react";
import { Form } from "react-router-dom";
import TagsInput from "../components/TagsInput";

const Editor = () => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Form method="post" replace>
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
                />
              </fieldset>
              <fieldset className="form-group">
                <input name="description" type="text" className="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset className="form-group">
                <textarea name="body" className="form-control" rows={8} placeholder="Write your article (in markdown)" />
              </fieldset>
              <fieldset className="form-group">
                <TagsInput />
              </fieldset>
              <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
