
import { Router } from 'express';
import pool from '../db/config.js';

const router = Router();

// Obtener productos del carrito de un usuario
router.get('/carrito', async (req, res) => {
  const { usuario_id } = req.query;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
  try {
    const result = await pool.query(
      `SELECT c.producto_id as id, p.nombre, p.descripcion, p.precio, p.imagen_url as imagen, c.cantidad
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = $1`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito', details: err.message });
  }
});

// Agregar producto al carrito
router.post('/carrito', async (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;
  if (!usuario_id || !producto_id || !cantidad) return res.status(400).json({ error: 'usuario_id, producto_id y cantidad requeridos' });
  try {
    await pool.query(
      `INSERT INTO carrito (usuario_id, producto_id, cantidad)
       VALUES ($1, $2, $3)
       ON CONFLICT (usuario_id, producto_id)
       DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad`,
      [usuario_id, producto_id, cantidad]
    );

    // Devolver el carrito actualizado
    const result = await pool.query(
      `SELECT c.producto_id as id, p.nombre, p.descripcion, p.precio, p.imagen_url as imagen, c.cantidad
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = $1`,
      [usuario_id]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto', details: err.message });
  }
});

// Actualizar cantidad de un producto en el carrito
router.put('/carrito/:id', async (req, res) => {
  const { id: producto_id } = req.params;
  const { usuario_id, cantidad } = req.body;
  if (!usuario_id || !cantidad) return res.status(400).json({ error: 'usuario_id y cantidad requeridos' });
  try {
    await pool.query(
      `UPDATE carrito SET cantidad = $1 WHERE usuario_id = $2 AND producto_id = $3`,
      [cantidad, usuario_id, producto_id]
    );

    // Devolver el carrito actualizado
    const result = await pool.query(
      `SELECT c.producto_id as id, p.nombre, p.descripcion, p.precio, p.imagen_url as imagen, c.cantidad
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = $1`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad', details: err.message });
  }
});

// Eliminar producto del carrito por id
router.delete('/carrito/:id', async (req, res) => {
  const { id: producto_id } = req.params;
  const { usuario_id } = req.body;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
  try {
    await pool.query(
      `DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2`,
      [usuario_id, producto_id]
    );
    
    // Devolver el carrito actualizado
    const result = await pool.query(
      `SELECT c.producto_id as id, p.nombre, p.descripcion, p.precio, p.imagen_url as imagen, c.cantidad
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = $1`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto', details: err.message });
  }
});

export default router;
