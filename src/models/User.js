const { required } = require('joi');
const knex = require('../config/connection');
const bcrypt = require('bcrypt');
class User {

    // Cadastrar usuários 
    async register(social_reason, fantasy_name, CNPJ, CPF, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password) {
        try {
            
            // Cripitografa a senha para armazenar no banco
            let has = await bcrypt.hash(password, 10);

            const [id] = await knex.insert({
                social_reason,
                fantasy_name,
                CNPJ,
                CPF,
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
                password: has,
                status: 'registered'
            }).table('users');
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    // Listar todos os usuários
    async listUsers() {
        try {
            const users = await knex.select('*').from('users');
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    // Exibir informações do usuário pesquisado
    async findByEmail(email) {
        try {
            const result = await knex.select('*').where({ email: email }).table("users");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Editar informações do usuário
    async editUser(id, data) {
        try {
            // Atualiza o usuário
            await knex('users')
                .where({ id })
                .update(data);
    
            // Retorna o usuário atualizado
            const updatedUser = await knex('users').where({ id }).first();
            return updatedUser;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao atualizar informações do usuário');
        }
    }
    
    // Deletar usuário
    async delete(id) {
        //TODO Verificar se o id enviado existe
        try {
            const user = await knex('users').where({ id }).del();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao atualizar informações do usuário');
        }
    }
}

module.exports = new User();