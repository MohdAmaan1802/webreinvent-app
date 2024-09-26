import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { login, register } from "./api";

describe("API Service", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("should login successfully with valid credentials", async () => {
    const email = "test@example.com";
    const password = "password123";
    const token = "fake-token";

    mock.onPost("https://reqres.in/api/login").reply(200, { token });

    const response = await login(email, password);
    expect(response.data.token).toBe(token);
  });

  // it("should throw an error with invalid credentials", async () => {
  //   const email = "invalid@example.com";
  //   const password = "wrongpassword";

  //   mock.onPost("https://reqres.in/api/login").reply(400, {
  //     error: "Invalid credentials",
  //   });

  //   try {
  //     await login(email, password);
  //   } catch (error) {
  //     expect(error.message).toBe("Login failed");
  //   }
  // });
  it("should throw an error with invalid credentials", async () => {
    const email = "invalid@example.com";
    const password = "wrongpassword";
    mock.onPost("https://reqres.in/api/login").reply(400, {
      error: "Invalid credentials",
    });

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Login failed");
      }
    }
  });

  it("should register a user successfully", async () => {
    const email = "newuser@example.com";
    const password = "password123";
    const token = "fake-register-token";

    mock.onPost("https://reqres.in/api/register").reply(200, { token });

    const response = await register(email, password);
    expect(response.data.token).toBe(token);
  });
});
