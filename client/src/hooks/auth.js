import createPersistedState from 'use-persisted-state';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const tokenState = createPersistedState('token');
const userState = createPersistedState('user');
const useAuth = () => {
    const [token, setToken] = tokenState('');
    const [user, setUser] = userState({});

    const login = async (email, password) => {
        return axios.post('api/auth/login',
            { email: email, password: password })
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                return res;
            });
    };

    const signup = async (email, password) => {
        return axios.post('api/auth/signup',
            { email: email, password: password })
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                return res;
            });
    };

    const logout = () => {
        axios.defaults.headers.common.Authorization = null;
        setToken('');
        setUser({});
        window.location.reload('/');
    };

    const isTokenExpired = () => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        }
        catch (err) {
            return false;
        }
    };

    const getProfile = () => {
        return jwtDecode(token);
    };

    const getToken = () => {
        return token;
    };

    const isLoggedIn = () => {
        return token !== undefined && token !== '' && !isTokenExpired();
    };

    return {
        login,
        logout,
        user,
        getProfile,
        isLoggedIn,
        signup,
        getToken
    };
};

export default useAuth;