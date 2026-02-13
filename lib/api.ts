import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API || 'http://localhost:3000', // change this
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
