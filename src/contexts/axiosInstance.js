import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}`,
    timeout: 10000,
});

// Request Interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                window.location.href = '/';
                return Promise.reject(error);
            }

            try {
                console.log('Attempting to refresh token with:', refreshToken);
                const response = await axios.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/refresh-token` , { refreshToken });
                const { token } = response.data;

                localStorage.setItem('token', token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;