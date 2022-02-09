import { fireEvent, render, screen } from "@testing-library/react";
import PlayerConfig from "./PlayerConfig";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../store/index.js";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    playerName: "Mozart",
  }),
  useRouteMatch: () => ({ url: `/config/player/Mozart` }),
}));

describe("PlayerConfig component", () => {
  test("should render default strategy", async () => {
    // test
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlayerConfig />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByText(/next card/i);
    expect(element).toBeInTheDocument();
  });
  test("should handle changing player strategy", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlayerConfig />
        </BrowserRouter>
      </Provider>
    );

    // test
    fireEvent.change(screen.getByTestId("strategySelect"), {
      target: { value: "Min Card" },
    });

    const element = screen.getByText(/min card/i);
    expect(element).toBeInTheDocument();
  });
});
