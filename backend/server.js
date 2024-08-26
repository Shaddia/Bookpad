const express = require('express'); // Importa el módulo Express para manejar el servidor.
const mongoose = require('mongoose'); // Importa Mongoose para interactuar con MongoDB.
const cors = require('cors'); // Importa el middleware CORS para permitir solicitudes desde diferentes dominios.
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación.
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env.

const app = express(); // Crea una instancia de Express.
app.use(cors()); // Usa el middleware CORS para permitir solicitudes de otros dominios.
app.use(express.json()); // Permite que Express maneje datos JSON en el cuerpo de las solicitudes.
app.use('/api/auth', authRoutes); // Configura la ruta base para las rutas de autenticación.

const PORT = process.env.PORT || 5000; // Define el puerto en el que el servidor escuchará (usará el valor de la variable de entorno PORT o 5000 por defecto).
const MONGO_URI = process.env.MONGO_URI; // Obtiene la URI de conexión a MongoDB desde las variables de entorno.

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Conecta a la base de datos MongoDB usando la URI.
  .then(() => console.log('MongoDB connected')) // Mensaje en consola cuando la conexión a MongoDB es exitosa.
  .catch(err => console.log(err)); // Mensaje en consola en caso de error al conectar a MongoDB.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Inicia el servidor y escucha en el puerto definido, mostrando un mensaje en consola.
