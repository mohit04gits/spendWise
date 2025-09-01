import React from 'react';

function BudgetTracker({ expenses, budget, setBudget }) {
  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const spentPercentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 sm:p-8 transition-all hover:shadow-cyan-500/20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Monthly Budget
        </h2>
        
        {/* Budget Input */}
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="bg-gray-900/60 border border-gray-700 text-white w-28 sm:w-32 px-3 py-2 rounded-xl text-center 
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          placeholder="Enter budget"
        />
      </div>

      {/* Total Spent */}
      <div className="text-center mb-6">
        <p className="text-4xl font-extrabold text-cyan-400 drop-shadow-sm">
          ₹{totalExpenses.toFixed(2)}
        </p>
        <p className="text-gray-400 text-sm">
          spent of <span className="text-gray-200 font-medium">₹{budget || 0}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700/60 rounded-full h-5 overflow-hidden shadow-inner">
        <div
          className={`h-5 rounded-full transition-all duration-700 ease-out
            ${spentPercentage > 100 
              ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse' 
              : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
            }`}
          style={{ width: `${Math.min(spentPercentage, 100)}%` }}
        ></div>
      </div>

      {/* Remaining / Over Budget */}
      <p className={`mt-3 text-right font-semibold text-sm sm:text-base 
        ${remainingBudget < 0 ? 'text-red-400' : 'text-gray-300'}`}>
        {remainingBudget >= 0 
          ? `$${remainingBudget.toFixed(2)} remaining` 
          : `$${Math.abs(remainingBudget).toFixed(2)} over budget`}
      </p>
    </div>
  );
}

export default BudgetTracker;
