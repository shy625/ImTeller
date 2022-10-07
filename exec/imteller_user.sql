-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7a509.p.ssafy.io    Database: imteller
-- ------------------------------------------------------
-- Server version	5.7.39

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(256) NOT NULL,
  `exp` int(11) DEFAULT '0',
  `level` int(11) DEFAULT '1',
  `lose` int(11) DEFAULT '0',
  `nickname` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  `profile` varchar(256) NOT NULL,
  `wallet` varchar(256) DEFAULT NULL,
  `win` int(11) DEFAULT '0',
  `winning_rate` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-10-05 23:48:07','2022-10-05 23:48:07','IMTELLER',0,1,0,'IMTELLER','$2a$10$gdNdcXiqO3vfPLcHNex3deOnS.OHVv.BoHmFMTC63Ay48Wa7pGbEa','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png','',0,0),(2,'2022-10-07 01:18:00','2022-10-07 01:18:39','kd8317@naver.com',0,NULL,0,'MoCCo','$2a$10$jaL/t9erKzpKa4lZpW/IcegbOpIbdakd5wwaYlPV7.pG9PplJX7HC','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,NULL),(3,'2022-10-07 01:36:27','2022-10-07 01:36:27','whiterisi@naver.com',0,NULL,0,'minji','$2a$10$91H7XFU80CmeOQRPGPgj1OqPrToG8xq.BhGFasZg5x.yq.s0vFdQm','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,NULL),(4,'2022-10-07 01:36:58','2022-10-07 01:36:58','rawoon@kakao.com',0,NULL,0,'rawoon','$2a$10$Sfu.fwpgaasBmiiJ7zYi6eJhiHwuQoqmpJE4HwddK2oxO2aDw26B2','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,NULL),(5,'2022-10-07 01:38:17','2022-10-07 01:38:17','thgusdud123@gmail.com',0,NULL,0,'shyshyshy','$2a$10$AqRbZOX/9mUF4HLdNKQrRu3jfA3/Ewt.ypCFEaU5lmI1G2NJ3j2wu','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  1:43:03
