import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("should render TodoList", () => {
    //Arrange

    //Act
    render(<TodoList />);

    // Assert
    const title = screen.getByText("Git 'Er Done App");
    const prompt = screen.getByText("Add items to get started!");

    expect(title).toBeVisible();
    expect(prompt).toBeVisible();
  });

  it("should render TodoItem component with input field when Add Item is clicked", () => {
    render(<TodoList />);

    const addButton = screen.getByText("Add Item");
    userEvent.click(addButton);

    const todoItem = screen.getByTestId("description-input");
    expect(todoItem).toBeVisible();
  });

  it("should render TodoItem description (no input) when Do It is clicked", () => {
    render(<TodoList />);

    const addButton = screen.getByText("Add Item");
    userEvent.click(addButton);

    const descriptionInput = screen.getByTestId("description-input");
    userEvent.type(descriptionInput, "some-description");

    const doItButton = screen.getByText("Do It!");
    userEvent.click(doItButton);

    const todoItem = screen.getByText("some-description");
    expect(todoItem).toBeVisible();
  });

  it("should be able to add multiple todo items", () => {
    render(<TodoList />);

    const addButton = screen.getByText("Add Item");
    userEvent.click(addButton);

    const descriptionInput = screen.getByTestId("description-input");
    userEvent.type(descriptionInput, "some-description");

    const doItButton = screen.getByText("Do It!");
    userEvent.click(doItButton);

    let todoItem = screen.getByText("some-description");
    expect(todoItem).toBeVisible();

    userEvent.click(addButton);

    const descriptionInput2 = screen.getByTestId("description-input");
    userEvent.type(descriptionInput2, "some-description2");

    const doItButton2 = screen.getByText("Do It!");
    userEvent.click(doItButton2);

    todoItem = screen.getByText("some-description");
    expect(todoItem).toBeVisible();

    const todoItem2 = screen.getByText("some-description2");
    expect(todoItem2).toBeVisible();
  });

  it("should be able to delete a TodoItem when Delete is clicked", () => {
    render(<TodoList />);

    const addButton = screen.getByText("Add Item");
    userEvent.click(addButton);

    const descriptionInput = screen.getByTestId("description-input");
    userEvent.type(descriptionInput, "some-description");

    const doItButton = screen.getByText("Do It!");
    userEvent.click(doItButton);

    let todoItem = screen.queryByText("some-description");
    expect(todoItem).toBeVisible();

    const deleteButton = screen.getByText("delete");
    userEvent.click(deleteButton);

    todoItem = screen.queryByText("some-description");
    expect(todoItem).toBeNull();
  });
});
