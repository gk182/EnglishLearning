import Joi from "joi";

export const lessonValidation = Joi.object({
  topic: Joi.string().required(),
  title: Joi.string().required(),
  scripts: Joi.array().items(
    Joi.object({
      audioUrl: Joi.string().uri(),
      public_id: Joi.string(),
      text: Joi.string().required(),
    })
  ).required(),
});
