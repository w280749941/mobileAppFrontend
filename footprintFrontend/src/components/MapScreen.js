import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommentActionCreators from '../actions/comment';
import MapViewScreen from './MapViewScreen';

const filteredComments = (comments, filter) => {
  switch(filter) {
    case 'RANDOM_SORT':
      return shuffleArray(comments);
    case 'VOTE_SORT':
      return comments.sort(sortByVote);
    case 'DATE_SORT':
      return comments.sort(sortByDate);
    default:
      return comments;
  }
}
const shuffleArray = arr => {return arr.sort(() => (Math.random() - 0.5))};
const sortByVote = (a,b) => {return b.vote - a.vote;};
const sortByDate = (a,b) => {
  return new Date(b.postTime) - new Date(a.postTime);
};

const mapStateToProps = state => {
  return {
    comments: filteredComments(state.comment.comments,state.filter),
    selectedCommentId: state.comment.selectedCommentId,
    longitude: state.comment.longitude,
    latitude: state.comment.latitude,
    markersReference: state.comment.markersReference,
    mapReference: state.comment.mapReference,
    filter: state.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDataReceived: bindActionCreators(CommentActionCreators.onDataReceived, dispatch),
    onPost: bindActionCreators(CommentActionCreators.onPost, dispatch),
    onSelectComment: bindActionCreators(CommentActionCreators.onSelectComment, dispatch),
    onVote: bindActionCreators(CommentActionCreators.onVote, dispatch),
    onLocation: bindActionCreators(CommentActionCreators.onLocation, dispatch),
    onSort: bindActionCreators(CommentActionCreators.onSort, dispatch),
  }
}

const MapScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapViewScreen)

export default MapScreen;
