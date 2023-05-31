const { Question } = require("../../models");
const { SERVER_ERROR, NOT_FOUND, NO_CONTENT } =
  require("../../utils").statusCodes;

const router = require("express").Router();

router.get("", async (req, res) => {
  const { approved } = req.query;

  if (approved == "true" || approved == "false") {
    return res.send(
      await Question.find({ approved: approved == "true" }).exec()
    );
  }

  return res.send(await Question.find({}).exec());
});

router.post("", async (req, res) => {
  const { error } = Question.validate(req.body);

  if (error != null) {
    return res.send(error.details[0].message);
  }

  const question = new Question(req.body);
  question
    .save()
    .then((saved) => res.send(saved))
    .catch((err) => res.status(SERVER_ERROR).send(err));
});

router.put("", async (req, res) => {
  res.send(await Question.find({}).exec());
});

router.delete("/:id", async (req, res) => {
  Question.findOneAndDelete({ _id: req.params.id })
    .then((deleted) => {
      if (deleted == null) {
        res.status(NOT_FOUND).send("Question not found");
      } else {
        res.status(NO_CONTENT).send();
      }
    })
    .catch((err) => res.status(SERVER_ERROR).send("Server error"));
});

module.exports = router;
