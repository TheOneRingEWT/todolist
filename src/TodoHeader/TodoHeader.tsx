import React, { FC } from "react";
import { TodoItemData } from "../TodoItem/TodoItem";
import "./TodoHeader.scss";

export interface TodoHeaderProps {
  onAddItem: OnAddItem;
}

export interface OnAddItem {
  (addedItem: TodoItemData): void;
}

export const TodoHeader: FC<TodoHeaderProps> = (props) => {
  const { onAddItem: onAddItemClick } = props;

  const onAddItemClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    onAddItemClick({ id: Date.now(), description: "", isUpdating: true });
  };

  return (
    <div className="TodoHeader">
      <header className="app-title">Git 'Er Done App</header>
      <button onClick={onAddItemClickHandler}>Add Item</button>
    </div>
  );
};

export default TodoHeader;
