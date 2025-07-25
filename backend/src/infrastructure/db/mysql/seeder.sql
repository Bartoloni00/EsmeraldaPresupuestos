DROP DATABASE IF EXISTS esmeraldapresupuestos;
CREATE DATABASE esmeraldapresupuestos;
USE esmeraldapresupuestos;

-- Proveedores
CREATE TABLE proveedor (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NULL,
    telefono VARCHAR(50) NULL,
    mail VARCHAR(255) NULL,
    pagina VARCHAR(255) NULL,
    pais VARCHAR(100) NULL DEFAULT 'Argentina',
    provincia VARCHAR(100) NULL DEFAULT 'Santa Fe',
    ciudad VARCHAR(100) NULL DEFAULT 'Rosario',
    calle VARCHAR(255) NULL,
    numero_calle INTEGER NULL
);

-- Ingredientes
CREATE TABLE ingrediente (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NULL
);

-- Recetas
CREATE TABLE receta (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Packaging
CREATE TABLE packaging (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descripcion TEXT NULL
);

-- Precios de ingredientes
CREATE TABLE precio_ingrediente (
    proveedor_id INTEGER,
    ingrediente_id INTEGER,
    precio DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (ingrediente_id, proveedor_id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id)
);

-- Precios de packaging
CREATE TABLE precio_packaging (
    packaging_id INTEGER,
    proveedor_id INTEGER,
    precio DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (packaging_id, proveedor_id),
    FOREIGN KEY (packaging_id) REFERENCES packaging(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- Ingredientes usados en una receta
CREATE TABLE ingrediente_receta (
    receta_id INTEGER,
    ingrediente_id INTEGER,
    cantidad_kg DECIMAL(10,3),
    PRIMARY KEY (receta_id, ingrediente_id),
    FOREIGN KEY (receta_id) REFERENCES receta(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id)
);

-- Packaging usado en una receta
CREATE TABLE packaging_receta (
    receta_id INTEGER,
    packaging_id INTEGER,
    cantidad INTEGER NULL,
    PRIMARY KEY (receta_id, packaging_id),
    FOREIGN KEY (receta_id) REFERENCES receta(id),
    FOREIGN KEY (packaging_id) REFERENCES packaging(id)
);

-- DATOS DE EJEMPLO

-- Proveedores
INSERT INTO proveedor (name, descripcion, telefono, mail) VALUES 
('Proveedor A', 'Mayorista zona sur', '3411234567', 'a@mail.com'),
('Proveedor B', 'Importador', '3417654321', 'b@mail.com');

-- Ingredientes
INSERT INTO ingrediente (name, descripcion) VALUES 
('Harina 0000', 'Harina blanca refinada'),
('Azúcar', 'Azúcar común');

-- Packaging
INSERT INTO packaging (title, descripcion) VALUES 
('Caja para torta 30x30', 'Caja de cartón blanca con logo'),
('Base dorada 30cm', 'Base redonda dorada de cartón prensado');

-- Recetas
INSERT INTO receta (title, descripcion) VALUES 
('Torta Selva Negra', 'Clásica torta con cerezas y crema');

-- Precios
INSERT INTO precio_ingrediente (proveedor_id, ingrediente_id, precio) VALUES 
(1, 1, 800.50),
(2, 2, 720.00);

INSERT INTO precio_packaging (packaging_id, proveedor_id, precio) VALUES 
(1, 1, 120.00),
(2, 1, 80.00);

-- Ingredientes para receta
INSERT INTO ingrediente_receta (receta_id, ingrediente_id, cantidad_kg) VALUES 
(1, 1, 0.300),
(1, 2, 0.150);

-- Packaging para receta
INSERT INTO packaging_receta (receta_id, packaging_id, cantidad) VALUES 
(1, 1, 1),
(1, 2, 1);

-- Nuevos ingredientes
INSERT INTO ingrediente (name, descripcion) VALUES 
('Harina leudante', 'Harina con polvo de hornear incorporado'),
('Huevo', 'Huevo de gallina'),
('Aceite de girasol', 'Aceite vegetal refinado'),
('Esencia de vainilla', 'Extracto artificial de vainilla'),
('Queso crema', 'Queso untable tipo americano'),
('Azúcar impalpable', 'Azúcar en polvo');

-- Nuevos packaging
INSERT INTO packaging (title, descripcion) VALUES 
('Pirotines x12', 'Papel para cupcakes color pastel'),
('Caja para cupcakes', 'Caja de cartón con separadores');

-- Nueva receta
INSERT INTO receta (title, descripcion) VALUES 
('Cupcakes de Vainilla', 'Masa esponjosa sabor vainilla con frosting de queso crema');

-- Precios ingredientes (Proveedor A y B)
INSERT INTO precio_ingrediente (proveedor_id, ingrediente_id, precio) VALUES 
(1, 3, 850.00),  -- Harina leudante
(1, 4, 1500.00), -- Huevo
(1, 5, 1200.00), -- Aceite de girasol
(2, 6, 450.00),  -- Esencia de vainilla
(2, 7, 2800.00), -- Queso crema
(2, 8, 900.00);  -- Azúcar impalpable

-- Precios packaging
INSERT INTO precio_packaging (packaging_id, proveedor_id, precio) VALUES 
(3, 2, 90.00),  -- Pirotines
(4, 1, 130.00); -- Caja para cupcakes

-- Ingredientes para receta Cupcakes (id receta = 2)
INSERT INTO ingrediente_receta (receta_id, ingrediente_id, cantidad_kg) VALUES 
(2, 3, 0.250), -- Harina leudante
(2, 4, 0.250), -- Huevo (~5 huevos)
(2, 5, 0.100), -- Aceite de girasol
(2, 6, 0.005), -- Esencia de vainilla
(2, 7, 0.150), -- Queso crema
(2, 8, 0.150); -- Azúcar impalpable

-- Packaging para receta
INSERT INTO packaging_receta (receta_id, packaging_id, cantidad) VALUES 
(2, 3, 1), -- Pirotines x12
(2, 4, 1); -- Caja para cupcakes
