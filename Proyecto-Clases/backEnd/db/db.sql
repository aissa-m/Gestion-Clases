use control_clases;
-- Creación de la tabla 'alumnos' con campos adicionales
CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  descripcion TEXT
);

-- Creación de la tabla 'ingresos'
CREATE TABLE ingresos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  alumno_id INT,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE
);

-- Creación de la tabla 'pagos_pendientes'
CREATE TABLE pagos_pendientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  horas INT NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  alumno_id INT,
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE
);
