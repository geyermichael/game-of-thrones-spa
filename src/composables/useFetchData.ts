export const useFetchData = async (
  url: string
): Promise<{ [key: string]: any }> => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw error;
  }
};
