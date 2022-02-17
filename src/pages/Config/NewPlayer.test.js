import { fireEvent, render, screen } from "@testing-library/react";
import NewPlayer from "./NewPlayer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../store/index.js";

describe("NewPlayer component", () => {
  test("should render default info", async () => {
    // import { Provider } from "react-redux";
    // import { BrowserRouter } from "react-router-dom";
    // test
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPlayer />
        </BrowserRouter>
      </Provider>
    );

    const nameElement = screen.getByText(/name/i);
    expect(nameElement).toBeInTheDocument();

    const strategyElement = screen.getByText(/strategy/i);
    expect(strategyElement).toBeInTheDocument();
  });
});
