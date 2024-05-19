import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ErrorPage from "./ErrorPage";
import { handleAddAnswer } from "../actions/questions";

const QuestionPage = ({ dispatch, authedUser, users, questions }) => {
  const questionId = useParams();

  const question = Object.values(questions).find(
    (question) => question.id === questionId.id
  );

  if (!question) {
    return <ErrorPage />;
  }

  const author = Object.values(users).find(
    (user) => user.id === question.author
  );

  if (!author) {
    return <ErrorPage />;
  }

  const isVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const isVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const isVoted = isVotedForOptionOne || isVotedForOptionTwo;

  const totalVote =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const calcVotePercentage = (type, question) => {
    if (type === "optionOne") {
      return (
        ((question.optionOne.votes.length / totalVote) * 100).toFixed(2) + " %"
      );
    } else {
      return (
        (question.optionTwo.votes.length / totalVote).toFixed(2) * 100 + " %"
      );
    }
  };

  const handleSubmitOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
  };

  const handleSubmitOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
  };

  return (
    <div>
      <h2 className="h-body">Poll by {author.id}</h2>
      <Image
        className="img-question-page"
        src={author.avatarURL}
        roundedCircle
      />
      <h3 className="center">Would you rather</h3>
      <Form onSubmit={handleSubmitOptionOne}>
        <Form.Group className="mb-3">
          <Form.Label>First Option</Form.Label>
          <Form.Control
            className={isVotedForOptionOne ? "optionChosen" : ""}
            type="input"
            placeholder="Enter first option"
            value={question.optionOne.text}
            disabled
          />
        </Form.Group>
        {!isVoted && (
          <Button variant="primary" type="submit">
            Chose Option 1
          </Button>
        )}

        {isVoted && (
          <Form.Group>
            <Form.Label>
              - Number of vote: {question.optionOne.votes.length}
            </Form.Label>
            <br></br>
            <Form.Label>
              - Percentage: {calcVotePercentage("optionOne", question)}
            </Form.Label>
          </Form.Group>
        )}
      </Form>
      <br></br>
      <Form onSubmit={handleSubmitOptionTwo}>
        <Form.Group className="mb-3">
          <Form.Label>Second Option</Form.Label>
          <Form.Control
            className={isVotedForOptionTwo ? "optionChosen" : ""}
            type="input"
            placeholder="Enter second option"
            value={question.optionTwo.text}
            disabled
          />
        </Form.Group>
        {!isVoted && (
          <Button variant="primary" type="submit">
            Chose Option 2
          </Button>
        )}

        {isVoted && (
          <Form.Group>
            <Form.Label>
              - Number of vote: {question.optionTwo.votes.length}
            </Form.Label>
            <br></br>
            <Form.Label>
              - Percentage: {calcVotePercentage("optionTwo", question)}
            </Form.Label>
          </Form.Group>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    users,
    questions,
  };
};

export default connect(mapStateToProps)(QuestionPage);
