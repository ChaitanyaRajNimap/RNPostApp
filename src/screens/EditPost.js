import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const EditPost = ({navigation}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Edit post screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
