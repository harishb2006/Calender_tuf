import React from 'react';
import { format, getMonth } from 'date-fns';

const CalendarImageCard = ({ viewDate }: { viewDate: Date }) => {
  // Determine Seasonal Color based on Indian climate
  const getSeasonStyles = (date: Date) => {
    const month = getMonth(date); // 0-indexed (0 = Jan)
    
    // Summer: March - May
    if (month >= 2 && month <= 4) return { color: 'bg-[#FF9F43]', name: 'Summer' }; 
    // Monsoon: June - August
    if (month >= 5 && month <= 7) return { color: 'bg-[#10AC84]', name: 'Monsoon' };
    // Autumn: September - November
    if (month >= 8 && month <= 10) return { color: 'bg-[#EE5253]', name: 'Autumn' };
    // Winter: December - February
    return { color: 'bg-[#2E86DE]', name: 'Winter' };
  };

  const season = getSeasonStyles(viewDate);
  const monthName = format(viewDate, 'MMMM').toLowerCase();
  const monthIndex = getMonth(viewDate);

  const images: Record<number, string> = {
    0: 'january.webp',
    1: 'february.jpg',
    2: 'march.jpg',
    3: 'april.webp',
    4: 'may.jpg',
    5: 'june.webp',
    6: 'july.jpg',
    7: 'august.jpg',
    8: 'september.webp',
    9: 'october.jpg',
    10: 'november.webp',
    11: 'december.webp'
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-slate-50">
      {/* 1. Main Image Section */}
      <div className="flex-grow relative overflow-hidden">
        <img 
          key={monthName} // Key helps trigger transition animation on change
          src={`/cal_as/${images[monthIndex]}`} 
          alt={monthName}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-105"
          // Fallback image if the file doesn't exist in your folder
          onError={(e) => { 
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; 
          }}
        />

        {/* 2. Seasonal Badge */}
        <div className="absolute top-8 left-8">
          <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-sm shadow-sm border-l-4" 
               style={{ borderColor: season.color.replace('bg-', '') }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">
              {season.name}
            </p>
            <p className="text-[10px] text-slate-500 font-serif italic">
              India Edition
            </p>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Seasonal Footer Bar */}
      <div className={`h-6 w-full transition-colors duration-700 ${season.color} flex items-center justify-center`}>
         <span className="text-[9px] text-white/80 uppercase tracking-widest font-bold">
           {format(viewDate, 'yyyy')} Visual Anchor
         </span>
      </div>
    </div>
  );
};

export default CalendarImageCard;