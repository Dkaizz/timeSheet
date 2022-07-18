import * as request from '~/utils/request';

export const requestTags = async () => {
  try {
    const res = await request.get(`tags`);
    return res;
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
