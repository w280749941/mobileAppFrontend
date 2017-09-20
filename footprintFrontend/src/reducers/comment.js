"use strict";
import * as CommentActionTypes from '../actiontypes/comment';
import * as myData from './ExampleData';

const initialState = {
  comments: myData.emptyData,
  selectedCommentId: 0,
  longitude: -73.92506,
  latitude: 40.8275556,
}

const comment = (state = initialState, action) => {
  switch(action.type) {
    case CommentActionTypes.ON_DATA:
      return {
        ...state,
        comments: action.comments,
      };
    case CommentActionTypes.ON_POST:
      return {
        ...state,
        comments: state.comments.push(action.comment),
      };
    case CommentActionTypes.ON_VOTE:
      const onVoteComment = state.comments.map((comment, index) => {
        if(comment._id === action.id){
          return {
            ...comment,
             vote: comment.vote + action.vote,
           };
        }
        return comment;
      });
      return {
        ...state,
        comments: onVoteComment
      };

    case CommentActionTypes.ON_LOCATION:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude
      };

    case CommentActionTypes.SELECT_COMMENT:
      return {
        ...state,
        selectedCommentId: action.index
      };

    case CommentActionTypes.ON_MAP_REFERENCE:
      return {
        ...state,
        mapReference: action.object
      };

    case CommentActionTypes.ON_MARKERS_REFERENCE:
      return {
        ...state,
        markersReference: action.object
      };

    default:
      return state;
  }
}

export default comment;
