import React from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import TagsInput from "../components/TagsInput";
import { useFetcher } from "react-router-dom";

const Editor = () => {
  const errors = useActionData();
  const articleUpdateData = useLoaderData().data.article;
  const fetcher = useFetcher();

  if (errors) {
    console.log(errors);
  }

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
