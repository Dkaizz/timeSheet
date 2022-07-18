import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option) => {
  const response = await request.get(path, option);
  return response.data;
};

export const create = (path, data) => {
  //   console.log('path: ' + path + ' data: ' + data);
  return request.post(path, data);
};

export const update = (path, data) => {
  console.log('path: ' + path + ' data: ' + data);
  return request.put(path, data);
};

export const remove = path => {
  return request.delete(path);
};
export default request;
