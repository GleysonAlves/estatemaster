const User = require('../models/User');

class UserService {

    // Criar usuaŕio
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

    // Listar usuários
    async listAll() {
        try {
            const users = await User.listUsers();
            return { success: true, message: 'Usuários listados com sucesso!', users };
            
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao listar usuários do sistema.')
        }
    }

    // Trás as informações do usuário
    async listUser(data) {
        try {
            const { email } = data;
            const user = await User.findByEmail(email);
            //TODO Verifica se user está vazio
            return { success: true, message: 'Informações do usuário listado com sucesso!', user };
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao pegar informações do usuário.');
        }
    }

    // Edição do registro de usuário
    async update(data) {
        const { id, social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo } = data;
        try {
            const prepareUpdate = { social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo };
            return { success: true, message: "Dados validados e preparados com sucesso.", data: prepareUpdate };
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao fazer alterações nas informações do usuário');
        }
    }

    // Deletar usuário
    async delete(id) {
        try {
            //TODO Verifique se o id e válido
            const result = await User.delete(id);
            if (result > 0) {
                return { success: true, message: 'Usuário excluído com sucesso.' };
            } else {
                return { success: false, message: 'Usuário não encontrado.' };
            }
            return { success: true, message: 'Usuário excluido com sucesso.' };
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao excluir usuário.')
        }
    }
}

module.exports = new UserService();