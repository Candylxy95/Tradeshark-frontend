import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const CustomBtn = props => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;
