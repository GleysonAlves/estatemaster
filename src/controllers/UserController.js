const userService = require('../services/UserService');

class UserController {
    async registerUser(req, res) {
        //TODO Faz as validações dos campos enviados
        const { social_reason, fantasy_name, CNPJ, email, creci, first_name, last_name, date_birth, gender, marital_status, phone, profession, whatsapp, facebook, instagran, linkedin, reclame_aqui, site, zip_code, street, number, complement, neighborhood, city, state, opening_hours, description, logo, password } = req.body;
        
        try {
            const result = await userService.create({
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
            //TODO Faz envio de uma e-mail de confirmação de cadastro - Criar links HATEOS API REST-FULL
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();