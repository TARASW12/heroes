import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Superhero} from '../types/superhero';
import {
  searchSuperheroes as searchApi,
  getSuperheroById as getByIdApi,
} from '../utils/api';
import {RootState} from '../store';

export const fetchSuperheroesByName = createAsyncThunk(
  'superhero/fetchByName',
  async (name: string, {rejectWithValue}) => {
    try {
      const data = await searchApi(name);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch superheroes by name',
      );
    }
  },
);

export const fetchSuperheroById = createAsyncThunk(
  'superhero/fetchById',
  async (id: string, {rejectWithValue}) => {
    try {
      const data = await getByIdApi(id);
      if (data) {
        return data;
      }
      return rejectWithValue('Superhero not found');
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch superhero by ID',
      );
    }
  },
);

interface SuperheroState {
  searchResults: Superhero[];
  favorites: Superhero[];
  selectedHero: Superhero | null;
  loading: boolean;
  error: string | null;
}

const initialState: SuperheroState = {
  searchResults: [],
  favorites: [],
  selectedHero: null,
  loading: false,
  error: null,
};

const superheroSlice = createSlice({
  name: 'superhero',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Superhero>) => {
      const index = state.favorites.findIndex(
        hero => hero.id === action.payload.id,
      );
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    clearSearchResults: state => {
      state.searchResults = [];
    },
    clearSelectedHero: state => {
      state.selectedHero = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSuperheroesByName.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSuperheroesByName.fulfilled,
        (state, action: PayloadAction<Superhero[]>) => {
          state.loading = false;
          state.searchResults = action.payload;
        },
      )
      .addCase(fetchSuperheroesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSuperheroById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSuperheroById.fulfilled,
        (state, action: PayloadAction<Superhero>) => {
          state.loading = false;
          state.selectedHero = action.payload;
        },
      )
      .addCase(fetchSuperheroById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {toggleFavorite, clearSearchResults, clearSelectedHero} =
  superheroSlice.actions;

// Selectors
export const selectSuperheroState = (state: RootState) => state.superhero;
export const selectSearchResults = (state: RootState) =>
  state.superhero.searchResults;
export const selectFavorites = (state: RootState) => state.superhero.favorites;
export const selectLoading = (state: RootState) => state.superhero.loading;
export const selectError = (state: RootState) => state.superhero.error;
export const selectSelectedHero = (state: RootState) =>
  state.superhero.selectedHero;

export default superheroSlice.reducer;
