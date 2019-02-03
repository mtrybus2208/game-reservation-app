import axios from 'axios';

export const getQuotes = () => {
  return axios.get('http://learning-app.test/api/quotes');
} 