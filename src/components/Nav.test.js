/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from "../middleware";
import reducers from "../reducers";
import { BrowserRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

const store = createStore(reducers, middleware);

describe("Nav", () => {
  it("check display nav bar", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    const navView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(navView).toBeDefined();
    expect(navView).toMatchSnapshot();
  });

  it("check display new question view after click New", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    const navView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );

    const newNavLinkElement = navView.getByTestId("newNavLink");
    fireEvent.click(newNavLinkElement);

    const newQuestionView = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );

    expect(newQuestionView).toBeDefined();
    expect(newQuestionView).toMatchSnapshot();
  });

  it("check display LeaderBoard view after click LeaderBoard", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    const navView = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );

    const newNavLinkElement = navView.getByTestId("newNavLink");
    fireEvent.click(newNavLinkElement);

    const leaderBoardView = render(
      <Provider store={store}>
        <BrowserRouter>
          <LeaderBoard />
        </BrowserRouter>
      </Provider>
    );

    expect(leaderBoardView).toBeDefined();
    expect(leaderBoardView).toMatchSnapshot();
  });
});
