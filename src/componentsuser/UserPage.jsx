import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../contexts/axiosInstance'; 
import './userpagestyle.css';
import moment from 'moment';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePasswordMessage, setUpdatePasswordMessage] = useState('');
    console.log(user)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data
                const userResponse = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/me` );
                setUser(userResponse.data);

                // Fetch user orders
                const ordersResponse = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders/${userResponse.data._id}` );
                setOrders(ordersResponse.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const formatDate = (isoDate) => {
        return moment(isoDate).format('DD/MM/YYYY');
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Êtes-vous sûr de vouloir modifier le mot de passe ?');
        if (!isConfirmed) return; 
        try {
            if (user && user._id) {
                // Update password
                await axiosInstance.put(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/${user._id}/update-password`,
                    { currentPassword, newPassword }
                );
                setUpdatePasswordMessage('Mot de passe mis à jour avec succès.');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setUpdatePasswordMessage('Utilisateur non authentifié.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setUpdatePasswordMessage('Erreur lors de la mise à jour du mot de passe.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-page-container">
            <h2>Informations Utilisateur</h2>
            <div className="user-details">
                <p><span>Nom:</span> {user.name}</p>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Total Dépensé:</span> {user.totalSpent ? user.totalSpent.toFixed(2) : 'N/A'}DA</p>
            </div>

            <h2>Commandes</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Numéro de Commande</th>
                        <th>Date de Commande</th>
                        <th>Statut</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>{order.status}</td>
                            <td>{order.totalCost}DA</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucune commande trouvée.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h4>Total: {orders.reduce((acc, order) => acc + order.totalCost, 0).toFixed(2)}DA</h4>

            <h2>Coupons</h2>
            <table className="coupons-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Utilisé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.coupons && user.coupons.length > 0 ? user.coupons.map((coupon) => (
                        <tr key={coupon._id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.isUsed ? 'Oui' : 'Non'}</td>
                            <td>{coupon.discount}DA</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="3">Aucun coupon trouvé.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Modifier le Mot de Passe</h2>
            <form className="password-form" onSubmit={handleUpdatePassword}>
                <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Modifier Mot de Passe</button>
            </form>
            {updatePasswordMessage && <p className="message-password-change">{updatePasswordMessage}</p>}
        </div>
    );
};

export default UserPage;
