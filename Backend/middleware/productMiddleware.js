export const validateProductData = (req, res, next) => {
    const { nombre, precio, stock, imagen_url, categoria_id } = req.body

    if (!nombre || !precio || !stock || !imagen_url || !categoria_id) {
        return res.status(400).json({ 
            error: 'Los campos nombre, precio, stock, imagen_url y categoria_id son requeridos.' 
        })
    }

    
    if (typeof precio !== 'number' || typeof stock !== 'number') {
        return res.status(400).json({
            error: 'Los campos precio y stock deben ser valores numéricos.'
        })
    }

    next()
}