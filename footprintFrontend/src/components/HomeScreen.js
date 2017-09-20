"use strict";
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import { bindActionCreators } from 'redux';
import { store } from '../../App';
import { connect } from 'react-redux';

import * as CommentActionCreators from '../actions/comment';
import InlineImage from './component-item/InlineImage';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  _onPress = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    };

   const success = pos => {
     const crd = pos.coords;
     console.log('Your current position is:');
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`More or less ${crd.accuracy} meters.`);
     this.props.onLocation(crd.longitude,crd.latitude);
     this.props.navigation.navigate('MapV');
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Footprint App</Text>
        <Text onPress={this._onPress}>
          <InlineImage
            style={styles.loadCommentButton}
            source={require('../util/icons/welcome.png')}
          />
        </Text>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLocation: bindActionCreators(CommentActionCreators.onLocation, dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  heading: {
    fontSize: 30,
    marginBottom: 100,
  },
  loadCommentButton: {
    height: 50,
    width: 50,
    tintColor: '#9b9b9b',
  },
});
export default connect(undefined,mapDispatchToProps)(HomeScreen);
