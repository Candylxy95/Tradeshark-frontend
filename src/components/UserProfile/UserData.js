import React from 'react';
import {View, Text, Image} from 'react-native';

const UserData = props => {
  return (
    <View>
      <View>
        <Image source={{uri: props.imgSrc}} />
        <Text>{props.profileMsg}</Text>
      </View>
      <View>
        <View>
          <Text>{props.subscribers} Subscribers</Text>
          <Text>Win Rate: {props.winRate}</Text>
          <Text>Trades: {props.assetType}</Text>
        </View>
        <View>
          <Text>{props.rating}</Text>
          <Image source={{uri: props.graph}} />
        </View>
      </View>
    </View>
  );
};

export default UserData;
