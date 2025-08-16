\c collections;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    imagen_url VARCHAR(255),
    rol VARCHAR(50) DEFAULT 'cliente',
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    ultima_conexion TIMESTAMP
);


CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);


CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    sku VARCHAR(255) UNIQUE,
    imagen_url VARCHAR(255),
    categoria_id UUID NOT NULL REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    creado_por UUID REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    ultima_actualizacion TIMESTAMP DEFAULT NOW(),
    activo BOOLEAN DEFAULT TRUE
);


CREATE TABLE pedidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    fecha_pedido TIMESTAMP DEFAULT NOW(),
    estado_pedido VARCHAR(50) DEFAULT 'pendiente' CHECK (estado_pedido IN ('pendiente', 'en_proceso', 'enviado', 'entregado', 'cancelado')),
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
    direccion_envio VARCHAR(255),
    metodo_pago VARCHAR(50),
    id_transaccion_pago VARCHAR(255)
);


CREATE TABLE detalle_pedido (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID NOT NULL REFERENCES pedidos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    producto_id UUID NOT NULL REFERENCES productos(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0)
);


CREATE TABLE carrito (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE,
    producto_id UUID NOT NULL REFERENCES productos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    CONSTRAINT unique_usuario_producto UNIQUE (usuario_id, producto_id)
);