const express = require('express');
const router = express.Router();

// Carrito en memoria 
let carrito = [];

// Obtener carrito
router.get('/', (req, res) => {
  res.json(carrito);
});

// Agregar producto al carrito
router.post('/', (req, res) => {
  const producto = req.body;
  // Si ya existe, suma cantidad
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    carrito.push({ ...producto });
  }
  res.status(201).json(carrito);
});

// Actualizar cantidad de un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const prod = carrito.find(p => p.id == id);
  if (prod) {
    prod.cantidad = cantidad;
    res.json(carrito);
  } else {
    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }
});

// Eliminar producto del carrito
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  carrito = carrito.filter(p => p.id != id);
  res.json(carrito);
});

// Vaciar carrito
router.delete('/', (req, res) => {
  carrito = [];
  res.json(carrito);
});

module.exports = router;
