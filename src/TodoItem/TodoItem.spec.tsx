import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { OnDelete, OnDoIt, TodoItem, TodoItemData } from "./TodoItem";

const mockOnDoIt: OnDoIt = jest.fn();
const mockOnDelete: OnDelete = jest.fn();

describe("TodoItem", () => {
  it("renders todo item description and checkbox", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: false,
    };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByTestId("checkbox");
    const description = screen.getByText("some-description");

    expect(checkbox).toBeVisible();
    expect(description).toBeVisible();
  });

  it("renders input field and Do It button when adding or updating TodoItem", () => {
    const todoItem = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );

    const descriptionInput = screen.getByTestId(
      "description-input"
    ) as HTMLInputElement;

    const button = screen.getByText("Do It!") as HTMLButtonElement;

    const description = screen.queryByText(
      "some-description"
    ) as HTMLDivElement;

    expect(descriptionInput).toBeVisible();
    expect(descriptionInput.value).toBe("some-description");
    expect(button).toBeVisible();
    expect(description).toBeNull();
  });

  it("should call onDoIt callback when 'Do It' is clicked", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    const updatedItem = { ...todoItem, isUpdating: false };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );
    const button = screen.getByText("Do It!");
    userEvent.click(button);

    expect(mockOnDoIt).toHaveBeenCalledWith(updatedItem);
  });

  it("should switch from input mode to read-only mode when 'Do It' is clicked", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );

    let input = screen.queryByTestId("description-input");
    expect(input).toBeVisible();

    let description = screen.queryByText("some-description");
    expect(description).toBeNull();

    const doItButton = screen.getByText("Do It!");
    userEvent.click(doItButton);

    input = screen.queryByTestId("description-input");
    description = screen.queryByText("some-description");

    const editButton = screen.getByText("edit");
    const deleteButton = screen.getByText("delete");

    expect(input).toBeNull();
    expect(description).toBeVisible();
    expect(editButton).toBeVisible();
    expect(deleteButton).toBeVisible();
  });

  it("should be able to edit the should switch from read-only mode to input mode when 'edit' is clicked", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: false,
    };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );

    let description = screen.queryByText("some-description");
    let editButton = screen.queryByText("edit");
    let deleteButton = screen.queryByText("delete");
    let descriptionInput = screen.queryByTestId("description-input");

    expect(description).toBeVisible();
    expect(editButton).toBeVisible();
    expect(deleteButton).toBeVisible();
    expect(descriptionInput).toBeNull();

    const button = screen.getByText("edit");
    userEvent.click(button);

    description = screen.queryByText("some-description");
    editButton = screen.queryByText("edit");
    deleteButton = screen.queryByText("delete");
    descriptionInput = screen.queryByTestId("description-input");

    expect(description).toBeNull();
    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
    expect(descriptionInput).toBeVisible();
  });

  it("should call onDelete callback when 'delete' is clicked", () => {
    const todoItemId = Date.now();
    const todoItem: TodoItemData = {
      id: todoItemId,
      description: "some-description",
      isUpdating: false,
    };

    render(
      <TodoItem
        todoItem={todoItem}
        onDoIt={mockOnDoIt}
        onDelete={mockOnDelete}
      />
    );
    const button = screen.getByText("delete");
    userEvent.click(button);

    expect(mockOnDelete).toHaveBeenCalledWith(todoItemId);
  });
});
