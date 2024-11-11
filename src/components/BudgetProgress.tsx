import React from "react";

interface BudgetProgressProps {
  totalExpenses: number;
  monthlyBudget: number;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  totalExpenses,
  monthlyBudget,
}) => {
  const budgetUtilization = (totalExpenses / monthlyBudget) * 100;
  const remainingBudget = monthlyBudget - totalExpenses;

  return (
    <div className="budget-progress">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${budgetUtilization}%` }}
        />
      </div>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
      {budgetUtilization >= 80 && (
        <p className="warning">80% of the budget has been utilized!</p>
      )}
    </div>
  );
};

export default BudgetProgress;
