import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError(null);

        try {
            const res = await fetch('http://127.0.0.1:8000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),   // ✅ backend expects username, email, password
            });

            if (!res.ok) {
                const err = await res.json();
                setError(err.detail || 'Registration failed');
                setStatus('failed');
                return;
            }

            const data = await res.json();
            console.log('✅ Registered user:', data);

            setStatus('succeeded');
            // after success go to dashboard (or you can show users table)
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message);
            setStatus('failed');
        }
    };

    return (
        <div className="max-w-md mx-auto card p-6 mt-12">
            <h1 className="text-xl font-semibold mb-4">Create account</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Username</label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                >
                    {status === 'loading' ? 'Creating...' : 'Sign up'}
                </Button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-violet-700">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
