const { celebrate, Joi, Segments } = require('celebrate');

const schemaUser = {
    [Segments.BODY]: Joi.object().keys({
        
        email: Joi.string().email().required(),
        number: Joi.string().pattern(/^\d+$/).required(),  // Corrigido para padrão numérico
        password: Joi.string().min(6).required(),
        phone: Joi.string().pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/).required(),
        whatsapp: Joi.string().pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/).required(),
        zip_code: Joi.string().pattern(/^\d{5}\-\d{3}$/).required(),
        description: Joi.string().min(30).max(1000).required(),
        site: Joi.string().uri().optional(),

        type: Joi.string().valid('client', 'company').required(),

        // Validation fields client
        first_name: Joi.when('type', {
            is: 'client',
            then: Joi.string().min(3).max(255).required(),
            otherwise: Joi.forbidden()
        }),

        last_name: Joi.when('type', {
            is: 'client',
            then: Joi.string().min(3).max(255).required(),
            otherwise: Joi.forbidden()
        }),

        date_birth: Joi.when('type', {
            is: 'client',
            then: Joi.date().max('now').required(),
            otherwise: Joi.forbidden()
        }),

        marital_status: Joi.when('type', {
            is: 'client',
            then: Joi.string().valid('single', 'married', 'divorced', 'widowed').required(),
            otherwise: Joi.forbidden()
        }),

        gender: Joi.when('type', {
            is: 'client',
            then: Joi.string().valid('female', 'male').required(),
            otherwise: Joi.forbidden()
        }),

        cpf: Joi.when('type', {
            is: 'client',
            then: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
            otherwise: Joi.forbidden()
        }),

        // Validation fields companys
        social_reason: Joi.when('type', {
            is: 'company',
            then: Joi.string().min(3).max(255).required(),
            otherwise: Joi.forbidden()
        }),

        fantasy_name: Joi.when('type', {
            is: 'company',
            then: Joi.string().min(3).max(255).required(),
            otherwise: Joi.forbidden()
        }),

        cnpj: Joi.when('type', {
            is: 'company',
            then: Joi.string().pattern(/^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/).required(),
            otherwise: Joi.forbidden()
        }),

        inscricao_estadual: Joi.when('type', {
            is: 'company',
            then: Joi.string().pattern(/^\d{9}$/).required(),
            otherwise: Joi.forbidden()
        }),

        opening_hours: Joi.when('type', {
            is: 'company',
            then: Joi.string().min(3).max(255).required(),
            otherwise: Joi.forbidden()
        }),

        reclame_aqui: Joi.when('type', {
            is: 'company',
            then: Joi.string().uri().optional(),
            otherwise: Joi.forbidden()
        }),
    }),
};

module.exports = {
    validateUser: celebrate(schemaUser),
};
