import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getJokes = () => {
    try {
        return axiosWithAuth().get('/api/jokes');
    } catch(err) {
        throw err;
    }
}