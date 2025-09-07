import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthKey } from '../utils';


export default function Reports() {
    const { items: expenses } = useSelector(s => s.expenses);
    const { items: incomes } = useSelector(s => s.incomes);


    const rows = Object.values([...expenses, ...incomes].reduce((acc, t) => {
        const k = monthKey(t.date);
        acc[k] = acc[k] || { month: k, income: 0, expenses: 0 };
        if (t.amount && t.category) {
            if (incomes.includes(t)) acc[k].income += t.amount; else acc[k].expenses += t.amount;
        }
        return acc;
    }, {}));

    return (
        <div className="card p-5">
            <h2 className="text-lg font-semibold mb-4">Monthly Report</h2>
            <ResponsiveContainer width="100%" height={380}>
                <BarChart data={rows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10b981" />
                    <Bar dataKey="expenses" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}