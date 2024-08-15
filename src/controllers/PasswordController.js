const passwordService = require('../services/PasswordService');
const emailToken = require('../util/email');

class PasswordController {

    async generatedToken(req, res) {

        const { email } = req.body;

        try {
            const result = await passwordService.tokenGenerate(email);
            res.status(200).json({ message: 'E-mail de redifinição de senha enviado com sucesso.', user: result });
            emailToken.recoverPassword(email, result.token);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PasswordController();