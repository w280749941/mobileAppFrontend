"use strict";
import * as CommentActionTypes from '../actiontypes/comment';

export const onDataReceived = comments => {
  return {
    type: CommentActionTypes.ON_DATA,
    comments
  }
}

export const onPost = comment => {
  return {
    type: CommentActionTypes.ON_POST,
    comment
  }
}

export const onVote = (vote,id) => {
  return {
    type: CommentActionTypes.ON_VOTE,
    id,
    vote
  }
}


export const onSelectComment = index => {
  return {
    type: CommentActionTypes.SELECT_COMMENT,
    index
  };
};

export const onSort = filter => {
  return {
    type: CommentActionTypes.ON_SORT,
    filter
  }
}

export const onLocation = (longitude, latitude) => {
  return {
    type: CommentActionTypes.ON_LOCATION,
    longitude,
    latitude
  }
}

export const onMapReference = object => {
  return {
    type: CommentActionTypes.ON_MAP_REFERENCE,
    object
  }
};

export const onMakersReference = object => {
  return {
    type: CommentActionTypes.ON_MARKERS_REFERENCE,
    object
  }
};
