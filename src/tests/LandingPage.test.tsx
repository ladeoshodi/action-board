import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import LandingPage from "../components/landing-page/LandingPage";

describe("Landing Page", () => {
  it("renders login form", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login")).toBeTruthy();
  });

  it("renders registration form", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText("Don't have an account? Click to Register")
    );

    expect(screen.findAllByText("Register")).toBeTruthy();
  });
});
