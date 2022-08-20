import axios from 'axios';

export const api = axios.create({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});
