import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Icon, SearchIcon, StarIcon} from './ui/icon';

const routeIcons: Record<string, React.ElementType> = {
  AllHeroes: SearchIcon,
  Favorites: StarIcon,
};

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = () => {
          const IconComponent = routeIcons[route.name];
          if (IconComponent) {
            return (
              <Icon
                as={IconComponent}
                size="lg"
                color={isFocused ? 'black' : '#BDBDBD'}
              />
            );
          }
          return null;
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            {renderIcon()}
            <Text style={{color: isFocused ? 'black' : '#BDBDBD'}}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
