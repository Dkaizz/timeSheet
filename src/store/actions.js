import { ADD_DATA_INPUT, DELETE_DATA_INPUT, EDIT_DATA_INPUT, SET_DATA_INPUT } from './Constants';
export const setDataInput = () => ({
  type: SET_DATA_INPUT,
});

export const addDataInput = payload => ({
  type: ADD_DATA_INPUT,
  payload: payload,
});

export const removeDataInput = id => ({
  type: DELETE_DATA_INPUT,
  id: id,
});

export const editDataInput = (payload, id) => ({
  type: EDIT_DATA_INPUT,
  payload: payload,
  id: id,
});
