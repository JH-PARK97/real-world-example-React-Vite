import axios from "axios";
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
  return await instance.get(`${API_ENDPOINTS.ARTICLE.DETAIL(params.slug)}`);
};

export const getTagsList = async () => {
  return await instance.get(`${API_ENDPOINTS.TAGS.ROOT}`);
};

export const getCommentsList = async ({ request, params }) => {
  const url = new URL(request.url);

  return await instance.get(`${API_ENDPOINTS.ARTICLE.COMMENT.ROOT(params.slug)}`);
};

export const getProfile = async () => {
  try {
    const response = await instance.get(API_ENDPOINTS.USER.ROOT);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickFavoriteButton = async (slug) => {
  try {
    const response = await instance.post(API_ENDPOINTS.ARTICLE.FAVORITE.DETAIL(slug));
    const favorited = response.data.article.favorited;
    console.log("clickFavoriteButton 클릭");
    console.log(favorited);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickUnFavoriteButton = async (slug) => {
  try {
    const response = await instance.delete(API_ENDPOINTS.ARTICLE.FAVORITE.DETAIL(slug));
    const favorited = response.data.article.favorited;
    console.log("clickUnFavoriteButton 클릭");
    console.log(favorited);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickFollowButton = async (username) => {
  try {
    const response = await instance.post(API_ENDPOINTS.PROFILES.FOLLOW(username));
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const clickUnfollowButton = async (username) => {
  try {
    const response = await instance.delete(API_ENDPOINTS.PROFILES.FOLLOW(username));
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
