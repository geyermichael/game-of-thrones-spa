import { useFetchData } from './useFetchData';
import House from '../types/IHouse';

/**
 * Get an array of 24 GoT Houses by a given page
 *
 * @param page
 * @returns Array of Houses
 */
export const useGetHouses = async (page: number = 1): Promise<House[]> => {
  try {
    const apiBaseURL = 'https://anapioficeandfire.com/api/';
    const houses = (await useFetchData(
      `${apiBaseURL}houses?page=${page}&pageSize=24`
    )) as House[];
    return houses;
  } catch (error) {
    throw error;
  }
};
