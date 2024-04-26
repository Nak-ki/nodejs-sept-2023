import Joi from "joi";

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().lowercase().trim().required().max(35).min(5),
  phone: Joi.string().trim().max(30).min(4),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  age: Joi.number().min(1).max(110),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().lowercase().trim().max(35).min(5),
  phone: Joi.string().trim().max(30).min(4),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  age: Joi.number().min(1).max(110),
});

export { postSchema, updateSchema };
