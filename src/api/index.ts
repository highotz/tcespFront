import axios from 'axios';

const api = axios.create({
  baseURL: 'https://audit-center-tcesp.herokuapp.com',
});
export default api;
