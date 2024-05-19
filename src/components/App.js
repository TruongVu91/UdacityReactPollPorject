import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import PrivateWrap from "./PrivateWrap";
import ErrorPage from "./ErrorPage";
import QuestionPage from "./QuestionPage";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div className="container">
      {props.loggedIn && <NavBar />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          exact
          element={
            <PrivateWrap>
              <Dashboard />
            </PrivateWrap>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <PrivateWrap>
              <NewQuestion />
            </PrivateWrap>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateWrap>
              <LeaderBoard />
            </PrivateWrap>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateWrap>
              <QuestionPage />
            </PrivateWrap>
          }
        />
        <Route path="/404" exact element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
