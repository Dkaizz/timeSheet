import * as request from '~/utils/request';

export const requestUser = async () => {
  try {
    const res = await request.get(`users`);
    return res;
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
