import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';
import { Item } from '../components';
import { getSeed, User } from '../libs/randomUser';
import { ActionTypes } from '../redux/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../redux/hooks';

function SeedScreen(): JSX.Element {
  const selector = useTypedSelector();
  const dispatch = useTypedDispatch();
  const [uuid, setUuid] = useState('');
  const [user, setUser] = useState<User>();
  const [favorite, setFavorite] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    if (searchParam) {
      getSeed(searchParam).then((result) => {
        dispatch({ type: ActionTypes.ADD_USERS, payload: result.results });

        if (result.results.length === 1) {
          setUuid(result.results[0].login.uuid);
        }
      });
    }
  }, [searchParam]);

  useEffect(() => {
    if (uuid) {
      if (selector[uuid]) {
        setUser(selector[uuid].data);
        setFavorite(selector[uuid].favorite);
      } else {
        setUser(undefined);
        setFavorite(false);
      }
    }
  }, [uuid, selector]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setSearchParam}
          value={searchParam}
          placeholder="search here.."
        />
      </View>

      {user && (
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

export { SeedScreen };
