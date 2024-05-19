import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import { Navigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/ToggleButton";
import { useState } from "react";

const Dashboard = (props) => {
  const { authedUser, questions, users, isLogin } = props;
  const [isShowNewQuestion, setIsShowNewQuestion] = useState(0);

  if (!isLogin) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/login"} />;
  }

  const newQuestions = Object.values(questions).filter((question) => {
    return (
      !question.optionOne.votes.includes(authedUser.id) &&
      !question.optionTwo.votes.includes(authedUser.id)
    );
  });

  const doneQuestions = Object.values(questions).filter((question) => {
    return (
      question.optionOne.votes.includes(authedUser.id) ||
      question.optionTwo.votes.includes(authedUser.id)
    );
  });

  console.log("newQuestions", questions);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <ButtonGroup name="options">
          <Button
            variant={isShowNewQuestion === 0 ? "primary" : "secondary"}
            onClick={() => setIsShowNewQuestion(0)}
          >
            New Question
          </Button>
          <Button
            variant={isShowNewQuestion !== 0 ? "primary" : "secondary"}
            onClick={() => setIsShowNewQuestion(1)}
          >
            Done
          </Button>
        </ButtonGroup>
      </div>
      {isShowNewQuestion === 0 ? (
        <div>
          <h3 className="h-body">New Questions</h3>
          <div className="card-holder">
            {newQuestions.map((question) => {
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  author={users[question.author]}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="h-body">Done</h3>
          <div className="card-holder">
            {doneQuestions.map((question) => {
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  author={users[question.author]}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
  isLogin: !!authedUser,
});

export default connect(mapStateToProps)(Dashboard);
