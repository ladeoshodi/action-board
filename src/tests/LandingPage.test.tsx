import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import jest from "jest-mock";

import LandingPage from "../components/landing-page/LandingPage";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
};

describe("RegisterForm Component", () => {
  const handleRegistrationMock = jest.fn();
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

describe("LoginForm Component", () => {
  const handleLoginMock = jest.fn();
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
