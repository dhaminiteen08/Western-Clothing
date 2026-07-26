from fastapi import FastAPI
from fraud_detection import FraudDetector

app = FastAPI()

detector = FraudDetector()

@app.post("/check-order")
async def check_order(order: dict):

    result = detector.calculate_risk(order)

    return result