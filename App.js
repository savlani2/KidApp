import React, { useEffect, useState } from 'react';

const schedule = {
  Monday: [
    { time: "7:00 AM", activity: "Wake up & cuddle" },
    { time: "8:30 AM", activity: "Breakfast" },
    { time: "10:00 AM", activity: "Outdoor play" },
    { time: "12:00 PM", activity: "Lunch" },
    { time: "1:00 PM", activity: "Nap" },
    { time: "4:00 PM", activity: "Storytime" },
    { time: "6:00 PM", activity: "Dinner" },
    { time: "7:30 PM", activity: "Bath & Wind Down" },
    { time: "8:00 PM", activity: "Sleep" },
  ]
};

function App() {
  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentBlock, setCurrentBlock] = useState(null);

  useEffect(() => {
    const now = new Date();
    const today = now.toLocaleString('en-US', { weekday: 'long' });
    setCurrentDay(today);

    const getCurrentTimeBlock = (daySchedule) => {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      return daySchedule.find((block, i) => {
        const [hour, minute] = block.time.replace(/\s[AP]M/, '').split(':').map(Number);
        const isPM = block.time.includes('PM');
        const timeInMins = (hour % 12 + (isPM ? 12 : 0)) * 60 + minute;
        const nextBlock = daySchedule[i + 1];
        const nextTime = nextBlock
          ? (Number(nextBlock.time.split(':')[0]) % 12 + (nextBlock.time.includes('PM') ? 12 : 0)) * 60 + Number(nextBlock.time.split(':')[1])
          : 1440;
        return currentMinutes >= timeInMins && currentMinutes < nextTime;
      });
    };

    const block = getCurrentTimeBlock(schedule[today] || []);
    setCurrentBlock(block);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Today's Schedule ({currentDay})</h1>
      {(schedule[currentDay] || []).map((block, index) => (
        <div key={index} style={{
          padding: 10,
          margin: '10px 0',
          borderRadius: 8,
          background: block === currentBlock ? '#cce4ff' : '#f0f0f0',
          borderLeft: block === currentBlock ? '4px solid #007bff' : '4px solid transparent'
        }}>
          <div><strong>{block.time}</strong></div>
          <div>{block.activity}</div>
        </div>
      ))}
    </div>
  );
}

export default App;