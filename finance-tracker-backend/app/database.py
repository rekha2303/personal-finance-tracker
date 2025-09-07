# import os
# import certifi
# from pymongo import MongoClient
# from dotenv import load_dotenv

# load_dotenv()

# MONGO_URI = os.getenv("MONGO_URI")
# DB_NAME = os.getenv("DATABASE_NAME")

# client = MongoClient(
#     MONGO_URI,
#     tls=True,
#     tlsCAFile=certifi.where(),
#     serverSelectionTimeoutMS=5000
# )

# # db = client[DB_NAME]

# # # Insert one transaction
# # transaction = {
# #     "title": "Groceries",
# #     "amount": 1200,
# #     "category": "Food",
# #     "type": "expense"
# # }
# # db.transactions.insert_one(transaction)

# # print("✅ Inserted into 'transactions'")
# # print("Collections:", db.list_collection_names())





# print("✅ Connected to MongoDB:", DB_NAME)

import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000
)

db = client[DB_NAME]   # ✅ <-- this is what we import from elsewhere

print("✅ Connected to MongoDB:", DB_NAME)
