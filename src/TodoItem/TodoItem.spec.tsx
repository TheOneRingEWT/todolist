import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { OnDoItClick, TodoItem, TodoItemData } from "./TodoItem";

const mockOnDoItClick: OnDoItClick = jest.fn();

describe("TodoItem", () => {
  it("renders todo item description and checkbox", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: false,
    };

    render(<TodoItem todoItem={todoItem} onDoItClick={mockOnDoItClick} />);

    const checkbox = screen.getByTestId("checkbox");
    const description = screen.getByText("some-description");

    expect(checkbox).toBeVisible();
    expect(description).toBeVisible();
  });

  it("renders input fields when isUpdating is true", () => {
    const todoItem = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    render(<TodoItem todoItem={todoItem} onDoItClick={mockOnDoItClick} />);

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

  it("should be able to update the description when isUpdating is true", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    render(<TodoItem todoItem={todoItem} onDoItClick={mockOnDoItClick} />);

    let description = screen.getByTestId("description-input") as HTMLInputElement;
    expect(description.value).toBe("some-description");

    userEvent.type(description, "{selectall}{del}some-new-description");

    description = screen.getByTestId("description-input") as HTMLInputElement;
    expect(description.value).toBe("some-new-description");
  });

  it("should change isUpdating from true to false when 'Do It' is clicked", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: true,
    };

    const updatedItem: TodoItemData = { ...todoItem, isUpdating: false };

    render(<TodoItem todoItem={todoItem} onDoItClick={mockOnDoItClick} />);

    const button = screen.getByText("Do It!");
    userEvent.click(button);

    expect(mockOnDoItClick).toHaveBeenCalledWith(updatedItem);
  });

  it("should be able to edit the description when 'edit' is clicked", () => {
    const todoItem: TodoItemData = {
      id: Date.now(),
      description: "some-description",
      isUpdating: false,
    };

    render(<TodoItem todoItem={todoItem} onDoItClick={mockOnDoItClick} />);

    let description = screen.queryByText("some-description");
    let descriptionInput = screen.queryByTestId("description-input");

    expect(description).toBeVisible();
    expect(descriptionInput).toBeNull();

    const button = screen.getByText("edit");
    userEvent.click(button);

    description = screen.queryByText("some-description");
    descriptionInput = screen.queryByTestId("description-input");

    expect(description).toBeNull();
    expect(descriptionInput).toBeVisible();
  });
});
