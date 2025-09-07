Personal Finance Tracker

The Finance Tracker is a full-stack web application designed to help users manage their personal finances by tracking income, expenses, and savings. It provides an intuitive dashboard, authentication system, and interactive charts for better financial insights.

🚀 Features
🔐 Authentication

User registration & login with JWT-based authentication.

Passwords securely hashed with bcrypt.

User profile stored in MongoDB.

💸 Expense & Income Management

Add, edit, and delete expenses and incomes.

Categorize transactions (e.g., Food, Rent, Salary, Investments).

Real-time updates using Redux Toolkit in React.

📊 Dashboard & Insights

Total Income, Expenses, and Savings shown in stat cards.

Monthly trends chart (Income vs Expenses) using Recharts LineChart.

Expense breakdown by category using Pie Chart.

List of recent transactions with edit/delete actions.

🌍 Tech Stack

Frontend: React.js (with Redux Toolkit, Tailwind CSS, Recharts)

Backend: FastAPI (Python)

Database: MongoDB (Atlas Cloud DB)

Auth & Security: JWT, Passlib (bcrypt), CORS enabled

# 🚀 GitHub Notes

## 1. Clone a Repository

Copy the repo URL from GitHub → then run:

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

Check remote:

```bash
git remote -v
```

---

## 2. Push Code to GitHub

After making changes:

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## 3. Fix Push Errors (Non-Fast-Forward)

If you see:

```
! [rejected] main -> main (non-fast-forward)
error: failed to push some refs
```

It means your **local branch is behind GitHub**.

### Option A: Merge GitHub’s changes (safe)

```bash
git pull origin main --rebase
git push origin main
```

### Option B: Overwrite GitHub with local code (force push ⚠️)

```bash
git push origin main --force
```

---

## 4. Set Correct Contributor (Name & Email)

### Check current config:

```bash
git config user.name
git config user.email
```

### Change for this repo only:

```bash
git config user.name "Rekha"
git config user.email "rekha@example.com"
```

### Change globally (all repos):

```bash
git config --global user.name "Rekha"
git config --global user.email "rekha@example.com"
```

### Verify:

```bash
git config user.name
git config user.email
```

⚠️ **Note**:

* This affects only **future commits**.
* To fix old commits already pushed with the wrong name, history rewriting is required.


