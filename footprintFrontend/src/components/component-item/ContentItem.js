"use strict";
import React from 'React';
import {StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import * as globalServices from '../../services';

/*
  Render a single comment,
*/
const ContentItem = props => {
  const _onVote = (vote,id) => {
    if (id !== undefined) {
      const message = {
        id: id,
      }
      let restUrl;
      if(vote === 1){
        restUrl = `${globalServices.BASE_URL}/posts/voteup`;
      } else {
        restUrl = `${globalServices.BASE_URL}/posts/votedown`;
      }
      const callBack = () => {
        props.onVote(vote,id);
      }
      globalServices.postRequest(restUrl,"POST",message,callBack);
    } else {
      // development
      console.log("Not available to vote");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.idStyle}>{props.selectedComment._id}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text onPress={() => props.onVote(1,props.selectedComment._id)}>
            <Image
              style={styles.upStyle}
              source={require('../../util/icons/like.png')}
            />
          </Text>
          <Text style={styles.voteStyle}>Votes: {props.selectedComment.vote}</Text>
          <Text onPress={() => props.onVote(-1,props.selectedComment._id)}>
            <Image
              style={styles.downStyle}
              source={require('../../util/icons/dislike.png')}
            />
          </Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentStyle}>{props.selectedComment.text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.25,
  },
  idContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  commentContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upStyle: {
    height: 25,
    width: 25,
  //  tintColor: 'red',
  },
  downStyle: {
    height: 25,
    width: 25,
  },
  idStyle: {
    color: "#81bbfe",
    paddingLeft: 5,
  },
  voteStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: "rgb(6, 147, 249)",
  },
  commentStyle: {
  },
})
export default ContentItem;
