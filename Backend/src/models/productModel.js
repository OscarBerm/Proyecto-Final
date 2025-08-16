import pool from '../../db/config.js'

export const createProduct = async (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por) => {
  const SQLquery = {
    text: `INSERT INTO productos (nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    values: [nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const getProducts = async () => {
    const SQLquery = {
        text: 'SELECT * FROM productos WHERE activo = TRUE'
    }
    const response = await pool.query(SQLquery)
    return response.rows
}