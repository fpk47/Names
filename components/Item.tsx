import React from 'react';
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const height = 56;

interface ItemProps {
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    favorite: boolean;
}

function Item({
  imageUrl, firstName, lastName, email, favorite,
}: ItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer} />
      <View style={styles.nameContainer}>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <Text>{email}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => { console.info('asadsads'); }}>
        <View style={styles.favoriteContainer}>
          <Icon name="favorite" size={32} color={favorite ? 'red' : 'grey'} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  pictureContainer: {
    width: height,
    height,
    backgroundColor: 'red',
    borderRadius: 8,
    marginRight: 8,
  },
  nameContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  favoriteContainer: {
    width: 32,
    height,
    justifyContent: 'center',
  },
});

export { Item };
