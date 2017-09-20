"use strict";
import React from 'React';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';

const ContentListView = props => {
  const _keyExtractor = (item, index) => item._id;
  const _renderItem = ({item, index}) => (
    <ListItem
      comment={item}
      index={index}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    />
  );
  if(props.comments.length < 1) {
    return (
      <View style={styles.noContent}>
        <Text>No content available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={props.comments}
        extraData={props.selectedComment}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ContentListView
