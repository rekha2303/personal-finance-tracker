import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
} from '../features/expenses/expenseSlice';
import {
    fetchIncomes,
    addIncome,
    updateIncome,
    deleteIncome,
} from '../features/incomes/incomeSlice';
import Button from '../components/Button';
import { TrendingDown, TrendingUp, DollarSign, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { formatCurrency, monthKey } from '../utils';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#84cc16'];

export default function Dashboard() {
    const dispatch = useDispatch();
    const expenses = useSelector((s) => Array.isArray(s.expenses?.items) ? s.expenses.items : []);
    const incomes = useSelector((s) => Array.isArray(s.incomes?.items) ? s.incomes.items : []);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [type, setType] = useState('expense');

    // load initial data
    useEffect(() => {
        dispatch(fetchExpenses());
        dispatch(fetchIncomes());
    }, [dispatch]);

    // totals
    const totalIncome = useMemo(
        () => (incomes || []).reduce((s, i) => s + (Number(i.amount) || 0), 0),
        [incomes]
    );

    const totalExpense = useMemo(
        () => (expenses || []).reduce((s, e) => s + (Number(e.amount) || 0), 0),
        [expenses]
    );

    const totalSavings = totalIncome - totalExpense;

    // monthly series (income/expenses)
    const byMonth = useMemo(() => {
        const map = {};
        (incomes || []).forEach((i) => {
            const k = monthKey(i.date);
            map[k] = map[k] || { month: k, income: 0, expenses: 0 };
            map[k].income += Number(i.amount) || 0;
        });
        (expenses || []).forEach((e) => {
            const k = monthKey(e.date);
            map[k] = map[k] || { month: k, income: 0, expenses: 0 };
            map[k].expenses += Number(e.amount) || 0;
        });
        return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
    }, [incomes, expenses]);

    // expense by category
    const expenseByCategory = useMemo(() => {
        const acc = {};
        (expenses || []).forEach((e) => {
            const cat = e.category || 'Uncategorized';
            acc[cat] = (acc[cat] || 0) + (Number(e.amount) || 0);
        });
        return Object.entries(acc).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    // open add/edit modal
    const openAdd = (t = 'expense') => {
        setEditing(null);
        setType(t);
        setModalOpen(true);
    };

    const onSave = async (payload) => {
        if (type === 'expense') {
            if (editing) await dispatch(updateExpense(payload));
            else await dispatch(addExpense(payload));
        } else {
            if (editing) await dispatch(updateIncome(payload));
            else await dispatch(addIncome(payload));
        }
        setModalOpen(false);
        setEditing(null);
    };

    const onEdit = (t, item) => {
        setType(t);
        setEditing(item);
        setModalOpen(true);
    };

    const onDelete = async (t, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        if (t === 'expense') await dispatch(deleteExpense(id));
        else await dispatch(deleteIncome(id));
    };

    return (
        <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Income" value={totalIncome} icon={<TrendingUp />} accent="text-emerald-600" />
                <StatCard title="Total Expenses" value={totalExpense} icon={<TrendingDown />} accent="text-red-600" />
                <StatCard title="Total Savings" value={totalSavings} icon={<DollarSign />} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-4">
                    <h3 className="font-semibold mb-2">Income vs Expenses (Monthly)</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={byMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="card p-4">
                    <h3 className="font-semibold mb-2">Expense Breakdown</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie dataKey="value" data={expenseByCategory} outerRadius={100} label>
                                {expenseByCategory.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ListCard
                    title="Recent Expenses"
                    items={(expenses || []).slice(0, 8)}
                    type="expense"
                    onAdd={() => openAdd('expense')}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

                <ListCard
                    title="Recent Incomes"
                    items={(incomes || []).slice(0, 8)}
                    type="income"
                    onAdd={() => openAdd('income')}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>

            {modalOpen && (
                <EditModal
                    onClose={() => {
                        setModalOpen(false);
                        setEditing(null);
                    }}
                    onSave={onSave}
                    editing={editing}
                    type={type}
                />
            )}
        </div>
    );
}

/* -------------------------
   Small components
   ------------------------- */

function StatCard({ title, value, icon, accent }) {
    return (
        <div className="card p-5 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className={`text-2xl font-semibold ${accent || ''}`}>{formatCurrency(value)}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">{icon}</div>
        </div>
    );
}

function ListCard({ title, items = [], type, onAdd, onEdit, onDelete }) {
    return (
        <div className="card">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">{title}</h3>
                <Button onClick={onAdd} className="flex items-center gap-2" aria-label={`Add ${type}`}>
                    <PlusCircle className="w-4 h-4" /> Add
                </Button>
            </div>

            <ul className="divide-y max-h-96 overflow-y-auto">
                {items.map((item) => (
                    <li key={item._id || item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                            <p className="font-medium">{item.description || item.note || (type === 'expense' ? 'Expense' : 'Income')}</p>
                            <p className="text-xs text-gray-500">
                                {(item.category && item.category) || 'Uncategorized'} • {item.date ? new Date(item.date).toLocaleDateString() : ''}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-semibold ${type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {type === 'income' ? '+' : '-'}
                                {formatCurrency(Number(item.amount) || 0)}
                            </span>
                            <button onClick={() => onEdit(type, item)} className="p-1 text-gray-500 hover:text-violet-700" aria-label="Edit">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(type, item._id || item.id)} className="p-1 text-gray-500 hover:text-red-600" aria-label="Delete">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </li>
                ))}
                {items.length === 0 && <li className="p-4 text-sm text-gray-500">No records yet.</li>}
            </ul>
        </div>
    );
}

function EditModal({ onClose, onSave, editing, type }) {
    const [form, setForm] = useState(() => ({
        amount: editing ? String(editing.amount || '') : '',
        category: editing ? editing.category || '' : '',
        description: editing ? editing.description || editing.note || '' : '',
        date: editing ? (editing.date ? editing.date.slice(0, 10) : '') : new Date().toISOString().slice(0, 10),
        _id: editing ? editing._id || editing.id : undefined,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.amount || !form.date) {
            alert('Amount and Date are required.');
            return;
        }
        const payload = {
            ...form,
            amount: Number(form.amount),
            _id: form._id,
        };
        onSave(payload);
    };




    return (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
            <div className="card w-full max-w-md p-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{editing ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}</h3>
                    <button onClick={onClose} className="text-gray-500" aria-label="Close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm mb-1">Amount</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            value={form.amount}
                            onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Amount"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Category</label>
                        <input
                            type="text"
                            required
                            value={form.category}
                            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Category"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Description (optional)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Date</label>
                        <input
                            type="date"
                            required
                            value={form.date}
                            onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="flex-1">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
