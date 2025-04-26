import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BudgetTrendChart = ({ expenses = [], incomes = [], isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize ECharts only if not already initialized
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current, isDarkMode ? 'dark' : null);
    }

    // Aggregate expenses by date
    const expenseData = expenses.reduce((acc, exp) => {
      const date = new Date(exp.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + Math.abs(Number(exp.amount));
      return acc;
    }, {});
    const expenseDates = Object.keys(expenseData).sort();
    const expenseValues = expenseDates.map((date) => expenseData[date]);

    // Aggregate incomes by date
    const incomeData = incomes.reduce((acc, inc) => {
      const date = new Date(inc.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + Number(inc.amount);
      return acc;
    }, {});
    const incomeDates = Object.keys(incomeData).sort();
    const incomeValues = incomeDates.map((date) => incomeData[date]);

    // Merge dates
    const allDates = [...new Set([...expenseDates, ...incomeDates])].sort();
    const normalizedExpenses = allDates.map((date) => expenseData[date] || 0);
    const normalizedIncomes = allDates.map((date) => incomeData[date] || 0);

    // ECharts options
    const option = {
      title: {
        text: 'Budget Trend Over Time',
        left: 'center',
        textStyle: { color: isDarkMode ? '#fff' : '#333' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const date = params[0].name;
          const expense = params[0].value || 0;
          const income = params[1]?.value || 0;
          return `${date}<br/>Expenses: ${expense} ${expenses[0]?.currency || 'INR'}<br/>Incomes: ${income} ${incomes[0]?.currency || 'INR'}`;
        },
      },
      legend: {
        data: ['Expenses', 'Incomes'],
        top: 30,
        textStyle: { color: isDarkMode ? '#fff' : '#333' },
      },
      xAxis: {
        type: 'category',
        data: allDates,
        axisLabel: { color: isDarkMode ? '#fff' : '#333' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: isDarkMode ? '#fff' : '#333' },
      },
      series: [
        {
          name: 'Expenses',
          type: 'line',
          data: normalizedExpenses,
          itemStyle: { color: isDarkMode ? '#e74c3c' : '#dc3545' },
        },
        {
          name: 'Incomes',
          type: 'line',
          data: normalizedIncomes,
          itemStyle: { color: isDarkMode ? '#2ecc71' : '#28a745' },
        },
      ],
    };

    // Set options
    chartInstanceRef.current.setOption(option, true);
    window.addEventListener('resize', () => chartInstanceRef.current.resize());

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => chartInstanceRef.current?.resize());
      // Dispose only on component unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, [expenses, incomes, isDarkMode]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      {(!expenses.length && !incomes.length) && (
        <p className="text-center text-gray-500 mt-4">No data available for the chart</p>
      )}
    </div>
  );
};

export default BudgetTrendChart;