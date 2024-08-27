const express = require('express'); // Importa Express para definir las rutas.
const router = express.Router(); // Crea una instancia de enrutador de Express.
const User = require('../models/User'); // Importa el modelo de usuario.
const nodemailer = require('nodemailer'); // Importa Nodemailer para enviar correos electrónicos.
const crypto = require('crypto'); // Importa el módulo crypto para generar códigos de verificación únicos.
const bcrypt = require('bcrypt'); // Importa bcrypt para el hash de contraseñas.
const { body, validationResult } = require('express-validator'); // Importa express-validator para validar los datos de entrada.
require('dotenv').config();
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587, // Puerto TLS estándar
  secure: false, // Debe ser 'false' para puerto 587
  auth: {
    user: process.env.EMAIL_USER, // Tu correo de Outlook
    pass: process.env.EMAIL_PASS, // Tu contraseña de Outlook
  },
  tls: {
    rejectUnauthorized: false, // Esto puede ayudar a evitar ciertos errores de certificado
  },
});


router.post('/register', // Define una ruta POST para el registro de usuarios.
  body('firstName').notEmpty(), // Valida que el campo 'firstName' no esté vacío.
  body('lastName').notEmpty(), // Valida que el campo 'lastName' no esté vacío.
  body('email').isEmail(), // Valida que el campo 'email' contenga una dirección de correo electrónico válida.
  body('password').isLength({ min: 6 }), // Valida que el campo 'password' tenga al menos 6 caracteres.
  async (req, res) => { // Define la función que maneja la solicitud.
    const errors = validationResult(req); // Obtiene los errores de validación.
    if (!errors.isEmpty()) { // Si hay errores de validación, devuelve un error 400.
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body; // Desestructura los datos del cuerpo de la solicitud.

    try {
      let user = await User.findOne({ email }); // Busca si el usuario ya existe en la base de datos.
      if (user) return res.status(400).json({ msg: 'User already exists' }); // Si el usuario existe, devuelve un error 400.

      const verificationCode = crypto.randomBytes(32).toString('hex'); // Genera un código de verificación único.
      const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña con bcrypt.

      user = new User({ // Crea una nueva instancia del modelo de usuario con los datos proporcionados.
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verificationCode,
      });

      await user.save(); // Guarda el usuario en la base de datos.

      // Configura los detalles del correo electrónico para la verificación.
      const mailOptions = {
        from: process.env.EMAIL_USER, // Dirección de correo electrónico del remitente.
        to: email, // Dirección de correo electrónico del destinatario.
        subject: 'Verify Your Email', // Asunto del correo electrónico.
        text: `Please verify your email by using this code: ${verificationCode}`, // Contenido del correo electrónico.
      };

      transporter.sendMail(mailOptions, (err, info) => { // Envía el correo electrónico.
        if (err) return res.status(500).json({ msg: 'Failed to send email' }); // Si ocurre un error, devuelve un error 500.
        res.status(200).json({ msg: 'Registration successful. Please check your email to verify.' }); // Si el correo se envía correctamente, devuelve un mensaje de éxito.
      });

    } catch (err) {
      res.status(500).json({ msg: 'Server error' }); // Devuelve un error 500 en caso de excepción.
    }
  });

module.exports = router; // Exporta el enrutador para ser usado en otras partes de la aplicación.
