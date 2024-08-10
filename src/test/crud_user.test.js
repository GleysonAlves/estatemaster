const knex = require('knex')(require('../../knexfile').test);
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

// Cadastro de usuário
describe('Cadastro de usuários', () => {    
    test('Deve cadastrar o usuário', async () => {
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = "";
        let type = 2;

        if (type === 1) {
            user = { social_reason: 'Vitor e Manuel Lavanderia', fantasy_name: 'Vitor e Manuel Lavanderia ME', CNPJ: '16.246.357/0001-94', email, creci: '123456', first_name: '', last_name: '', date_birth: '', gender: '', marital_status: '', phone: '(19) 2620-9602', profession: '', whatsapp: '(19) 99709-1735', facebook: 'empresa_facebook', instagran: '@instagram', linkedin: 'empresa_linkedin', reclame_aqui: 'reclame_aqui.com.br', site: 'www.fernandoejosetransportesme.com.br', zip_code: '13098-578', street: 'Rua Neide', number: '982', complement: 'Galpão', neighborhood: 'Loteamento Parque', city: 'Campinas', state: 'SP', opening_hours: 'Seg a Sex 08:00 às 17:00', description: 'Arcu quis aliquam tincidunt pretium placerat dictumst quisque consectetur aenean.', logo: 'img.png', password: '123456789' };
        } 
        
        if (type === 2) {
            user = { social_reason: '', fantasy_name: '', CNPJ: '', email, creci: '', first_name: 'Thales', last_name: 'Henry Novaes', date_birth: '1987-04-07', gender: 'M', marital_status: 'Solteiro', phone: '(63) 2801-2437', profession: 'Develop', whatsapp: '(63) 99833-9587', facebook: 'user_facebook', instagran: '@user_instagran', linkedin: 'userLinkedin', reclame_aqui: '', site: '', zip_code: '77413-740', street: 'Rua Paraíso', number: '415', complement: 'Apt', neighborhood: 'Setor União V', city: 'Gurupi', state: 'TO', opening_hours: '', description: 'Testando cadastro de usuarios', logo: 'img.webp', password: '123456789' };
        }
        
        try {
            const res = await request.post('/user').send(user);
            console.log('Resposta:', res.body);
            expect(res.status).toBe(201);
            console.log('O usuário foi cadastrado com sucesso.');
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    });
});