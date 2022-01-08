import React, { useEffect } from 'react';
import { View, Button, SafeAreaView, StatusBar, Text } from 'react-native';
import { ActionTypes } from './redux/actionCreators';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTypedDispatch, useTypedSelector } from './redux/hooks'

function HomeScreen() {
        const hoi = useTypedSelector();
    const dispatch = useTypedDispatch()

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
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
  
  const Tab = createBottomTabNavigator();
  
  function App() {
    return (
        <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
  
              // You can return any component that you like here!
              return <View style={{backgroundColor: color, width: size, height: size}}/>
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;
