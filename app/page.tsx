"use client";
import React, { useState } from 'react';
import CalendarGrid from "./Components/calender/calenderGrid";
import CalendarImageCard from "./Components/calender/calenderImage";

const Page = () => {
  const [viewDate, setViewDate] = useState(new Date());

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl">
        <div className="w-full md:w-1/2">
          <CalendarGrid viewDate={viewDate} setViewDate={setViewDate} />
        </div>
        <div className="w-full md:w-1/2 h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl">
          <CalendarImageCard viewDate={viewDate} />
        </div>
      </div>
    </div>
  )
}

export default Page
