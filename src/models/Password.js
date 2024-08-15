const knex = require('../config/connection');
const { v4: uuidv4 } = require('uuid');

class Password {

    // Verifica o usuário com e-mail enviado
    async findByEmail(email) {
        try {
            const result = await knex.select('email').where({ email:email }).table('users');
            if (result.length > 0) {
                return result[0];
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Registra token gerado
    async tokenRegister(email, user) {
        // Gera um token unico
        const tokenUuid = uuidv4();
        if (user) {
            try {
                await knex.insert({
                    id_user: 29,
                    token: tokenUuid
                }).table('passwordtokens');
                return tokenUuid;
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao cadastrar token");
            }
        } else {
            throw new Error("Usuário não cadastrado");
        }
    }
}

module.exports = new Password();