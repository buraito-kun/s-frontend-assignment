import React from "react";
import "./App.css";
import TodoBox from "./components/todolist/Box";
import ViewScreen from "./components/ViewScreen";
import TodoHeader from "./components/todolist/Header";
import TodoDetailBox from "./components/todolist/DetailBox";
import DataProvider from "./components/DataProvider";

function App() {
  return (
    <DataProvider>
      <ViewScreen color="bg-[#150058]">
        <TodoBox className="w-1/3 h-full p-5" color="bg-[#5437B5]">
          <TodoHeader text="Todo" type="todo" />
          <TodoDetailBox type="todo" />
        </TodoBox>
        <TodoBox className="w-1/3 h-full p-5" color="bg-[#5437B5]">
          <TodoHeader text="Doing" type="doing" />
          <TodoDetailBox type="doing" />
        </TodoBox>
        <TodoBox className="w-1/3 h-full p-5" color="bg-[#5437B5]">
          <TodoHeader text="Done" type="done" />
          <TodoDetailBox type="done" />
        </TodoBox>
      </ViewScreen>
    </DataProvider>
  );
}

export default App;
