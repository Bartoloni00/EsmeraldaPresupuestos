DROP DATABASE IF EXISTS esmeraldapresupuestos;
CREATE DATABASE esmeraldapresupuestos;

USE esmeraldapresupuestos;

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

CREATE TABLE ingrediente (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NULL
);

CREATE TABLE receta (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE packaging (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descripcion TEXT NULL
);

CREATE TABLE precio_ingrediente (
    proveedor_id INTEGER,
    ingrediente_id INTEGER,
    precio INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (ingrediente_id, proveedor_id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id)
);

CREATE TABLE precio_packaging (
    packaging_id INTEGER,
    proveedor_id INTEGER,
    precio INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (packaging_id, proveedor_id),
    FOREIGN KEY (packaging_id) REFERENCES packaging(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

CREATE TABLE ingrediente_receta (
    receta_id INTEGER,
    ingrediente_id INTEGER,decimal(10,2)
    cantidad_kg decimal(10,2),
    PRIMARY KEY (receta_id, ingrediente_id),
    FOREIGN KEY (receta_id) REFERENCES receta(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingrediente(id)
);

CREATE TABLE packaging_receta (
    receta_id INTEGER,
    packaging_id INTEGER,
    cantidad INTEGER NULL,
    PRIMARY KEY (receta_id, packaging_id),
    FOREIGN KEY (receta_id) REFERENCES receta(id),
    FOREIGN KEY (packaging_id) REFERENCES packaging(id)
);