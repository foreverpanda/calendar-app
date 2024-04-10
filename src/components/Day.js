// Day.js
import React, { useState, useEffect } from 'react';
import { timeSlots } from '../data/timeSlots';

function Day({ date }) {
 // const timeSlots = ['8am', '12pm', '3pm', '10pm'];
  
  const [checkboxes, setCheckboxes] = useState(timeSlots.map(() => false));

  const generateID = (time) => {
    return `${date.toDateString()}-${time}`;
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);

    const timestampID = generateID(timeSlots[index]);
    const checkboxData = JSON.parse(localStorage.getItem('checkboxData')) || {};
    checkboxData[timestampID] = newCheckboxes[index];
    localStorage.setItem('checkboxData', JSON.stringify(checkboxData));
  };

  useEffect(() => {
    const storedCheckboxData = JSON.parse(localStorage.getItem('checkboxData'));
    if (storedCheckboxData) {
      const newCheckboxes = timeSlots.map((time) => {
        const timestampID = generateID(time);
        return storedCheckboxData[timestampID] || false;
      });
      setCheckboxes(newCheckboxes);
    }
  }, [date]); // Reset checkbox state when the date changes

  return (
    <div  className=' flex flex-col p-7'>

      <span>{date.toDateString()}</span>

      <div  className=' flex   flex-wrap  min-w-[555px] '>
        {timeSlots.map((time, index) => (
          <div key={index} className="timestamp">
            <label htmlFor={generateID(time)}>
              <input  type="checkbox"  id={generateID(time)}  checked={checkboxes[index]}  onChange={() => handleCheckboxChange(index)}
              />
              {time}
            </label>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Day;