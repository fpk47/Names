import React, { useEffect } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { ActionTypes } from './redux/actionCreators';

import { useTypedDispatch, useTypedSelector } from './redux/hooks'

const App = () => {
    const hoi = useTypedSelector();
    const dispatch = useTypedDispatch()

    useEffect(() => {
        console.info('hoi=', hoi)
    },[hoi])

  return (
    <SafeAreaView >
      <StatusBar barStyle={'dark-content'} />
      <Text>Hallo</Text>
      <Button title='Random' onPress={() => {
            dispatch({type: ActionTypes.COUNTER_CHANGE,
            payload: Math.random()})
      }} />
<Button title='RESET' onPress={() => {
            dispatch({type: ActionTypes.COUNTER_RESET})
      }} />
    </SafeAreaView>
  );
};

export default App;
