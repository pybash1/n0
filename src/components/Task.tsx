import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { uuid } from "~/utils/constants";

const Task = ({ id, task, done }: Props) => {
  const [done_, setDone] = useState(done);
  const [ctxMenu, setCtxMenu] = useState(false);
  const [userId, setUserId] = useState<string>();
  const { data: selfHosted } = api.tasks.selfHosted.useQuery();
  const { mutateAsync: markAsDone } = api.tasks.markAsDone.useMutation();
  const { mutateAsync: archive } = api.tasks.archive.useMutation();

  const ref = useRef<HTMLDivElement>(null);

  const ctx = api.useContext();

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setCtxMenu(false);
    };

    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("userid")) {
      localStorage.setItem("userid", uuid());
    }

    setUserId(localStorage.getItem("userid")!);
  }, [selfHosted]);

  return (
    <div
      className="flex items-center gap-3"
      onContextMenu={(e) => {
        e.preventDefault();
        setCtxMenu(true);
      }}
      ref={ref}
    >
      <button
        onClick={() => {
          setDone(!done_);
          void markAsDone({ id, date: new Date(), done, user: userId });
          void ctx.tasks.invalidate();
        }}
        className={`h-4 w-4 outline-none ring-2 ring-white focus:ring-black ${
          done_ ? "bg-white" : null
        }`}
      ></button>
      {done_ ? <s>{task}</s> : <div>{task}</div>}
      {ctxMenu ? (
        <div className="absolute bg-white px-4 py-2 text-black">
          <button
            onClick={() => {
              void toast.promise(archive({ id, user: userId }), {
                success: "Archived!",
                error: "Failed to archive!",
                loading: "Archiving...",
              });
              setCtxMenu(false);
            }}
          >
            Archive
          </button>
        </div>
      ) : null}
    </div>
  );
};

interface Props {
  id: string;
  task: string;
  done: boolean;
}

export default Task;
