const knex = require('../config/connection');

class User {
    async register(social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password) {
        try {
            //TODO Cripitografar senha do usuário para salvar no banco de dados
            await knex.insert({
                social_reason,
                fantasy_name,
                CNPJ,
                email,
                creci,
                first_name,
                last_name,
                date_birth,
                gender,
                marital_status,
                phone,
                profession,
                whatsapp,
                facebook,
                instagran,
                linkedin,
                reclame_aqui,
                site,
                zip_code,
                street,
                number,
                complement,
                neighborhood,
                city,
                state,
                opening_hours,
                description,
                logo,
                password,
                status: 'registered'
            }).table('users');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();