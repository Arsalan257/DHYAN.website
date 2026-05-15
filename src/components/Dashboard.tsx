import React from 'react';
import { Calendar, Target, Flame, Activity, TrendingUp, Award, Droplets } from 'lucide-react';
import { FoodEntry, WorkoutEntry, User, WaterEntry } from '../types';
import { format } from 'date-fns';
import WaterTracker from './WaterTracker';

interface DashboardProps {
  user: User | null;
  foodEntries: FoodEntry[];
  workoutEntries: WorkoutEntry[];
  waterEntries: WaterEntry[];
  onAddWater: (water: WaterEntry) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, foodEntries, workoutEntries, waterEntries, onAddWater }) => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  const todayFoodEntries = foodEntries.filter(entry => 
    format(new Date(entry.date), 'yyyy-MM-dd') === todayStr
  );
  
  const todayWorkoutEntries = workoutEntries.filter(entry => 
    format(new Date(entry.date), 'yyyy-MM-dd') === todayStr
  );

  const todayCaloriesConsumed = todayFoodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const todayCaloriesBurned = todayWorkoutEntries.reduce((sum, entry) => sum + entry.caloriesBurned, 0);
  const netCalories = todayCaloriesConsumed - todayCaloriesBurned;
  const calorieGoal = user?.goals.dailyCalories || 2000;

  const weeklyWorkouts = workoutEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length;

  const todayWater = waterEntries
    .filter(entry => format(new Date(entry.date), 'yyyy-MM-dd') === todayStr)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const stats = [
    {
      title: 'Calories Today',
      value: todayCaloriesConsumed,
      goal: calorieGoal,
      icon: Flame,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
      unit: 'cal',
    },
    {
      title: 'Calories Burned',
      value: todayCaloriesBurned,
      icon: Activity,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
      unit: 'cal',
    },
    {
      title: 'Net Calories',
      value: netCalories,
      icon: Target,
      color: netCalories > calorieGoal ? 'text-error-600' : 'text-success-600',
      bgColor: netCalories > calorieGoal ? 'bg-error-50 dark:bg-error-900/20' : 'bg-success-50 dark:bg-success-900/20',
      unit: 'cal',
    },
    {
      title: 'Weekly Workouts',
      value: weeklyWorkouts,
      goal: user?.goals.weeklyWorkouts || 5,
      icon: Award,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      unit: 'workouts',
    },
    {
      title: 'Water Intake',
      value: todayWater,
      goal: 2000,
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      unit: 'ml',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {user?.name || 'Fitness Enthusiast'}!</h1>
            <p className="text-primary-100 mt-1 text-sm sm:text-base">STRONG MINDFUL BEING</p>
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm text-primary-100">Today</div>
            <div className="text-base sm:text-lg font-semibold">{format(today, 'MMM dd, yyyy')}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const progress = stat.goal ? Math.min((stat.value / stat.goal) * 100, 100) : 0;
          
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-2 sm:p-3 rounded-lg ${stat.bgColor} mb-3 sm:mb-4`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <div className="flex items-baseline space-x-1 sm:space-x-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.unit}</span>
                </div>
                
                {stat.goal && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs sm:text-xs text-gray-500 dark:text-gray-400">
                      <span>Goal: {stat.goal.toLocaleString()}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                          progress >= 100 ? 'bg-success-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Water Tracker */}
        <WaterTracker 
          waterEntries={waterEntries}
          onAddWater={onAddWater}
          dailyGoal={2000}
        />

        {/* Recent Meals */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2">
          <div className="flex items-center justify-between mb-4 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Today's Meals</h2>
            <Flame className="h-5 w-5 text-accent-600" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Recent Meals</h3>
            {todayFoodEntries.length > 0 ? (
              todayFoodEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex justify-between items-center py-2 sm:py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{entry.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{entry.serving}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-accent-600 text-sm sm:text-base">{entry.calories} cal</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                <Flame className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm sm:text-base">No meals logged today</p>
              </div>
            )}

            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Today's Workouts</h3>
            {todayWorkoutEntries.length > 0 ? (
              todayWorkoutEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center py-2 sm:py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{entry.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {entry.duration} min • {entry.type}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-secondary-600 text-sm sm:text-base">{entry.caloriesBurned} cal</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                <Activity className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm sm:text-base">No workouts logged today</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;