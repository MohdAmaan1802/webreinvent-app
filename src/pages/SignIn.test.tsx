import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { login as loginApi } from "../services/api";
import SignIn from "./SignIn";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

jest.mock("../services/api");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignIn Component", () => {
  const mockLoginApi = loginApi as jest.Mock;
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    mockLoginApi.mockClear();
    mockNavigate.mockClear();
  });

  it("should render SignIn form", () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("should handle login and redirect to dashboard on success", async () => {
    mockLoginApi.mockResolvedValue({ data: { token: "fake-token" } });

    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign In"));

    await act(async () => {
      await mockLoginApi();
    });

    expect(mockLoginApi).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("should show error on invalid login", async () => {
    mockLoginApi.mockRejectedValue(new Error("Login failed"));

    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Sign In"));

    await act(async () => {
      try {
        await mockLoginApi();
      } catch {}
    });

    expect(screen.getByText("Login failed")).toBeInTheDocument();
  });
});
