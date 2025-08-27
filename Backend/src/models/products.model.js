import format from 'pg-format'
import pool from '../../db/config.js'

// Obtener todos los productos
export const getAllProducts = async ({ order_by = 'fecha_creacion-ASC', limit = 50,  page = 1 }) => {
  const [attribute, order] = order_by.split('-')
  const offset = (page - 1) * limit
  const sqlQuery = format(
    `SELECT * FROM productos WHERE activo = TRUE
    ORDER BY %s %s LIMIT %s OFFSET %s`,
    attribute,
    order,
    limit,
    offset
  )
  const res = await pool.query(sqlQuery)
  return res.rows
};

export const getAllProductsAdmin = async ({ order_by = 'fecha_creacion-ASC', limit = 50,  page = 1 }) => {
  const [attribute, order] = order_by.split('-')
  const offset = (page - 1) * limit
  const sqlQuery = format(
    `SELECT productos.*, categorias.nombre AS categoria_nombre
      FROM productos
      JOIN categorias ON productos.categoria_id = categorias.id`,
    attribute,
    order,
    limit,
    offset
  )
  const res = await pool.query(sqlQuery)
  return res.rows
};

export const getProductById = async (id) => {
  const sqlQuery = format(
    'SELECT * FROM productos WHERE id = %L',
    id
  )
  const res = await pool.query(sqlQuery)
  return res.rows[0]
};

export const createProduct = async (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por) => {
  const SQLquery = {
    text: `INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por]
  }
  const res = await pool.query(SQLquery)
  return res.rows[0]
}

export const updateProduct = async (id, product) => {
  const { nombre, descripcion, precio, stock, imagen_url, activo } = product;

  const res = await pool.query(
    `UPDATE productos SET 
      nombre = $1, 
      descripcion = $2, 
      precio = $3, 
      stock = $4,
      imagen_url = $5, 
      activo = $6, 
      ultima_actualizacion = NOW()
    WHERE id = $7
    RETURNING *`,
    [nombre, descripcion, precio, stock, imagen_url, activo, id]
  );
  return res.rows[0];
};

export const deleteProduct = async (id) => {
  const res = await pool.query(`DELETE FROM productos WHERE id = $1 RETURNING *`, [id]);
  return res.rows[0];
};

export const getAllCategory = async () => {
  const sqlQuery = "SELECT * FROM categorias";
  const res = await pool.query(sqlQuery);
  return res.rows;
};