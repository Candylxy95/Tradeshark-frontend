import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserListingCardExtended = props => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>{props.Img}</View>
      <View style={styles.sellerBanner}>
        <View style={{alignContent: 'space-between'}}>
          <Text style={{color: '#F1F2EB', fontFamily: 'Figtree-Regular'}}>
            {props.sellerStatus}
          </Text>
          <Text style={{color: '#F1F2EB', fontSize: 20}}>
            {props.sellerName}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ImageBackground
            source={{
              uri: 'https://cdn.midjourney.com/972aec0b-b06d-4967-8437-aef445e5b90b/0_1.png',
            }}
            style={styles.profImg}
          />
        </View>
      </View>
      <View style={styles.tickerAndPrice}>
        <View>
          <Text style={styles.label}>Ticker: {props.ticker}</Text>
          <Text style={styles.label}>{props.assetClass}</Text>
          <Text style={styles.label}>{props.position}</Text>

          <Text style={styles.label}>
            Entry Price: <Text style={styles.formText}>{props.entryPrice}</Text>
          </Text>
        </View>

        <View>
          <View>
            <Text style={styles.label}>
              {props.hasHistory ? 'Edited On' : 'Posted On'}
            </Text>
            <Text style={styles.date}>
              {props.postedDate} {props.postedTime}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Expires On:</Text>
            <Text style={styles.date}>
              {props.expiryDate} {props.expiryTime}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Duration: <Text style={styles.formText}></Text>
        </Text>

        <View style={styles.durationRow}>
          {props.durationDays && (
            <Text style={styles.formText}>{props.durationDays} Days</Text>
          )}
          {props.durationHours && (
            <Text style={styles.formText}>{props.durationHours} Hours</Text>
          )}
          {props.durationMinutes && (
            <Text style={styles.formText}>{props.durationMinutes} Minutes</Text>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>
          Risk Reward Ratio:{' '}
          <Text style={styles.formText}>{props.riskRatio}</Text>
        </Text>
      </View>
      <View style={styles.rating}>
        <View>
          <Text style={styles.label}>
            Take Profit:
            <Text style={styles.formText}> {props.takeProfit}</Text>
          </Text>
          <Text style={styles.label}>
            Stop Loss: <Text style={styles.formText}>{props.stopLoss}</Text>
          </Text>
        </View>
        <Text style={styles.formText}>
          Ratings: {props.Rating}
          <Pressable
            pointerEvents={props.isSubmitting ? 'none' : 'auto'}
            onPress={() => {
              props.handleSetRate();
            }}>
            <Icon
              name={props.rated ? 'star' : 'star-outline'}
              size={20}
              color="rgba(83, 172, 255, 1)"
            />
          </Pressable>
        </Text>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.label}>{props.sellerName}'s Notes</Text>
        <Text style={styles.formText}>{props.notes}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  sellerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  sellerStatus: {
    fontSize: 12,
    color: '#FF6347',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  tickerAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#3ABECF',
    marginBottom: 5,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  durationLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
  },
  noteContainer: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 8,
  },
  notesText: {
    color: '#FFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnSecondary: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  alertContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    top: 0,
  },
  formText: {
    color: 'white',
  },
  date: {
    color: 'white',
  },
});

export default UserListingCardExtended;
