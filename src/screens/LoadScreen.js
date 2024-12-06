import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';

const LoadScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandTitle}>Tradeshark</Text>
        </View>
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
  brandTitle: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'Anton',
    textAlign: 'center',
    transform: [{scaleX: 1.1}, {skewX: '-10deg'}],
    letterSpacing: 0.2,
    textShadowColor: 'rgba(83, 172, 255, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15,
  },
  subText: {
    fontFamily: 'Arial',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
  },
  brandTextContainer: {
    shadowColor: 'rgb(115, 193, 208)',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 30,
  },
});

export default LoadScreen;
