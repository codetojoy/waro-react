import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "./About";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/index.js";

describe("About page", () => {
  test("has text about the rules", () => {
    // import { Provider } from "react-redux";
    // import { BrowserRouter } from "react-router-dom";
    // import { store } from "../store/index.js";
    // test
    render(
      <Provider store={store}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/deck of N cards with no suits/i);
    expect(element).toBeInTheDocument();
  });
});
