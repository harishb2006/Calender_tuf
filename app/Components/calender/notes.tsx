"use client";
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { DateRange } from './calenderGrid';

type NotesProps = {
  selection: DateRange;
  allNotes: Record<string, string>;
  setAllNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const getSelectionKey = (range: DateRange) => {
  if (!range.start) return null;
  
  const startKey = format(range.start, 'yyyy-MM-dd');
  if (!range.end || isSameDay(range.start, range.end)) {
    return startKey; // Single date key
  }
  
  const endKey = format(range.end, 'yyyy-MM-dd');
  return `${startKey}_to_${endKey}`; // Range key
};

export default function Notes({ selection, allNotes, setAllNotes }: NotesProps) {
  const activeKey = getSelectionKey(selection);
  const isRange = selection.start && selection.end && !isSameDay(selection.start, selection.end);

  const getPlaceholderText = () => {
    if (isRange && selection.start) return `Jot down memos for your trip/event starting ${format(selection.start, 'MMM do')}...`;
    if (selection.start) return `Jot down memos for ${format(selection.start, 'MMMM do, yyyy')}...`;
    return "Select a date to add notes...";
  };

  const getHeadingText = () => {
    if (isRange && selection.start && selection.end) {
      return `Notes for ${format(selection.start, 'MMM do')} — ${format(selection.end, 'MMM do')}`;
    }
    if (selection.start) return `Notes for ${format(selection.start, 'MMMM do')}`;
    return "Notes";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeKey) return;
    const newNote = e.target.value;
    
    setAllNotes(prev => {
      const updated = { ...prev };
      if (!newNote.trim()) {
        delete updated[activeKey];
      } else {
        updated[activeKey] = newNote;
      }
      return updated;
    });
  };

  if (!activeKey) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-slate-200 p-8 rounded-xl h-44 transition-all">
        <p className="italic text-slate-400 font-medium">Select a date or range above to add notes.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all relative">
      <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2 flex items-center justify-between">
        <span className="truncate pr-2">{getHeadingText()}</span>
        {allNotes[activeKey] && (
          <button 
            onClick={() => {
              setAllNotes(prev => {
                const updated = { ...prev };
                delete updated[activeKey];
                return updated;
              });
            }}
            className="text-[11px] font-semibold px-2 py-1 rounded transition-colors whitespace-nowrap text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
            title="Delete current note"
          >
            Delete Note
          </button>
        )}
      </h3>
      <textarea
        className="w-full h-32 p-3 border-none bg-slate-50 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 text-slate-700 transition-colors"
        placeholder={getPlaceholderText()}
        value={allNotes[activeKey] || ""}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}
