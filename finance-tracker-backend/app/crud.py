from app.database import db
from app.models import Transaction, TransactionUpdate
from bson import ObjectId

def serialize_transaction(transaction) -> dict:
    return {
        "id": str(transaction["_id"]),
        "title": transaction.get("title"),
        "amount": transaction.get("amount"),
        "category": transaction.get("category"),
        "type": transaction.get("type"),
        "date": transaction.get("date")  # ✅ use .get() instead of direct key access
    }


def create_transaction(transaction: Transaction):
    result = db.transactions.insert_one(transaction.model_dump())
    new_tx = db.transactions.find_one({"_id": result.inserted_id})
    return serialize_transaction(new_tx)

def get_transactions():
    return [serialize_transaction(tx) for tx in db.transactions.find()]

def get_transaction(transaction_id: str):
    tx = db.transactions.find_one({"_id": ObjectId(transaction_id)})
    return serialize_transaction(tx) if tx else None

def update_transaction(transaction_id: str, update: TransactionUpdate):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    result = db.transactions.update_one({"_id": ObjectId(transaction_id)}, {"$set": update_data})
    if result.matched_count == 0:
        return None
    updated = db.transactions.find_one({"_id": ObjectId(transaction_id)})
    return serialize_transaction(updated)

def delete_transaction(transaction_id: str):
    result = db.transactions.delete_one({"_id": ObjectId(transaction_id)})
    return result.deleted_count > 0
