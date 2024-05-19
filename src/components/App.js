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
      <NavBar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route element={<PrivateWrap />}>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/new" exact element={<NewQuestion />} />
          <Route path="/leader-board" exact element={<LeaderBoard />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default connect()(App);
