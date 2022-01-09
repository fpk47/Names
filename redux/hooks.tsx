import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { Actions } from './actionCreators';
import { RootState } from './types';

const useTypedDispatch = () => useDispatch<Dispatch<Actions>>();
const useTypedSelector = () => useSelector<RootState, RootState>((state) => state);

export { useTypedDispatch, useTypedSelector };
