import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import { Navigate } from "react-router-dom";

const Dashboard = (props) => {
  const { authedUser, questions, users, isLogin } = props;

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
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
  isLogin: !!authedUser,
});

export default connect(mapStateToProps)(Dashboard);
