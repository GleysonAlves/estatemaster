const UserService = require('../services/UserService');
const User = require('../models/User');
const hateos = require('../util/hateoas');
const sendEmails = require('../util/email');

class UserController {

    // Cadastra usuários e faz verificações
    async registerUser(req, res) {
        const { social_reason, fantasy_name, CNPJ, CPF, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password } = req.body;
        
        try {
            const result = await UserService.create({
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
                password
            });

            const id = result.id; 
            const resource = 'user';
            const HATEOS = hateos.generateHateoasLinks(resource, id);

            res.status(201).json({
                data: result,
                _links: HATEOS
            });
            //TODO Faz envio de uma e-mail de confirmação de cadastro
            sendEmails.confirmRegistration(req.body.email, req.body.first_name);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Listando usuários
    async listUsers(req, res) {
        try {
            const result = await UserService.listAll();
            
            const resource = 'user';
            const HATEOS = hateos.generateHateoasLinks(resource);
            
            res.status(200).json({
                data: result,
                _links: HATEOS
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    }

    // Lista informações do usuário
    async user(req, res) {
        try {
            const result = await UserService.listUser(req.body);
            
            const id = result.user[0]?.id;
            const resource = 'user';
            const HATEOS = hateos.generateHateoasLinks(resource, id);

            res.status(201).json({
                data: result,
                _links: HATEOS
            });
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

            const id = result.id;
            const resource = 'user';
            const HATEOS = hateos.generateHateoasLinks(resource, id);

            // Envia a resposta com o usuário atualizado
            res.status(200).json({ 
                success: true,
                user: updatedUser,
                message: preparedData.message,
                _links: HATEOS
            });
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
            const id = result.id;
            const resource = 'user';
            const HATEOS = hateos.generateHateoasLinks(resource, id);

            res.status(201).json({
                data: result,
                _links: HATEOS
            });
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