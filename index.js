function handleFormSubmit(event) {
    event.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = {
        id: Date.now(),
        amount,
        description,
        category
    };

    // Save the expense to local storage
    saveExpenseToLocalStorage(expense);
    
    // Display the updated expenses list
    displayExpenses();

    // Clear the form after submission
    event.target.reset();
}

// Save the expense object to local storage
function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Display the list of expenses from local storage
function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the list before re-rendering

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${expense.amount} - ${expense.description} - ${expense.category}
            <span>
                
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id})">Delete Expense</button>
                <button class="btn btn-warning btn-sm" onclick="editExpense(${expense.id})">Edit Expense</button>
            </span>
        `;
        expenseList.appendChild(li);
    });
}

// Edit an expense by its ID
function editExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseToEdit = expenses.find(expense => expense.id === id);

    // Populate form with the existing values
    document.getElementById('amount').value = expenseToEdit.amount;
    document.getElementById('description').value = expenseToEdit.description;
    document.getElementById('category').value = expenseToEdit.category;

    // Remove the old expense
    deleteExpense(id);
}

// Delete an expense by its ID
function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    // Update the UI
    displayExpenses();
}

// Display the expenses when the page loads
window.onload = displayExpenses;