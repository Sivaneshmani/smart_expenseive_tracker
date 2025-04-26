import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const SpendingChart = ({ expenses = [], incomes = [], isDarkMode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize ECharts
    chartInstanceRef.current = echarts.init(chartRef.current, isDarkMode ? 'dark' : null);

    // Aggregate expenses by category
    const expenseCategories = expenses.reduce((acc, exp) => {
      const category = exp.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(Number(exp.amount));
      return acc;
    }, {});
    const expenseData = Object.entries(expenseCategories).map(([name, value]) => ({ name, value }));

    // Aggregate income by source
    const incomeSources = incomes.reduce((acc, inc) => {
      const source = inc.source || 'Uncategorized';
      acc[source] = (acc[source] || 0) + Number(inc.amount);
      return acc;
    }, {});
    const incomeData = Object.entries(incomeSources).map(([name, value]) => ({ name, value }));

    // Combine data
    const chartData = [...expenseData, ...incomeData];

    // Log data for debugging
    console.log('SpendingChart data:', chartData);

    // ECharts options
    const option = {
      title: {
        text: 'Expense & Income Breakdown',
        left: 'center',
        top: 20,
        textStyle: { color: isDarkMode ? '#fff' : '#333' },
      },
      tooltip: {
        trigger: 'item',
        formatter: `{a} <br/>{b}: {c} (${chartData[0]?.currency || 'INR'}) ({d}%)`,
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 60,
        textStyle: { color: isDarkMode ? '#fff' : '#333' },
      },
      series: [
        {
          name: 'Breakdown',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: { show: true, fontSize: 16, fontWeight: 'bold' },
          },
          labelLine: { show: false },
          data: chartData,
          itemStyle: {
            color: (params) => {
              const colors = isDarkMode
                ? ['#e74c3c', '#2ecc71', '#f1c40f', '#3498db', '#9b59b6']
                : ['#dc3545', '#28a745', '#ffc107', '#007bff', '#6f42c1'];
              return colors[params.dataIndex % colors.length];
            },
          },
        },
      ],
    };

    // Set options and resize
    chartInstanceRef.current.setOption(option);
    window.addEventListener('resize', () => chartInstanceRef.current.resize());

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => chartInstanceRef.current.resize());
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
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

export default SpendingChart;