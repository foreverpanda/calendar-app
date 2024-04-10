import React, { useState, useEffect } from "react";
import { timeSlots } from "../data/timeSlots";
import { HiOutlineDownload } from "react-icons/hi";

function Day({ date }) {
  const [checkboxes, setCheckboxes] = useState(timeSlots.map(() => false));
  const storedCheckboxData = JSON.parse(localStorage.getItem("checkboxData"));
  const [localStorageData, setData] = useState(storedCheckboxData);

  const generateID = (time) => {
    return `${date.toDateString()}-${time}`;
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);

    const timestampID = generateID(timeSlots[index]);
    const checkboxData = JSON.parse(localStorage.getItem("checkboxData")) || {};
    checkboxData[timestampID] = newCheckboxes[index];
    localStorage.setItem("checkboxData", JSON.stringify(checkboxData));

    const storedCheckboxData = JSON.parse(localStorage.getItem("checkboxData"));
    setData(storedCheckboxData);
  };

  const downloadDataAsFile = () => {
    const blob = new Blob([JSON.stringify(localStorageData)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorageData.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const storedCheckboxData = JSON.parse(localStorage.getItem("checkboxData"));

    if (storedCheckboxData) {
      setData(storedCheckboxData);
      const newCheckboxes = timeSlots.map((time) => {
        const timestampID = generateID(time);
        return storedCheckboxData[timestampID] || false;
      });
      setCheckboxes(newCheckboxes);
    }
  }, [date]);

  // Array of English day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get month and date
  const month = date.getMonth() + 1; // Add 1 to get 1-based index
  const dayOfMonth = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary

  return (
    <div className="flex  bg-gray-300 m-[1px] p-0 ">
      {/* Display English day name, month, and date */}
      <div>
        <span className=" w-[5vw]  justify-center items-center flex flex-col bg-gray-100 p-4">
          <span className="text-red-500 font-bold">
            {" "}
            {`${dayNames[date.getDay()]}`}
          </span>
          <span> {` ${month}/${dayOfMonth}`}</span>{" "}
          {/* Modified line to display month as number */}
          <span
            className="p-2 border-[1px] rounded-md border-black hover:bg-gray-300"
            onClick={downloadDataAsFile}
          >
            {" "}
            <HiOutlineDownload />
          </span>
        </span>
      </div>
      <div>
        {" "}
        <div className="flex flex-wrap m-4 ">
          {timeSlots.map((time, index) => (
            <div key={index} className="timestamp p-2">
              <label htmlFor={generateID(time)}>
                <input
                  type="checkbox"
                  id={generateID(time)}
                  checked={checkboxes[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {time}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Day;
