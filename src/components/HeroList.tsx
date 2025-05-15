import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Superhero} from '../types/superhero';
import {Skeleton, SkeletonText} from '../components/ui/skeleton';

interface HeroListProps {
  searchResults: Superhero[];
  favorites: Superhero[];
  loading: boolean;
  error: string | null;
  onToggleFavorite: (hero: Superhero) => void;
  onViewDetails: (id: string) => void;
}

const renderSkeletonCard = ({index}: {item: any; index: number}) => (
  <View style={[styles.card, styles.skeletonCard]} key={`skeleton-${index}`}>
    <Skeleton variant="circular" className="w-24 h-24 mb-2" />
    <SkeletonText _lines={2} className="h-4 w-3/4 mx-auto mt-1" />
    <SkeletonText _lines={1} className="h-4 w-1/4 mx-auto mt-2" />
    <SkeletonText _lines={1} className="h-8 w-3/4 mx-auto mt-2" />
    <Skeleton variant="circular" className="w-8 h-8 mt-2" />
  </View>
);

const HeroList: React.FC<HeroListProps> = ({
  searchResults,
  favorites,
  loading,
  error,
  onToggleFavorite,
  onViewDetails,
}) => {
  const renderHeroCard = ({item}: {item: Superhero}) => {
    const isFavorite = favorites.some(hero => hero.id === item.id);
    return (
      <View style={styles.card}>
        {item.image?.url && (
          <Image source={{uri: item.image.url}} style={styles.image} />
        )}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.powerstatText}>
          Intelligence: {item.powerstats?.intelligence || 'N/A'}
        </Text>
        <Text style={styles.powerstatText}>
          Strength: {item.powerstats?.strength || 'N/A'}
        </Text>
        <Text style={styles.powerstatText}>
          Speed: {item.powerstats?.speed || 'N/A'}
        </Text>
        <TouchableOpacity
          onPress={() => onViewDetails(item.id)}
          style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onToggleFavorite(item)}
          style={styles.favoriteButton}>
          <Text>{isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    const skeletonData = Array(4).fill(0);
    return (
      <FlatList
        data={skeletonData}
        renderItem={renderSkeletonCard}
        keyExtractor={(_, index) => `skeleton-item-${index}`}
        numColumns={2}
        style={styles.listContainer}
      />
    );
  } else {
    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Text>Error: {error}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={searchResults}
        showsVerticalScrollIndicator={false}
        renderItem={renderHeroCard}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.centeredContainer}>
            <Text>No superheroes found. Try a different search!</Text>
          </View>
        }
      />
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  centeredMessageContainer: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 250,
  },
  skeletonCard: {
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
    textAlign: 'center',
  },
  powerstatText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  favoriteButton: {
    marginTop: 8,
    padding: 5,
  },
});

export default HeroList;
