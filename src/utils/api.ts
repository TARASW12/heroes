import {Superhero, SuperheroResponse} from '../types/superhero';
import {ApiUtil} from './axios';

export const searchSuperheroes = async (name: string): Promise<Superhero[]> => {
  try {
    const data: SuperheroResponse = await ApiUtil.get(`/search/${name}`);
    if (data.response === 'success') {
      return data.results || [];
    }
    console.warn(
      `Search for "${name}" returned: ${data.error || 'unknown error'}`,
    );
    return [];
  } catch (error) {
    console.error('Error searching superheroes:', error);
    return [];
  }
};

export const getSuperheroById = async (
  id: string,
): Promise<Superhero | null> => {
  try {
    const data: Superhero = await ApiUtil.get(`/${id}`);
    if (data && data.response !== 'error') {
      return data;
    }
    console.warn(
      `Superhero with ID "${id}" not found or error: ${data?.error}`,
    );
    return null;
  } catch (error) {
    console.error('Error fetching superhero by ID:', error);
    return null;
  }
};
