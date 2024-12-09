import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../context/UserContext';

const Reviews = props => {
  const {accessToken} = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reviewInput, setReviewInput] = useState({
    title: props.title,
    comment: props.comment,
    rating: props.rating,
  });

  const updateReview = async () => {
    try {
      const res = await axios.put(
        `${SERVER}/review/${props.paramsId}`,
        reviewInput,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      setIsUpdating(false);
      props.getReviewsByUserId();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteReview = async () => {
    try {
      const res = await axios.delete(`${SERVER}/review/${props.paramsId}`, {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      });
      props.getReviewsByUserId();
      props.getReviews();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.reviewsContainer}>
      {!isUpdating ? (
        <Text style={styles.sectionTitle}>{props.title}</Text>
      ) : (
        <TextInput
          style={styles.sectionTitle}
          value={reviewInput.title}
          onChangeText={text =>
            setReviewInput(prevInput => ({...prevInput, title: text}))
          }
        />
      )}
      <View style={styles.reviewRow}>
        <View style={styles.ratingContainer}>
          {Array.from({length: 5}, (_, i) =>
            !isUpdating ? (
              <Icon
                key={i}
                name={i < props.rating ? 'star' : 'star-outline'}
                size={20}
                color="gold"
              />
            ) : (
              <Pressable
                key={i}
                onPress={() =>
                  setReviewInput(prevInput => ({...prevInput, rating: i + 1}))
                }>
                <Icon
                  name={i < reviewInput.rating ? 'star' : 'star-outline'}
                  size={20}
                  color="gold"
                />
              </Pressable>
            ),
          )}
        </View>
        {!isUpdating ? (
          <Text style={styles.reviewText}>{props.comment}</Text>
        ) : (
          <TextInput
            style={styles.reviewText}
            value={reviewInput.comment}
            onChangeText={text =>
              setReviewInput(prevInput => ({...prevInput, comment: text}))
            }
          />
        )}
        <Text style={styles.reviewerName}>
          - {props.firstName} {props.lastName}.
        </Text>
        {props.showIcons && (
          <View style={styles.iconContainer}>
            {!isUpdating ? (
              <TouchableOpacity onPress={() => setIsUpdating(true)}>
                <Icon
                  name="create-outline"
                  size={20}
                  color="lightblue"
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={updateReview}>
                <Icon
                  name="checkmark-done"
                  size={20}
                  color="lightblue"
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={deleteReview}>
              <Icon
                name="trash-outline"
                size={20}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewRow: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Reviews;
