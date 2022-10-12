/**
 * useLogError is only for development purpose to log errors to the browser console
 *
 * @param e
 */
export const useLogError = (e: any) => {
  if (import.meta.env.MODE === 'development') {
    console.error(e.message);
  }
};
