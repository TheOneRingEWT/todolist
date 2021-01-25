import React, { FC, useState } from "react";
import { TodoHeader } from "./TodoHeader/TodoHeader";
import { TodoItem, TodoItemData } from "./TodoItem/TodoItem";
import "./TodoList.scss";

export const TodoList: FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItemData[]>([]);

  const onAddItemClickHandler = (addedItem: TodoItemData) => {
    setTodoItems((todoItems) => [...todoItems, addedItem]);
  };

  const onDoItClickHandler = (updatedItem: TodoItemData) => {
    setTodoItems((current) => {
      return current.map((todo) => {
        if (todo.id === updatedItem.id) return updatedItem;
        return todo;
      });
    });
  };

  return (
    <div className="TodoList">
      <TodoHeader onAddItemClick={onAddItemClickHandler} />
      <div className="item-list">
        {todoItems.length ? (
          todoItems.map((todoItem) => (
            <TodoItem
              todoItem={todoItem}
              onDoItClick={onDoItClickHandler}
              key={todoItem.id}
            />
          ))
        ) : (
          <div className="add-item-prompt">Add items to get started!</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
