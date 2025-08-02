import React, { useState } from 'react';
import './index.css'; // Correctly import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password are not empty
    if (username && password) {
      console.log('Login successful!');
      // Show success alert
      setAlertVisible(true);

      // Reset the form if necessary
      setUsername('');
      setPassword('');
      setErrorMessage(''); // Clear the error if login is successful

      // Handle remember me logic if implemented
      if (rememberMe) {
        localStorage.setItem('username', username);
      }

      // Hide the alert after a few seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="rememberMe"
            className="form-check-input"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>

      {alertVisible && (
        <div className="alert alert-success mt-3" role="alert">
          Login successful!
        </div>
      )}
    </div>
  );
};

export default LoginPage;