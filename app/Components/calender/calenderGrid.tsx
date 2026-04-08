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
  isSameDay,
  isBefore,
  isAfter,
  isToday,
  isWithinInterval
} from 'date-fns';

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

type CalendarGridProps = {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  selection: DateRange;
  setSelection: (range: DateRange) => void;
  allNotes: Record<string, string>;
};

export default function CalendarGrid({ viewDate, setViewDate, selection, setSelection, allNotes }: CalendarGridProps) {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [showMarkers, setShowMarkers] = useState(true);

  // Grid Calculation Logic
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const handleDateClick = (clickedDate: Date) => {
    // Scenario A: Starting fresh or resetting
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: clickedDate, end: null });
      return;
    }

    // Scenario B: User clicks a date BEFORE the start date
    if (isBefore(clickedDate, selection.start)) {
      setSelection({ start: clickedDate, end: null });
      return;
    }

    // Scenario C: Completing the range
    setSelection({ ...selection, end: clickedDate });
    setHoverDate(null); // Clear hover after sequence is complete
  };

  const handleDateHover = (hoveredDate: Date) => {
    if (selection.start && !selection.end) {
      setHoverDate(hoveredDate);
    }
  };

  const handleClearSelection = () => {
    setSelection({ start: null, end: null });
    setHoverDate(null);
  };

  // Helper to determine styling for range rendering
  const getDayClasses = (day: Date) => {
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isStart = selection.start && isSameDay(day, selection.start);
    const isEnd = selection.end && isSameDay(day, selection.end);
    
    // Calculate if it's "in between"
    const isBetween = 
      (selection.start && selection.end && isAfter(day, selection.start) && isBefore(day, selection.end)) ||
      (selection.start && !selection.end && hoverDate && isAfter(day, selection.start) && isBefore(day, hoverDate)) ||
      (selection.start && !selection.end && hoverDate && isSameDay(day, hoverDate));

    let classes = `relative flex items-center justify-center h-10 w-full cursor-pointer transition-colors `;

    if (!isCurrentMonth) {
      classes += "text-slate-300 ";
      if (isBetween) classes += "bg-blue-50/50 ";
      return classes;
    }

    if (isStart && isEnd) {
      classes += "bg-blue-600 text-white rounded-lg font-bold shadow-md ";
    } else if (isStart) {
      classes += "bg-blue-600 text-white rounded-l-lg font-bold shadow-md ";
    } else if (isEnd) {
      classes += "bg-blue-600 text-white rounded-r-lg font-bold shadow-md ";
    } else if (isBetween) {
      classes += "bg-blue-50 text-blue-900 font-medium ";
    } else if (isToday(day)) {
      classes += "text-blue-600 font-bold underline decoration-2 underline-offset-4 ";
    } else {
      classes += "text-slate-700 hover:bg-slate-100 font-medium rounded-lg ";
    }

    return classes;
  };

  return (
    <div className="w-full mx-auto select-none flex flex-col h-full">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8 px-2 pt-2">
        <button 
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-2xl font-light text-slate-800 hover:bg-slate-100 transition-colors"
          title="Previous Month"
        >
          ‹
        </button>
        
        <div className="text-center flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">
            {format(viewDate, 'MMMM')}
          </h2>
          <p className="text-sm font-semibold tracking-widest text-slate-400 mt-1">
            {format(viewDate, 'yyyy')}
          </p>
        </div>

        <button 
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-2xl font-light text-slate-800 hover:bg-slate-100 transition-colors"
          title="Next Month"
        >
          ›
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 mb-4">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-7 gap-y-2 place-items-center mb-6">
        {calendarDays.map((day, idx) => {
          // Check if this day intersects with any note range
          const hasNote = Object.keys(allNotes).some(key => {
            if (!key.includes('_to_')) {
              // Properly parse the string to avoid timezone parsing issues with 'new Date()'
              const [y, m, d] = key.split('-').map(Number);
              const noteDate = new Date(y, m - 1, d);
              return isSameDay(day, noteDate);
            }
            try {
              const [startStr, endStr] = key.split('_to_');
              const [sy, sm, sd] = startStr.split('-').map(Number);
              const [ey, em, ed] = endStr.split('-').map(Number);
              return isWithinInterval(day, { 
                start: new Date(sy, sm - 1, sd), 
                end: new Date(ey, em - 1, ed, 23, 59, 59) 
              });
            } catch {
              return false;
            }
          });

          return (
            <div 
              key={idx} 
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              className={getDayClasses(day)}
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <span>{format(day, 'd')}</span>
                {hasNote && showMarkers && (
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-auto flex flex-col pt-4 border-t border-slate-100 gap-3">
        <label className="flex items-center gap-2 cursor-pointer select-none self-end text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <input 
            type="checkbox" 
            checked={showMarkers} 
            onChange={(e) => setShowMarkers(e.target.checked)}
            className="w-3.5 h-3.5 rounded text-amber-500 focus:ring-amber-500 border-slate-300 cursor-pointer"
          />
          Show Note Markers
        </label>
        
        {(selection.start || selection.end) && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 font-medium">
              {selection.start && !selection.end && `Selecting: ${format(selection.start, 'MMM do')} — ...`}
              {selection.start && selection.end && `Selected: ${format(selection.start, 'MMM do')} — ${format(selection.end, 'MMM do')}`}
            </p>
            <button 
              onClick={handleClearSelection}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded bg-slate-50 hover:bg-red-50"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}