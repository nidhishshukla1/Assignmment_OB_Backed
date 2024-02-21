const Joi = require('joi');

const validateTodo = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().max(255).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = { validateTodo };
