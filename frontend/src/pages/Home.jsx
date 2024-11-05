import React from 'react'
import { Link } from 'react-router-dom';
import { Diamond } from 'lucide-react'; // Assuming lucide-react has a diamond icon for jewelry theme
import Button from '../components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <Diamond className="w-16 h-16 mb-4 text-pink-500" />
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeTribe Market</h1>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl">
        Discover stunning, handcrafted jewelry pieces that capture elegance and beauty. Explore our unique collection or start selling your own creations today!
      </p>
      <div className="flex gap-4">
        <Link to="/products">
          <Button size="lg">Explore Jewelry</Button>
        </Link>
        <Link to="/add-product">
          <Button variant="secondary" size="lg">Become a Seller</Button>
        </Link>
      </div>
    </div>
  )
}
