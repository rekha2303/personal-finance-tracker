import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DATABASE_NAME")

# Force PyMongo to use certifi's CA bundle
client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000
)

try:
    db = client[DB_NAME]
    print("✅ Connected to MongoDB:", db.name)
    print("Collections:", db.list_collection_names())
except Exception as e:
    print("❌ Error:", e)
