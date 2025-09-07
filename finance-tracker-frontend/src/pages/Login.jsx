import React, { useState } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { status, error } = useSelector((s) => s.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(login({ email, password }));
        if (res.meta.requestStatus === 'fulfilled') {
            navigate(state?.from?.pathname || '/dashboard', { replace: true });
        }
    };

    return (
        <div className="max-w-md mx-auto card p-6 mt-12">
            <h1 className="text-xl font-semibold mb-4">Sign in</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                >
                    {status === 'loading' ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
                No account?{' '}
                <Link to="/register" className="text-violet-700">
                    Create one
                </Link>
            </p>
        </div>
    );
}
