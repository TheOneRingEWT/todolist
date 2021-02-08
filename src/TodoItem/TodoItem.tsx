import React, { FC, useState } from "react";
import "./TodoItem.scss";

export interface TodoItemProps {
  todoItem: TodoItemData;
  onDoItClick: OnDoItClick;
}

export interface TodoItemData {
  id: number;
  description: string;
  isUpdating: boolean;
}

export interface OnDoItClick {
  (updatedItem: TodoItemData): void;
}

export const TodoItem: FC<TodoItemProps> = (props) => {
  const { todoItem, onDoItClick } = props;
  const [description, setDescription] = useState<string>(todoItem.description);

  const onDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();

    setDescription(event.target.value);
  };

  const onDoItClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const updatedItem: TodoItemData = {
      ...todoItem,
      description: description,
      isUpdating: false,
    };

    onDoItClick(updatedItem);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" data-testid="checkbox" />
      {todoItem.isUpdating ? (
        <>
          <input
            className="textbox"
            type="text"
            value={description}
            onChange={onDescriptionChangeHandler}
            data-testid="description-input"
          />
          <button className="do-it" onClick={onDoItClickHandler}>
            Do It!
          </button>
        </>
      ) : (
        <div>{description}</div>
      )}
    </div>
  );
};

export default TodoItem;
