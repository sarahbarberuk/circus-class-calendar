-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: circus
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `circus_classes`
--

DROP TABLE IF EXISTS `circus_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `circus_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `class_location` varchar(255) DEFAULT NULL,
  `day_of_week` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `level_id` int DEFAULT NULL,
  `school_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  KEY `fk_level` (`level_id`),
  KEY `fk_school` (`school_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `class_category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_level` FOREIGN KEY (`level_id`) REFERENCES `class_level` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circus_classes`
--

LOCK TABLES `circus_classes` WRITE;
/*!40000 ALTER TABLE `circus_classes` DISABLE KEYS */;
INSERT INTO `circus_classes` VALUES (1,'Pole','The Pole Lab','Saturday','10:00:00',NULL,NULL,1,2,10),(2,'Pole','The Pole Lab','Sunday','10:00:00',NULL,NULL,1,8,10),(3,'Pole','The Pole Lab','Monday','12:00:00',NULL,NULL,1,8,10),(4,' Pole','The Pole Lab','Monday','20:00:00',NULL,NULL,1,1,10),(5,'Splits','The Pole Lab','Tuesday','12:00:00',NULL,NULL,3,8,10),(6,'Online Flex','Online','Wednesday','18:30:00',NULL,'Carolyn',3,8,10),(7,'Whole Body Flex','The Pole Lab','Friday','08:00:00',NULL,'Carolyn',3,8,10),(8,'Silks','Studio 4 Al lDance','Wednesday','13:00:00','14:00:00','Tam',2,1,13),(9,'Ballet','Studio 4 All Dance','Sunday','13:00:00','14:00:00',NULL,4,1,13),(10,'Mixed Aerial','Brighton Aerial Arts','Tuesday','18:00:00','19:00:00',NULL,2,8,2),(11,'Aerial Hoop - Low Flow','Brighton Aerial Arts','Tuesday','19:00:00','20:00:00',NULL,2,3,2),(12,'Aerial Hoop - Low Flow','Brighton Aerial Arts','Tuesday','20:00:00','21:00:00',NULL,2,5,2),(13,'Aerial Hoop drop in','Brighton Aerial Arts','Wednesday','18:00:00','19:00:00',NULL,2,2,2),(14,'Aerial hoop drop in','Brighton Aerial Arts','Wednesday','19:00:00','20:00:00',NULL,2,4,2),(15,'Pole','Gemini Pole','Tuesday','19:45:00','20:45:00',NULL,1,1,7),(16,'Pole','Gemini Pole','Wednesday','18:30:00','19:30:00',NULL,1,1,7),(17,'Flexibility','Gemini Pole','Thursday','18:00:00','19:30:00','Moll',3,8,7),(18,'Musical Theatre Jazz','The Dance Space','Monday','18:15:00',NULL,NULL,4,8,12),(19,'Contemporary Ballet','The Dance Space','Tuesday','18:00:00',NULL,NULL,4,8,12),(20,'Contemporary','The Dance Space','Tuesday','19:00:00',NULL,NULL,4,1,12),(21,'Contemporary','The Dance Space','Tuesday','20:00:00',NULL,NULL,4,3,12),(22,'Ballet','The Dance Space','Wednesday','18:00:00',NULL,NULL,4,8,12),(23,'Contemporary','The Dance Space','Wednesday','19:00:00',NULL,NULL,4,8,12),(24,'Brighton Broadway Tap','The Dance Space','Thursday','20:00:00',NULL,NULL,4,8,12),(25,'Stretch and Strength Flexibility','The Dance Space','Thursday','18:00:00',NULL,NULL,3,8,12),(32,'Calisthenics','Sea Lanes','Thursday','19:30:00',NULL,NULL,6,8,8),(33,'Handstands','Sea Lanes','Sunday','11:00:00','11:50:00',NULL,7,8,8),(34,'Aerial','The Circus Project Hangleton','Monday','19:30:00','21:00:00',NULL,2,5,14),(35,'Aerial','The Circus Project Hangleton','Tuesday','18:45:00','20:00:00',NULL,2,2,14),(36,'Aerial','The Circus Project Hangleton','Friday','11:45:00','13:00:00',NULL,2,2,14),(37,'Aerial Open Training','The Circus Project Hangleton','Friday','11:45:00','13:45:00',NULL,2,8,14),(74,'Aerial Pilates','Stanley Deason','Monday','10:00:00','11:15:00','Kellie',2,8,1),(75,'Silks and Rope','Stanley Deason','Monday','11:30:00','12:45:00','Tam',2,1,1),(76,'Strap loops','Stanley Deason','Monday','13:00:00','14:30:00','Tam',2,4,1),(77,'Circus Fit','Stanley Deason','Tuesday','11:30:00','12:30:00','Tam',8,8,1),(78,'Silks','Stanley Deason','Tuesday','12:45:00','14:00:00','Tam',2,4,1),(79,'Flexibility','Stanley Deason','Tuesday','18:00:00','19:00:00','Moll',3,8,1),(80,'Silks','Stanley Deason','Tuesday','19:00:00','20:30:00','Kellie',2,6,1),(81,'Aerial Hoop','Stanley Deason','Wednesday','13:00:00','14:30:00','Sita',2,1,1),(82,'Open practice - Rope and Silks','Moulescoomb','Wednesday','17:45:00','19:50:00',NULL,2,8,1),(83,'Silk loop','Stanley Deason','Wednesday','18:00:00','19:15:00','Tam',2,1,1),(84,'Silk loop','Stanley Deason','Wednesday','19:15:00','20:45:00','Tam',2,4,1),(85,'Trapeze','Stanley Deason','Thursday','18:00:00','19:15:00','Kellie',2,1,1),(86,'Trapeze','Stanley Deason','Thursday','19:15:00','20:45:00','Kellie',2,4,1),(87,'Open practice - Rope and Silks','Moulescoomb','Friday','18:00:00','21:00:00',NULL,2,8,1),(88,'Rope','Stanley Deason','Friday','18:00:00','19:30:00','Kellie/Tam',2,3,1),(89,'Silks','Stanley Deason','Friday','19:30:00','21:00:00','Kellie/Tam',2,3,1),(90,'Rope and silks','Stanley Deason','Saturday','13:00:00','14:15:00','Kellie',2,1,1),(91,'Rope','Stanley Deason','Sunday','12:00:00','13:30:00','Emily',2,5,1),(92,'Handstands & Calisthenics','Queens Park','Saturday','08:15:00','09:15:00','Ben',7,8,5),(93,'Gymnastics - open training','Lancing','Wednesday','20:15:00','21:45:00','Spencer',5,8,15),(94,'Gymnastics','Lancing','Thursday','10:00:00','11:30:00','Richard',5,8,15),(95,'Gymnastics','Brighton Girls School','Thursday','20:00:00','21:15:00',NULL,5,8,3),(96,'Gymnastics','Uckfield','Saturday','08:00:00','09:00:00','Mark',5,8,6),(97,'Handstands','Preston Park','Tuesday','19:00:00','20:00:00','Tom',7,8,4),(98,'Calisthenics','FMG','Wednesday','19:00:00','20:00:00','Tom',6,8,4),(99,'Calisthenics','FMG','Thursday','18:30:00','19:30:00','Tom',6,8,4),(100,'Calisthenics','Wild Park','Sunday','09:00:00','10:00:00','Tom',6,5,4),(101,'Calisthenics','Wild Park','Sunday','10:15:00','11:15:00','Tom',6,1,4),(102,'Handstands & acroyoga','Royal pavilion gardens','Tuesday','17:30:00','19:00:00','Lauren',7,8,9),(103,'Contemporary (general)','Third Ave, Hove','Monday','09:30:00','10:45:00',NULL,4,8,11),(104,'Ballet (beginners/general)','Third Ave, Hove','Monday','18:30:00','19:30:00',NULL,4,8,11),(105,'Contemporary (general/intermediate)','Third Ave, Hove','Monday','19:45:00','21:00:00',NULL,4,8,11),(106,'Contemporary (beginners/improvers)','Third Ave, Hove','Tuesday','18:30:00','19:30:00',NULL,4,2,11),(107,'Contemporary (general)','Third Ave, Hove','Wednesday','09:30:00','10:45:00',NULL,4,8,11),(108,'Ballet (general)','Third Ave, Hove','Friday','12:00:00','13:15:00',NULL,4,8,11),(109,'Contemporary (general)','Third Ave, Hove','Sunday','08:45:00','10:00:00',NULL,4,8,11);
/*!40000 ALTER TABLE `circus_classes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-24 16:33:15
