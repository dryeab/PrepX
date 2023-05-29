const { authorize } = require("../../middlewares");
const { Subject } = require("../../models");
const {
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  CREATED,
  NO_CONTENT,
} = require("../../utils");

const router = require("express").Router();

router
  .route("/subjects")

  .get(async (req, res) => {
    res.send(await Subject.find().exec());
  })

  .post(authorize("superadmin"), async (req, res) => {
    const { error } = Subject.validate(req.body);
    if (error) {
      return res.status(BAD_REQUEST).send(error.details[0].message);
    }

    if (await Subject.findOne({ code: req.body.code })) {
      return res.status(BAD_REQUEST).send("Subject code already exists");
    }

    if (await Subject.findOne({ name: req.body.name.toUpperCase() })) {
      return res.status(BAD_REQUEST).send("Subject name already exists");
    }

    Subject.create(req.body)
      .then((subject) => res.status(CREATED).send(subject))
      .catch((err) => res.status(SERVER_ERROR).send(err));
  });

router
  .route("/subjects/:code")

  .get(async (req, res) => {
    const subject = await Subject.findOne({ code: req.params.code }).exec();
    if (subject) {
      res.json(subject);
    } else {
      res.sendStatus(NOT_FOUND);
    }
  })

  .delete(authorize("superadmin"), async (req, res) => {
    const result = await Subject.deleteOne({ code: req.params.code });
    if (result.deletedCount === 1) {
      res.sendStatus(NO_CONTENT);
    } else {
      res.status(NOT_FOUND).send("Subject not found");
    }
  });

module.exports = router;
