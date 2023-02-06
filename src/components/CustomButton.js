import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({title, onPress}) => {
  const onPressFunction = () => {
    return onPress();
  };
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#51244A',
    borderRadius: 15,
    margin: 10,
    backgroundColor: '#51244A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
