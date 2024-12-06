import React from 'react';
import {View, Modal, Text, Button, StyleSheet} from 'react-native';

const BottomSheet = props => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showPurchaseCfm === props.listing}>
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <Text>{props.title}</Text>
            <Button title={props.btnTitle} onPress={props.btnActn} />
            <Button title="Cancel" onPress={props.onPress} />
          </View>
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
  },
});

export default BottomSheet;
