import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

import User_icon from '../Pages/asserts/person.png';
import email_icon from '../Pages/asserts/email.png';
import password_icon from '../Pages/asserts/password.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === "Sign Up") {
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            if (password.length < 6) {
                setError(`Password must be at least ${6} characters long.`);
              } else {
                setError('')
              }
        

            try {
                const response = await fetch('http://localhost:3000/users')

                if (response.ok) {
                    setError('');
                    alert('Sign-up successful! Please log in.');
                    setAction("Login"); 
                    navigate('/Login');       
                } else {
                    setError('Failed to create an account. Please try again.');
                }
            } catch (error) {
                console.error('There was an error signing up!', error)
                setError('An error occurred. Please try again.')
            }
        } else {
            
            try {
                const response = await fetch('http://localhost:3000/users');
                const users = await response.json();

                const user = users.find(user => user.email === email && user.password === password);
              
                

                if (user) {
                    navigate('/');
                } else {
                    setError('Invalid email or password.');
                }
            } catch (error) {
                console.error('There was an error logging in!', error);
                setError('An error occurred. Please try again.');
            }
        }
    };

    const toggleAction = () => {
        setAction(action === "Login" ? "Sign Up" : "Login");
        setError('');
    };

    return (
        <div className="Loginpage">
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <form className="inputs" onSubmit={handleSubmit}>
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={User_icon} alt="User Icon" />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="input">
                        <img src={email_icon} alt="Email Icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={password_icon} alt="Confirm Password Icon" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {error && <div className="error">{error}</div>}

                    <div className="toggle-container">
                    <button className="toggle-button" onClick={toggleAction}>
                        {action === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>

                    <div className="submit-container">
                        <button
                            type="submit"
                            className="submit">
                            {action}
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

export default Login;
