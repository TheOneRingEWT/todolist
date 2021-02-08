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
  const [isUpdating, setIsUpdating] = useState<boolean>(todoItem.isUpdating);

  const onDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();

    setDescription(event.target.value);
  };

  const onDoItClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setIsUpdating(false);

    const updatedItem: TodoItemData = {
      ...todoItem,
      description: description,
      isUpdating: false,
    };

    onDoItClick(updatedItem);
  };

  const onEditClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setIsUpdating(true);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" data-testid="checkbox" />
      {isUpdating ? (
        <div className="update">
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
        </div>
      ) : (
        <div className="description-block">
          <div>{description}</div>
          <div className="actions">
            <button onClick={onEditClickHandler}>edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
