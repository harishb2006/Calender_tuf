"use client";
import React, { useState, useEffect } from 'react';
import CalendarGrid, { DateRange } from "./Components/calender/calenderGrid";
import CalendarImageCard from "./Components/calender/calenderImage";
import Notes from "./Components/calender/notes";

const Page = () => {
  const [viewDate, setViewDate] = useState(new Date());
  
  // Persist the exact selection array so a refresh keeps our active dates.
  const [selection, setSelection] = useState<DateRange>({ start: null, end: null });
  const [allNotes, setAllNotes] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

  // Load selection and notes from local storage on mount
  useEffect(() => {
    setIsClient(true);
    const savedSelection = localStorage.getItem("calendar-current-selection");
    if (savedSelection) {
      try {
        const parsed = JSON.parse(savedSelection);
        setSelection({
          start: parsed.start ? new Date(parsed.start) : null,
          end: parsed.end ? new Date(parsed.end) : null
        });
      } catch (e) {
        console.error("Failed to parse saved calendar selection");
      }
    }

    const savedNotes = localStorage.getItem("calendar-all-notes");
    if (savedNotes) {
      try {
        setAllNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes");
      }
    }
  }, []);

  // Save the notes whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("calendar-all-notes", JSON.stringify(allNotes));
    }
  }, [allNotes, isClient]);

  // Save the selection whenever it changes
  const handleSelectionChange = (newSelection: DateRange) => {
    setSelection(newSelection);
    localStorage.setItem("calendar-current-selection", JSON.stringify(newSelection));
  };
  
  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6 flex-grow">
            <CalendarGrid 
              viewDate={viewDate} 
              setViewDate={setViewDate} 
              selection={selection}
              setSelection={handleSelectionChange}
              allNotes={allNotes}
            />
          </div>
          
          {/* Notes Section specifically reacts to selection metadata */}
          <Notes selection={selection} allNotes={allNotes} setAllNotes={setAllNotes} />
        </div>
        
        <div className="w-full md:w-1/2 h-[500px] md:h-auto rounded-2xl overflow-hidden shadow-xl self-stretch min-h-[600px] sticky top-4">
          <CalendarImageCard viewDate={viewDate} />
        </div>
      </div>
    </div>
  )
}

export default Page
