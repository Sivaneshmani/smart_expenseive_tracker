import React, { useState } from 'react';

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newCat = {
      id: Date.now(),
      name: newCategory,
      icon: 'shopping-bag', // default icon, or ask user to select
    };
    setCategories(prev => [...prev, newCat]);
    setNewCategory('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Expense Categories</h2>
        <div className="flex">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="border p-2 rounded-l-md"
          />
          <button onClick={handleAddCategory} className="bg-indigo-600 text-white px-4 rounded-r-md">
            Add
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative flex flex-col items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
              <i className={`fas fa-${cat.icon} text-2xl text-indigo-600`}></i>
            </div>
            <p className="font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
