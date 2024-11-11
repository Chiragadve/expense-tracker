import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

interface Expense {
  category: string;
  amount: number;
}

interface CategoryExpenseChartProps {
  expenses: Expense[];
}

const CategoryExpenseChart: React.FC<CategoryExpenseChartProps> = ({
  expenses,
}) => {
  const categoryData = expenses.reduce((acc: any, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for the pie chart
      },
    ],
  };

  return (
    <div className="category-expense-chart">
      <h3>Expense Distribution by Category</h3>
      <Pie data={data} />
    </div>
  );
};

export default CategoryExpenseChart;
