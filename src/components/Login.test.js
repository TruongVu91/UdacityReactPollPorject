/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from "../middleware";
import reducers from "../reducers";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";

const store = createStore(reducers, middleware);

describe("Login", () => {
  it("check login screen display", () => {
    const loginView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(loginView).toBeDefined();
    expect(loginView).toMatchSnapshot();
  });

  it("check login element display", async () => {
    await store.dispatch(handleInitialData());
    const loginView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const loginTitleElement = loginView.getByTestId("loginTitle");
    const usernIdInputElement = loginView.getByTestId("userid");
    const passwordInputElement = loginView.getByTestId("password");
    const loginButtonElement = loginView.getByTestId("loginButton");
    expect(loginTitleElement).toBeInTheDocument();
    expect(usernIdInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(loginButtonElement).toBeInTheDocument();
  });

  it("check dashboard display after login", async () => {
    await store.dispatch(handleInitialData());

    const loginView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const dashboardView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const loginButtonElement = loginView.getByTestId("loginButton");
    const userSelectElement = loginView.getByTestId("userSelect");

    fireEvent.change(userSelectElement, { target: { value: "Sarah Edo" } });

    fireEvent.click(loginButtonElement);

    expect(dashboardView).toBeDefined();
    expect(dashboardView).toMatchSnapshot();
  });
});
