from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import transactions, users


app = FastAPI(title="Finance Tracker API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Root route
@app.get("/")
def root():
    return {"message": "Welcome to Finance Tracker API 🚀"}

# Register routers
app.include_router(transactions.router)
app.include_router(users.router)