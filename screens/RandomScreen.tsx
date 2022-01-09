import React, { useCallback } from 'react';
import {
  View, StyleSheet, Button, ScrollView,
} from 'react-native';
import { Item } from '../components';
import { getMultipleUsers, User } from '../libs/randomUser';
import { ActionTypes } from '../redux/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks';

function RandomScreen(): JSX.Element {
  const selector = useTypedSelector();
  const dispatch = useTypedDispatch();

  const getItems = useCallback(() => {
    const result: User[] = [];

    Object.keys(selector).forEach((id) => {
      result.push(selector[id].data);
    });

    return result;
  }, [selector]);

  function randomise(): void {
    getMultipleUsers(1).then((result) => {
      dispatch({ type: ActionTypes.ADD_USERS, payload: result.results });
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Randomise"
        onPress={() => {
          randomise();
        }}
      />
      <View style={{ }}>
        <ScrollView style={styles.flex}>
          {getItems().map(({
            email, name, login, picture,
          }) => (
            <Item
              imageUrl={picture.large}
              key={login.uuid}
              firstName={name.first}
              lastName={name.last}
              email={email}
              favorite={false}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  flex: {

  },
});

export { RandomScreen };
