import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import SearchScreen from '../screens/SearchScreen';
import SaveScreen from '../screens/SaveScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecipeScreen from '../screens/RecipeScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

// Home Icon
HomeStack.navigationOptions = {
  title: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'android'
          ? 'md-home'
          : 'ios-home'}
    />
  ),
};

// Search Icon
const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Recpie: RecipeScreen
},
{
  initialRouteName: 'Search'
});

SearchStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'android' 
        ? 'md-search' 
        : 'ios-search'}
    />
  ),
};

// Edit Recipe Icon
const AddStack = createStackNavigator({
  Add: AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name = {
        Platform.OS === 'android'
        ? "md-add"
        : "ios-add"}
      />
  ),
};

// Save Icon
const SaveStack = createStackNavigator({
  Save: SaveScreen,
});

SaveStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name = {
        Platform.OS === 'android'
        ? "md-save"
        : "ios-save"}
      />
  ),
};

// Settings Icon
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'android'
        ? 'md-options' 
        : 'ios-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  AddStack,
  SaveStack,
  SettingsStack,
});
