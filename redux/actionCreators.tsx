import { Action } from 'redux';
import { Response } from '../libs/randomUser';

enum ActionTypes {
    ADD_USERS = 'ADD_USERS',
    CHANGE_FAVORITE = 'CHANGE_FAVORITE',
    REMOVE_FAVORITES = 'REMOVE_FAVORITES',
    RESET = 'RESET',
}

interface AddUsers extends Action {
    type: ActionTypes.ADD_USERS;
    payload: Response['results'];
}

interface ChangeFavorite extends Action {
    type: ActionTypes.CHANGE_FAVORITE;
    payload: string;
}

interface RemoveFavorites extends Action {
    type: ActionTypes.REMOVE_FAVORITES;
}
interface Reset extends Action {
    type: ActionTypes.RESET;
}

type Actions = AddUsers | ChangeFavorite | RemoveFavorites | Reset;

export { ActionTypes, Actions };
