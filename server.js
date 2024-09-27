const express = require('express'); // Importar Express
const mongoose = require('mongoose'); // Importar Mongoose
const cors = require('cors'); // Importar CORS

// Crear la aplicación de Express
const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Middlewares
app.use(express.json()); // Para solicitudes JSON
app.use(cors()); // Para habilitar CORS

// Definir el modelo de Producto
const Producto = mongoose.model('Producto', new mongoose.Schema({
    nombre: String,
    precio: Number,
    imagen: String,
    descripcion: String
}));

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Configurar el puerto y lanzar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
