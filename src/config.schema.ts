import Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  APP_PORT: Joi.number().default(3000).required(),
  JWT_SECRET: Joi.string().required(),
});
