import * as Joi from 'joi';

export const configEnvValidation = Joi.object({
  GATEWAY_PORT: Joi.number().default(3000).required(),

  MRC_RMQ_ENABLED: Joi.boolean().required(),
  MRC_RMQ_URL: Joi.string().required(),
  MRC_RMQ_USERS_QUEUE: Joi.string().required(),

  USERS_DB_PORT: Joi.number().default(3306).required(),
  USERS_DB_HOST: Joi.string().default('localhost').required(),
  USERS_DB_USER: Joi.string().default('root').required(),
  USERS_DB_PASSWORD: Joi.string().default('').required(),
  USERS_DB_NAME: Joi.string().required(),
});
