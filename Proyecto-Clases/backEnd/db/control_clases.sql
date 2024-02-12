-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-02-2024 a las 21:35:28
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_clases`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `email`, `telefono`, `descripcion`) VALUES
(1, 'Marina', 'marina1@mail.com', '632545789', 'Javascript'),
(3, 'Julian', 'Jualian@mail.com', '658698600', 'PHP y NodeJS'),
(11, 'Joe', 'joe@mail.com', '+75 305 354-1778', 'IA, Python'),
(12, 'Fernando', 'Fernando@mail.com', '630186506', 'Bases de Datos, PHP, JavaScript'),
(13, 'Juan Ramirez', 'juan@mail.com', '632 458 652', 'Diagrama Entidad Relación'),
(14, 'David Canarias', 'davidjmr16@gmail.com', '655442576', 'Bases de datos, SQL Server, MySQL, JavaScript'),
(15, 'David G', 'kno3.dyo@gmail.com', '618005059', 'TFG PHP, HTML, CSS'),
(16, 'Enrique', 'enriqueclases@mail.com', '611010844', 'Trabajo JS, html y css'),
(17, 'Lucia', 'lhidalgoman@uoc.edu', '634983419', 'TFG, Laravel, Php MVC'),
(18, 'Jose Playlist', 'JoseClases@mail.com', '672975541', 'Php, html, css'),
(19, 'Sergio', 'Sergio@mail.com', '657173319', 'PHP'),
(20, 'JJ ', 'jjclases@mail.com', '601421744', 'Examen PHP'),
(21, 'Alvaro Corral', 'Alvarocorralperez@gmail.com', '666622787', 'Examen PHP'),
(22, 'Jose Luis', 'josetorresmadrid@gmail.com', '605 44 94 79', 'JS, HTML, CSS\r\n'),
(23, 'Sara Talavera', 'SaraClases@mail.com', '649 05 18 47', 'PHP, MVC, PHP Poo'),
(24, 'Dayanis', 'dayany1588@yahoo.com', '644 65 50 86', 'TypeOrm, TypeScript, JavaScript, Docker, GitHub, SQL.'),
(25, 'Andrei', 'andreiClases@mail.com', '622 42 92 50', 'JavaScript y PHP'),
(26, 'Manu', 'manuclases@mail.com', '622 00 51 80', 'JavaScript'),
(27, 'Magda', 'magdalenacoman1504@gmail.com', '672 84 60 16', 'Python, Sql, Bash'),
(28, 'Juan Melendez', 'juanclases@mail.com', '642 83 15 44', 'PHP'),
(29, 'Alberto DJ', 'albertoclases@mail.com', '627 25 79 69', 'JavaScript, Ajax, JQuery, Angular, PHP, SQL '),
(30, 'Naim', 'imane@hotmail.com', '628 62 49 44', 'HTML y CSS\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` int(10) NOT NULL,
  `alumno_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id`, `fecha`, `monto`, `alumno_id`) VALUES
(9, '2024-02-03', 12, 3),
(10, '2024-02-11', 100, 19),
(11, '2024-03-13', 18, 20),
(12, '2024-03-14', 36, 1),
(14, '2024-02-11', 18, 27),
(15, '2024-02-11', 18, 27),
(16, '2024-02-09', 24, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_pendientes`
--

CREATE TABLE `pagos_pendientes` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `horas` int(11) NOT NULL,
  `monto` int(10) NOT NULL,
  `alumno_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumno_id` (`alumno_id`);

--
-- Indices de la tabla `pagos_pendientes`
--
ALTER TABLE `pagos_pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumno_id` (`alumno_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `pagos_pendientes`
--
ALTER TABLE `pagos_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `ingresos_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pagos_pendientes`
--
ALTER TABLE `pagos_pendientes`
  ADD CONSTRAINT `pagos_pendientes_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
