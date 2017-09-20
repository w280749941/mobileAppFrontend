import * as CommentActionTypes from '../actiontypes/comment';

const filter = (state = "SHOW_ALL", action) => {
  switch(action.type) {
    case CommentActionTypes.ON_SORT:
      return action.filter;
    default:
      return state;
  }
}

export default filter
