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


