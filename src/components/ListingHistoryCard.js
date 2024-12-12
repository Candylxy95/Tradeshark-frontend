import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

const ListingHistoryCard = props => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Ticker: {props.ticker}</Text>
            <Text style={styles.label}>Asset Class: {props.assetClass}</Text>
            <Text style={styles.label}>Position: {props.position}</Text>
            <Text style={styles.label}>
              Entry Price:{' '}
              <Text style={styles.formText}>{props.entryPrice}</Text>
            </Text>
            <Text style={styles.label}>
              Take Profit:{' '}
              <Text style={styles.formText}>{props.takeProfit}</Text>
            </Text>
            <Text style={styles.label}>
              Stop Loss: <Text style={styles.formText}>{props.stopLoss}</Text>
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Posted On:</Text>
            <Text style={styles.date}>
              {props.postedDate} {props.postedTime}
            </Text>
            <Text style={styles.label}>Duration:</Text>
            <View style={styles.durationRow}>
              {props.durationDays && (
                <Text style={styles.formText}>{props.durationDays} Days</Text>
              )}
              {props.durationHours && (
                <Text style={styles.formText}>{props.durationHours} Hours</Text>
              )}
              {props.durationMinutes && (
                <Text style={styles.formText}>
                  {props.durationMinutes} Minutes
                </Text>
              )}
            </View>
            <Text style={styles.label}>
              Risk Reward Ratio:{' '}
              <Text style={styles.formText}>{props.riskRatio}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.label}>{props.sellerName}'s Notes</Text>
          <Text style={styles.formText}>{props.notes}</Text>
        </View>
      </ScrollView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: '#3ABECF',
    marginBottom: 5,
  },
  formText: {
    color: 'white',
  },
  date: {
    color: 'white',
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  noteContainer: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 8,
  },
});

export default ListingHistoryCard;
