"use strict";
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommentActionCreators from '../actions/comment';
import * as globalServices from '../services';

class PostScreen extends Component {
  static navigationOptions = {
    headerTitle: 'New Post',
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  _onPost = () => {
    if (this.state.text) {
      // Send POST request (Comment info and user info)
      const { longitude, latitude } = this.props;
      const message = {
        text: this.state.text,
        longtitude: longitude,
        latitude: latitude,
      }
      const restUrl = `${globalServices.BASE_URL}/posts/post`;
      const callBack = () => {
        Alert.alert("Post sent!");
        console.log(this.state.text);
        //this.props.onPost(comment); Need server message back to update comment
        this.props.navigation.goBack();
      }
      globalServices.postRequest(restUrl,"POST",message,callBack);
    }
  }
  render() {
    const longitude = this.props.longitude.toFixed(5);
    const latitude = this.props.latitude.toFixed(5);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textArea}
          onChangeText={(text) => this.setState({text})}
          multiline = {true}
          numberOfLines = {5}
          maxLength = {500}
          editable = {true}
          value={this.state.text}
        />
        <Text>Longitude:{longitude} && Latitude:{latitude}</Text>
        <View style={styles.postButtonSection}>
          <Button
            onPress={this._onPost}
            title="Post"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    longitude: state.comment.longitude,
    latitude: state.comment.latitude,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onPost: bindActionCreators(CommentActionCreators.onPost, dispatch),
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
  },
  postButtonSection: {
    marginTop: 10,
    backgroundColor: '#3bda64',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default connect(mapStateToProps,mapDispatchToProps)(PostScreen);
