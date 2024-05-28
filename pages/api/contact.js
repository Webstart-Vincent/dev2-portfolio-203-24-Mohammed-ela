// pages/api/contact.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Log les valeurs reçues
        console.log('Received data:', { name, email, subject, message });

        // Vérifiez si les variables d'environnement sont disponibles
        console.log('Email user:', process.env.EMAIL_USER);
        console.log('Email pass:', process.env.EMAIL_PASS);
        console.log('SMTP host:', process.env.SMTP_HOST);
        console.log('SMTP port:', process.env.SMTP_PORT);

        // Configurer le transporteur Nodemailer avec vos informations SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                // Ne pas échouer sur les certificats auto-signés
                rejectUnauthorized: false,
            },
        });

        try {
            // Envoyer l'email
            await transporter.sendMail({
                from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // L'adresse de l'expéditeur
                to: process.env.EMAIL_USER, // L'adresse de destination
                subject: `Contact Form: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html: `<p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong><br>${message}</p>`,
            });

            res.status(200).json({ message: 'Message reçu avec succès' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
