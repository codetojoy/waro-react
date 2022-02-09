import { render, screen } from "@testing-library/react";
import Sandbox1 from "./Sandbox1";

// thank you:
// https://github.com/tomalexhughes/testing-react-router-hooks/blob/master/src/Old.test.js

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    playerName: "Mozart",
  }),
}));

describe("Sandbox1 component", () => {
  test("should handle playerName", () => {
    // test
    render(<Sandbox1 />);

    const element = screen.getByText(/mozart/i);
    expect(element).toBeInTheDocument();
  });
});
