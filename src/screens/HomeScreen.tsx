import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppDispatch} from '../store';
import {
  fetchSuperheroesByName,
  toggleFavorite,
  clearSearchResults,
  selectSearchResults,
  selectFavorites,
  selectLoading,
  selectError,
} from '../store/superheroSlice';
import {RootStackParamList} from '../navigation';
import {Superhero} from '../types/superhero';
import useDebounce from '../hooks/useDebounce';
import {Input, InputField, InputSlot, InputIcon} from '../components/ui/input';
import {CloseCircleIcon} from '../components/ui/icon';
import HeroList from '../components/HeroList';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const searchResults = useSelector(selectSearchResults);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (debouncedSearchText.trim()) {
      dispatch(fetchSuperheroesByName(debouncedSearchText));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedSearchText, dispatch]);

  const handleToggleFavorite = (hero: Superhero) => {
    dispatch(toggleFavorite(hero));
  };

  const handleViewDetails = (id: string) => {
    navigation.navigate('HeroDetails', {id});
  };

  const handleClearSearch = () => {
    setSearchText('');
  };
  return (
    <View style={styles.container}>
      <Input
        size="md"
        variant="outline"
        style={styles.inputWrapper as any}
        className="border border-gray-400 rounded-lg flex-row items-center bg-white">
        <InputField
          placeholder="Search superheroes..."
          value={searchText}
          onChangeText={setSearchText}
          className="flex-1 h-10 px-3 py-2 text-base text-black bg-transparent"
        />
        {searchText.length > 0 && (
          <InputSlot onPress={handleClearSearch} className="px-2">
            <InputIcon as={CloseCircleIcon} size="md" color="white" />
          </InputSlot>
        )}
      </Input>
      <HeroList
        searchResults={searchResults}
        favorites={favorites}
        loading={loading}
        error={error}
        onToggleFavorite={handleToggleFavorite}
        onViewDetails={handleViewDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  inputWrapper: {
    marginBottom: 10,
  },
});

export default HomeScreen;
