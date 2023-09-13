import Joi from 'joi';

// user create request body validator
const schema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().optional(),
  phone: Joi.string()
    .pattern(new RegExp('^(?:\\+88|88)?(01[3-9]\\d{8})$'))
    .optional(),
  email: Joi.string()
    .pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$'))
    .required(),
  password: Joi.string().required(),
  profession: Joi.string().optional(),
  favoriteColor: Joi.string().optional(),
  role: Joi.string().optional(),
});

const validate = (value) => {
  return schema.validate(value);
};

export default validate;
