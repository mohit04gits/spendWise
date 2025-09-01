import React from "react";

function ExpenseForm({
  description,
  amount,
  category,
  isEditing,
  setDescription,
  setAmount,
  setCategory,
  onSubmit,
  onCancelEdit,
}) {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other",
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10 
                 space-y-6 sticky top-8 transition-all hover:shadow-cyan-500/20"
    >
      {/* Title */}
      <h2
        className="text-2xl sm:text-3xl font-extrabold text-center 
                     bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        {isEditing ? "✏️ Edit Expense" : "➕ Add Expense"}
      </h2>

      {/* Description */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Groceries"
          className="w-full bg-gray-800/70 text-white px-4 py-3 rounded-xl border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                     transition-all placeholder-gray-500"
        />
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-300"
        >
          Amount ($)
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 50.75"
          className="w-full bg-gray-800/70 text-white px-4 py-3 rounded-xl border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                     transition-all placeholder-gray-500"
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-800/70 text-white px-4 py-3 rounded-xl border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                     transition-all"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold 
                     py-3 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:opacity-95 
                     transition-all duration-300"
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 bg-gray-700/80 text-white font-semibold py-3 rounded-xl 
                       hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
