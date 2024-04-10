
//single week component
import React, { useState } from 'react';
import Day from './Day';

function Week({ startDate }) {

  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }


  return (
    <div className="flex flex-col">
      {days.map((day, index) => (
        <Day key={index} date={day}  />
      ))}

     
    </div>
  );
}

export default Week;