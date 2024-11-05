import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import Card from '../components/ui/card';
import Alert from '../components/ui/alert';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function Login() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Get the page they were trying to visit (if any)
  const from = location.state?.from || '/products';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch(login(data));
        // Navigate to the page they were trying to visit, or products page by default
        navigate(from, { replace: true });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold">Login</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="error" className="mb-4">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
    )
}
