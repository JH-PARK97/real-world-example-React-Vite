import { json, redirect } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const handleArticleSubmit = async (ctx) => {
  const formData = await ctx.request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const body = formData.get("body");
  const tags = formData.get("tags ");
  const errors = {};

  console.log("ctx.params : ", ctx.params.slug);
  console.log(ctx);

  if (typeof title !== "string" || !title) {
    errors.title = "title이 공백입니다.";
  }

  if (typeof description !== "string" || !description) {
    errors.description = "description이 공백입니다.";
  }

  if (typeof body !== "string" || !body) {
    errors.body = "body가 공백입니다.";
  }
  if (Object.keys(errors).length) {
    return json(errors);
  }

  if (!ctx.params.slug) {
    try {
      const response = await instance.post(API_ENDPOINTS.ARTICLE.ROOT, {
        article: {
          title,
          description,
          body,
          tags,
        },
      });
      console.log("response : ", response);
      if (response.status === 200) {
        return redirect(`/article/${response.data.article.slug}`);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response.status) {
          case 422:
            const axiosError = e.response.data.errors;
            if (axiosError) {
              Object.keys(axiosError).map((key) => {
                if (axiosError[key]) {
                  errors[key] = axiosError[key][0];
                }
              });
              return json(errors);
            }
            break;
        }
      }
    }
  } else {
    try {
      const response = await instance.put(API_ENDPOINTS.ARTICLE.DETAIL(ctx.params.slug), {
        article: {
          title,
          description,
          body,
          tags,
        },
      });
      console.log("response : ", response);
      if (response.status === 200) {
        return redirect(`/article/${response.data.article.slug}`);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response.status) {
          case 422:
            const axiosError = e.response.data.errors;
            if (axiosError) {
              Object.keys(axiosError).map((key) => {
                if (axiosError[key]) {
                  errors[key] = "중복되는 title입니다.";
                }
              });
              return json(errors);
            }
            break;
        }
      }
    }
  }
  return null;
};

export default handleArticleSubmit;
