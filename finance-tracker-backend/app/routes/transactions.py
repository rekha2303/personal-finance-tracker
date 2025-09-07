from fastapi import APIRouter, HTTPException
from app.models import Transaction, TransactionUpdate
import app.crud as crud

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/")
def create_transaction(transaction: Transaction):
    return crud.create_transaction(transaction)

@router.get("/")
def get_transactions():
    return crud.get_transactions()

@router.get("/{transaction_id}")
def get_transaction(transaction_id: str):
    tx = crud.get_transaction(transaction_id)
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return tx

@router.put("/{transaction_id}")
def update_transaction(transaction_id: str, update: TransactionUpdate):
    updated = crud.update_transaction(transaction_id, update)
    if not updated:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return updated

@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: str):
    deleted = crud.delete_transaction(transaction_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"status": "deleted"}
