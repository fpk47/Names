import { Action } from 'redux';

enum ActionTypes {
    COUNTER_CHANGE = 'COUNTER_CHANGE',
    COUNTER_RESET = 'COUNTER_RESET',
}

interface CounterChange extends Action {
    type: ActionTypes.COUNTER_CHANGE;
    payload: number;
}

interface CounterReset extends Action {
    type: ActionTypes.COUNTER_RESET;
}

type Actions = CounterChange | CounterReset;

export { ActionTypes, Actions };
