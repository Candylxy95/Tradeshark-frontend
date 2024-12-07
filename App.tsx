import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import LoadScreen from './src/screens/LoadScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthNavigator from './src/navigation/AuthNavigator';
import UserContext from './src/components/context/UserContext';
import CreateListingBoard from './src/screens/BizUser/CreateListingBoard';
import ListingDetailBoard from './src/screens/BizUser/ListingDetailBoard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const getStoredAccessToken = async () => {
    try {
      const token = (await EncryptedStorage.getItem('accessToken')) || '';
      setAccessToken(token);
    } catch (error) {
      console.error('Error storing data: ', error);
    }
  };

  useEffect(() => {
    getStoredAccessToken();
    const loadScreenTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(loadScreenTimer);
  }, []);

  return (
    <>
      <UserContext.Provider value={{accessToken, setAccessToken}}>
        <SafeAreaView style={styles.container}>
          {!isLoading ? <AuthNavigator /> : <LoadScreen />}
          <StatusBar />
        </SafeAreaView>
      </UserContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
