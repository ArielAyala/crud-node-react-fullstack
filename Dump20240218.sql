CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habitacionpiso` int NOT NULL,
  `habitacionnro` int NOT NULL,
  `cantcamas` int DEFAULT NULL,
  `tienetelevision` tinyint DEFAULT NULL,
  `tienefrigobar` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,1,101,2,1,0),(2,1,102,3,1,1),(3,1,103,2,1,0),(4,1,104,4,1,1),(5,1,105,3,1,0),(6,2,201,2,1,0),(7,2,202,3,1,1),(8,2,203,2,1,0),(9,2,204,4,1,1),(10,2,205,3,1,0);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombrecompleto` varchar(200) DEFAULT NULL,
  `nrodocumento` varchar(30) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Juan Pérez','123456789','juan@example.com','123-456-7890'),(2,'María García','987654321','maria@example.com','987-654-3210'),(3,'Carlos Rodríguez','555123456','carlos@example.com','555-123-4567'),(4,'Laura Martínez','777888999','laura@example.com','777-888-9999'),(5,'Pedro Sánchez','111222333','pedro@example.com','111-222-3333'),(6,'Ana López','444555666','ana@example.com','444-555-6666'),(7,'José Ramírez','999000111','jose@example.com','999-000-1111'),(8,'Sofía Fernández','888777666','sofia@example.com','888-777-6666'),(9,'Miguel Torres','666777888','miguel@example.com','666-777-8888'),(10,'Isabel Gómez','333444555','isabel@example.com','333-444-5555'),(11,'Ricardo Estigarribia','848457657','','021-4545-4656');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechareserva` datetime NOT NULL,
  `fechaentrada` datetime DEFAULT NULL,
  `fechasalida` datetime DEFAULT NULL,
  `habitacionid` int NOT NULL,
  `personaid` int NOT NULL,
  `montoreserva` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`id`,`habitacionid`,`personaid`),
  KEY `fk_reserva_habitacion_idx` (`habitacionid`),
  KEY `fk_reserva_persona1_idx` (`personaid`),
  CONSTRAINT `fk_reserva_habitacion` FOREIGN KEY (`habitacionid`) REFERENCES `habitacion` (`id`),
  CONSTRAINT `fk_reserva_persona1` FOREIGN KEY (`personaid`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,'2024-02-19 00:55:46','2024-02-20 00:00:00','2024-02-23 00:00:00',1,1,360000.00),(2,'2024-02-19 00:57:41','2024-02-20 00:00:00','2024-02-25 00:00:00',2,2,600000.00);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-18 22:14:29
