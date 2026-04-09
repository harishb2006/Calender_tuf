"use client";
import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarGrid, { DateRange } from "./Components/calender/calenderGrid";
import CalendarImageCard from "./Components/calender/calenderImage";
import Notes from "./Components/calender/notes";

const Page = () => {
  const [viewDate, setViewDate] = useState(new Date());

  // Animation state
  const [direction, setDirection] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  // Storage states
  const [selection, setSelection] = useState<DateRange>({ start: null, end: null });
  const [allNotes, setAllNotes] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

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

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("calendar-all-notes", JSON.stringify(allNotes));
    }
  }, [allNotes, isClient]);

  const handleSelectionChange = (newSelection: DateRange) => {
    setSelection(newSelection);
    localStorage.setItem("calendar-current-selection", JSON.stringify(newSelection));
  };

  const handlePaginate = (newDirection: number) => {
    if (isFlipping) return;
    setDirection(newDirection);
    setViewDate(prev => newDirection === 1 ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  const flipVariants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0,
      y: direction > 0 ? 30 : -30,
      transformOrigin: 'top center',
    }),
    center: {
      rotateX: 0,
      opacity: 1,
      y: 0,
      transformOrigin: 'top center',
      zIndex: 1,
    },
    exit: (direction: number) => ({
      rotateX: direction < 0 ? -90 : 90,
      opacity: 0,
      y: direction < 0 ? 30 : -30,
      transformOrigin: 'top center',
      zIndex: 0,
    })
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* 
        Using CSS grid to allow the exiting and entering cards to stack in the 
        same grid cell without absolute positioning breaking the container height. 
      */}
      <div
        className="w-full max-w-5xl relative z-10 grid"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={() => setIsFlipping(false)}
        >
          <motion.div
            key={viewDate.toISOString()}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationStart={() => setIsFlipping(true)}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="row-start-1 col-start-1 w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {/* Left Side: Calendar & Notes */}
            <div className="w-full md:w-1/2 p-8 flex flex-col border-r border-slate-100 bg-white z-10">
              <div className="flex-grow flex flex-col min-h-[450px]">
                <CalendarGrid
                  viewDate={viewDate}
                  onPaginate={handlePaginate}
                  selection={selection}
                  setSelection={handleSelectionChange}
                  allNotes={allNotes}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Notes selection={selection} allNotes={allNotes} setAllNotes={setAllNotes} />
              </div>
            </div>

            {/* Right Side: Image Card */}
            <div className="hidden md:block md:w-1/2 md:min-h-full z-10">
              <CalendarImageCard viewDate={viewDate} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Page
