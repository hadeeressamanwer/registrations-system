const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../modules/user');

router.post('/', async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Wrong Email or password!');

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send('Wrong Email or password!');
  const token = await user.generateToken();
  res.send(token);
});
function userValidation(data) {
    const schema = {
      email: Joi.string()
        .email()
        .min(3)
        .required(),
      password: Joi.string()
        .required()
        .min(8)
    };
    return Joi.validate(data, schema);
  }

module.exports = router;