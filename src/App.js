import React, { useState, useEffect } from 'react';
import './App.css';

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

const getCurrentTimeBlock = (daySchedule) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  return daySchedule.find(({ time }, i) => {
    const [hour, minute] = time
      .replace(" AM", "")
      .replace(" PM", "")
      .split(":")
      .map(Number);
    const blockTime = time.includes("PM") && hour !== 12 ? hour + 12 : hour;
    const blockMinutes = blockTime * 60 + minute;
    const nowMinutes = currentHour * 60 + currentMinute;
    const nextBlock = daySchedule[i + 1];
    if (!nextBlock) return nowMinutes >= blockMinutes;
    const [nHour, nMinute] = nextBlock.time
      .replace(" AM", "")
      .replace(" PM", "")
      .split(":")
      .map(Number);
    const nextBlockTime = nextBlock.time.includes("PM") && nHour !== 12 ? nHour + 12 : nHour;
    const nextBlockMinutes = nextBlockTime * 60 + nMinute;
    return nowMinutes >= blockMinutes && nowMinutes < nextBlockMinutes;
  });
};

function App() {
  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentBlock, setCurrentBlock] = useState(null);

  useEffect(() => {
    const updateBlock = () => {
      const today = new Date().toLocaleString("en-US", { weekday: "long" });
      setCurrentDay(today);
      const block = getCurrentTimeBlock(schedule[today] || []);
      setCurrentBlock(block);
    };
    updateBlock();
    const interval = setInterval(updateBlock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Today's Schedule</h1>
      <div className="schedule-list">
        {(schedule[currentDay] || []).map((block, index) => (
          <div
            key={index}
            className={`block ${block === currentBlock ? "current" : ""}`}
          >
            <div className="time">{block.time}</div>
            <div className="activity">{block.activity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;