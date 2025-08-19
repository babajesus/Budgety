from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime

app = Flask(__name__)

# Data file
DATA_FILE = 'budget_data.json'

# Load/Save data functions
def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as file:
                return json.load(file)
        except:
            return {"balance": 0.0, "transactions": []}
    return {"balance": 0.0, "transactions": []}

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=2)

    # Frontend and API Routes
@app.route('/')
def home():
    """Serve the frontend"""
    return render_template('index.html')

@app.route('/api')
def api_docs():
    """API Documentation"""
    return jsonify({
        "name": "Budget Tracker API",
        "version": "1.0",
        "endpoints": {
            "GET /balance": "Get current balance",
            "GET /transactions": "Get all transactions",
            "POST /income": "Add income (JSON: {amount, description})",
            "POST /expense": "Add expense (JSON: {amount, description})",
            "DELETE /clear": "Clear all data"
        }
    })

@app.route('/balance')
def get_balance():
    """Get current balance"""
    data = load_data()
    return jsonify({"balance": data["balance"]})

@app.route('/transactions')
def get_transactions():
    """Get all transactions"""
    data = load_data()
    return jsonify({"transactions": data["transactions"]})

@app.route('/income', methods=['POST'])
def add_income():
    """Add income"""
    try:
        req_data = request.get_json()
        amount = float(req_data['amount'])
        description = req_data.get('description', 'Income')
        
        if amount <= 0:
            return jsonify({"error": "Amount must be positive"}), 400
        
        data = load_data()
        
        transaction = {
            "type": "Income",
            "amount": amount,
            "description": description,
            "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        data["balance"] += amount
        data["transactions"].append(transaction)
        save_data(data)
        
        return jsonify({
            "success": True,
            "message": f"Income of ₹{amount:.2f} added",
            "balance": data["balance"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/expense', methods=['POST'])
def add_expense():
    """Add expense"""
    try:
        req_data = request.get_json()
        amount = float(req_data['amount'])
        description = req_data.get('description', 'Expense')
        
        if amount <= 0:
            return jsonify({"error": "Amount must be positive"}), 400
        
        data = load_data()
        
        transaction = {
            "type": "Expense",
            "amount": amount,
            "description": description,
            "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        data["balance"] -= amount
        data["transactions"].append(transaction)
        save_data(data)
        
        return jsonify({
            "success": True,
            "message": f"Expense of ₹{amount:.2f} added",
            "balance": data["balance"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/clear', methods=['DELETE'])
def clear_all():
    """Clear all data"""
    data = {"balance": 0.0, "transactions": []}
    save_data(data)
    return jsonify({"message": "All data cleared"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
