const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Importar rutas
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
