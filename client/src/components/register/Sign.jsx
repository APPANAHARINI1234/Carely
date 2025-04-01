import React, { useState } from 'react';
import './Sign.css';
import Login from '../login/Login';
import Register from './Register';
import { motion } from 'framer-motion';

function Signin() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleRegistrationSuccess = () => {
    setActiveTab('login');
  };

  return (
    <div className="auth-wrapper">
      <motion.div 
        className="auth-container" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Register
          </button>
        </div>

        <div className="auth-form-wrapper">
          {activeTab === 'login' ? (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Login />
            </motion.div>
          ) : (
            <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Register onRegisterSuccess={handleRegistrationSuccess} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Signin;
