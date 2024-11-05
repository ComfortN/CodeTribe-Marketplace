import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ShoppingCart, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
    const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-white">
            CodeTribe Market
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-300 hover:text-white">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/add-product" className="text-gray-300 hover:text-white">
                  Add Product
                </Link>
                <Link to="/cart" className="text-gray-300 hover:text-white relative">
                  <ShoppingCart className="h-6 w-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white flex items-center">
                  <LogIn className="h-6 w-6 mr-1" />
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white flex items-center">
                  <UserPlus className="h-6 w-6 mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
