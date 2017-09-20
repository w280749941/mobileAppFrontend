import React from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  PixelRatio,
} from 'react-native';

const InlineImage = (props) => {
  let style = props.style;
  if (style && Platform.OS !== 'ios') {
    style = Object.assign({}, StyleSheet.flatten(props.style));
    ['width', 'height'].forEach((propName) => {
      if (style[propName]) {
        style[propName] *= PixelRatio.get();
      }
    });
  }

  return (
    <Image
      {...props}
      style={style}
    />
  );
};

InlineImage.propTypes = Image.propTypes;

export default InlineImage;
