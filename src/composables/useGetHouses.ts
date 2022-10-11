import { useFetchData } from './useFetchData';
import House from '../types/IHouse';

export const useGetHouses = async (page: number = 1): Promise<House[]> => {
  try {
    const houses = (await useFetchData(
      'https://anapioficeandfire.com/api/houses?page=1&pageSize=10'
    )) as House[];
    return houses;
  } catch (error) {
    throw error;
  }
};
