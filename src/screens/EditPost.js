import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const db = openDatabase({name: 'PostDatabase.db'});

const EditPost = ({navigation, route}) => {
  const {postId} = route.params;
  const [inputs, setInputs] = useState({
    post_title: null,
    post_body: null,
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_posts where post_id=?',
        [postId],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            setInputs(prevInputs => {
              return {
                ...prevInputs,
                post_title: res.post_title,
                post_body: res.post_body,
              };
            });
          } else {
            console.log('No post found');
            setInputs(prevInputs => {
              return {
                ...prevInputs,
                post_title: '',
                post_body: '',
              };
            });
          }
        },
      );
    });
  }, [postId]);

  //For updating post
  const EditPost = () => {
    if (!inputs.post_title) {
      Alert.alert('Please enter title');
    }

    if (!inputs.post_body) {
      Alert.alert('Please enter post body');
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_posts set post_title=?, post_body=? where post_id=?',
        [inputs.post_title, inputs.post_body, postId],
        (tx, results) => {
          console.log('Results after updating post : ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Post updated successfully!');
            navigation.navigate('Home');
          } else Alert.alert('Falid to update post');
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.KeyboardAvoidingView}>
          <CustomTextInput
            title="Title :"
            placeholder={inputs.post_title}
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
            placeholder={inputs.post_body}
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
          <CustomButton title="Edit Post" onPress={EditPost} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPost;

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
