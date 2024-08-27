# User Registration and Email Verification App

## Descripción

Esta aplicación permite a los usuarios registrarse en un sistema, validando sus datos de entrada y enviando un correo electrónico de verificación utilizando Outlook y `nodemailer`. La aplicación está construida con Node.js y Express, y utiliza MongoDB para almacenar la información del usuario.

## Características

- **Registro de usuarios**: Permite a los usuarios registrarse proporcionando su nombre, correo electrónico y contraseña.
- **Verificación de correo electrónico**: Envía un correo electrónico con un código de verificación único.
- **Seguridad**: Usa `bcrypt` para hashear las contraseñas antes de almacenarlas en la base de datos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para Node.js para construir aplicaciones web.
- **MongoDB**: Base de datos NoSQL para almacenar la información del usuario.
- **Nodemailer**: Módulo para enviar correos electrónicos.
- **bcrypt**: Biblioteca para el hash de contraseñas.
- **express-validator**: Biblioteca para validar los datos de entrada.

## Instalación

### Requisitos Previos

- Node.js (>=14.x)
- MongoDB (local o en la nube, como MongoDB Atlas)
- Una cuenta de Outlook para el envío de correos electrónicos

### Pasos para la Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   
2. **Navegar al directorio del proyecto**:

  ```bash
  Copiar código
  cd tu_repositorio
3. Instalar las dependencias:

npm install
Configurar las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar código
EMAIL_USER=tu_email@outlook.com
EMAIL_PASSWORD=tu_contraseña
MONGO_URI=tu_uri_de_mongodb
Asegúrate de reemplazar tu_email@outlook.com, tu_contraseña, y tu_uri_de_mongodb con los valores correctos.

Iniciar la aplicación:

bash
Copiar código
npm start
La aplicación se ejecutará en http://localhost:3000 por defecto.
