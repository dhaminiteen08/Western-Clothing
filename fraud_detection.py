from datetime import datetime

class FraudDetector:

    def calculate_risk(self, order):

        score = 0
        reasons = []

        # High order amount
        if order["amount"] > 500:
            score += 30
            reasons.append("High order amount")

        # New account
        if order["account_age_days"] < 7:
            score += 20
            reasons.append("New account")

        # Failed payment attempts
        if order["failed_payments"] >= 3:
            score += 25
            reasons.append("Multiple failed payments")

        # Billing != Shipping
        if order["billing_address"] != order["shipping_address"]:
            score += 15
            reasons.append("Different billing/shipping address")

        # Midnight purchases
        hour = datetime.now().hour

        if hour >= 0 and hour <= 4:
            score += 10
            reasons.append("Late night purchase")

        return {
            "risk_score": min(score, 100),
            "reasons": reasons
        }
    from fastapi import FastAPI
