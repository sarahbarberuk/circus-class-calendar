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
  `school_name` varchar(255) DEFAULT NULL,
  `class_location` varchar(255) DEFAULT NULL,
  `day_of_week` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `level_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  KEY `fk_level` (`level_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `class_category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_level` FOREIGN KEY (`level_id`) REFERENCES `class_level` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circus_classes`
--

LOCK TABLES `circus_classes` WRITE;
/*!40000 ALTER TABLE `circus_classes` DISABLE KEYS */;
INSERT INTO `circus_classes` VALUES (1,'Pole','Pole Lab','The Pole Lab','Saturday','10:00:00',NULL,NULL,1,2),(2,'Pole','Pole Lab','The Pole Lab','Sunday','10:00:00',NULL,NULL,1,8),(3,'Pole','Pole Lab','The Pole Lab','Monday','12:00:00',NULL,NULL,1,8),(4,' Pole','Pole Lab','The Pole Lab','Monday','20:00:00',NULL,NULL,1,1),(5,'Splits','Pole Lab','The Pole Lab','Tuesday','12:00:00',NULL,NULL,3,8),(6,'Online Flex','Pole Lab','Online','Wednesday','18:30:00',NULL,'Carolyn',3,8),(7,'Whole Body Flex','Pole Lab','The Pole Lab','Friday','08:00:00',NULL,'Carolyn',3,8),(8,'Silks','Studio4AllDance','Studio4AllDance','Wednesday','13:00:00','14:00:00','Tam',2,1),(9,'Ballet','Studio4AllDance','Studio4AllDance','Sunday','13:00:00','14:00:00',NULL,4,1),(10,'Mixed Aerial','Brighton Aerial Arts','Brighton Aerial Arts','Tuesday','18:00:00','19:00:00',NULL,2,8),(11,'Aerial Hoop - Low Flow','Brighton Aerial Arts','Brighton Aerial Arts','Tuesday','19:00:00','20:00:00',NULL,2,3),(12,'Aerial Hoop - Low Flow','Brighton Aerial Arts','Brighton Aerial Arts','Tuesday','20:00:00','21:00:00',NULL,2,5),(13,'Aerial Hoop drop in','Brighton Aerial Arts','Brighton Aerial Arts','Wednesday','18:00:00','19:00:00',NULL,2,2),(14,'Aerial hoop drop in','Brighton Aerial Arts','Brighton Aerial Arts','Wednesday','19:00:00','20:00:00',NULL,2,4),(15,'Pole','Gemini Pole','Gemini Pole','Tuesday','19:45:00','20:45:00',NULL,1,1),(16,'Pole','Gemini Pole','Gemini Pole','Wednesday','18:30:00','19:30:00',NULL,1,1),(17,'Flexibility','Gemini Pole','Gemini Pole','Thursday','18:00:00','19:30:00','Moll',3,8),(18,'Musical Theatre Jazz','South East Dance','The Dance Space','Monday','18:15:00',NULL,NULL,4,8),(19,'Contemporary Ballet','South East Dance','The Dance Space','Tuesday','18:00:00',NULL,NULL,4,8),(20,'Contemporary','South East Dance','The Dance Space','Tuesday','19:00:00',NULL,NULL,4,1),(21,'Contemporary','South East Dance','The Dance Space','Tuesday','20:00:00',NULL,NULL,4,3),(22,'Ballet','South East Dance','The Dance Space','Wednesday','18:00:00',NULL,NULL,4,8),(23,'Contemporary','South East Dance','The Dance Space','Wednesday','19:00:00',NULL,NULL,4,8),(24,'Brighton Broadway Tap','South East Dance','The Dance Space','Thursday','20:00:00',NULL,NULL,4,8),(25,'Stretch and Strength Flexibility','South East Dance','The Dance Space','Thursday','18:00:00',NULL,NULL,3,8),(32,'Calisthenics','Joe Wilcox','Sea Lanes','Thursday','19:30:00',NULL,NULL,6,8),(33,'Handstands','Joe Wilcox','Sea Lanes','Sunday','11:00:00','13:00:00',NULL,7,8),(34,'Aerial','The Circus Project Hangleton','The Circus Project Hangleton','Monday','19:30:00','21:00:00',NULL,2,5),(35,'Aerial','The Circus Project Hangleton','The Circus Project Hangleton','Tuesday','18:45:00','20:00:00',NULL,2,2),(36,'Aerial','The Circus Project Hangleton','The Circus Project Hangleton','Friday','11:45:00','13:00:00',NULL,2,2),(37,'Aerial Open Training','The Circus Project Hangleton','The Circus Project Hangleton','Friday','11:45:00','13:45:00',NULL,2,8),(74,'Aerial Pilates','Blue Moon','Stanley Deason','Monday','10:00:00','11:15:00','Kellie',2,8),(75,'Silks and Rope','Blue Moon','Stanley Deason','Monday','11:30:00','12:45:00','Tam',2,1),(76,'Strap loops','Blue Moon','Stanley Deason','Monday','13:00:00','14:30:00','Tam',2,4),(77,'Circus Fit','Blue Moon','Stanley Deason','Tuesday','11:30:00','12:30:00','Tam',8,8),(78,'Silks','Blue Moon','Stanley Deason','Tuesday','12:45:00','14:00:00','Tam',2,4),(79,'Flexibility','Blue Moon','Stanley Deason','Tuesday','18:00:00','19:00:00','Moll',3,8),(80,'Silks','Blue Moon','Stanley Deason','Tuesday','19:00:00','20:30:00','Kellie',2,6),(81,'Aerial Hoop','Blue Moon','Stanley Deason','Wednesday','13:00:00','14:30:00','Sita',2,1),(82,'Open practice - Rope and Silks','Blue Moon','Moulescoomb','Wednesday','17:45:00','19:50:00',NULL,2,8),(83,'Silk loop','Blue Moon','Stanley Deason','Wednesday','18:00:00','19:15:00','Tam',2,1),(84,'Silk loop','Blue Moon','Stanley Deason','Wednesday','19:15:00','20:45:00','Tam',2,4),(85,'Trapeze','Blue Moon','Stanley Deason','Thursday','18:00:00','19:15:00','Kellie',2,1),(86,'Trapeze','Blue Moon','Stanley Deason','Thursday','19:15:00','20:45:00','Kellie',2,4),(87,'Open practice - Rope and Silks','Blue Moon','Moulescoomb','Friday','18:00:00','21:00:00',NULL,2,8),(88,'Rope','Blue Moon','Stanley Deason','Friday','18:00:00','19:30:00','Kellie/Tam',2,3),(89,'Silks','Blue Moon','Stanley Deason','Friday','19:30:00','21:00:00','Kellie/Tam',2,3),(90,'Rope and silks','Blue Moon','Stanley Deason','Saturday','13:00:00','14:15:00','Kellie',2,1),(91,'Rope','Blue Moon','Stanley Deason','Sunday','12:00:00','13:30:00','Emily',2,5),(92,'Handstands & Calisthenics','Energy for life','Queens Park','Saturday','08:15:00','09:15:00','Ben',7,8),(93,'Gymnastics - open training','Wickers Gymnastics','Lancing','Wednesday','20:15:00','21:45:00','Spencer',5,8),(94,'Gymnastics','Wickers Gymnastics','Lancing','Thursday','10:00:00','11:30:00','Richard',5,8),(95,'Gymnastics','Brighton Gymnastics','Brighton Girls School','Thursday','20:00:00','21:15:00',NULL,5,8),(96,'Gymnastics','Fun Abounds','Uckfield','Saturday','08:00:00','09:00:00','Mark',5,8),(97,'Handstands','Calisthenics Brighton','Preston Park','Tuesday','19:00:00','20:00:00','Tom',7,8),(98,'Calisthenics','Calisthenics Brighton','FMG','Wednesday','19:00:00','20:00:00','Tom',6,8),(99,'Calisthenics','Calisthenics Brighton','FMG','Thursday','18:30:00','19:30:00','Tom',6,8),(100,'Calisthenics','Calisthenics Brighton','Wild Park','Sunday','09:00:00','10:00:00','Tom',6,5),(101,'Calisthenics','Calisthenics Brighton','Wild Park','Sunday','10:15:00','11:15:00','Tom',6,1),(102,'Handstands & acroyoga','Lauren acroyoga','Royal pavilion gardens','Tuesday','17:30:00','19:00:00','Lauren',7,8),(103,'Contemporary (general)','Smikle Dance','Third Ave, Hove','Monday','09:30:00','10:45:00',NULL,4,8),(104,'Ballet (beginners/general)','Smikle Dance','Third Ave, Hove','Monday','18:30:00','19:30:00',NULL,4,8),(105,'Contemporary (general/intermediate)','Smikle Dance','Third Ave, Hove','Monday','19:45:00','21:00:00',NULL,4,8),(106,'Contemporary (beginners/improvers)','Smikle Dance','Third Ave, Hove','Tuesday','18:30:00','19:30:00',NULL,4,2),(107,'Contemporary (general)','Smikle Dance','Third Ave, Hove','Wednesday','09:30:00','10:45:00',NULL,4,8),(108,'Ballet (general)','Smikle Dance','Third Ave, Hove','Friday','12:00:00','13:15:00',NULL,4,8),(109,'Contemporary (general)','Smikle Dance','Third Ave, Hove','Sunday','08:45:00','10:00:00',NULL,4,8);
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

-- Dump completed on 2024-08-24 15:03:31
