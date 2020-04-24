import axios from 'axios';

export default token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};