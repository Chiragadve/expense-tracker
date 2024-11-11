// App.tsx
import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

interface Expense {
  category: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(2500);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingBudget = monthlyBudget - totalExpenses;

  const handleAddExpense = (expense: Expense) => {
    if (expense.amount > remainingBudget) {
      setErrorMessage("There isn't enough budget for this expense.");
      return;
    }

    setExpenses([...expenses, expense]);
    setErrorMessage(null); // Clear any previous error message
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyBudget(Number(e.target.value));
  };

  const budgetUtilization = (totalExpenses / monthlyBudget) * 100;
  const showUtilizationWarning = budgetUtilization >= 80;

  return (
    <div className="container">
      <h2>Set Monthly Budget</h2>
      <div className="set-budget">
        <input
          type="number"
          value={monthlyBudget || ""}
          onChange={handleBudgetChange}
        />
        <button onClick={() => {}}>Set Budget</button>
      </div>

      <ExpenseForm onAddExpense={handleAddExpense} />

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}

      <div className="expenses-overview">
        <h3>Expenses Overview</h3>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
        {showUtilizationWarning && (
          <p style={{ color: "orange" }}>80% of the budget has been utilized</p>
        )}
      </div>

      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;
