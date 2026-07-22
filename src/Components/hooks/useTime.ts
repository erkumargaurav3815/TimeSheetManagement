import { useState } from "react";

export function useTime() {
  //get the current time
  function getCurrentTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    // Add 0 before single digit values so that hours and minutes should both have 2 digits
    const hour = String(currentHour).padStart(2, "0");
    const minute = String(currentMinute).padStart(2, "0");
    return `${hour}:${minute}`;
  }

  // get time after one hour automatically take +1 hour in end time
  function getNextHourTime() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const hour = String(currentDate.getHours()).padStart(2, "0");
    const minute = String(currentDate.getMinutes()).padStart(2, "0");
    return `${hour}:${minute}`;
  }

  // calculate total working time
  function calculateDuration(startTime: string, endTime: string) {
    // Split time into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    // Convert everything into minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;
    // If end time is smaller, it means it took more than 24 hours
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    // Find difference
    const totalMinutes = endTotalMinutes - startTotalMinutes;
    // Convert minutes into hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getNextHourTime());

  const resetTime = () => {
    setStartTime(getCurrentTime());
    setEndTime(getNextHourTime());
  };

  return {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    calculateDuration,
    resetTime,
  };
}
