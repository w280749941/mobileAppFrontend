"use strict";
import React from 'React';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const ListItem = props => {
  return (
    <TouchableHighlight style={styles.myContainer}
      underlayColor={'white'}
      onPress={() => props.onPress(props.index)}
      onLongPress={() => props.onLongPress(props.index)}>
      <View style={styles.container}>
        <Text style={styles.idStyle}>{props.comment._id}</Text>
        <Text style={styles.messageStyle}>{props.comment.text.slice(0,50)}</Text>
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  myContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 0.25,
  },
  idStyle: {
    fontWeight: 'bold',
  },
  messageStyle: {
    fontSize: 15,
  },
});
export default ListItem
