const { Question } = require("../../models");

const router = require("express").Router();

router.get("/questions", async (req, res) => {
  const { approved } = req.query;

  if (approved == "true" || approved == "false") {
    return res.send(
      await Question.find({ approved: approved == "true" }).exec()
    );
  }

  return res.send(await Question.find({}).exec());
});

router.post("/questions", async (req, res) => {
  
  const { err } = Question.validate(req.body);

  if (err != null) {
    res.send(err);
  } else {
    res.send("created");
  }
});

router.put("/questions", async (req, res) => {
  res.send(await Question.find({}).exec());
});

router.delete("/questions", async (req, res) => {
  res.send(await Question.find({}).exec());
});

module.exports = router;
