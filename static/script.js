// Budget Tracker JavaScript

// Global variables
let currentBalance = 0;
let transactions = [];

// DOM elements
const currentBalanceEl = document.getElementById('currentBalance');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const transactionsListEl = document.getElementById('transactionsList');
const incomeForm = document.getElementById('incomeForm');
const expenseForm = document.getElementById('expenseForm');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('errorMessage');
const successMessageEl = document.getElementById('successMessage');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadBalance();
    loadTransactions();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    incomeForm.addEventListener('submit', handleIncomeSubmit);
    expenseForm.addEventListener('submit', handleExpenseSubmit);
}

// Handle income form submission
async function handleIncomeSubmit(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const description = document.getElementById('incomeDescription').value;
    
    if (amount <= 0) {
        showMessage('Amount must be positive', 'error');
        return;
    }
    
    try {
        showLoading(true);
        const response = await fetch('/income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, description })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            incomeForm.reset();
            await loadBalance();
            await loadTransactions();
        } else {
            showMessage(data.error || 'Failed to add income', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Handle expense form submission
async function handleExpenseSubmit(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const description = document.getElementById('expenseDescription').value;
    
    if (amount <= 0) {
        showMessage('Amount must be positive', 'error');
        return;
    }
    
    try {
        showLoading(true);
        const response = await fetch('/expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, description })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            expenseForm.reset();
            await loadBalance();
            await loadTransactions();
        } else {
            showMessage(data.error || 'Failed to add expense', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Load current balance
async function loadBalance() {
    try {
        const response = await fetch('/balance');
        const data = await response.json();
        
        if (response.ok) {
            currentBalance = data.balance;
            updateBalanceDisplay();
            updateStats();
        } else {
            showMessage('Failed to load balance', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    }
}

// Load transactions
async function loadTransactions() {
    try {
        const response = await fetch('/transactions');
        const data = await response.json();
        
        if (response.ok) {
            transactions = data.transactions;
            updateTransactionsDisplay();
            updateStats();
        } else {
            showMessage('Failed to load transactions', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    }
}

// Update balance display
function updateBalanceDisplay() {
    const formattedBalance = formatCurrency(currentBalance);
    currentBalanceEl.textContent = formattedBalance;
    
    // Add color class based on balance
    currentBalanceEl.className = 'balance-amount';
    if (currentBalance > 0) {
        currentBalanceEl.classList.add('positive');
    } else if (currentBalance < 0) {
        currentBalanceEl.classList.add('negative');
    }
}

// Update statistics
function updateStats() {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
        if (transaction.type === 'Income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'Expense') {
            totalExpenses += transaction.amount;
        }
    });
    
    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpensesEl.textContent = formatCurrency(totalExpenses);
}

// Update transactions display
function updateTransactionsDisplay() {
    if (transactions.length === 0) {
        transactionsListEl.innerHTML = '<p class="no-transactions">No transactions yet. Add some income or expenses to get started!</p>';
        return;
    }
    
    const transactionsHTML = transactions
        .slice()
        .reverse() // Show newest first
        .map(transaction => createTransactionHTML(transaction))
        .join('');
    
    transactionsListEl.innerHTML = transactionsHTML;
}

// Create transaction HTML
function createTransactionHTML(transaction) {
    const isIncome = transaction.type === 'Income';
    const amountClass = isIncome ? 'income' : 'expense';
    const icon = isIncome ? 'fa-arrow-up' : 'fa-arrow-down';
    
    return `
        <div class="transaction-item ${amountClass}">
            <div class="transaction-info">
                <h4 class="${amountClass}">
                    <i class="fas ${icon}"></i>
                    ${transaction.description}
                </h4>
                <p class="transaction-date">${formatDate(transaction.date)}</p>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${isIncome ? '+' : '-'}${formatCurrency(transaction.amount)}
            </div>
        </div>
    `;
}

// Clear all data
async function clearAllData() {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        return;
    }
    
    try {
        showLoading(true);
        const response = await fetch('/clear', {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('All data cleared successfully', 'success');
            await loadBalance();
            await loadTransactions();
        } else {
            showMessage('Failed to clear data', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Utility functions
function formatCurrency(amount) {
    return `₹${Math.abs(amount).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showLoading(show) {
    if (show) {
        loadingEl.classList.remove('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}

function showMessage(message, type) {
    const messageEl = type === 'error' ? errorMessageEl : successMessageEl;
    const otherMessageEl = type === 'error' ? successMessageEl : errorMessageEl;
    
    // Hide other message
    otherMessageEl.classList.add('hidden');
    
    // Show current message
    messageEl.textContent = message;
    messageEl.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
}

// Add fade-in animation to new elements
function addFadeInAnimation(element) {
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.remove('fade-in');
    }, 500);
}
