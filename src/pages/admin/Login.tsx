import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-smoky-black flex items-center justify-center p-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-yellow-crayola/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vegas-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white-2 mb-2">Admin Panel</h1>
          <p className="text-light-gray-70">Sign in to manage your portfolio</p>
        </div>

        {/* Login Card */}
        <div className="bg-eerie-black-2 border border-jet rounded-2xl p-8 shadow-shadow-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-light-gray-70" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-smoky-black-1 border border-jet rounded-xl text-white-2 placeholder-light-gray-70 focus:outline-none focus:border-orange-yellow-crayola focus:ring-1 focus:ring-orange-yellow-crayola transition-all"
                  placeholder="admin@demo.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-light-gray-70" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-smoky-black-1 border border-jet rounded-xl text-white-2 placeholder-light-gray-70 focus:outline-none focus:border-orange-yellow-crayola focus:ring-1 focus:ring-orange-yellow-crayola transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-light-gray-70 hover:text-white-2 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-jet bg-smoky-black-1 text-orange-yellow-crayola focus:ring-orange-yellow-crayola focus:ring-offset-0"
                />
                <span className="text-light-gray-70">Remember me</span>
              </label>
              <a href="#" className="text-orange-yellow-crayola hover:text-vegas-gold transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold text-smoky-black font-semibold rounded-xl hover:shadow-shadow-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-smoky-black-1 border border-jet rounded-xl">
              <p className="text-sm text-light-gray-70 text-center mb-2">Demo Credentials:</p>
              <p className="text-sm text-white-2 text-center">
                Email: <code className="text-orange-yellow-crayola">admin@demo.com</code>
              </p>
              <p className="text-sm text-white-2 text-center">
                Password: <code className="text-orange-yellow-crayola">password</code>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-light-gray-70 hover:text-orange-yellow-crayola transition-colors text-sm"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
