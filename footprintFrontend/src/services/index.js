export const BASE_URL = 'http://astro-craft.com:3000';//'http://192.168.1.153:3000';
// degree to radians
export const toRadians = (degree) => {
  return degree*(Math.PI/180);
}
// get distance in meters between two coordinates
export const getDistance = (prevLong,prevLat,currLong,currLat) => {
  const R = 6371e3; // in Meters
  const x = toRadians(currLong-prevLong) * Math.cos(toRadians(prevLat+currLat)/2);
  const y = toRadians(currLat-prevLat);
  const d = Math.sqrt(x*x + y*y) * R;
  return d;
}

// get Post
export const requestContent = (restUrl,method,message,callBack) => {
  fetch(restUrl,{
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(response => {
    return response.json();
  }).then(data => callBack(data))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
};

export const postRequest = (restUrl,method,message,callBack) => {
  fetch(restUrl,{
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(() => callBack()
    ).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
};

export const getRadius = (width,longitudeDelta,latitude) => {
  const zoomLevel = Math.log2(360 * ((width/256) / longitudeDelta)) + 1;
  const metersPerPixels = 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoomLevel);
  const radius = metersPerPixels*width*0.000621371*1.3; //to Miles
  return radius;
}
