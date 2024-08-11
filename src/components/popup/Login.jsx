import React, { useState, useContext } from 'react';
import axiosInstance from '../../contexts/axiosInstance'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import loginimg from '../../assets/sakura.jpg';
import axios from 'axios';
import './loginstyle.css';
import {jwtDecode} from 'jwt-decode';

const Login = ({ isOpen, setIsOpen }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useContext(AuthContext);
    const [registerMessage, setRegisterMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [recoveryMessage, setRecoveryMessage] = useState('');
    const navigate = useNavigate();


    const toggleForm = () => {
        setIsLogin(!isLogin);
        setIsPasswordRecovery(false);
    };

    const togglePasswordRecovery = () => {
        setIsPasswordRecovery(!isPasswordRecovery);
        setIsLogin(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/login`, {
                email,
                password,
            });
            login(response.data.token, response.data.refreshToken);

            const decoded = jwtDecode(response.data.token);
            if (decoded.isOwner || decoded.isWorker) {
                setLoginMessage('Connexion réussie. Redirection vers l\'interface admin...');
                setTimeout(() => {
                    navigate('/admin');
                }, 3000);
            } else {
                setLoginMessage('Connexion réussie');
                setTimeout(() => {
                    setLoginMessage('');
                    setIsOpen(false);
                }, 3000);
            }
        } catch (error) {
            setLoginMessage('Erreur lors de la connexion');
            setTimeout(() => {
                setLoginMessage('');
            }, 5000);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setPasswordError('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.');
            return;
        }
        setPasswordError('');
        try {
            await axios.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users`, {
                name,
                email,
                password,
            });
            setRegisterMessage('Création réussie');
            setTimeout(() => {
                setRegisterMessage('');
            }, 5000);
        } catch (error) {
            setRegisterMessage('Erreur lors de la création');
            setTimeout(() => {
                setRegisterMessage('');
            }, 5000);
        }
    };

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/forgot-password`, { email });
            setRecoveryMessage('Instructions de récupération envoyées');
            setTimeout(() => {
                setRecoveryMessage('');
            }, 5000);
        } catch (error) {
            setRecoveryMessage('Erreur lors de la récupération du mot de passe');
            setTimeout(() => {
                setRecoveryMessage('');
            }, 5000);
        }
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className={`popup-container ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <div className='popup-content'>
                    <div className="popup-leftdiv">
                        <img src={loginimg} alt="sakura trees" />
                    </div>
                    <div className="popup-rightdiv">
                        <button className="close-button" onClick={() => setIsOpen(false)}>X</button>
                        {isPasswordRecovery ? (
                            <>
                                <h1>Récupération de mot de passe</h1>
                                <form onSubmit={handlePasswordRecovery}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {recoveryMessage && <p className={`messagel ${recoveryMessage.includes('Erreur') ? 'error' : 'success'}`}>{recoveryMessage}</p>}
                                    <button type="submit">Envoyer les instructions</button>
                                    <h3>Déjà inscrit ? <span onClick={toggleForm}>Se connecter</span></h3>
                                    <h3>Pas de compte ? <span onClick={toggleForm}>Inscrivez-vous</span></h3>
                                </form>
                            </>
                        ) : (
                            <>
                                {isLogin ? (
                                    <>
                                        <h1>Se connecter</h1>
                                        <form onSubmit={handleLogin}>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Mot de passe"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {loginMessage && <p className={`messagel ${loginMessage.includes('Erreur') ? 'error' : 'success'}`}>{loginMessage}</p>}
                                            <button type="submit">Se connecter</button>
                                        </form>
                                        <span onClick={togglePasswordRecovery}>Mot de passe oublié ?</span>
                                        <h3>Pas de compte ? <span onClick={toggleForm}>Créer un compte</span></h3>
                                    </>
                                ) : (
                                    <>
                                        <h1>Créer un compte</h1>
                                        <p>Munissez-vous des plus beaux bijoux</p>
                                        <form onSubmit={handleRegister}>
                                            <input
                                                type="text"
                                                placeholder="Nom"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Mot de passe"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {passwordError && <p className='messagel error'>{passwordError}</p>}
                                            {registerMessage && <p className={`messagel ${registerMessage.includes('Erreur') ? 'error' : 'success'}`}>{registerMessage}</p>}
                                            <button type="submit">Créer un compte</button>
                                        </form>
                                        <span onClick={togglePasswordRecovery}>Mot de passe oublié ?</span>
                                        <h3>Vous avez déjà un compte ? <span onClick={toggleForm}>Se connecter</span></h3>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;