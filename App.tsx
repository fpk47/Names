import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SearchScreen, SeedScreen, FavoritesScreen, RandomScreen, DetailsScreen,
} from './screens';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused, size }) => {
            const color = focused ? 'blue' : 'grey';

            switch (route.name) {
              case 'Random':
                return <Icon name="shuffle" size={size} color={color} />;
              case 'Search':
                return <Icon name="search" size={size} color={color} />;
              case 'Favorites':
                return <Icon name="favorite-border" size={size} color={color} />;
              case 'Seed':
                return <Icon name="loupe" size={size} color={color} />;
              case 'Details':
                return <Icon name="info" size={size} color={color} />;
              default:
                return <Icon name="error" size={size} color="blue" />;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Random" component={RandomScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Seed" component={SeedScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
