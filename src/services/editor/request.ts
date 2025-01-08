import { httpClient } from '../request';
import { ArticleTag, ArticleType } from './types';

// 获取文章类型
export const getArticleType = async () => {
  try {
    const response = await httpClient.request<ArticleType[]>({
      url: '/api/v1/article/categories',
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 获取所有标签
export const getAllTags = async () => {
  try {
    const response = await httpClient.request<ArticleTag[]>({
      url: '/api/v1/article/tags',
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
