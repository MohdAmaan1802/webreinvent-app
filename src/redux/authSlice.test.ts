import authReducer, { login, logout } from "./authSlice";

describe("authSlice", () => {
  const initialState = { isAuthenticated: false, token: null };

  it("should handle login", () => {
    const token = "fake-token";
    const action = { type: login.type, payload: token };
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe(token);
  });

  it("should handle logout", () => {
    const loggedInState = { isAuthenticated: true, token: "fake-token" };
    const action = { type: logout.type };
    const state = authReducer(loggedInState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBe(null);
  });
});
