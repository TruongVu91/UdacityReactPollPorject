import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/Card";

const QuestionCard = ({ question, author }) => {
  return (
    <Link to={"questions/" + question.id}>
      <CardGroup>
        <Card style={{ width: "14rem" }}>
          <Card.Img variant="top" src={author.avatarURL} />
          <Card.Body>
            <Card.Title>{question.author}</Card.Title>
            <Card.Text>{new Date(question.timestamp).toDateString()}</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Link>
  );
};

export default connect()(QuestionCard);
