import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Superhero} from '../types/superhero';

interface HeroInfoSectionsProps {
  biography: Superhero['biography'];
  appearance: Superhero['appearance'];
  powerstats: Superhero['powerstats'];
}

const HeroInfoSections: React.FC<HeroInfoSectionsProps> = ({
  biography,
  appearance,
  powerstats,
}) => {
  return (
    <>
      {biography && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.text}>
            Full Name: {biography['full-name'] || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Alter Egos: {biography['alter-egos'] || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Aliases: {biography.aliases?.join(', ') || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Place of Birth: {biography['place-of-birth'] || 'N/A'}
          </Text>
          <Text style={styles.text}>
            First Appearance: {biography['first-appearance'] || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Publisher: {biography.publisher || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Alignment: {biography.alignment || 'N/A'}
          </Text>
        </View>
      )}

      {appearance && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Text style={styles.text}>Gender: {appearance.gender || 'N/A'}</Text>
          <Text style={styles.text}>Race: {appearance.race || 'N/A'}</Text>
          <Text style={styles.text}>
            Height: {appearance.height?.join(', ') || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Weight: {appearance.weight?.join(', ') || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Eye Color: {appearance['eye-color'] || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Hair Color: {appearance['hair-color'] || 'N/A'}
          </Text>
        </View>
      )}

      {powerstats && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Power Stats</Text>
          <Text style={styles.text}>
            Intelligence: {powerstats.intelligence || 'N/A'}
          </Text>
          <Text style={styles.text}>
            Strength: {powerstats.strength || 'N/A'}
          </Text>
          <Text style={styles.text}>Speed: {powerstats.speed || 'N/A'}</Text>
          <Text style={styles.text}>
            Durability: {powerstats.durability || 'N/A'}
          </Text>
          <Text style={styles.text}>Power: {powerstats.power || 'N/A'}</Text>
          <Text style={styles.text}>Combat: {powerstats.combat || 'N/A'}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
});

export default HeroInfoSections;
