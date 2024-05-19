import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerUser, addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  console.log("optionOneText", optionOneText);
  console.log("optionTwoText", optionTwoText);
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(question));
    });
  };
}

export function handleAddAnswer(questionId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser: authedUser.id,
      qid: questionId,
      answer,
    }).then(() => {
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerUser(authedUser.id, questionId, answer));
    });
  };
}
