import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View, Text, StyleSheet, TouchableWithoutFeedback, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const height = 56;

interface ItemProps {
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    uuid: string;
    favorite?: boolean;
    onPressFavorite: () => void;
}

function Item({
  imageUrl, firstName, lastName, email, favorite, uuid, onPressFavorite,
}: ItemProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', { uuid })}>
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>{firstName}</Text>
          <Text style={styles.text}>{lastName}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          onPressFavorite();
        }}
        >
          <View style={styles.favoriteContainer}>
            <Icon name="favorite" size={32} color={favorite ? 'red' : 'grey'} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
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
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'black',
  },
});

export { Item };
