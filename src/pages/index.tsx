import Head from "next/head";
import { VT323 } from "next/font/google";
import { api } from "~/utils/api";
import { useState } from "react";
import Sidebar from "~/components/Sidebar";
import {
  calculateMonthlyPercentage,
  calculateWeeklyPercentage,
  countDaysInYear,
  determineColor,
  getLeastCompletedHabit,
} from "~/utils/date";
import toast from "react-hot-toast";

const monospace = VT323({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const [lookback, setLookback] = useState<Date>();
  const { data: tasks } = api.tasks.getAll.useQuery();
  const { data: stats } = api.tasks.get.useQuery({
    date: lookback ?? new Date(),
  });

  const getDone = (
    task: { habit: string; days: Record<string, boolean> },
    date: Date,
  ) => {
    const day = new Date(date.setHours(0, 0, 0, 0));

    return (
      task.days[`${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`] ??
      false
    );
  };

  return (
    <>
      <Head>
        <title>n0 - No Zero Days</title>
        <meta
          name="description"
          content="Fix yoru life tool, built for @soulninja"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${monospace.className} grid min-h-screen grid-cols-4 bg-gray-800 font-mono text-xl text-white`}
      >
        <div className="col-span-3 flex flex-col gap-2 overflow-y-scroll px-24 py-16">
          <div className="text-3xl uppercase">Heatmap</div>
          <table className="flex flex-col gap-1">
            <tr className="flex h-3 gap-1">
              {countDaysInYear(0).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(1).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(2).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(3).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(4).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(5).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
            <tr className="flex h-3 gap-1">
              {countDaysInYear(6).map((date, ind) => (
                <td
                  key={ind}
                  onClick={() =>
                    date <= new Date() &&
                    !determineColor(tasks ?? [], date)?.includes("bg-gray-500")
                      ? setLookback(date)
                      : toast.error(
                          "Either you livin' in the future or no tasks on this day?",
                        )
                  }
                  className={`w-3 ${
                    date <= new Date()
                      ? determineColor(tasks ?? [], date)
                      : "cursor-not-allowed bg-gray-500"
                  }`}
                ></td>
              ))}
            </tr>
          </table>
          <div className="grid grid-cols-2 gap-48">
            <div className="flex flex-col gap-2">
              <div className="pt-10 text-2xl uppercase">Weekly Stats</div>
              <div className="flex flex-col gap-2">
                {tasks?.map((task) => (
                  <div
                    key={task.key}
                    className="flex items-center justify-between"
                  >
                    <div>{task.habit}</div>
                    <div>{calculateWeeklyPercentage(task.days)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="pt-10 text-2xl uppercase">Monthly Stats</div>
              <div className="flex flex-col gap-2">
                {tasks?.map((task) => (
                  <div
                    key={task.key}
                    className="flex items-center justify-between"
                  >
                    <div>{task.habit}</div>
                    <div>{calculateMonthlyPercentage(task.days)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 text-2xl uppercase">
            Most Missed Habit: {getLeastCompletedHabit(tasks!)}
          </div>
          {lookback ? (
            <>
              <div className="pt-6 text-2xl uppercase">
                {lookback?.toLocaleDateString("en", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                Stats
              </div>
              <div className="flex flex-col gap-2">
                {stats?.map((task) => (
                  <div
                    key={task.key}
                    className="flex w-1/2 items-center justify-between pr-24"
                  >
                    <div>{task.habit}</div>
                    <div>
                      {getDone(task, lookback) ? (
                        <div className="h-4 w-4 bg-white"></div>
                      ) : (
                        <div className="h-3.5 w-3.5 ring-2 ring-white"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <Sidebar />
      </main>
    </>
  );
}
