import { fireEvent, render, screen } from "@testing-library/react";
import Config from "./Config";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../store/index.js";

describe("Config component", () => {
  test("should render default info", async () => {
    // test
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Config />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/num cards/i);
    expect(element).toBeInTheDocument();
  });
  test("should handle changing num cards", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Config />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("numCards"), {
      target: { value: "60" },
    });

    // test
    fireEvent(
      screen.getByTestId("saveButton"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const element = screen.getByTestId("numCards");
    expect(element.value).toEqual("60");
  });
});
