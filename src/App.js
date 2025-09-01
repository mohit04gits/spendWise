import React, { useState, useEffect } from "react";

// Components
import Header from "./components/Header";
import BudgetTracker from "./components/BudgetTracker";
import AiCoach from "./components/AiCoach";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  // --- STATE MANAGEMENT ---
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? Number(savedBudget) : 0;
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  const [aiBudgetTip, setAiBudgetTip] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [filter, setFilter] = useState("All");

  // --- DATA PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  // --- CORE LOGIC ---
  const handleAddOrUpdateExpense = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) return;

    if (isEditing) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === currentExpenseId
          ? { ...exp, description, amount: parseFloat(amount), category }
          : exp
      );
      setExpenses(updatedExpenses);
    } else {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString(),
      };
      setExpenses([newExpense, ...expenses]);
    }
    resetForm();
  };

  const handleStartEdit = (expense) => {
    setIsEditing(true);
    setCurrentExpenseId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategory("Food");
    setIsEditing(false);
    setCurrentExpenseId(null);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Delete this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const getAiBudgetTip = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    setIsAiLoading(true);
    setAiBudgetTip("");

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${api_key}`;

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const situation =
      budget && totalSpent > budget
        ? "⚠️ I am OVER my budget. Give me a firm but encouraging tip."
        : budget && totalSpent > budget * 0.8
        ? "I am close to my budget. Give me a gentle warning tip."
        : "I am within budget. Give me a positive saving tip.";

    const prompt = `
You are a helpful financial coach.
Budget: $${budget}, Spent: $${totalSpent.toFixed(2)}.
${situation}
Rules:
- Max 25 words
- Friendly tone
- Everyday language
- No repeating my numbers
`;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const data = await res.json();
      const tip = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiBudgetTip(tip || "Couldn't fetch tip. Keep up the great work!");
    } catch (err) {
      console.error("AI Error:", err);
      setAiBudgetTip("AI service unavailable. Try again later.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredExpenses = expenses.filter((exp) =>
    filter === "All" ? true : exp.category === filter
  );

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <Header />

        {/* Stats + AI Coach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BudgetTracker expenses={expenses} budget={budget} setBudget={setBudget} />
          <AiCoach onGetTip={getAiBudgetTip} tip={aiBudgetTip} isLoading={isAiLoading} />
        </section>

        {/* Expense Form + List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm
              description={description}
              amount={amount}
              category={category}
              isEditing={isEditing}
              setDescription={setDescription}
              setAmount={setAmount}
              setCategory={setCategory}
              onSubmit={handleAddOrUpdateExpense}
              onCancelEdit={resetForm}
            />
          </div>

          <div className="lg:col-span-2">
            <ExpenseList
              expenses={filteredExpenses}
              filter={filter}
              setFilter={setFilter}
              onEdit={handleStartEdit}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
