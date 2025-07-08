import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const nodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start: User Logs In' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'New User? Redirect to Profile Setup' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Existing User: Go to Dashboard' },
    position: { x: 250, y: 175 },
  },
  {
    id: '4',
    data: { label: 'Add/Edit/Delete Income' },
    position: { x: 100, y: 250 },
  },
  {
    id: '5',
    data: { label: 'Add/Edit/Delete Expense' },
    position: { x: 400, y: 250 },
  },
  {
    id: '6',
    data: { label: 'Update Total Budget' },
    position: { x: 250, y: 325 },
  },
  {
    id: '7',
    data: { label: 'Check Budget Goal' },
    position: { x: 250, y: 400 },
  },
  {
    id: '8',
    data: { label: 'Warn if Exceeded' },
    position: { x: 250, y: 475 },
  },
  {
    id: '9',
    type: 'output',
    data: { label: 'View Charts & Reports' },
    position: { x: 250, y: 550 },
  },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
];

const BudgetTrackerFlowchart = ({ isDarkMode }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden p-5">
      <h3 className="text-lg font-bold mb-4">Budget Tracker Flowchart</h3>
      <div style={{ height: '400px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          style={{ background: isDarkMode ? '#1a202c' : '#fff' }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default BudgetTrackerFlowchart;