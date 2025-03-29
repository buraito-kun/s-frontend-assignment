import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext<{
  data: {
    todo: string[];
    doing: string[];
    done: string[];
  };
  status: "loading" | "loaded" | "error";
  addTodoData: (d: string) => void;
  addDoingData: (d: string) => void;
  addDoneData: (d: string) => void;
  removeTodoData: (d: string) => void;
  removeDoingData: (d: string) => void;
  removeDoneData: (d: string) => void;
} | null>(null);

type Props = PropsWithChildren;

export default function DataProvider({ children }: Props) {
  const [data, setData] = useState<{
    todo: string[];
    doing: string[];
    done: string[];
  }>({ todo: [], doing: [], done: [] });
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

    useEffect(() => {
      const fetchRecordData = ()=>{
        if (!data.todo.length || !data.doing.length || !data.done.length) {
          setData({
            todo: localStorage.getItem("todo")?.split(",") ?? [],
            doing: localStorage.getItem("doing")?.split(",") ?? [],
            done: localStorage.getItem("done")?.split(",") ?? [],
          });
        }
      }
      fetchRecordData()
      setStatus("loaded");
    }, [status]);

  const addTodoData = (d: string) => {
    setData({ ...data, todo: [...data.todo, d] });
    localStorage.setItem(
      "todo",
      localStorage.getItem("todo") ? localStorage.getItem("todo") + "," + d : d
    );
  };
  const addDoingData = (d: string) => {
    setData({ ...data, doing: [...data.doing, d] });
    localStorage.setItem(
      "doing",
      localStorage.getItem("doing")
        ? localStorage.getItem("doing") + "," + d
        : d
    );
  };
  const addDoneData = (d: string) => {
    setData({ ...data, done: [...data.done, d] });
    localStorage.setItem(
      "done",
      localStorage.getItem("done") ? localStorage.getItem("done") + "," + d : d
    );
  };
  const removeTodoData = (d: string) => {
    setData({
      ...data,
      todo: [
        ...data.todo.slice(0, data.todo.indexOf(d)),
        ...data.todo.slice(data.todo.indexOf(d) + 1),
      ],
    });
    localStorage.setItem(
      "todo",
      String(localStorage.getItem("todo")?.replace(d, "").replaceAll(",,", ","))
    );
    afterRemove("todo")
  };
  const removeDoingData = (d: string) => {
    setData({
      ...data,
      doing: [
        ...data.doing.slice(0, data.doing.indexOf(d)),
        ...data.doing.slice(data.doing.indexOf(d) + 1),
      ],
    });
    localStorage.setItem(
      "doing",
      String(
        localStorage.getItem("doing")?.replace(d, "").replaceAll(",,", ",")
      )
    );
    afterRemove("doing")
  };
  const removeDoneData = (d: string) => {
    setData({
      ...data,
      done: [
        ...data.done.slice(0, data.done.indexOf(d)),
        ...data.done.slice(data.done.indexOf(d) + 1),
      ],
    });
    localStorage.setItem(
      "done",
      String(localStorage.getItem("done")?.replace(d, "").replaceAll(",,", ","))
    );
    afterRemove("done")
  };

  const afterRemove = (type: "todo" | "doing" | "done") => {
    const items = localStorage.getItem(type)?.split(",").filter(Boolean) || [];

    if (items.length === 0) {
        localStorage.removeItem(type);
    } else {
        localStorage.setItem(type, items.join(","));
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        status,
        addTodoData,
        addDoingData,
        addDoneData,
        removeTodoData,
        removeDoingData,
        removeDoneData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
