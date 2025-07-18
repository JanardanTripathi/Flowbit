// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../api'; // ✅ Named import
import { setToken } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password); // ✅ call the login function
      if (res.token) {
        setToken(res.token);
        navigate('/dashboard');
      } else {
        alert(res.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login error');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
