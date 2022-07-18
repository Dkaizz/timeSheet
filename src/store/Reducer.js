import { createTasks, removeTasks, requestTasks, updateTasks } from '~/apiServices/tasksServices';
import { ADD_DATA_INPUT, DELETE_DATA_INPUT, SET_DATA_INPUT, EDIT_DATA_INPUT } from './Constants';

export const initState = {
  data: requestTasks(),
  dataInput: {},
};

function reducer(state, action) {
  switch (action.type) {
    case SET_DATA_INPUT:
      return {
        data: requestTasks(),
      };
    case ADD_DATA_INPUT:
      console.log('push dữ liệu');
      createTasks(action.payload);
      const data = requestTasks();
      return {
        data: data,
      };

    case EDIT_DATA_INPUT:
      updateTasks(action.id, action.payload);
      const data2 = requestTasks();
      return {
        data: data2,
      };

    case DELETE_DATA_INPUT:
      removeTasks(action.id);
      const data3 = requestTasks();
      return {
        data: data3,
      };

    default:
      throw new Error('Invalid action');
  }
}

export default reducer;
