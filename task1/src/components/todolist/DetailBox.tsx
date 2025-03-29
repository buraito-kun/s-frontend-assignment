import { PropsWithChildren } from "react";
import { useData } from "../DataProvider";
import { DeleteIcon, EditIcon } from "../Icon";
import Swal from "sweetalert2";

type Props = {
  type: "todo" | "doing" | "done";
};

export default function TodoDetailBox({ type }: Props) {
  const data = useData();

  if (type === "todo") {
    if (data?.data.todo.length) {
      return (
        <div>
          {data?.data.todo.map((str, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 w-full flex place-content-between place-items-center"
              >
                <h2 className="text-white">{str}</h2>
                <div className="flex">
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => {
                      let inputValue = str;
                      Swal.fire({
                        title: "Do you want to edit?",
                        input: "text",
                        inputAttributes: {
                          autocapitalize: "off",
                        },
                        inputValue: str,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Doing",
                        denyButtonText: `Done`,
                        cancelButtonText: "Todo",
                        preConfirm: (inputValue) => inputValue,
                        didOpen: () => {
                          const inputEl = Swal.getInput();
                          inputEl?.addEventListener("input", (e) => {
                              inputValue = (e.target as HTMLInputElement).value; // Track input changes
                          });
                      }
                      }).then((result) => {
                        const updatedValue = result.value || str;
                        if (result.isConfirmed) {
                          data.removeTodoData(str);
                          data.addDoingData(updatedValue);
                        } else if (result.isDenied) {
                          data.removeTodoData(str);
                          data.addDoneData(updatedValue);
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          data.removeTodoData(str);
                          data.addTodoData(inputValue);
                        }
                        window.location.reload();
                      });
                    }}
                  >
                    {EditIcon}
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => data?.removeTodoData(str)}
                  >
                    {DeleteIcon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-full h-auto flex flex-col place-content-center place-items-center">
          <h2 className="text-white font-serif">No data</h2>
        </div>
      );
    }
  } else if (type === "doing") {
    if (data?.data.doing.length) {
      return (
        <div>
          {data?.data.doing.map((str, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 w-full flex place-content-between place-items-center"
              >
                <h2 className="text-white">{str}</h2>
                <div className="flex">
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => {
                      let inputValue = str;
                      Swal.fire({
                        title: "Do you want to edit?",
                        input: "text",
                        inputAttributes: {
                          autocapitalize: "off",
                        },
                        inputValue: str,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Done",
                        denyButtonText: `Todo`,
                        cancelButtonText: "Doing",
                        preConfirm: (inputValue) => inputValue,
                        didOpen: () => {
                          const inputEl = Swal.getInput();
                          inputEl?.addEventListener("input", (e) => {
                              inputValue = (e.target as HTMLInputElement).value; // Track input changes
                          });
                      }
                      }).then((result) => {
                        const updatedValue = result.value || str;
                        if (result.isConfirmed) {
                          data.removeDoingData(str);
                          data.addDoneData(updatedValue);
                        } else if (result.isDenied) {
                          data.removeDoingData(str);
                          data.addTodoData(updatedValue);
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          data.removeDoingData(str);
                          data.addDoingData(inputValue);
                        }
                        window.location.reload();
                      });
                    }}
                  >
                    {EditIcon}
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => data?.removeDoingData(str)}
                  >
                    {DeleteIcon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-full h-auto flex flex-col place-content-center place-items-center">
          <h2 className="text-white font-serif">No data</h2>
        </div>
      );
    }
  } else {
    if (data?.data.done.length) {
      return (
        <div>
          {data?.data.done.map((str, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 w-full flex place-content-between place-items-center"
              >
                <h2 className="text-white">{str}</h2>
                <div className="flex">
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => {
                      let inputValue = str;
                      Swal.fire({
                        title: "Do you want to edit?",
                        input: "text",
                        inputAttributes: {
                          autocapitalize: "off",
                        },
                        inputValue: str,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Doing",
                        denyButtonText: `Todo`,
                        cancelButtonText: "Done",
                        preConfirm: (inputValue) => inputValue,
                        didOpen: () => {
                          const inputEl = Swal.getInput();
                          inputEl?.addEventListener("input", (e) => {
                              inputValue = (e.target as HTMLInputElement).value; // Track input changes
                          });
                      }
                      }).then((result) => {
                        const updatedValue = result.value || str;
                        if (result.isConfirmed) {
                          data.removeDoneData(str);
                          data.addDoingData(updatedValue);
                        } else if (result.isDenied) {
                          data.removeDoneData(str);
                          data.addTodoData(updatedValue);
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          data.removeDoneData(str);
                          data.addDoneData(inputValue);
                        }
                        window.location.reload();
                      });
                    }}
                  >
                    {EditIcon}
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    onClick={() => data?.removeDoneData(str)}
                  >
                    {DeleteIcon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-full h-auto flex flex-col place-content-center place-items-center">
          <h2 className="text-white font-serif">No data</h2>
        </div>
      );
    }
  }
}
