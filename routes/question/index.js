const { Question, Admin, Contributor } = require("../../models");
const { mongoose } = require("../../config");
const { authorize, authenticate } = require("../../middlewares");
const { FORBIDDEN, BAD_REQUEST } = require("../../utils/statusCodes");
const { SERVER_ERROR, NOT_FOUND, NO_CONTENT } =
  require("../../utils").statusCodes;

const router = require("express").Router();

//TODO: add more filters
router.get("", async (req, res) => {
  const { approved } = req.query;

  if (approved == "true" || approved == "false") {
    return res.send(
      await Question.find({ approved: approved == "true" }).exec()
    );
  }

  return res.send(await Question.find({}).exec());
});

router.post("", authorize("admin"), async (req, res) => {
  const { error } = Question.validate(req.body),
    { role } = req.user;

  if (error != null) {
    return res.status(BAD_REQUEST).send(error.details[0].message);
  }

  const question = new Question(req.body);

  question.author = (await Admin.findOne({ email: req.user.email }))._id;
  question.derived = false;

  question
    .save()
    .then((saved) => res.send(saved))
    .catch((err) => res.status(SERVER_ERROR).send(err));
});

router.get("/approve/:id", authorize("admin"), async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const question = await Question.findById(id).exec();
    if (question) {
      if (question.derived) {
        question.approved = true;
        return question
          .save()
          .then(async (saved) => {
            const contributor = await Contributor.findById(
              question.author
            ).exec();
            if (contributor)
              contributor
                .save()
                .then((_) => res.send(saved))
                .catch((err) => res.status(SERVER_ERROR).send(err.message));
          })
          .catch((err) => res.status(SERVER_ERROR).send(err.message));
      }
    }
  }
  return res.status(NOT_FOUND).send("Question not found");
});

router.post("/:id", authorize("contributor"), async (req, res) => {
  const { error } = Question.validate(req.body),
    { role } = req.user;

  if (error != null) {
    return res.status(BAD_REQUEST).send(error.details[0].message);
  }

  const question = new Question(req.body);

  question.author = (await Admin.findOne({ email: req.user.email }))._id;
  question.derived = false;

  question
    .save()
    .then((saved) => res.send(saved))
    .catch((err) => res.status(SERVER_ERROR).send(err));
});

router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const question = await Question.findById(id).exec();
    if (question) {
      return res.json(question);
    }
  }
  return res.status(NOT_FOUND).send("Question not found");
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const question = await Question.findById(id).exec();
    if (question) {
      if (req.user.role != "admin") {
        const contributor = await Contributor.findById(question.author).exec();
        if (contributor.email != req.user.email)
          return res.status(FORBIDDEN).send("Access denied");
      }
      return question
        .deleteOne()
        .then((deleted) => res.status(NO_CONTENT).send())
        .catch((err) => res.status(SERVER_ERROR).send(err.message));
    }
  }

  return res.status(NOT_FOUND).send("Question not found");
});

module.exports = router;
