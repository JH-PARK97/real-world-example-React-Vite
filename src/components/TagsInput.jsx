import React from "react";
import { Form } from "react-router-dom";

const TagsInput = ({}) => {
  const field = {};
  return (
    <>
      <Form>
        <input
          onKeyDown={(/** @type {import('react').KeyboardEvent<HTMLInputElement>} */ e) => {
            // @ts-ignore
            const { value } = e.target;

            if (e.key === "Enter") {
              e.preventDefault();

              Form.setFieldValue(field.name, [...field.value, value]);

              // @ts-ignore
              e.target.value = "";
            }
          }}
          type="text"
          className="form-control"
          placeholder="Enter tags"
          name="tags"
        />
        <div className="tag-list">
          {field.value &&
            field.value.map((tag) => (
              <span className="tag-default tag-pill">
                <i
                  className="ion-close-round"
                  onClick={() =>
                    Form.setFieldValue(
                      field.name,
                      field.value.filter((item) => item !== tag)
                    )
                  }
                />
                {tag}
              </span>
            ))}
          {/* {field.value.map((tag) => (
        <span className="tag-default tag-pill">
          <i
            className="ion-close-round"
            onClick={() =>
              Form.setFieldValue(
                field.name,
                field.value.filter((item) => item !== tag)
              )
            }
          />
          {tag}
        </span>
      ))} */}
        </div>
      </Form>
    </>
  );
};

export default TagsInput;
