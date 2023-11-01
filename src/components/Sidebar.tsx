import { MONTHS, DAYS, uuid } from "~/utils/constants";
import Task from "./Task";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [task, setTask] = useState("");
  const [userId, setUserId] = useState<string>();
  const { data: selfHosted } = api.tasks.selfHosted.useQuery();
  const { mutateAsync: createTask } = api.tasks.create.useMutation();
  const { mutateAsync: initTask } = api.tasks.init.useMutation();
  const { data: tasks, isLoading } = api.tasks.getAll.useQuery(
    selfHosted ? {} : { user: userId },
  );

  const getDone = (task: {
    key: string;
    habit: string;
    days: Record<string, boolean>;
  }) => {
    const day = new Date(new Date().setHours(0, 0, 0, 0));
    const status =
      task.days[`${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`];

    if (typeof status !== "boolean")
      void initTask({ id: task.key, date: new Date(), user: userId });

    return status ?? false;
  };

  useEffect(() => {
    if (!localStorage.getItem("userid")) {
      localStorage.setItem("userid", uuid());
    }

    setUserId(localStorage.getItem("userid")!);
  }, [selfHosted]);

  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-10 bg-gray-700 py-8">
      <div className="flex items-center justify-between px-12 uppercase">
        <div className="flex items-center gap-1">
          <div className="text-5xl">{new Date().getDate()}</div>
          <div className="flex flex-col leading-5">
            <div>{MONTHS[new Date().getMonth()]}</div>
            <div>{new Date().getFullYear()}</div>
          </div>
        </div>
        <div>{DAYS[new Date().getDay()]}</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void toast.promise(createTask({ task, done: false, user: userId }), {
            success: "Created habit!",
            error: "Failed to create habit!",
            loading: "Creating...",
          });
          setTask("");
        }}
        className="flex w-full flex-col gap-2 px-12"
      >
        <input
          type="text"
          className="w-full px-3 py-2 text-black outline-none"
          placeholder="Start XYZ habit from today"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="w-full bg-black py-2 hover:bg-white hover:text-black">
          Start new Habit
        </button>
      </form>
      <div className="flex flex-col gap-2 overflow-y-scroll px-12">
        {tasks
          ?.sort((t) => (!getDone(t) ? -1 : 1))
          .map((task) => (
            <Task
              key={task.key}
              id={task.key}
              task={task.habit}
              done={getDone(task)!}
            />
          ))}
        {isLoading ? <div>Loading tasks for today...</div> : null}
      </div>
    </aside>
  );
};

export default Sidebar;
