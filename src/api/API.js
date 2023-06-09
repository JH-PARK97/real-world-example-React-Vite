import { API_ENDPOINTS } from "../constants/constants";
import instance from "../utils/interceptor";

/**
 *
 * @param {import('react-router-dom').LoaderFunctionArgs} ctx
 * @returns
 */
export const getArticlesList = async (ctx) => {
  const url = new URL(ctx.request.url);
  const username = ctx.params.username;
  const feed = url.searchParams.get("feed");
  let apiURL = "";
  // url에서 pageNo를 제거하여 API 호출할 때 offset만 이용할 수 있도록 함
  url.searchParams.delete("pageNo");
  const qs = url.searchParams.toString();

  if (!feed) {
    apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}/${qs ? `?${qs}` : ""}${username ? `?author=${username}` : ""}`;
  } else {
    apiURL = `${API_ENDPOINTS.ARTICLE.FEED}/${qs ? `?${qs}` : ""}`;
  }

  const response = await instance.get(apiURL);
  return response;
};

export const getProfileArticlesList = async (ctx) => {
  const url = new URL(ctx.request.url);
  const username = ctx.params.username;
  const author = url.searchParams.get("author");
  const favorited = url.searchParams.get("favorited");
  let apiURL = "";
  url.searchParams.delete("pageNo");
  url.searchParams.delete("author");
  url.searchParams.delete("favorited");
  const qs = url.searchParams.toString();
  if (author) {
    apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}?author=${username}&${qs ? `${qs}` : ""}`;
  } else {
    apiURL = `${API_ENDPOINTS.ARTICLE.ROOT}?favorited=${username}&${qs ? `${qs}` : ""}`;
  }
  const response = await instance.get(apiURL);
  return response;
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
      console.log(error);
      return error;
    }
    return error;
  }
};

export const clickFavoriteButton = async (slug, method) => {
  try {
    const response = await instance[method](API_ENDPOINTS.ARTICLE.FAVORITE.DETAIL(slug));
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickFollowButton = async (username, method) => {
  try {
    const response = await instance[method](API_ENDPOINTS.PROFILES.FOLLOW(username));
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteArticle = async (slug) => {
  const response = await instance.delete(`${API_ENDPOINTS.ARTICLE.DETAIL(slug)}`);
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

export const deleteComment = async (slug, id) => {
  try {
    const response = await instance.delete(`${API_ENDPOINTS.ARTICLE.COMMENT.DELETE(slug, id)}`);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
