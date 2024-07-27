import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Login from "./login";

jest.useFakeTimers();

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("@firebase/auth", () => ({
  ...jest.requireActual("@firebase/auth"),
  getReactNativePersistence: () => console.debug("Initialized persistence ..."),
}));

describe("Login screen", () => {
  test("renders email input on the login screen", async () => {
    const { getByPlaceholderText } = render(<Login />);
    await waitFor(() => {
      expect(getByPlaceholderText("Email")).toBeTruthy();
    });
  });

  test("renders password input on the login screen", async () => {
    const { getByPlaceholderText } = render(<Login />);
    await waitFor(() => {
      expect(getByPlaceholderText("Password")).toBeTruthy();
    });
  });

  test("renders sign in button on the login screen", async () => {
    const { getByText } = render(<Login />);
    await waitFor(() => {
      expect(getByText("Sign In")).toBeTruthy();
    });
  });


});

