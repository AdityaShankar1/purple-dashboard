// import { celebrate, Joi, Segments } from "celebrate";

// export const validate = (schema) => celebrate(schema, { abortEarly: false });

// export const schemas = {
//   register: {
//     [Segments.BODY]: Joi.object({
//       name: Joi.string().max(120).required(),
//       email: Joi.string().email().required(),
//       password: Joi.string().min(8).required(),
//     }),
//   },
//   login: {
//     [Segments.BODY]: Joi.object({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     }),
//   },
//   courseCreate: {
//     [Segments.BODY]: Joi.object({
//       title: Joi.string().required(),
//       description: Joi.string().allow(""),
//       category: Joi.string().allow(""),
//       level: Joi.string().valid("beginner", "intermediate", "advanced"),
//       published: Joi.boolean(),
//       modules: Joi.array().items(Joi.object({
//         title: Joi.string().required(),
//         durationMins: Joi.number().min(0).default(0),
//         order: Joi.number().min(0).default(0)
//       })).default([]),
//     }),
//   },
//   enrollment: {
//     [Segments.BODY]: Joi.object({
//       courseId: Joi.string().length(24).required(),
//     }),
//   },
//   progress: {
//     [Segments.BODY]: Joi.object({
//       courseId: Joi.string().length(24).required(),
//       moduleOrder: Joi.number().min(0).required(),
//     }),
//   },
// };



// /server/src/middleware/validate


import { celebrate, Joi, Segments } from "celebrate";

export const validate = (schema) => celebrate(schema, { abortEarly: false });

export const schemas = {
  register: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().max(120).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
          "any.required": "Confirm password is required",
        }),
      role: Joi.string().valid("user", "admin").default("user"),
    }),
  },

  login: {
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },

  forgotPassword: {
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
    }),
  },

  resetPassword: {
    [Segments.BODY]: Joi.object({
      password: Joi.string().min(6).required(),
    }),
  },

  updateProfile: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(50),
      email: Joi.string().email(),
    }),
  },
};
