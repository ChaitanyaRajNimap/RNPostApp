import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onPress,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={value => {
          return onPress(value);
        }}
        returnKeyType="next"
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.input}
        multiline={multiline}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    borderColor: '#612C59',
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#612C59',
  },
  title: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
});
