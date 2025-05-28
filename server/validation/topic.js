import Joi from "joi";

export const topicValidation = Joi.object({
  title: Joi.string().required(),
  levels: Joi.string().required(),
  lessons: Joi.number().required(),
  type: Joi.string().valid('audio', 'video').required(),
  img: Joi.string().uri().required()
});

