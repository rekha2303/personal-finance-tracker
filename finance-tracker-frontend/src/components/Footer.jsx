import React from 'react';
export default function Footer() {
    return (
        <footer className="mt-10 border-t border-gray-200">
            <div className="container py-6 text-xs text-gray-500">
                © {new Date().getFullYear()} Finance Tracker. All rights reserved.
            </div>
            <div>
                Logo
            </div>
        </footer>
    );
}