import axios from 'axios';

export const getUser = async () => {
    try {
        const response = await axios.get('/api/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const login = () => {
    const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
    window.open(host + '/oauth2/authorization/github', '_self');
};

export const logout = () => {
    const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
    window.open(host + '/logout', '_self');
};
