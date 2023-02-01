var express = require("express");
const Validator = require("fastest-validator");
var router = express.Router();

const v = new Validator();

router.post("/", async (req, res) => {
  //   res.send("Berhasil");
  const schema = {
    title: "string",
    desc: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  res.send("ok");
});

module.exports = router;
