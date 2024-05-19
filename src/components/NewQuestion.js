import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewQuestion = ({ dispatch }) => {
  //   const navigate = useNavigate();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleChangeOptionOneText = (e) => {
    const text = e.target.value;
    setOptionOneText(text);
  };

  const handleChangeOptionTwoText = (e) => {
    const text = e.target.value;
    setOptionTwoText(text);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    setOptionOneText("");
    setOptionTwoText("");
  };

  return (
    <div>
      <h2 className="h-body">Create your own poll</h2>
      <h3 className="center">Would you rather</h3>
      <Form onSubmit={handleSubmitQuestion}>
        <Form.Group className="mb-3">
          <Form.Label>First Option</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter first option"
            value={optionOneText}
            onChange={handleChangeOptionOneText}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Second Option</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter second option"
            value={optionTwoText}
            onChange={handleChangeOptionTwoText}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={optionOneText === "" || optionTwoText === ""}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default connect()(NewQuestion);
