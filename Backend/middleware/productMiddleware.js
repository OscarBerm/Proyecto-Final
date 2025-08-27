export const validateProductData = (req, res, next) => {
    const { nombre, precio, stock, imagen_url, descripcion } = req.body

    if (!nombre || !precio || !stock || !imagen_url || !descripcion) {
        return res.status(400).json({ 
            error: 'Los campos nombre, precio, stock, imagen_url y descripcion son requeridos.' 
        })
    }
    if (typeof precio !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({
            error: 'Los campos precio y stock deben ser valores numéricos.'
        })
    }
    next()
}