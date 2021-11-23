import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

const users = [];

export default function App() {
  const [userCounts, setUserCounts] = useState(null);

  function updateUserCounts() {
    crashlytics().log('Updating user count.');
    try {
      if (users) {
        // An empty array is truthy, but not actually true.
        // Therefore the array was never initialised.
        setUserCounts(userCounts.push(users.length));
      }
    } catch (error) {
      crashlytics().recordError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    crashlytics().log('App mounted.');
    if (users === true) {
      setUserCounts([]);
    }
    updateUserCounts();
  }, []);

  if (userCounts) {
    return (
      <View>
        <Text>
          There are currently {userCounts[userCounts.length - 1]} users.
        </Text>
      </View>
    );
  }
  const abc = () => {
    crashlytics().crash();
  };

  return (
    <View>
      <Text>Unable to display user information.</Text>
      <Button onPress={() => abc()} title={'ABC'} />
    </View>
  );
}
