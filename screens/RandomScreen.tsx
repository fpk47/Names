import React, { useCallback, useState } from 'react';
import {
  View, StyleSheet, Button, ScrollView, Text,
} from 'react-native';
import { Item } from '../components';
import { getMultipleUsers, User } from '../libs/randomUser';
import { ActionTypes } from '../redux/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks';

function RandomScreen(): JSX.Element {
  const selector = useTypedSelector();
  const dispatch = useTypedDispatch();
  const [sortedAlphabetically, setSortedAlphabetically] = useState(false);

  const getItems = useCallback(() => {
    const result: { data: User, favorite: boolean}[] = [];

    Object.keys(selector).forEach((id) => {
      result.push({ data: selector[id].data, favorite: selector[id].favorite });
    });

    if (sortedAlphabetically) {
      return result.sort((a, b) => (a.data.name.first > b.data.name.first ? 1 : -1));
    }

    return result;
  }, [selector, sortedAlphabetically]);

  function randomise(): void {
    getMultipleUsers(20).then((result) => {
      dispatch({ type: ActionTypes.ADD_USERS, payload: result.results });
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="More random names!"
          onPress={() => {
            randomise();
          }}
        />
        <Button
          title="Sorted"
          onPress={() => {
            setSortedAlphabetically((prevState) => !prevState);
          }}
          color={sortedAlphabetically ? 'green' : 'grey'}
        />
      </View>

      <View>
        <ScrollView>
          {getItems().map(({ data, favorite }) => (
            <Item
              onPressFavorite={() => {
                dispatch({ type: ActionTypes.CHANGE_FAVORITE, payload: data.login.uuid });
              }}
              uuid={data.login.uuid}
              imageUrl={data.picture.large}
              key={data.login.uuid}
              firstName={data.name.first}
              lastName={data.name.last}
              email={data.email}
              favorite={favorite}
            />
          ))}
        </ScrollView>
      </View>
      {getItems().length === 0 && (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data yet!</Text>
      </View>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noDataContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 30,
  },
});

export { RandomScreen };
