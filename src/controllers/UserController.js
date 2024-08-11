const UserService = require('../services/UserService');
const User = require('../models/User');

class UserController {

    // Cadastra usuários e faz verificações
    async registerUser(req, res) {
        //TODO Faz as validações dos campos enviados
        const { social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password } = req.body;
        
        try {
            const result = await UserService.create({
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
                password
            });
            res.status(201).json(result);
            //TODO Faz envio de uma e-mail de confirmação de cadastro - Criar links HATEOS API REST-FULL
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Listando usuários
    async listUsers(req, res) {
        try {
            const result = await UserService.listAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    }

    // Lista informações do usuário
    async user(req, res) {
        try {
            const result = await UserService.listUser(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log('Erro ao listar usuário:', error);
            res.status(500).json({ error: 'Erro ao listar informações do usuário.' });
        }
    }

    // Edita informações do usuário
    async updateUser(req, res) {
        try {
            const userData = req.body;
            const userId = userData.id;

            // Chama o serviço para validar e preparar os dados
            const preparedData = await UserService.update(userData);

            // Chama a model para atualizar o usuário e obter o usuário atualizado
            const updatedUser = await User.editUser(userId, preparedData.data);

            // Verifica se o usuário atualizado foi retornado corretamente
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
            }

            // Envia a resposta com o usuário atualizado
            res.status(200).json({ success: true, user: updatedUser, message: preparedData.message });
        } catch (error) {
            console.log('Erro ao atualizar informações do usuário:', error);
            res.status(500).json({ error: 'Erro ao atualizar as informações do usuário.' });
        }
    }

    // Deleta usuário
    async deleteUser(req, res) {
        try {
           const { id } = req.params;
           const result = await UserService.delete(id);
           if (result.success) {
            res.status(200).json(result);
           } else {
            res.status(400).json(result);
           }
        } catch (error) {
            console.log('Erro ao excluir usuairo:', error);
            res.status(500).json({ error: 'Erro ao excluir usuáro' });
        }
    }
}

module.exports = new UserController();