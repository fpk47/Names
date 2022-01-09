import { ActionTypes, Actions } from './actionCreators';
import { RootState } from './types';

const initialState: RootState = {};

const generalReducer = (state = initialState, action: Actions): RootState => {
  switch (action.type) {
    case ActionTypes.ADD_USERS: {
      const newState = { ...state };
      action.payload.forEach((user) => {
        const id = user.login.uuid;

        if (!newState[id]) {
          newState[id] = {
            data: user,
            favorite: false,
          };
        }
      });

      if (JSON.stringify(newState) !== JSON.stringify(state)) {
        return newState;
      }

      return state;
    }
    case ActionTypes.CHANGE_FAVORITE: {
      const newState = { ...state };

      if (newState[action.payload]) {
        newState[action.payload].favorite = !newState[action.payload].favorite;
      }

      return newState;
    }
    case ActionTypes.REMOVE_FAVORITES: {
      const newState = { ...state };

      Object.keys(newState).forEach((key) => {
        newState[key].favorite = false;
      });

      return newState;
    }
    case ActionTypes.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export { generalReducer };
