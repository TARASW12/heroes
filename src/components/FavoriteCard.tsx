import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Superhero} from '../types/superhero';

interface FavoriteCardProps {
  item: Superhero;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (hero: Superhero) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  item,
  onViewDetails,
  onToggleFavorite,
}) => {
  const imageSource = item.image?.url ? {uri: item.image.url} : undefined;

  return (
    <View style={styles.card}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => onViewDetails(item.id)}
        style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onToggleFavorite(item)}
        style={styles.favoriteButton}>
        <Text style={styles.starIcon}>⭐</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  favoriteButton: {
    marginTop: 5,
    padding: 5,
  },
  starIcon: {
    fontSize: 24,
  },
});

export default FavoriteCard;
