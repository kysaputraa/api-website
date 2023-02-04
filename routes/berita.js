var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Berita } = require("../models");

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

  // res.send("ok");
  const berita = await Berita.create(req.body);
  res.json(berita);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let berita = await Berita.findByPk(id);
  const schema = {
    title: "string|optional",
    desc: "string|optional",
  };
  const validate = v.validate(req.body, schema);

  if (!berita) {
    return res.json({ message: "id not found !" });
  }

  if (validate.length) {
    return res.status(400).json(validate);
  }

  berita = await berita.update(req.body);

  res.json(req.body.title);
});

router.get("/", async (req, res) => {
  const berita = await Berita.findAll();

  if (!berita) {
    return res.json({ message: "id not found !" });
  }

  res.json(berita);
});

module.exports = router;
