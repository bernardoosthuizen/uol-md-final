import React from "react";
import { render } from "@testing-library/react-native";
import Home from "./home";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Home screen", () => {
  // test("renders the home screen", () => {
  //   const { getByText } = render(<Home />);
  //   const homeScreen = getByText("FEEDER");
  //   expect(homeScreen).toBeTruthy();
  // });

  test("renders search bar on the home screen", () => {
    const { getByPlaceholderText } = render(<Home />);
    const search = getByPlaceholderText("Enter ingredients");
    expect(search).toBeTruthy();
  });

  test("renders a button on the home screen", () => {
    const { getByText } = render(<Home />);
    const button = getByText("Feed Me!");
    expect(button).toBeTruthy();
  });

});

