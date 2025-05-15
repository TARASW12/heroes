import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon, SearchIcon, StarIcon} from '../components/ui/icon';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HeroDetailsScreen from '../screens/HeroDetailsScreen';

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
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'AllHeroes') {
            return <Icon as={SearchIcon} size="lg" color={color} />;
          } else if (route.name === 'Favorites') {
            return <Icon as={StarIcon} size="lg" color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#BDBDBD',
      })}>
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
