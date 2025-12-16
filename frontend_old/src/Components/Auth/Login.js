import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LOGO from 'file:///C:/Users/jules/Downloads/LOGO_CAT.png';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Simulating a successful login without a real API call

      // Replace this with your actual login logic
      // For simplicity, hardcoded credentials are used
      const expectedLogin = "comptaCAT";
      const expectedPassword = "Cat@2023";

      if (email === expectedLogin && password === expectedPassword) {
        // Login successful
        // Clear form fields and errors
        setEmail("");
        setPassword("");
        setErrors("");

        // Use navigate to redirect to the receipts page
        navigate('/receipts');
      } else {
        // Login failed
        setErrors("Login Incorrect");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors("Failed to login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container" style={{ display: 'flex', margin: 'auto', marginTop: '15vh' }}>
      <div style={{ flex: 1 }}>
        <img
          src={LOGO}
          alt="Logo"
          className="img-fluid"
          style={{ width: '80%', height: 'auto', alignSelf: 'flex-start' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className="text-center mb-4">
          <h2 className="mt-3">CONNEXION</h2>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              <strong>
                Login
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="Entrer login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>
                  Mot De Passe
                </strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
            Login
          </button>
        </form>

        {errors && <p className="text-danger mt-3">{errors}</p>}
      </div>
    </div>
  );
};

export default Login;
