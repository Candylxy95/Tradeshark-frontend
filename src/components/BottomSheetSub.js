import React, {useState} from 'react';
import {View, Modal, Text, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomBtn from './CustomBtn';
import LottieView from 'lottie-react-native';

const BottomSheetSub = props => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showPurchaseCfm}>
        <View style={styles.modalContainer}>
          {!props.showPA ? (
            <View style={styles.bottomSheet}>
              <CustomBtn
                style={styles.closeIcon}
                onPress={props.onPress}
                title={
                  <Icon name="close-circle-outline" size={30} color="gray" />
                }
              />

              <View style={styles.header}>
                <Icon name="cart-outline" size={24} color="green" />
                <Text style={styles.title}>{props.title}</Text>
              </View>

              <Text style={styles.listingText}>{props.listingMsg}</Text>
              <View style={styles.details}>
                <Text style={styles.detailLabel}>
                  Seller:{' '}
                  <Text style={styles.detailText}>
                    {props.listingSellerFN} {props.listingSellerLN}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Start:{' '}
                  <Text style={styles.detailText}>{props.startDate}</Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Ends: <Text style={styles.detailText}>{props.endDate}</Text>
                </Text>
                <View style={styles.priceContainer}>
                  <Icon name="pricetag-outline" size={20} color="blue" />
                  <Text style={styles.priceText}>S${props.listingPrice}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <CustomBtn
                  style={styles.actnBtn}
                  textStyle={styles.actnBtnText}
                  title={props.btnTitle}
                  onPress={props.btnActn}
                />
                <CustomBtn
                  style={styles.actnBtn}
                  textStyle={styles.actnBtnText}
                  title="Cancel"
                  onPress={props.onPress}
                />
              </View>
            </View>
          ) : (
            <View style={styles.bottomSheet}>
              <Text style={styles.successMsg}>Purchase Successful!</Text>
              <LottieView
                source={require('../../assets/purchase_success.json')}
                autoPlay
                style={styles.animation}
              />
              <CustomBtn
                style={styles.closeIcon}
                onPress={props.onPress}
                title={
                  <Icon name="close-circle-outline" size={30} color="gray" />
                }
              />
              <CustomBtn
                style={styles.actnBtn}
                textStyle={styles.actnBtnText}
                title="Done"
                onPress={props.goToBtn}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listingText: {
    fontSize: 16,
    marginVertical: 10,
  },
  details: {
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: '16',
    fontFamily: 'Figtree-bold',
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Figtree-thin',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  actnBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'black',

    marginBottom: 10,
  },
  actnBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Figtree-Bold',
    fontSize: 18,
  },
  animation: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
  },
  successMsg: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default BottomSheetSub;
