import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
//import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App page", () => {
  test("has confgiration in navigation", () => {
    // test
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const element = screen.getByText(/config/i);
    expect(element).toBeInTheDocument();
  });
});
