require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
//TODO Colocar verificação de ambiente para usar as configurações correspondentes ao ambiente ('Test, Development, Production')
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Disparo para confirmação de cadastro
const confirmRegistration = (to, name) => {
    const templatePath = path.join(__dirname, '../views/partials/emails/confirm_registration.ejs');
    ejs.renderFile(templatePath, {name}, (err, html) => {
        if (err) {
            console.error(err);
        }else {
            const mailOptions = {
                from: 'estatemaster@contati.com.br', // TODO Trocar para e-mail da hospedageem quando for realizado deploy
                to: to,
                subject: 'Confirme seu cadastro no Estate Master',
                html: html
            };
            transporter.sendMail(mailOptions,(error, info) => {
                if(error) {
                    console.error('Erro ao enviar email:', error);
                }else {
                    console.log('Email enviado:', info.response);
                }
            });
        }
    })
}

// Disparo de boas vindas
const welcomeSend = (to, name) => {
    const templatePath = path.join(__dirname, '../views/partials/emails/welcome.ejs');
    ejs.renderFile(templatePath, {name}, (err, html) => {
        if (err) {
            console.error(err);
        }else {
            const mailOptions = {
                from: 'estatemaster@contati.com.br', // TODO Trocar para e-mail da hospedageem quando for realizado deploy
                to: to,
                subject: 'Bem vindo ao Estate Master',
                html: html
            };
            transporter.sendMail(mailOptions,(error, info) => {
                if(error) {
                    console.error('Erro ao enviar email:', error);
                }else {
                    console.log('Email enviado:', info.response);
                }
            });
        }
    })
}

// Disparo recuperação de senha
const recoverPassword = (to, name) => {
    const templatePath = path.join(__dirname, '../views/partials/emails/recover_password.ejs');
    ejs.renderFile(templatePath, {name}, (err, html) => {
        if (err) {
            console.error(err);
        }else {
            const mailOptions = {
                from: 'estatemaster@contati.com.br', // TODO Trocar para e-mail da hospedageem quando for realizado deploy
                to: to,
                subject: 'Solicitação de troca de senha Estate Master',
                html: html
            };
            transporter.sendMail(mailOptions,(error, info) => {
                if(error) {
                    console.error('Erro ao enviar email:', error);
                }else {
                    console.log('Email enviado:', info.response);
                }
            });
        }
    })
}

// Disparo compra realizada
const orderSend = (to, name) => {
    const templatePath = path.join(__dirname, '../views/partials/emails/order.ejs');
    ejs.renderFile(templatePath, {name}, (err, html) => {
        if (err) {
            console.error(err);
        }else {
            const mailOptions = {
                from: 'estatemaster@contati.com.br', // TODO Trocar para e-mail da hospedageem quando for realizado deploy
                to: to,
                subject: 'Sua compra no Estate Master foi realizada com sucesso',
                html: html
            };
            transporter.sendMail(mailOptions,(error, info) => {
                if(error) {
                    console.error('Erro ao enviar email:', error);
                }else {
                    console.log('Email enviado:', info.response);
                }
            });
        }
    })
}


module.exports = {confirmRegistration, welcomeSend, recoverPassword, orderSend};