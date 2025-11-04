import React from 'react';
import { EditIcon, DeleteIcon } from './Icons';

function ExpenseList({ expenses, filter, setFilter, onEdit, onDelete }) {
  const categories = ["All", "Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const categoryColors = {
    Food: "bg-green-500/20 text-green-400",
    Transport: "bg-blue-500/20 text-blue-400",
    Shopping: "bg-purple-500/20 text-purple-400",
    Bills: "bg-red-500/20 text-red-400",
    Entertainment: "bg-pink-500/20 text-pink-400",
    Other: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-200">Recent Expenses</h2>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800/70 backdrop-blur-md text-white px-4 py-2 border border-gray-600 
                     rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm
                     transition-all hover:border-cyan-400"
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div 
        className="space-y-4 max-h-80 overflow-y-auto pr-2 
                   scrollbar-thin scrollbar-hide scrollbar-thumb-gray-700 scrollbar-track-transparent 
                   hover:scrollbar-thumb-cyan-500/60"
      >
        {expenses.length === 0 ? (
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl text-center 
                          text-gray-400 border border-gray-700 shadow-lg">
            <p>No expenses found for this category.</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div 
              key={expense.id} 
              className="bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl flex items-center justify-between 
                         shadow-lg border border-gray-700 hover:border-cyan-500/50 
                         hover:translate-y-[-2px] transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-lg text-gray-100 capitalize">{expense.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${categoryColors[expense.category] || "bg-gray-600/20 text-gray-400"}`}>
                    {expense.category}
                  </span>
                  <span>• {expense.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <p className="font-bold text-xl text-cyan-400">
                  ₹{expense.amount.toFixed(2)}
                </p>
                <button 
                  onClick={() => onEdit(expense)} 
                  className="p-2 rounded-lg hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-400 transition-all duration-200"
                >
                  <EditIcon />
                </button>
                <button 
                  onClick={() => onDelete(expense.id)} 
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
