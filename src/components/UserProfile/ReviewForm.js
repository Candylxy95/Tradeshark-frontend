import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomBtn from '../CustomBtn';
import axios from 'axios';
import {SERVER} from 'react-native-dotenv';
import UserContext from '../context/UserContext';

const ReviewForm = props => {
  const {accessToken} = useContext(UserContext);
  const [reviewInput, setReviewInput] = useState({
    title: '',
    comment: '',
    rating: '',
  });

  const createReview = async () => {
    try {
      const res = await axios.post(
        `${SERVER}/review/${props.paramsId}`,
        reviewInput,
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      );
      await props.getReviewsByUserId();
      props.setShowReviewForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.sectionTitle}>Title: </Text>
      <TextInput
        style={styles.reviewText}
        value={reviewInput.title}
        onChangeText={text =>
          setReviewInput(prevInput => ({...prevInput, title: text}))
        }
      />
      <View style={styles.reviewRow}>
        <View style={styles.ratingContainer}>
          <Text>Rating: </Text>
          {Array.from({length: 5}, (_, i) => (
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
          ))}
        </View>
        <TextInput
          style={styles.reviewText}
          value={reviewInput.comment}
          onChangeText={text =>
            setReviewInput(prevInput => ({...prevInput, comment: text}))
          }
        />
      </View>
      <View style={styles.buttonRows}>
        <CustomBtn
          style={styles.editProfileBtn}
          textStyle={styles.editProfileBtnText}
          title={<Text>Submit Review</Text>}
          onPress={() => {
            createReview();
          }}
        />
        <CustomBtn
          style={styles.editProfileBtn}
          textStyle={styles.editProfileBtnText}
          title={<Text>Cancel</Text>}
          onPress={() => {
            props.setShowReviewForm(false);
            props.setShowReviewBtn(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

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
    borderWidth: 1,
    height: 30,
  },
  reviewerName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  editProfileBtn: {
    backgroundColor: '#53ACFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  editProfileBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonRows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ReviewForm;
