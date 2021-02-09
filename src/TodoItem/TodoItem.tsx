import React, { FC, useState } from "react";
import "./TodoItem.scss";

export interface TodoItemsProps {
  todo: string;
  onDoIt: Function
}

export const TodoItem: FC<TodoItemsProps> = (props) => {
  const { todo, onDoIt } = props;
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [textValue, setTextValue] = useState<string>("");

  const handleDoItButton = () => {
    setIsUpdating(false);
    console.log("text", textValue);
    setToDoItems([...toDoItems, textValue]);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setTextValue(e.target.value);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" data-testid="todo-checkbox" />

      {isUpdating ? (
        <>
          <input
            type="text"
            data-testid="todo-description-input"
            value={textValue}
            onChange={handleTextChange}
          />
          <button onClick={handleDoItButton}>Do It!</button>
        </>
      ) : (
        <div>{textValue}</div>
      )}
    </div>
  );
};

export default TodoItem;
