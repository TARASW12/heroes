import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../store';
import {toggleFavorite} from '../store/superheroSlice';
import {Superhero} from '../types/superhero';
import {RootStackParamList} from '../navigation';
import FavoriteCard from '../components/FavoriteCard';

type FavoritesScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const {favorites} = useSelector((state: RootState) => state.superhero);

  const handleToggleFavorite = (hero: Superhero) => {
    dispatch(toggleFavorite(hero));
  };

  const handleViewDetails = (id: string) => {
    navigation.navigate('HeroDetails', {id});
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet. Add some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <FavoriteCard
            item={item}
            onViewDetails={handleViewDetails}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContentContainer: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
});

export default FavoritesScreen;
