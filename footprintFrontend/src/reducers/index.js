"user strict";

import { combineReducers } from 'redux';
import comment from './comment';
import filter from './filter';
const myReducer = combineReducers({
  comment,
  filter,
})

export default myReducer;
