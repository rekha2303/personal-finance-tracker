from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional

# ====================================================
# ✅ Transaction Schemas
# ====================================================

class Transaction(BaseModel):
    title: str
    amount: float
    category: str
    type: str   # "income" or "expense"
    date: datetime = Field(default_factory=datetime.utcnow)

class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    type: Optional[str] = None
    date: Optional[datetime] = None


# ====================================================
# ✅ User Schemas (for Authentication)
# ====================================================

# Schema for Registration
class User(BaseModel):
    username: str
    email: EmailStr
    password: str

# Schema for Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for updating user profile (later use in /profile/update)
class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None

# Schema for returning user info (without password)
class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
