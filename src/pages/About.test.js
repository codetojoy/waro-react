import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "./About";

describe("About page", () => {
  test("has text about the rules", () => {
    // test
    render(<About />);

    const element = screen.getByText(/deck of N cards with no suits/i);
    expect(element).toBeInTheDocument();
  });
});
