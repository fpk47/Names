import { ActionTypes, Actions } from './actionCreators';
import { RootState } from './types';

const initialState: RootState = {
  count: 0,
};

const generalReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload,
      };
    case ActionTypes.COUNTER_RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

export { generalReducer };
