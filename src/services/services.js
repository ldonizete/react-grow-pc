import axios from 'axios';

const api = axios.create({baseURL: 'https://node-grow.herokuapp.com/'});

export default api;