import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Wallet, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';


export default function Navbar({ theme }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((s) => s.auth);


    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-violet-600 rounded-lg"><Wallet className="w-5 h-5 text-white" /></div>
                    <span className="font-semibold">Finance Tracker</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/dashboard" className={({ isActive }) => `text-sm ${isActive ? 'text-violet-700 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</NavLink>
                    <NavLink to="/reports" className={({ isActive }) => `text-sm ${isActive ? 'text-violet-700 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>Reports</NavLink>
                </div>
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-sm text-gray-600">Hi, {user.name}</span>
                            <button
                                onClick={async () => { await dispatch(logout()); navigate('/login'); }}
                                className="p-2 text-gray-600 hover:text-gray-900"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="text-sm text-violet-700">Login</NavLink>
                    )}
                </div>
                {/* <button
                    onClick={() => dispatchTheme({ type: "TOGGLE" })}
                    className="p-2 border rounded"
                >
                    Toggle Theme ({theme.mode})
                </button> */}
            </div>
        </nav>
    );
}