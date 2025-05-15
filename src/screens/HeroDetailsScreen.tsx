import React, {useEffect} from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {AppDispatch} from '../store';
import {
  fetchSuperheroById,
  toggleFavorite,
  clearSelectedHero,
  selectSelectedHero,
  selectFavorites,
  selectLoading,
  selectError,
} from '../store/superheroSlice';
import {Spinner} from '../components/ui/spinner';
import {Superhero} from '../types/superhero';
import HeroInfoSections from '../components/HeroInfoSections';

const HeroDetailsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute();
  const selectedHero = useSelector(selectSelectedHero);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const {id} = route.params as {id: string};

  useEffect(() => {
    if (id) {
      dispatch(fetchSuperheroById(id));
    }
    return () => {
      dispatch(clearSelectedHero());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Spinner size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!selectedHero) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>Hero not found.</Text>
      </View>
    );
  }

  const isFavorite = favorites.some(
    (hero: Superhero) => hero.id === selectedHero.id,
  );

  const heroImageSource = selectedHero.image?.url
    ? {uri: selectedHero.image.url}
    : undefined;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {heroImageSource && (
        <Image source={heroImageSource} style={styles.image} />
      )}
      <Text style={styles.name}>{selectedHero.name}</Text>

      <HeroInfoSections
        biography={selectedHero.biography}
        appearance={selectedHero.appearance}
        powerstats={selectedHero.powerstats}
      />

      <TouchableOpacity
        onPress={() => dispatch(toggleFavorite(selectedHero))}
        style={styles.favoriteButton}>
        <Text style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  favoriteButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    paddingBottom: 30,
  },
  favoriteIcon: {
    fontSize: 30,
  },
});

export default HeroDetailsScreen;
