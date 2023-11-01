export const countDaysInYear = (day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
  const yearStart = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
  const yearEnd = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

  const days = [];

  while (yearStart.getTime() <= yearEnd.getTime()) {
    if (yearStart.getDay() == day) days.push(new Date(yearStart));
    yearStart.setDate(yearStart.getDate() + 1);
  }

  return days;
};

export const determineColor = (
  tasks: { habit: string; days: Record<string, boolean> }[],
  date: Date,
) => {
  let total = 0;
  let done = 0;

  let fixed = "";

  const day = new Date(date.setHours(0, 0, 0, 0));
  const dateStr = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

  tasks?.forEach((task, ind) => {
    if (typeof task.days[dateStr] === "boolean") {
      total++;
      if (task.days[dateStr]) done++;
    } else {
      if (ind === tasks.length - 1 && done === 0)
        fixed = "bg-gray-500 cursor-not-allowed";
    }
  });

  const percent = (done / total) * 100;

  if (percent <= 10) return fixed || "bg-red-500 cursor-pointer";
  else if (percent <= 20) return fixed || "bg-red-400 cursor-pointer";
  else if (percent <= 30) return fixed || "bg-red-300 cursor-pointer";
  else if (percent <= 40) return fixed || "bg-red-200 cursor-pointer";
  else if (percent <= 50) return fixed || "bg-red-100 cursor-pointer";
  else if (percent <= 60) return fixed || "bg-green-100 cursor-pointer";
  else if (percent <= 70) return fixed || "bg-green-200 cursor-pointer";
  else if (percent <= 80) return fixed || "bg-green-300 cursor-pointer";
  else if (percent <= 90) return fixed || "bg-green-400 cursor-pointer";
  else if (percent <= 100) return fixed || "bg-green-500 cursor-pointer";
  return fixed || "bg-gray-500 cursor-not-allowed";
};

// logic borrowed and modified from: https://stackoverflow.com/a/4156516
const getStartOfWeek = () => {
  const d = new Date();
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  d.setDate(diff);
  return d;
};

const getMonthStart = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

const getMonthEnd = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

export const calculateWeeklyPercentage = (days: Record<string, boolean>) => {
  const days_ = { ...days };

  Object.keys(days_).forEach((day) => {
    if (
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) < getStartOfWeek() ||
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) > new Date()
    )
      delete days_[day];
  });

  const daysArr = Object.values(days_);

  const percent = `${daysArr.filter((t) => t).length} / ${daysArr.length}`;

  return percent;
};

const calculateWeeklyPercentageNumber = (days: Record<string, boolean>) => {
  const days_ = { ...days };

  Object.keys(days_).forEach((day) => {
    if (
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) < getStartOfWeek() ||
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) > new Date()
    )
      delete days_[day];
  });

  const daysArr = Object.values(days_);

  const percent = daysArr.filter((t) => t).length / daysArr.length;

  return percent;
};

export const calculateMonthlyPercentage = (days: Record<string, boolean>) => {
  const days_ = { ...days };

  Object.keys(days_).forEach((day) => {
    if (
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) < getMonthStart() ||
      new Date(
        Number(day.split("-")[2]),
        Number(day.split("-")[1]),
        Number(day.split("-")[0]),
      ) > getMonthEnd()
    )
      delete days_[day];
  });

  const daysArr = Object.values(days_);

  const percent = `${daysArr.filter((t) => t).length} / ${daysArr.length}`;

  return percent;
};

export const getLeastCompletedHabit = (
  tasks: { habit: string; days: Record<string, boolean> }[],
) => {
  const pers: Record<number, string> = {};

  tasks?.forEach((t) => {
    pers[calculateWeeklyPercentageNumber(t.days)] = t.habit;
  });

  return pers[Math.min(...(Object.keys(pers) as unknown[] as number[]))];
};
