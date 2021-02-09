import React from "react";
import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {

  it("should render an input field and checkbox", () => {
    render(<TodoItem />);

    const checkbox = screen.queryByTestId("todo-checkbox");
    const description = screen.queryByTestId("todo-description-input");

    expect(checkbox).toBeVisible();
    expect(description).toBeVisible();
  });

  it("should switch to read-only mode when Do-It is clicked", () => {
    render(<TodoItem />);

    const addItemButton = screen.getByText("Add Item");
    userEvent.click(addItemButton);

    const descriptionInput = screen.getByTestId("todo-description-input");
    userEvent.type(descriptionInput, "some todo item");

    const doItButton = screen.getByText("Do It!");
    userEvent.click(doItButton);

    const nullDescriptionInput = screen.queryByTestId("todo-description-input");
    expect(nullDescriptionInput).toBeNull();

    const nullDoItButton = screen.queryByText("Do It!");
    expect(nullDoItButton).toBeNull();
    
    const description = screen.getByText("some todo item");
    expect(description).toBeVisible();

  });
});
