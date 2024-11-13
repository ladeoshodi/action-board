import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import Board from "../components/board/Board";

beforeAll(() => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useOutletContext: () => ({
        user: {
          username: "Test User",
          lists: [{ id: 1, name: "List 1" }],
          tasks: [
            {
              id: 1,
              name: "Task 1",
              task_list: { id: 1, name: "List 1" },
              tags: [{ id: 1, name: "Tag 1" }],
            },
          ],
          tags: [{ id: 1, name: "Tag 1" }],
        },
      }),
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe("Home Page", () => {
  it("renders app component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("renders the board component", () => {
    render(<Board />);
    expect(screen.getByText("Main Board")).toBeInTheDocument();
  });

  it("renders the task list", () => {
    render(<Board />);
    expect(screen.getByText("List 1")).toBeInTheDocument();
  });

  it("renders tasks", () => {
    render(<Board />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<Board />);
    expect(screen.getAllByText("Tag 1")).toBeTruthy();
  });

  it("creates new task list", () => {
    const handleSubmit = vi.fn();

    render(<Board />);
    fireEvent.click(screen.getByText("Add new list +"));
    fireEvent.change(screen.getAllByPlaceholderText("Name")[0], {
      target: { value: "New List" },
    });

    const submitForm = screen.getAllByRole("form", { name: "submit-form" })[0];

    submitForm.onsubmit = handleSubmit;

    fireEvent.submit(submitForm);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
