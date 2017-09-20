"use strict";
import React from 'React';
import {StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommentActionCreators from '../../actions/comment';

/*
  Render Map component,
*/
const MapItem = props => {
  let mapReference;
  const markers=[];
  const _onLayout = () => {
    props.onMapReference(mapReference);
    props.onMakersReference(markers);
  }
  const _onRegionChange = region => {
    //console.log("Region is chaing");
  }
  const _getMakerID = ref => {
    if(!markers.includes(ref)){
      markers.push(ref);
      props.onMakersReference(markers);
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        //provider={ PROVIDER_GOOGLE }
        //showsMyLocationButton={true}
        ref={ref => {mapReference=ref}}
        onLayout={_onLayout}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        showsScale={true}
        style={styles.map}
        region={props.region}
        onRegionChange={_onRegionChange}
        onRegionChangeComplete={props.onRegionChangeComplete}
        >
        {props.comments.map((comment,index) => (
          <MapView.Marker
            key={index}
            ref={_getMakerID}
            coordinate={{
              longitude: comment.location.coordinates[0],
              latitude: comment.location.coordinates[1],
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            title={comment._id.toString()}
            description={comment.vote.toString()}
            onPress={() => props.onPress(index)}
          />

        ))}
      </MapView>
    </View>
  );
}

const mapDispatchToProps = dispatch => (
  {
    onMakersReference: bindActionCreators(CommentActionCreators.onMakersReference, dispatch),
    onMapReference: bindActionCreators(CommentActionCreators.onMapReference, dispatch),
  }
);

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
})
export default connect(null,mapDispatchToProps)(MapItem);
