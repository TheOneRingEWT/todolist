import React, { FC, useState } from "react";
import { TodoHeader } from "./TodoHeader/TodoHeader";
import { TodoItem, TodoItemData } from "./TodoItem/TodoItem";
import "./TodoList.scss";

export const TodoList: FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItemData[]>([]);

  const onAddItemHandler = (addedItem: TodoItemData) => {
    setTodoItems((todoItems) => [...todoItems, addedItem]);
  };

  const onDoItHandler = (updatedItem: TodoItemData) => {
    setTodoItems((current) => {
      return current.map((todo) => {
        if (todo.id === updatedItem.id) return updatedItem;
        return todo;
      });
    });
  };

  const onDeleteHandler = (deletedItemId: number) => {
    setTodoItems((current) => {
      return current.filter((todo) => todo.id !== deletedItemId);
    });
  };

  return (
    <div className="TodoList">
      <TodoHeader onAddItem={onAddItemHandler} />
      <div className="item-list">
        {todoItems.length ? (
          todoItems.map((todoItem) => (
            <TodoItem
              todoItem={todoItem}
              onDoIt={onDoItHandler}
              onDelete={onDeleteHandler}
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
