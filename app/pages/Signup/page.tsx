"use client"
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e:any) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token); // Save the JWT token
      // Redirect or update UI
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        className="input"
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        className="input"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="input"
      />
      <button type="submit" className="button">Signup</button>
    </form>
  );
}
