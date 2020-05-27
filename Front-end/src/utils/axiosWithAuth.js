import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://localhost:24272',
        headers: {
            Authorization: token
        }
    })
}