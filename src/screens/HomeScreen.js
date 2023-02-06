import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import CustomButton from '../components/CustomButton';
import CustomSmallButton from '../components/CustomSmallButton';

const db = openDatabase({name: 'PostDatabase.db'});

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  //For creating posts database
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_posts'",
        [],
        function (tx, res) {
          //   console.log('Item: ', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_posts', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_posts(post_id INTEGER PRIMARY KEY AUTOINCREMENT, post_title VARCHAR(255), post_body VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  //For geeting posts from database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_posts', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setPosts(temp);
      });
    });
  }, [posts]);

  //For list item separator
  const ListItemSeparator = () => {
    return <View style={styles.listItemSeparator} />;
  };

  //For deleting post
  const DeletePost = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_posts where post_id=?',
        [id],
        (tx, results) => {
          // console.log('Results after delete : ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Post deleted successfully');
          }
        },
      );
    });
  };

  const EditPost = id => {
    navigation.navigate('EditPost', {
      postId: id,
    });
  };

  //For list Item
  const ListItem = item => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.title}>{item.post_title}</Text>
        <Text style={styles.body}>{item.post_body}</Text>
        <View style={styles.buttonContainer}>
          <CustomSmallButton
            title="Edit"
            onPress={() => {
              // console.log('POST TO EDIT : ', item.post_id);
              return EditPost(item.post_id);
            }}
          />
          <CustomSmallButton
            title="Delete"
            onPress={() => {
              // console.log('POST TO DELTE : ', item.post_id);
              return DeletePost(item.post_id);
            }}
          />
        </View>
        {/* <Button title="DELTE" /> */}
      </View>
    );
  };

  const AddPost = () => {
    // console.log('Add Post!');
    navigation.navigate('AddPost');
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <CustomButton title="Add Post" onPress={AddPost} />
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => ListItem(item)}
          keyExtractor={item => item.post_id}
        />
      ) : (
        <Text style={styles.notFound}>Posts not found :/</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  heading: {
    marginBottom: 20,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  listItemSeparator: {
    height: 0.2,
    width: '100%',
    backgroundColor: '#808080',
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#612C59',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#612C59',
  },
  title: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    color: '#fff',
    fontSize: 16,
  },
  notFound: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#f00',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
