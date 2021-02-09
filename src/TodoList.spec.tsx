import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  it("should render the title, Add Item button and Add Items message", () => {
    render(<TodoList />);

    const title = screen.getByText("Git 'Er Done");
    const addItemButton = screen.getByText("Add Item");
    const message = screen.getByText("Add Items to Get Started!");

    expect(title).toBeVisible();
    expect(addItemButton).toBeVisible();
    expect(message).toBeVisible();
  });

  it("should render an input field and checkbox when Add Item is clicked", () => {
    render(<TodoList />);

    let checkbox = screen.queryByTestId("todo-checkbox");
    let description = screen.queryByTestId("todo-description-input");

    expect(checkbox).toBeNull();
    expect(description).toBeNull();

    const addItemButton = screen.getByText("Add Item");
    userEvent.click(addItemButton);

    checkbox = screen.queryByTestId("todo-checkbox");
    description = screen.queryByTestId("todo-description-input");
    const message = screen.queryByText("Add Items to Get Started!");

    expect(checkbox).toBeVisible();
    expect(description).toBeVisible();
    expect(message).toBeNull();
  });

  it("should be able to add new input fields and checkboxes for every Add Item clicked", () => {
    render(<TodoList />);

    const addItemButton = screen.getByText("Add Item");
    userEvent.click(addItemButton);
    userEvent.click(addItemButton);

    const checkboxList = screen.queryAllByTestId("todo-checkbox");
    const descriptionList = screen.queryAllByTestId("todo-description-input");

    expect(checkboxList).toHaveLength(2);
    expect(descriptionList).toHaveLength(2);
  });
});
