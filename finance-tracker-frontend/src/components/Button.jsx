import React from 'react';


export default function Button({
    as: Comp = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    const variants = {
        primary: 'bg-violet-600 hover:bg-violet-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        ghost: 'hover:bg-gray-100 text-gray-700'
    };
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
    return (
        <Comp className={`rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
    );
}