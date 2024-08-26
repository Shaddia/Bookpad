const mongoose = require('mongoose'); // Importa Mongoose para definir el modelo de datos.

const UserSchema = new mongoose.Schema({ // Define el esquema del modelo de usuario.
  firstName: String, // Nombre del usuario.
  lastName: String, // Apellido del usuario.
  email: { type: String, unique: true }, // Correo electrónico del usuario, debe ser único.
  password: String, // Contraseña del usuario.
  isActive: { type: Boolean, default: false }, // Estado de activación del usuario (por defecto es falso).
  verificationCode: String, // Código de verificación enviado por correo.
});

module.exports = mongoose.model('User', UserSchema); // Exporta el modelo de usuario para ser usado en otras partes de la aplicación.
