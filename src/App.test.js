import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

describe("App page", () => {
  test("has confgiration in navigation", () => {
    // test
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/config/i);
    expect(element).toBeInTheDocument();
  });
});
