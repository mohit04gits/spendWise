import React from 'react';
import { SparklesIcon } from './Icons';

function AiCoach({ onGetTip, tip, isLoading }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-cyan-500/20">
      
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
        AI Budget Coach
      </h2>

      {/* Tip Text */}
      <p className="text-base sm:text-lg text-gray-300 italic min-h-[56px] sm:min-h-[64px] px-2">
        {isLoading ? "🤔 Thinking..." : (tip || "Click below for a personalized budget tip!")}
      </p>

      {/* Action Button */}
      <button
        onClick={onGetTip}
        disabled={isLoading}
        className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
          shadow-lg shadow-purple-500/20
          hover:shadow-purple-500/40 hover:scale-105 active:scale-95
          transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
      >
        <SparklesIcon className="w-5 h-5" />
        {isLoading ? "Analyzing..." : "Get Tip"}
      </button>
    </div>
  );
}

export default AiCoach;
