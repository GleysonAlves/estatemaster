class HomeController {
    async index (req, res) {
        res.status(200).send('Servidor está funcionando.');
    }
}

module.exports = new HomeController();