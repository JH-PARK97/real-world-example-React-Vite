import { json, redirect } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

const handleArticleSubmit = async (ctx) => {
  const formData = await ctx.request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const body = formData.get("body");
  const tagList = formData.get("tagList") ? JSON.parse(formData.get("tagList")) : [];
  const errors = {};
  
  console.log(typeof tagList);
  console.log(tagList);
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
          tagList,
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
          tagList,
        },
      });
      console.log("response : ", response);
      console.log(title, tagList, description, body);
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

          default:
            console.log(e);
        }
      }
    }
  }
  return null;
};

export default handleArticleSubmit;
