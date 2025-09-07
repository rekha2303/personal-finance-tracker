export const formatCurrency = (n = 0) => n?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
export const monthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};