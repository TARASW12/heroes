import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HeroDetailsScreen from '../screens/HeroDetailsScreen';
import CustomTabBar from '../components/CustomTabBar';

export type RootStackParamList = {
  Main: undefined;
  HeroDetails: {id: string};
};

export type MainTabParamList = {
  AllHeroes: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="AllHeroes"
        component={HomeScreen}
        options={{title: 'All Heroes'}}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Favorites'}}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HeroDetails"
          component={HeroDetailsScreen}
          options={{title: 'Hero Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
