const User = require('../models/User');

class UserService {
    async create(data) {
        const { social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password } = data;

        const formattedDateBirth = date_birth ? date_birth : null;
        try {
            //TODO Verificar se o e-mail já esta cadastrado
            const userId = await User.register( social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, formattedDateBirth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password );
            return { success: true, message: 'Usuário cadastrado com sucesso!', id: userId };
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao cadastrar usuário.');
        }
    }
}

module.exports = new UserService();