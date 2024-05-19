const { _saveQuestionAnswer } = require("./_DATA");
const { _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
  it("should return true for correct parameters", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: { id: "sarahedo" },
    };
    const response = await _saveQuestion(question);

    expect(response).toBeTruthy();
  });

  it("should return error for false parameters", async () => {
    const question = {
      optionOneText: undefined,
      optionTwoText: "Option Two",
      author: { id: "tylermcginnis" },
    };

    const response = await _saveQuestion(question).catch((e) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("should return error for false parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
