import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import CustomBtn from '../../components/CustomBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const InitScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandTitle}>TRADESHARK</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CustomBtn
          style={styles.btn}
          textStyle={styles.textStyle}
          title="Login"
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <CustomBtn
          style={styles.btn}
          textStyle={styles.textStyle}
          title="Signup"
          onPress={() => navigation.navigate('RegisterScreen')}
        />
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('BizInitScreen')}>
          <Text style={styles.linkText}>Business account </Text>
          <Icon name="caret-forward" size={14} color="#F1F2EB" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
    backgroundColor: '#131314',
    justifyContent: 'space-between',
  },

  textContainer: {
    flex: 3,
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
  },
  brandTextContainer: {
    shadowColor: 'rgba(83, 172, 255, 1)',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 30,
  },
  brandTitle: {
    fontFamily: 'Anton',
    fontSize: '50',
    textAlign: 'center',
    transform: [{scaleX: 1.1}, {skewX: '-10deg'}],
    letterSpacing: 0.2,
    color: '#F1F2EB',
    textShadowColor: 'rgba(83, 172, 255, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15,
  },
  text: {
    fontFamily: 'Figtree-Medium',
    color: '#D8DAD3',
    fontSize: 30,
    textAlign: 'center',
  },
  btnContainer: {
    flex: 4,
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 80,
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(83, 172, 255, 1)',
    shadowColor: 'rgba(83, 172, 255, 1)',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 10,
  },
  textStyle: {
    color: '#F1F2EB',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  linkText: {
    textDecorationStyle: 'solid',
    color: '#F1F2EB',
    fontSize: 14,
  },
});

export default InitScreen;
