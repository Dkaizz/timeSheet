import * as request from '~/utils/request';

export const requestTasks = async () => {
  try {
    const res = await request.get(`tasks`);
    console.log('res:', res);
    return res;
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};

export const createTasks = data => {
  try {
    return request.create(`tasks`, data);
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
export const updateTasks = (id, data) => {
  try {
    return request.update(`tasks/${id}`, data);
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};

export const removeTasks = id => {
  try {
    return request.remove(`tasks/${id}`);
  } catch (error) {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
