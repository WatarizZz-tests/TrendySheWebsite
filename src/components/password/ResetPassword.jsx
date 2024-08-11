import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./resetpasswordstyle.css";

const ResetPassword = () => {
  const { userId, recoveryToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Regex for at least one uppercase letter and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
  
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
  
    if (!passwordRegex.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins une majuscule et un chiffre');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/reset-password`, {
        userId,
        recoveryToken,
        newPassword
      });
      setSuccess('Le mot de passe a été changé avec succès');
      setError('');
      // Redirect to login or another page
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
      setSuccess('');
    }
  };
  

  return (
    <div className="reset-password-container">
      <h1>Reinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nouveau mot de passe :</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reinitialiser</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ResetPassword;
