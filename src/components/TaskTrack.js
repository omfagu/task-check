import React, { useState, useEffect } from "react";
import "./TaskTrack.css";

const TaskTrack = () => {
  // Hafta ve görevlerin başlangıç durumları
  const [weeks, setWeeks] = useState(() => {
    // localStorage'dan verileri alın
    const storedWeeks = localStorage.getItem("weeks");
    return storedWeeks
      ? JSON.parse(storedWeeks)
      : Array.from({ length: 24 }, (_, weekIndex) => ({
          id: weekIndex + 1,
          weekNumber: weekIndex + 1,
          tasks: Array.from({ length: 5 }, (_, dayIndex) => ({
            id: dayIndex + 1,
            text: `S${weekIndex + 1}-G${dayIndex + 1}`,
            checked: false,
          })),
        }));
  });

  // Checkbox durumu değiştiğinde çalışacak fonksiyon
  const handleCheckboxChange = (weekId, dayId) => {
    setWeeks((prevWeeks) =>
      prevWeeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            tasks: week.tasks.map((task) =>
              task.id === dayId ? { ...task, checked: !task.checked } : task
            ),
          };
        }
        return week;
      })
    );
  };

  // weeks değiştiğinde localStorage'a kaydedin
  useEffect(() => {
    localStorage.setItem("weeks", JSON.stringify(weeks));
  }, [weeks]);

  // Checked ve unchecked sayacını hesaplayın
  const checkedCount = weeks.flatMap((week) =>
    week.tasks.filter((task) => task.checked)
  ).length;
  const uncheckedCount = weeks.flatMap((week) =>
    week.tasks.filter((task) => !task.checked)
  ).length;

  return (
    <div className="week">
      <h1>Görev Takibi</h1>
      <div className="counter">
        <div className="checked-count">
          Tamamlanan Repository: {checkedCount}
        </div>
        <div className="unchecked-count">
          Eksik Repository: {uncheckedCount}
        </div>
      </div>
      {weeks.map((week) => (
        <div class="card" key={week.id}>
          <h2>Sprint {week.weekNumber}</h2>
          <div className="days">
            {week.tasks.map((task) => (
              <label key={task.id}>
                <div className="checkboxes">
                  {task.text} -{" "}
                  <label class="container">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => handleCheckboxChange(week.id, task.id)}
                    />
                    <div class="checkmark"></div>
                  </label>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTrack;
