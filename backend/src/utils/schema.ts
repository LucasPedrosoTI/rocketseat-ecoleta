import { Joi } from "celebrate";

const pontoSchema = Joi.object().keys({
  nome: Joi.string().required(),
  email: Joi.string().required().email(),
  whatsapp: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  cidade: Joi.string().required(),
  uf: Joi.string().required().max(2),
  items: Joi.string().required(),
});

export default pontoSchema;
