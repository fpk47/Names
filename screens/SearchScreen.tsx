import React, { useCallback, useState } from 'react';
import {
  View, StyleSheet, Button, ScrollView, Text, TextInput,
} from 'react-native';
import { Item } from '../components';
import { getMultipleUsers, User } from '../libs/randomUser';
import { ActionTypes } from '../redux/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks';

function SearchScreen(): JSX.Element {
  const selector = useTypedSelector();
  const dispatch = useTypedDispatch();
  const [sortedAlphabetically, setSortedAlphabetically] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const getItems = useCallback(() => {
    let result: { data: User, favorite: boolean}[] = [];

    Object.keys(selector).forEach((id) => {
      result.push({ data: selector[id].data, favorite: selector[id].favorite });
    });

    if (sortedAlphabetically) {
      result = result.sort((a, b) => (a.data.name.first > b.data.name.first ? 1 : -1));
    }

    if (searchParam) {
      result = result.filter(({ data }) => data.name.first.toLowerCase().includes(searchParam.toLowerCase())
        || data.name.last.toLowerCase().includes(searchParam.toLowerCase())
        || data.email.toLowerCase().includes(searchParam.toLowerCase()));
    } else {
      result = [];
    }

    return result;
  }, [selector, sortedAlphabetically, searchParam]);

  function loadMore(): void {
    getMultipleUsers(20).then((result) => {
      dispatch({ type: ActionTypes.ADD_USERS, payload: result.results });
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setSearchParam}
          value={searchParam}
          placeholder="search for first name, last name, email..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Load More"
          onPress={() => {
            loadMore();
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
        <Text style={styles.noDataText}>{searchParam ? 'No Data yet!' : 'No Query yet!'}</Text>
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
  textInput: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});

export { SearchScreen };
