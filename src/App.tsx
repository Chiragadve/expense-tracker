import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import CategoryExpenseChart from "./components/CategoryExpenseChart";
import "./App.css";

interface Expense {
  category: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(2500);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyBudget(Number(e.target.value));
  };

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

      <BudgetProgress
        totalExpenses={totalExpenses}
        monthlyBudget={monthlyBudget}
      />

      <CategoryExpenseChart expenses={expenses} />

      <div className="expenses-overview">
        <h3>Expenses Overview</h3>
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default App;
