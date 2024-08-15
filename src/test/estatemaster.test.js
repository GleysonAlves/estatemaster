const knex = require('knex')(require('../../knexfile').test);
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const thisTime = 'password';

switch(thisTime) {
    // Teste de conexão
    case 'connect':
        test('Dever responder na porta 3001', async () => {
            const res = await request.get('/');
            expect(res.status).toBe(200);
            console.log('O servidor foi iniciado na porta 3001');
        });
        break;

    case 'user':
        // Cadastro de usuário
        test('Deve cadastrar o usuário', async () => {
            let time = Date.now();
            let email = `${time}@gmail.com`;
            let user = "";
            let type = 2;

            if (type === 1) {
                user = { social_reason: 'Vitor e Manuel Lavanderia', fantasy_name: 'Vitor e Manuel Lavanderia ME', CNPJ: '16.246.357/0001-95', email, creci: '123456', first_name: '', last_name: '', date_birth: '', gender: '', marital_status: '', phone: '(19) 2620-9602', profession: '', whatsapp: '(19) 99709-1735', facebook: 'empresa_facebook', instagran: '@instagram', linkedin: 'empresa_linkedin', reclame_aqui: 'reclame_aqui.com.br', site: 'www.fernandoejosetransportesme.com.br', zip_code: '13098-578', street: 'Rua Neide', number: '982', complement: 'Galpão', neighborhood: 'Loteamento Parque', city: 'Campinas', state: 'SP', opening_hours: 'Seg a Sex 08:00 às 17:00', description: 'Arcu quis aliquam tincidunt pretium placerat dictumst quisque consectetur aenean.', logo: 'img.png', password: '123456789' };
            } 
            
            if (type === 2) {
                user = { social_reason: '', fantasy_name: '', CNPJ: '', CPF: '000.000.000-00', email, creci: '', first_name: 'Thales', last_name: 'Henry Novaes', date_birth: '1987-04-07', gender: 'M', marital_status: 'Solteiro', phone: '(63) 2801-2437', profession: 'Develop', whatsapp: '(63) 99833-9587', facebook: 'user_facebook', instagran: '@user_instagran', linkedin: 'userLinkedin', reclame_aqui: '', site: '', zip_code: '77413-740', street: 'Rua Paraíso', number: '415', complement: 'Apt', neighborhood: 'Setor União V', city: 'Gurupi', state: 'TO', opening_hours: '', description: 'Testando cadastro de usuarios', logo: 'img.webp', password: '123456789' };
            }
            
            try {
                const res = await request.post('/user').send(user);
                expect(res.status).toBe(201);
                console.log('O usuário foi cadastrado com sucesso.');
            } catch (error) {
                console.error('Erro na solicitação:', error);
            }
        });
        // Listar usuários
        test('Deve listar todos os usuários', async () => {
            try {
                const res = await request.get('/user');
                // Espera-se que a resposta para a listagem de usuários seja 200
                expect(res.status).toBe(200);
                // Verifica se a resposta contém a propriedade 'data' que deve ser um array de usuários
                expect(Array.isArray(res.body.data)).toBe(true);
                // Verifica se o array de usuários contém pelo menos um usuário
                expect(res.body.data.length).toBeGreaterThan(0);
                // Verifica se a resposta contém a propriedade '_links' para HATEOAS
                expect(res.body._links).toBeDefined();
                console.log('A listagem de usuários foi bem-sucedida');
            } catch (error) {
                console.log('Erro ao listar usuários:', error);
            }
        });    
        // Listar unico usuário
        test('Deve listar apenas um unico usuário', async () => {
            try {
                const email = '1723424267788@gmail.com';
                const res = await request.post('/user/email').send({ email });
                
                expect(res.status).toBe(200);
                expect(res.body.success).toBe(true);
                expect(Array.isArray(res.body.user)).toBe(true);
                expect(res.body.user.length).toBeGreaterThan(0);
                console.log('Usuário listado com sucesso.');
            } catch (error) {
                console.log('Erro ao listar usuário:', error);
            }
        });
        // Editar Usuário
        test('Deve editar as informações do usuário', async () => {
            try {
                const id = 23; // Certifique-se de que o ID corresponde a um usuário existente
                const time = Date.now();
                const email = `${time}@gmail.com`;
                const user = { id, email };

                const res = await request.put(`/user/${id}`).send(user); // Verifique se o ID está incluído na URL
            
                console.log('Status:', res.status); // Adicione logs para depuração
                console.log('Resposta:', res.body); // Adicione logs para depuração
            
                expect(res.status).toBe(200);
                expect(res.body.success).toBe(true);
                expect(res.body.user).toBeDefined(); // Verifica se 'user' está definido
                expect(res.body.user.email).toBe(email); // Verifica se o e-mail foi atualizado corretamente
            } catch (error) {
                console.log('Erro ao editar informações do usuário.')
            }
        });    
        // Excluir Usuário
        test('Deve excluir o usuário', async () => {
        try {
            const id = 23;
            const res = await request.delete(`/user/${id}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Usuário excluido com sucesso.');
        } catch (error) {
            console.log('Erro ao excluir usuário.');
        }
        });
        break;

    case 'password':
        // Esqueçeu a senha
        test('Deve enviar e-mail de redefinição de senha', async () => {
            const email = '1723676522670@gmail.com';
            const res = await request.post('/forget-password').send({ email });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('E-mail de redifinição de senha enviado com sucesso.');
            console.log('Solicitação de redifinição de senha enviada com sucesso.')
        });
        break;
}
