"use strict";
import React from 'React';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import InlineImage from './InlineImage';

const InfoItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.viewToggleStyle}>
        <Text onPress={props.onPress}>
          <InlineImage
            style={styles.imageStyle}
            source={require('../../util/icons/list.png')}
          />
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <Text onPress={() => props.onSort("VOTE_SORT")}>vote</Text>
        <Text onPress={() => props.onSort("DATE_SORT")}>date</Text>
        <Text onPress={() => props.onSort("RANDOM_SORT")}>random</Text>
      </View>
      <View style={styles.postNumberStyle}>
        <Text>Post: {props.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  filterContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    height: 20,
    width: 20,
  },
  viewToggleStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingRight: 5,
  },
  postNumberStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
});
export default InfoItem;
