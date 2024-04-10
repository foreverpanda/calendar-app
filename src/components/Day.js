import React, { useState, useEffect } from 'react';
import { timeSlots } from '../data/timeSlots';

function Day({ date }) {

  const [checkboxes, setCheckboxes] = useState(timeSlots.map(() => false));
  const storedCheckboxData = JSON.parse(localStorage.getItem('checkboxData'));
  const [localStorageData, setData] = useState(storedCheckboxData);

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

    const storedCheckboxData = JSON.parse(localStorage.getItem('checkboxData'));
    setData(storedCheckboxData);
  };

  const downloadDataAsFile = () => {
    const blob = new Blob([JSON.stringify(localStorageData)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorageData.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const storedCheckboxData = JSON.parse(localStorage.getItem('checkboxData'));

    if (storedCheckboxData) {
      setData(storedCheckboxData);
      const newCheckboxes = timeSlots.map((time) => {
        const timestampID = generateID(time);
        return storedCheckboxData[timestampID] || false;
      });
      setCheckboxes(newCheckboxes);
    }
  }, [date]);

  return (
    <div className='flex flex-col p-7'>
      <span>{date.toDateString()}</span>
      <button onClick={downloadDataAsFile}>Download Data into Json file</button>
      <div className='flex flex-wrap'>
        {timeSlots.map((time, index) => (
          <div key={index} className="timestamp">
            <label htmlFor={generateID(time)}>
              <input type="checkbox" id={generateID(time)} checked={checkboxes[index]} onChange={() => handleCheckboxChange(index)} />
              {time}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
