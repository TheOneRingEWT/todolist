import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TodoHeader } from "./TodoHeader";

const onAddItemClick = jest.fn();

describe("TodoHeader", () => {
  it("should render TodoHeader", () => {
    render(<TodoHeader onAddItem={onAddItemClick} />);

    const header = screen.getByText("Git 'Er Done App");
    const button = screen.getByText("Add Item");

    expect(header).toBeVisible();
    expect(button).toBeVisible();
  });

  it("should return a new TodoItemData object when 'Add Item' is clicked", () => {
    render(<TodoHeader onAddItem={onAddItemClick} />);

    const button = screen.getByText("Add Item") as HTMLButtonElement;
    userEvent.click(button);

    const newItem = {
      id: expect.any(Number),
      description: "",
      isUpdating: true,
    };

    expect(onAddItemClick).toHaveBeenCalledWith(newItem);
  });
});
