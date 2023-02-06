import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const db = openDatabase({name: 'PostDatabase.db'});

const AddPost = ({navigation}) => {
  const [inputs, setInputs] = useState({
    post_title: null,
    post_body: null,
  });

  const AddPost = () => {
    if (!inputs.post_title) {
      Alert.alert('Please add post title');
    }

    if (!inputs.post_body) {
      Alert.alert('Please add post body');
    }

    if (inputs.post_title && inputs.post_body) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_posts (post_title,post_body) VALUES (?,?)',
          [inputs.post_title, inputs.post_body],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              navigation.navigate('Home');
            } else Alert.alert('Post adding failed!');
          },
        );
      });
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.KeyboardAvoidingView}>
          <CustomTextInput
            title="Title :"
            placeholder="Enter post title"
            value={inputs.post_title}
            onPress={value =>
              setInputs(prevValues => {
                return {
                  ...prevValues,
                  post_title: value,
                };
              })
            }
          />
          <CustomTextInput
            title="Body :"
            placeholder="Enter post body"
            value={inputs.post_body}
            onPress={value =>
              setInputs(prevValues => {
                return {
                  ...prevValues,
                  post_body: value,
                };
              })
            }
            multiline={true}
          />
          <CustomButton title="Add Post" onPress={AddPost} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  KeyboardAvoidingView: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
});
