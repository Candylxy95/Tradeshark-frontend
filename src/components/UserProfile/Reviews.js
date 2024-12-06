import React from 'react';
import {View, Text, Image} from 'react-native';

const Reviews = props => {
  return (
    <View>
      <View>
        <Text>{props.rating}</Text>
      </View>
      <View>
        <Text>{props.review}</Text>
      </View>
      <View>
        <View>
          <Text>{props.userName}</Text>
          <Text>{props.postedDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default Reviews;
