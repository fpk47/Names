import { useDispatch, useSelector } from "react-redux";
import { Actions } from "./actionCreators";
import { Dispatch } from 'react';
import { RootState } from "./types";

const useTypedDispatch = () => useDispatch<Dispatch<Actions>>();
const useTypedSelector = () => useSelector<RootState, RootState>(state => state);

export { useTypedDispatch, useTypedSelector }