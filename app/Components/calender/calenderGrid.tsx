import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';

const SimpleCalendar = ({ viewDate, setViewDate }: { viewDate: Date, setViewDate: (date: Date) => void }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Grid Calculation Logic
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  
  // Calculate dynamic end date for the month grid
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 font-serif select-none flex flex-col h-[500px] md:h-[600px]">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12 px-2 h-16">
        <button 
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-2xl font-light text-slate-800 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          ‹
        </button>
        
        <div className="text-center w-48 flex-shrink-0">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
            Calendar Grid
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
            {format(viewDate, 'MMMM yyyy')}
          </p>
        </div>

        <button 
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-2xl font-light text-slate-800 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 mb-6">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div 
              key={idx} 
              onClick={() => setSelectedDate(day)}
              className="relative flex flex-col items-center justify-center aspect-[4/5] cursor-pointer group"
            >
              <span className={`text-sm transition-colors ${
                isCurrentMonth ? 'text-slate-700' : 'text-slate-200'
              } ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {format(day, 'd')}
              </span>
              
              {/* The "Active" Underline from screenshot */}
              {isSelected && (
                <div className="absolute bottom-2 w-10 h-[2px] bg-slate-900 transition-all" />
              )}

              {/* Subtle hover state */}
              {!isSelected && (
                <div className="absolute bottom-2 w-0 h-[2px] bg-slate-200 group-hover:w-6 transition-all" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleCalendar;