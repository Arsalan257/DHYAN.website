import React, { useState } from 'react';
import { Droplets, Plus, Minus, Target, TrendingUp } from 'lucide-react';

interface WaterEntry {
  id: string;
  amount: number;
  date: Date;
}

interface WaterTrackerProps {
  waterEntries: WaterEntry[];
  onAddWater: (entry: WaterEntry) => void;
  dailyGoal?: number;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ 
  waterEntries, 
  onAddWater, 
  dailyGoal = 2000 
}) => {
  const [quickAmount, setQuickAmount] = useState(250);

  const today = new Date().toDateString();
  const todayWater = waterEntries
    .filter(entry => new Date(entry.date).toDateString() === today)
    .reduce((sum, entry) => sum + entry.amount, 0);

  const progress = Math.min((todayWater / dailyGoal) * 100, 100);

  const handleAddWater = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      date: new Date(),
    };
    onAddWater(newEntry);
  };

  const quickAmounts = [125, 250, 500, 750];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Water Intake</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Stay hydrated today</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{todayWater}ml</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">of {dailyGoal}ml</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        {progress >= 100 && (
          <div className="mt-2 text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium flex items-center">
            <Target className="h-4 w-4 mr-1" />
            Goal achieved! Great job staying hydrated!
          </div>
        )}
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleAddWater(amount)}
            className="flex flex-col items-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-700"
          >
            <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mb-1" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">{amount}ml</span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="flex items-center space-x-2 flex-1 order-2 sm:order-1">
          <button
            onClick={() => setQuickAmount(Math.max(50, quickAmount - 50))}
            className="p-2 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <input
            type="number"
            value={quickAmount}
            onChange={(e) => setQuickAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="flex-1 px-2 sm:px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
            min="0"
            step="50"
          />
          <button
            onClick={() => setQuickAmount(quickAmount + 50)}
            className="p-2 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">ml</span>
        </div>
        <button
          onClick={() => handleAddWater(quickAmount)}
          disabled={quickAmount <= 0}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 order-1 sm:order-2 text-sm sm:text-base"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Today's Entries */}
      {waterEntries.filter(entry => new Date(entry.date).toDateString() === today).length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Today's Intake</h4>
          <div className="space-y-1 sm:space-y-2 max-h-24 sm:max-h-32 overflow-y-auto">
            {waterEntries
              .filter(entry => new Date(entry.date).toDateString() === today)
              .reverse()
              .slice(0, 5)
              .map((entry) => (
                <div key={entry.id} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-3 w-3 sm:h-3 sm:w-3 text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="font-medium text-blue-600 text-xs sm:text-sm">{entry.amount}ml</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterTracker;