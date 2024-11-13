import { afterEach, describe, expect, it, vi, Mock } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import LandingPage from "../components/landing-page/LandingPage";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
};

describe("RegisterForm", () => {
  const handleRegistrationMock = vi.fn();
  it("renders registration form", () => {
    renderComponent();
    fireEvent.click(
      screen.getByText("Don't have an account? Click to Register")
    );

    expect(screen.findAllByText("Register")).toBeTruthy();
  });

  it("does not submit empty registration form", () => {
    renderComponent();
    fireEvent.click(
      screen.getByText("Don't have an account? Click to Register")
    );

    screen.getByRole("form", { name: "register-form" }).onsubmit =
      handleRegistrationMock;

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(handleRegistrationMock).not.toHaveBeenCalled();
  });

  it("submit register form", () => {
    renderComponent();
    fireEvent.click(
      screen.getByText("Don't have an account? Click to Register")
    );

    screen.getByRole("form", { name: "register-form" }).onsubmit =
      handleRegistrationMock;

    // fill in the form
    fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
      target: {
        value: "testuser",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: {
        value: "testuser@email.com",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter First Name"), {
      target: {
        value: "test",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Last Name"), {
      target: {
        value: "user",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: {
        value: "fakepassword",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: {
        value: "fakepassword",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(handleRegistrationMock).toHaveBeenCalled();
  });
});

describe("LoginForm", () => {
  const handleLoginMock = vi.fn();
  it("renders login form", () => {
    renderComponent();
    expect(screen.getAllByText("Login")).toBeTruthy();
  });

  it("does not submit empty login form", () => {
    renderComponent();
    screen.getByRole("form", { name: "login-form" }).onsubmit = handleLoginMock;

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(handleLoginMock).not.toHaveBeenCalled();
  });

  it("submits login form", () => {
    renderComponent();
    screen.getByRole("form", { name: "login-form" }).onsubmit = handleLoginMock;

    // fill in the form
    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: {
        value: "testuser@email.com",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: {
        value: "fakepassword",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(handleLoginMock).toHaveBeenCalled();
  });
});

describe("LandingPage Component", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: vi.fn(),
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Redirects logged in users", () => {
    const getItemMock = vi
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue("faketoken");

    const useNavigateMock = useNavigate as Mock;
    useNavigateMock.mockReturnValue(() => {});

    renderComponent();

    expect(getItemMock).toHaveBeenCalled();
    expect(useNavigateMock).toHaveBeenCalled();
  });
});
