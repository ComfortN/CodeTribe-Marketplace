import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import Card from '../components/ui/card';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import Alert from '../components/ui/alert';


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        try {
        const response = await fetch('http://localhost:3005/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            dispatch(login(data));
            navigate('/products');
        } else {
            setError(data.message);
        }
        } catch (err) {
        setError('Failed to register. Please try again.');
        }
    };
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold">Register</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="error" className="mb-4">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}
