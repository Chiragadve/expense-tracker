// ExpenseList.tsx
import React, { useState } from "react";

interface Expense {
  category: string;
  amount: number;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const [sortBy, setSortBy] = useState<string>("date");

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "amount") {
      return a.amount - b.amount;
    } else if (sortBy === "category") {
      const categoryOrder = ["groceries", "utilities", "transport"];
      return (
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      );
    } else if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <div className="expense-list">
      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
        <option value="category">Category</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
