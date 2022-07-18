import * as request from '~/utils/request';

export const search = async (q, type = 'less') => {
  try {
    const res = await request.get(`/`, {
      params: {
        q,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
