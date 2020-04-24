import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getJokes = () => {
    try {
        return axiosWithAuth().post('/api/jokes');
    } catch(err) {
        throw err;
    }
}