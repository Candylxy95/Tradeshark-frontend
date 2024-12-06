import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';

const LoadScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tradeshark</Text>
        <Text style={styles.subText}>Trade smarter, Profit together</Text>
      </View>
      <Image
        source={require('../../assets/tradeshark.gif')}
        style={styles.gif}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    position: 'absolute', // Makes the GIF cover the entire background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    transform: [{scale: 1}],
  },
  text: {
    color: 'white',
    fontSize: 50,
  },
  subText: {
    fontFamily: 'Arial',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
  },
});

export default LoadScreen;
