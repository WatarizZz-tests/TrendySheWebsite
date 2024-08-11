import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import axiosInstance from './axiosInstance'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData();  
        } else {
            setLoading(false); 
        }
    }, []); 

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/me` );
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false); 
        }
    };

    const login = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        const decoded = jwtDecode(token);
        setUser(decoded);

    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
        window.location.href = '/'; 
    };

    useEffect(() => {
        console.log("User state updated:", user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
