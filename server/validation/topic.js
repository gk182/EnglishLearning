import Joi from "joi";

export const topicValidation = Joi.object({
  title: Joi.string().required(),
  levels: Joi.string().required(),
  imgUrl: Joi.string().uri(),
  public_id: Joi.string(),
});

