import Swal from "sweetalert2";
import { useData } from "../DataProvider";
import { AddIcon } from "../Icon";

type Props = {
  text: string;
  type: "todo" | "doing" | "done";
};

export default function TodoHeader({ text, type }: Props) {
  const data = useData();

  return (
    <div className="px-10 py-5 flex place-items-center place-content-between">
      <h1 className="text-white text-2xl font-bold font-serif">{text}</h1>
      <div
        tabIndex={0}
        className="hover:cursor-pointer"
        onClick={() => {
          Swal.fire({
            title: `Submit ${type} task`,
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `Add ${result.value} completed.`,
              });
              if (type === "todo") return data?.addTodoData(result.value);
              else if (type === "doing") return data?.addDoingData(result.value);
              else return data?.addDoneData(result.value);
            }
          });
        }}
      >
        {AddIcon}
      </div>
    </div>
  );
}
