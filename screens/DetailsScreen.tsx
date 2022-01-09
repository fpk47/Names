// TODO fix React Navigation typing...
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { User } from '../libs/randomUser';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks';
import { Item } from '../components';
import { ActionTypes } from '../redux/actionCreators';

function DetailsScreen({ route }): JSX.Element {
  const selector = useTypedSelector();
  const dispatch = useTypedDispatch();
  const [user, setUser] = useState<User>();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (typeof route?.params?.uuid === 'string') {
      if (selector[route?.params?.uuid]) {
        setUser(selector[route?.params?.uuid].data);
        setFavorite(selector[route?.params?.uuid].favorite);
      }
    }
  }, [route.params, selector]);

  return (
    <View>
      {user && (
      <View style={styles.container}>
        <Item
          onPressFavorite={() => {
            dispatch({ type: ActionTypes.CHANGE_FAVORITE, payload: user.login.uuid });
          }}
          uuid={user.login.uuid}
          imageUrl={user.picture.large}
          key={user.login.uuid}
          firstName={user.name.first}
          lastName={user.name.last}
          email={user.email}
          favorite={favorite}
        />
      </View>
      )}
      <ScrollView>
        <Text style={styles.text}>{JSON.stringify(user, null, 2)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    color: 'black',
  },
});

export { DetailsScreen };
