import axios from 'axios';

const baseURL = import.meta.env.DEV
    ? 'http://localhost:5001/api' // dev
    : `${import.meta.env.VITE_API_BASE_URL || ''}/api`;

export const http = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // make sure token key matches your login
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const robotService = {
    getRobots: () => http.get('/robots').then(res => res.data.data),
    createRobot: (data) => http.post('/robots', data).then(res => res.data.data),
    updateRobot: (id, data) => http.put(`/robots/${id}`, data).then(res => res.data.data),
    deleteRobot: (id) => http.delete(`/robots/${id}`).then(res => res.data.data),
};

export default robotService;
