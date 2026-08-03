import React, { useState } from 'react';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
    onBack: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@invito.com' && password === 'admin123') {
            localStorage.setItem('isLoggedIn', 'true');
            onLogin();
        } else {
            setError('Email atau password salah!');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </button>

                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 text-3xl font-serif font-bold text-stone-900 mb-2">
                        <Heart className="w-8 h-8 text-[#C4A265] fill-[#C4A265]" />
                        Invito
                    </div>
                    <p className="text-stone-600">Login untuk masuk ke Dashboard</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Login Admin</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                                    placeholder="admin@invito.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C4A265]"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#C4A265] hover:bg-[#b08e55] text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                            Masuk Dashboard
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                        <p className="text-xs text-stone-600 text-center">
                            <strong>Demo Login:</strong><br />
                            Email: admin@invito.com<br />
                            Password: admin123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}