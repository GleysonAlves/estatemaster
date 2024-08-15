const resetPassword = require('../models/Password');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const knex = require('../config/connection');

class PasswordService {

    async tokenGenerate(email) {
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const token = await resetPassword.tokenRegister(email, user);
            return { success: true, message: 'Token gerado com sucesso!', token, id: user.id};
        } catch (error) {
            console.error('Erro ao gerar token: ', error);
            throw new Error('Err ao gerar token.');
        }
    }
}

module.exports = new PasswordService();