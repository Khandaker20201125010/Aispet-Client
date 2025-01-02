import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with', email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-purple-700 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
