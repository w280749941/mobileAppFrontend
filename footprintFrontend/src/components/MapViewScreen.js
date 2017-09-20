"use strict";
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as globalServices from '../services';

import MapItem from './component-item/MapItem';
import ContentItem from './component-item/ContentItem';
import ContentListView from './component-item/ContentListView';
import InfoItem from './component-item/InfoItem';

class MapViewScreen extends Component{
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Map Screen',
    headerTintColor: 'black',
    headerStyle: {
        backgroundColor: 'white'
    },
    headerRight: <Button title="New Post"
                  onPress={() => navigation.navigate('NewPost')}
                 />,
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isListView: false,
      radius: 2,
      region: {
        latitude: 40.8275556,
        longitude: -73.92506,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this._getPost();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this._isMounted = false;
    // Need to clean up other issues.
  }
  _getPost() {
    const restUrl = `${globalServices.BASE_URL}/posts/search`;
    const message = {
      longtitude: this.props.longitude,
      latitude: this.props.latitude,
      radius: this.state.radius,
    }
    const callBack = (data) => {
      this.props.onDataReceived(data);
      if(this._isMounted){
        this.setState({
          isLoading: false,
        });
      }
    }

    globalServices.requestContent(restUrl, "POST", message, callBack);
  }
  _updateLocation() {
    // Test markers updates. development only.
    console.log("requesting locations")
    const distance = globalServices.getDistance(this.props.longitude,this.props.latitude,this.props.longitude+0.001,this.props.latitude);
    this.props.onLocation(this.props.longitude+0.001,this.props.latitude);
    console.log(this.props.longitude+0.001,this.props.latitude);
    this._getPost();

    /* on Mobile version (Production)
    // Change #1 #2 to real geolocation longitude&latitude
    const distance = globalServices.getDistance(this.props.longitude,this.props.latitude,#1,#2);
    // Update posts if distance is greater than 500 meters.
    if(distance > 500) {
      this._getPost(); // Possible async issue, can move onLocaton inside this.
      this.props.onLocation(#1,#2);
    }
    */
  }
  _onPress = (index) => {
    this.props.onSelectComment(index);
  }

  _onRegionChange = () => {
    console.log("Home view changing---------");
  }
  _onRegionChangeComplete = region => {
    if(this._isMounted){
      const { width } = Dimensions.get('window');
      const radius = globalServices.getRadius(width,region.latitudeDelta,region.latitude);
      const radiusDiff = Math.abs(radius - this.state.radius);
      // Server requst only happen when radius is less than 1 mile(server limit)
      if(radius <= 1 && radiusDiff > 0.001) {
        this.isZoomIn=true;
        this.setState({
          region: region,
          radius: radius
        },this._getPost);
      }
      else if(radius >1 && this.isZoomIn) {
        this.isZoomIn=false;
        this.setState({
          region: region,
          radius: radius
        },this._getPost);
      }
    }
  }

  _showMarker = (index,isChangeView) => {
    this.props.onSelectComment(index);
    if(this._isMounted){
      this.setState({
        isListView: isChangeView,
        region: { // Set region to center the marker in map.
          ...this.state.region,
          latitude: this.props.comments[index].location.coordinates[1],
          longitude: this.props.comments[index].location.coordinates[0],
        }
      });
    }
    const myMarker = this.props.markersReference[index];
    myMarker.showCallout();
  }
  _onListItemPress = index => {
    this._showMarker(index,true);
  }
  _onListItemLongPress = index => {
    this._showMarker(index,false);
  }
  _toggleView = () => {
    //this.props.mapReference.fitToSuppliedMarkers(this.props.markersReference,true);
    this.setState({ isListView: !this.state.isListView});
  }
  render() {
    let selectedComment = this.props.comments[this.props.selectedCommentId];
    if(this.props.comments.length === 0) {
      selectedComment = {
        _id: undefined,
        vote: null,
        text: "No content available",
      }
    }
    if(this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapItem
            region={this.state.region}
            onRegionChange={this._onRegionChange}
            onRegionChangeComplete={this._onRegionChangeComplete}
            comments={this.props.comments}
            onPress={this._onPress}
          />
        </View>
        <View style={styles.infoContainter}>
          <InfoItem onPress={this._toggleView}
            length={this.props.comments.length}
            onSort={this.props.onSort}
          />
        </View>
        <View style={styles.contentContainer}>
          {this.state.isListView ? (
            <ContentListView
              comments={this.props.comments}
              onPress={this._onListItemPress}
              onLongPress={this._onListItemLongPress}
              selectedComment={selectedComment}
            />
          ) : (
            <ContentItem
              selectedComment={selectedComment}
              onVote={this.props.onVote}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  mapContainer: {
    flex: 8,
  },
  infoContainter: {
    flex: 0.8,
  },
  contentContainer: {
    flex: 6,
  },
});

export default MapViewScreen;
