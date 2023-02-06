import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomSmallButton = ({title, onPress}) => {
  const onPressFunction = () => {
    return onPress();
  };
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomSmallButton;

const styles = StyleSheet.create({
  button: {
    width: '40%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FF8600',
    margin: 10,
    backgroundColor: '#FF8600',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
