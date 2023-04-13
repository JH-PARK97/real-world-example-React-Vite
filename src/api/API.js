import { json } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

/**
 *
 * @param {import('react-router-dom').LoaderFunctionArgs} ctx
 * @returns
 */
export const getArticlesList = async (ctx) => {
  const url = new URL(ctx.request.url);

  // url에서 pageNo를 제거하여 API 호출할 때 offset만 이용할 수 있도록 함
  url.searchParams.delete("pageNo");
  const qs = url.searchParams.toString();
  const apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}/${qs ? `?${qs}` : ""}`;
  return await instance.get(apiURL);
};

export const getArticlesDetail = async ({ params }) => {
  return await instance.get(`${API_ENDPOINTS.ARTICLE.DETAIL(params.slug ? params.slug : "")}`);
};

export const getTagsList = async () => {
  return await instance.get(`${API_ENDPOINTS.TAGS.ROOT}`);
};

export const getCommentsList = async ({ params }) => {
  try {
    const response = await instance.get(`${API_ENDPOINTS.ARTICLE.COMMENT.ROOT(params.slug)}`);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get(API_ENDPOINTS.USER.ROOT);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.log("로그인 안한 상태");
      return error;
    }
    return error;
  }
};

export const clickFavoriteButton = async (slug, method) => {
  try {
    const response = await instance[method](API_ENDPOINTS.ARTICLE.FAVORITE.DETAIL(slug));
    const favorited = response.data.article.favorited;
    console.log("clickFavoriteButton 클릭");
    console.log(favorited);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickFollowButton = async (username, method) => {
  try {
    const response = await instance[method](API_ENDPOINTS.PROFILES.FOLLOW(username));
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteArticle = async (slug) => {
  const response = await instance.delete(`${API_ENDPOINTS.ARTICLE.DETAIL(slug)}`);
  console.log(response);
  return response;
};

export const postComment = async (slug, data) => {
  try {
    const response = await instance.post(`${API_ENDPOINTS.ARTICLE.COMMENT.ROOT(slug)}`, {
      comment: {
        body: data,
      },
    });

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
