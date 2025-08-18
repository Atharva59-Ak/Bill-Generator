import React from 'react';
import { Button } from '../ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

const SocialLogin = ({ onAuthSuccess }) => {
  // Mock functions for social login since we don't have the actual libraries installed
  const handleGoogleLogin = async () => {
    try {
      // In a real implementation, this would use the Google OAuth API
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API response
      const mockResponse = {
        data: {
          access_token: 'mock_google_token',
          user: {
            id: 'google_123',
            name: 'Google User',
            email: 'user@gmail.com',
            provider: 'google'
          }
        }
      };
      
      // Store authentication data
      const { access_token, user } = mockResponse.data;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      onAuthSuccess(user);
    } catch (err) {
      console.error('Google authentication error:', err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // In a real implementation, this would use the Facebook Login API
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API response
      const mockResponse = {
        data: {
          access_token: 'mock_facebook_token',
          user: {
            id: 'facebook_456',
            name: 'Facebook User',
            email: 'user@facebook.com',
            provider: 'facebook'
          }
        }
      };
      
      // Store authentication data
      const { access_token, user } = mockResponse.data;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      onAuthSuccess(user);
    } catch (err) {
      console.error('Facebook authentication error:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12 h8"/>
            <path d="M12 8 v8"/>
          </svg>
          Google
        </Button>
        <Button 
          variant="outline" 
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;