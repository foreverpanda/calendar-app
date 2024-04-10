// Calendar.js
import React, { useState } from "react";
import Week from "./Week";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";

import { HiOutlineFolderDownload } from "react-icons/hi";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());

  const goToNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const goToPreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  return (
    <div className=" ">
      <div className=" flex justify-between items-center mb-4">
        <div className="flex justify-center items-center text-sky-700 p-4 ">
          {" "}
          <IoMdArrowDropleft />
          <button onClick={goToPreviousWeek}>Previous Week</button>
        </div>
        <div
          className="border-[1px] border-sky-700 p-2 rounded-md flex items-center gap-4 justify-center"
          title="Download all Data"
        >
          <span className="">Download all Data</span>
          {/* <HiOutlineFolderDownload /> */}
        </div>

        <div>{startDate.toString()}</div>
        <div
          className="border-[1px] border-sky-700 p-2 rounded-md flex items-center gap-4 justify-center"
          title="Clear all Data"
        >
          <span className="">Clear Selections</span>
          {/* <AiOutlineClear /> */}
        </div>
        <div className="flex justify-center items-center text-sky-700 p-4">
          {" "}
          <button onClick={goToNextWeek}>Next Week</button>
          <IoMdArrowDropright />
        </div>
      </div>
      <Week startDate={startDate} />
    </div>
  );
}

export default Calendar;
