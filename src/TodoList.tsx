import React, { FC, useState } from "react";
import { TodoItem } from "./TodoItem/TodoItem";
import "./TodoList.scss";

export const BANNER = "Add Items to Get Started!";

const unique = (function () {
  let n = 0;
  return function () {
    return n++;
  };
})();

export const TodoList: FC = () => {
  const [toDoItems, setToDoItems] = useState<string[]>([]);

  const handleAddItem = () => {
    setToDoItems((currentValue) => [...currentValue, ""]);
  };

  const handleDoIt = (todo: string) => {
    setToDoItems((currentValue) => [...currentValue, todo]);
  };

  return (
    <div className="TodoList">
      <p>Git 'Er Done</p>
      <button type="button" onClick={handleAddItem}>
        Add Item
      </button>
      {toDoItems.length ? (
        toDoItems.map((todo) => (
          <TodoItem key={unique()} todo={todo} onDoIt={handleDoIt} />
        ))
      ) : (
        <p>{BANNER}</p>
      )}
    </div>
  );
};

export default TodoList;
