// ExpenseForm.tsx
import React, { useState } from "react";

interface ExpenseFormProps {
  onAddExpense: (expense: {
    category: string;
    amount: number;
    date: string;
  }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>(""); // Initialize as empty string
  const [date, setDate] = useState<string>("");

  const handleAddExpense = () => {
    const expenseAmount = parseFloat(amount);
    if (!isNaN(expenseAmount) && expenseAmount > 0 && category && date) {
      onAddExpense({ category, amount: expenseAmount, date });
      setCategory("");
      setAmount(""); // Clear the amount input after adding
      setDate("");
    }
  };

  return (
    <div className="add-expense-form">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="groceries">Groceries</option>
        <option value="utilities">Utilities</option>
        <option value="transport">Transport</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Keep as string to allow empty value
        placeholder="Enter amount"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseForm;
