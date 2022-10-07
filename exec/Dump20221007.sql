-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7a509.p.ssafy.io    Database: imteller_dev
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
-- Table structure for table `art`
--

DROP TABLE IF EXISTS `art`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(256) NOT NULL,
  `owner_nickname` varchar(20) NOT NULL,
  `recent_price` int(11) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  `token_id` bigint(20) DEFAULT NULL,
  `url` varchar(256) NOT NULL,
  `designer_id` bigint(20) NOT NULL,
  `effect_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) NOT NULL,
  `is_vote` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtej85ggwr688lt9v0lix11qd7` (`designer_id`),
  KEY `FKm281liypub8aqj28n51eqsmox` (`effect_id`),
  KEY `FKqhotn286gvm556ni21unma8dn` (`owner_id`),
  CONSTRAINT `FKm281liypub8aqj28n51eqsmox` FOREIGN KEY (`effect_id`) REFERENCES `effect` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKqhotn286gvm556ni21unma8dn` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKtej85ggwr688lt9v0lix11qd7` FOREIGN KEY (`designer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art`
--

LOCK TABLES `art` WRITE;
/*!40000 ALTER TABLE `art` DISABLE KEYS */;
INSERT INTO `art` VALUES (1,'2022-10-06 17:10:01',NULL,'card1','IMTELLER',NULL,'card1',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card1.webp',37,NULL,37,0),(2,'2022-10-06 17:10:01',NULL,'card2','IMTELLER',NULL,'card2',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card2.webp',37,NULL,37,0),(3,'2022-10-06 17:10:01',NULL,'card3','IMTELLER',NULL,'card3',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card3.webp',37,NULL,37,0),(4,'2022-10-06 17:10:01',NULL,'card4','IMTELLER',NULL,'card4',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card4.webp',37,NULL,37,0),(5,'2022-10-06 17:10:01',NULL,'card5','IMTELLER',NULL,'card5',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card5.webp',37,NULL,37,0),(6,'2022-10-06 17:10:01',NULL,'card6','IMTELLER',NULL,'card6',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card6.webp',37,NULL,37,0),(7,'2022-10-06 17:10:01',NULL,'card7','IMTELLER',NULL,'card7',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card7.webp',37,NULL,37,0),(8,'2022-10-06 17:10:01',NULL,'card8','IMTELLER',NULL,'card8',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card8.webp',37,NULL,37,0),(9,'2022-10-06 17:10:01',NULL,'card9','IMTELLER',NULL,'card9',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card9.webp',37,NULL,37,0),(10,'2022-10-06 17:10:01',NULL,'card10','IMTELLER',NULL,'card10',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card10.webp',37,NULL,37,0),(11,'2022-10-06 17:10:01',NULL,'card11','IMTELLER',NULL,'card11',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card11.webp',37,NULL,37,0),(12,'2022-10-06 17:10:01',NULL,'card12','IMTELLER',NULL,'card12',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card12.webp',37,NULL,37,0),(13,'2022-10-06 17:10:01',NULL,'card13','IMTELLER',NULL,'card13',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card13.webp',37,NULL,37,0),(14,'2022-10-06 17:10:01',NULL,'card14','IMTELLER',NULL,'card14',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card14.webp',37,NULL,37,0),(15,'2022-10-06 17:10:01',NULL,'card15','IMTELLER',NULL,'card15',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card15.webp',37,NULL,37,0),(16,'2022-10-06 17:10:01',NULL,'card16','IMTELLER',NULL,'card16',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card16.webp',37,NULL,37,0),(17,'2022-10-06 17:10:01',NULL,'card17','IMTELLER',NULL,'card17',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card17.webp',37,NULL,37,0),(18,'2022-10-06 17:10:01',NULL,'card18','IMTELLER',NULL,'card18',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card18.webp',37,NULL,37,0),(19,'2022-10-06 17:10:01',NULL,'card19','IMTELLER',NULL,'card19',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card19.webp',37,NULL,37,0),(20,'2022-10-06 17:10:01',NULL,'card20','IMTELLER',NULL,'card20',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card20.webp',37,NULL,37,0),(21,'2022-10-06 17:10:01',NULL,'card21','IMTELLER',NULL,'card21',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card21.webp',37,NULL,37,0),(22,'2022-10-06 17:10:01',NULL,'card22','IMTELLER',NULL,'card22',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card22.webp',37,NULL,37,0),(23,'2022-10-06 17:10:01',NULL,'card23','IMTELLER',NULL,'card23',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card23.webp',37,NULL,37,0),(24,'2022-10-06 17:10:01',NULL,'card24','IMTELLER',NULL,'card24',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card24.webp',37,NULL,37,0),(25,'2022-10-06 17:10:01',NULL,'card25','IMTELLER',NULL,'card25',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card25.webp',37,NULL,37,0),(26,'2022-10-06 17:10:01',NULL,'card26','IMTELLER',NULL,'card26',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card26.webp',37,NULL,37,0),(27,'2022-10-06 17:10:01',NULL,'card27','IMTELLER',NULL,'card27',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card27.webp',37,NULL,37,0),(28,'2022-10-06 17:10:01',NULL,'card28','IMTELLER',NULL,'card28',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card28.webp',37,NULL,37,0),(29,'2022-10-06 17:10:01',NULL,'card29','IMTELLER',NULL,'card29',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card29.webp',37,NULL,37,0),(30,'2022-10-06 17:10:01',NULL,'card30','IMTELLER',NULL,'card30',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card30.webp',37,NULL,37,0),(31,'2022-10-06 17:10:01',NULL,'card31','IMTELLER',NULL,'card31',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card31.webp',37,NULL,37,0),(32,'2022-10-06 17:10:01',NULL,'card32','IMTELLER',NULL,'card32',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card32.webp',37,NULL,37,0),(33,'2022-10-06 17:10:01',NULL,'card33','IMTELLER',NULL,'card33',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card33.webp',37,NULL,37,0),(34,'2022-10-06 17:10:01',NULL,'card34','IMTELLER',NULL,'card34',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card34.webp',37,NULL,37,0),(35,'2022-10-06 17:10:01',NULL,'card35','IMTELLER',NULL,'card35',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card35.webp',37,NULL,37,0),(36,'2022-10-06 17:10:01',NULL,'card36','IMTELLER',NULL,'card36',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card36.webp',37,NULL,37,0),(37,'2022-10-06 17:10:01',NULL,'card37','IMTELLER',NULL,'card37',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card37.webp',37,NULL,37,0),(38,'2022-10-06 17:10:01',NULL,'card38','IMTELLER',NULL,'card38',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card38.webp',37,NULL,37,0),(39,'2022-10-06 17:10:01',NULL,'card39','IMTELLER',NULL,'card39',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card39.webp',37,NULL,37,0),(40,'2022-10-06 17:10:01',NULL,'card40','IMTELLER',NULL,'card40',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card40.webp',37,NULL,37,0),(41,'2022-10-06 17:10:01',NULL,'card41','IMTELLER',NULL,'card41',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card41.webp',37,NULL,37,0),(42,'2022-10-06 17:10:01',NULL,'card42','IMTELLER',NULL,'card42',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card42.webp',37,NULL,37,0),(43,'2022-10-06 17:10:01',NULL,'card43','IMTELLER',NULL,'card43',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card43.webp',37,NULL,37,0),(44,'2022-10-06 17:10:01',NULL,'card44','IMTELLER',NULL,'card44',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card44.webp',37,NULL,37,0),(45,'2022-10-06 17:10:01',NULL,'card45','IMTELLER',NULL,'card45',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card45.webp',37,NULL,37,0),(46,'2022-10-06 17:10:01',NULL,'card46','IMTELLER',NULL,'card46',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card46.webp',37,NULL,37,0),(47,'2022-10-06 17:10:01',NULL,'card47','IMTELLER',NULL,'card47',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card47.webp',37,NULL,37,0),(48,'2022-10-06 17:10:01',NULL,'card48','IMTELLER',NULL,'card48',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card48.webp',37,NULL,37,0),(49,'2022-10-06 17:10:01',NULL,'card49','IMTELLER',NULL,'card49',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card49.webp',37,NULL,37,0),(50,'2022-10-06 17:10:01',NULL,'card50','IMTELLER',NULL,'card50',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card50.webp',37,NULL,37,0),(51,'2022-10-06 17:10:01',NULL,'card51','IMTELLER',NULL,'card51',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card51.webp',37,NULL,37,0),(52,'2022-10-06 17:10:01',NULL,'card52','IMTELLER',NULL,'card52',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card52.webp',37,NULL,37,0),(53,'2022-10-06 17:10:01',NULL,'card53','IMTELLER',NULL,'card53',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card53.webp',37,NULL,37,0),(54,'2022-10-06 17:10:01',NULL,'card54','IMTELLER',NULL,'card54',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card54.webp',37,NULL,37,0),(55,'2022-10-06 17:10:01',NULL,'card55','IMTELLER',NULL,'card55',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card55.webp',37,NULL,37,0),(56,'2022-10-06 17:10:01',NULL,'card56','IMTELLER',NULL,'card56',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card56.webp',37,NULL,37,0),(57,'2022-10-06 17:10:01',NULL,'card57','IMTELLER',NULL,'card57',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card57.webp',37,NULL,37,0),(58,'2022-10-06 17:10:01',NULL,'card58','IMTELLER',NULL,'card58',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card58.webp',37,NULL,37,0),(59,'2022-10-06 17:10:01',NULL,'card59','IMTELLER',NULL,'card59',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card59.webp',37,NULL,37,0),(60,'2022-10-06 17:10:01',NULL,'card60','IMTELLER',NULL,'card60',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card60.webp',37,NULL,37,0),(61,'2022-10-06 17:10:01',NULL,'card61','IMTELLER',NULL,'card61',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card61.webp',37,NULL,37,0),(62,'2022-10-06 17:10:01',NULL,'card62','IMTELLER',NULL,'card62',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card62.webp',37,NULL,37,0),(63,'2022-10-06 17:10:01',NULL,'card63','IMTELLER',NULL,'card63',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card63.webp',37,NULL,37,0),(64,'2022-10-06 17:10:01',NULL,'card64','IMTELLER',NULL,'card64',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card64.webp',37,NULL,37,0),(65,'2022-10-06 17:10:01',NULL,'card65','IMTELLER',NULL,'card65',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card65.webp',37,NULL,37,0),(66,'2022-10-06 17:10:01',NULL,'card66','IMTELLER',NULL,'card66',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card66.webp',37,NULL,37,0),(67,'2022-10-06 17:10:01',NULL,'card67','IMTELLER',NULL,'card67',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card67.webp',37,NULL,37,0),(68,'2022-10-06 17:10:01',NULL,'card68','IMTELLER',NULL,'card68',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card68.webp',37,NULL,37,0),(69,'2022-10-06 17:10:01',NULL,'card69','IMTELLER',NULL,'card69',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card69.webp',37,NULL,37,0),(70,'2022-10-06 17:10:01',NULL,'card70','IMTELLER',NULL,'card70',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card70.webp',37,NULL,37,0),(71,'2022-10-06 17:10:01',NULL,'card71','IMTELLER',NULL,'card71',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card71.webp',37,NULL,37,0),(72,'2022-10-06 17:10:01',NULL,'card72','IMTELLER',NULL,'card72',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card72.webp',37,NULL,37,0),(73,'2022-10-06 17:10:01',NULL,'card73','IMTELLER',NULL,'card73',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card73.webp',37,NULL,37,0),(74,'2022-10-06 17:10:01',NULL,'card74','IMTELLER',NULL,'card74',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/card74.webp',37,NULL,37,0),(249,'2022-10-07 02:12:44','2022-10-07 02:20:24.580648','눈동자에 치얼스','MoCCo',NULL,'하늘눈',100,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220206150246-blobtofile.png',41,2,41,0),(250,'2022-10-07 02:12:50','2022-10-07 04:30:40.999362','수컷백조','MoCCo',NULL,'핑크백조',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220204170255-blobtofile.png',41,NULL,41,1),(251,'2022-10-07 02:12:54','2022-10-07 02:20:16.117340','일기예보','MoCCo',NULL,'안개',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20223306003300-blobtofile.png',41,NULL,41,0),(252,'2022-10-07 02:12:56','2022-10-07 02:48:50.607702','양식진주일까','전문가준비생',NULL,'진주귀걸이',101,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221906141915-blobtofile.png',38,10,38,0),(253,'2022-10-07 02:13:51','2022-10-07 02:25:35.682147','내 주식아니다','전문가준비생',NULL,'주식창',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20225006145016-blobtofile.png',38,NULL,38,1),(254,'2022-10-07 02:14:54','2022-10-07 02:27:08.823462','해 지는 바닷가','순혈어린왕자',NULL,'일몰',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220806140825-blobtofile.png',43,NULL,43,1),(255,'2022-10-07 02:15:08','2022-10-07 02:15:08.195550','너무 무서워','순혈어린왕자',NULL,'환공포증',3,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220706150731-blobtofile.png',43,3,43,0),(256,'2022-10-07 02:15:13','2022-10-07 04:01:17.291101','내꺼였으면','전문가준비생',NULL,'그화폐',2,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20223206143259-blobtofile.png',38,14,38,0),(257,'2022-10-07 02:15:37','2022-10-07 04:48:37.395835','시간이 지나면...','전문가준비생',NULL,'모래시계',102,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20223904113944-blobtofile.png',38,12,38,0),(258,'2022-10-07 02:16:38','2022-10-07 05:05:05.253024','감옥감옥','순혈어린왕자',NULL,'셀프감옥',103,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20224806144852-blobtofile.png',43,11,43,0),(259,'2022-10-07 02:20:17','2022-10-07 02:20:16.561209','엠모닝','우아아아앙',NULL,'엠도날드',4,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222306142328-blobtofile.png',44,4,44,0),(260,'2022-10-07 02:20:18','2022-10-07 02:27:06.567295','소설속에서는 나도 주인공이 될 수 있어','아임텔러최고',NULL,'주인공',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20224006144054-blobtofile.png',39,NULL,39,2),(263,'2022-10-07 02:22:26','2022-10-07 02:22:25.630113','칸딘스키','아임텔러최고',NULL,'현대미술',105,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220604170603-blobtofile.png',39,7,39,0),(264,'2022-10-07 02:23:40','2022-10-07 08:35:24.567233','어린왕자','우아아아앙',NULL,'동화',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221504171540-blobtofile.png',44,12,44,0),(265,'2022-10-07 02:24:24','2022-10-07 06:57:20.280444','나는 고독한 아웃사이더 나그네','아임텔러최고',NULL,'나그네',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20225706215720-blobtofile.png',39,NULL,39,0),(266,'2022-10-07 02:25:50','2022-10-07 02:27:14.234062','떡락 멈춰!','우아아아앙',NULL,'떡상',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222706172703-blobtofile.png',44,NULL,44,1),(268,'2022-10-07 05:33:46','2022-10-07 05:35:25.674112','이건뭘까','전문가준비생',NULL,'난장판',5,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20223306203345-blobtofile.png',38,14,38,0),(269,'2022-10-07 05:40:19','2022-10-07 06:23:09.164040','달달 무슨달','전문가준비생',NULL,'보름달',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20224006204018-blobtofile.png',38,NULL,38,1),(270,'2022-10-07 06:03:38','2022-10-07 08:37:36.713920','파란 은하수속의 별','아임텔러최고',NULL,'별별',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220206220256-blobtofile.png',39,14,39,0),(271,'2022-10-07 06:05:53','2022-10-07 09:49:21.260130','영감님','전문가준비생',NULL,'조선시대',14,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220506210552-blobtofile.png',38,11,38,0),(272,'2022-10-07 06:08:53','2022-10-07 06:22:46.662958','여행가고싶다','전문가준비생',NULL,'열기구',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220806210852-blobtofile.png',38,NULL,38,1),(273,'2022-10-07 06:12:30','2022-10-07 09:14:43.052746','사회적 거리두기란?','전문가준비생',120,'따로 또같이',7,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221206211229-blobtofile.png',38,6,38,0),(274,'2022-10-07 06:15:23','2022-10-07 06:23:16.668005','벌집아이스크림','전문가준비생',NULL,'벌집',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221506211523-blobtofile.png',38,NULL,38,1),(275,'2022-10-07 06:19:11','2022-10-07 06:23:20.785599','나나 모르는 사람?','전문가준비생',NULL,'나나',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221906211910-blobtofile.png',38,NULL,38,1),(276,'2022-10-07 06:22:18','2022-10-07 10:47:11.570326','착하게살자','전문가준비생',NULL,'지켜보고있다',15,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222206212217-blobtofile.png',38,11,38,0),(277,'2022-10-07 06:26:44','2022-10-07 10:50:11.764417','황금이 최고다','전문가준비생',NULL,'자본주의',16,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20224907014937-blobtofile.png',38,6,38,0),(278,'2022-10-07 06:32:27','2022-10-07 06:56:32.580982','아이유도 보라색을 좋아한데','아임텔러다',NULL,'핑크보단 보라',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20225606215632-blobtofile.png',51,NULL,51,0),(279,'2022-10-07 06:35:18','2022-10-07 08:36:25.743852','전은 어디','전문가준비생',NULL,'제사',6,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20223506213517-blobtofile.png',38,11,38,0),(280,'2022-10-07 08:18:39','2022-10-07 08:18:38.753007','보기만 해도 기분이 좋아지는 그런 느낌~','나는텔러1',NULL,'웃는얼굴',NULL,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221806231838-blobtofile.png',46,NULL,46,0),(281,'2022-10-07 11:01:33','2022-10-07 11:23:10.654185','뽑기도전','전문가준비생',NULL,'오징어게임',17,'https://imtellercard.s3.ap-northeast-2.amazonaws.com/20220107020132-blobtofile.png',38,12,38,0);
/*!40000 ALTER TABLE `art` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bid_price` int(11) NOT NULL,
  `bid_type` int(11) NOT NULL,
  `bidder_id` bigint(20) NOT NULL,
  `deal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlv3wvxwx62go8g98owtwcbf7k` (`bidder_id`),
  KEY `FK54ay5dl89j7dhhufjci5os6bf` (`deal_id`),
  CONSTRAINT `FK54ay5dl89j7dhhufjci5os6bf` FOREIGN KEY (`deal_id`) REFERENCES `deal` (`id`),
  CONSTRAINT `FKlv3wvxwx62go8g98owtwcbf7k` FOREIGN KEY (`bidder_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (9,'2022-10-07 04:35:56','2022-10-07 04:35:56',20,1,43,19),(10,'2022-10-07 05:07:24','2022-10-07 05:07:24',25,1,38,21),(11,'2022-10-07 06:05:33','2022-10-07 06:05:33',10,1,44,22),(12,'2022-10-07 09:09:01','2022-10-07 09:09:01',10,1,44,24),(13,'2022-10-07 09:14:02','2022-10-07 09:14:02',120,1,38,25);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal`
--

DROP TABLE IF EXISTS `deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  `deal_address` varchar(255) NOT NULL,
  `finished_at` datetime NOT NULL,
  `instant_price` int(11) NOT NULL,
  `low_price` int(11) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `art_id` bigint(20) NOT NULL,
  `final_bid_id` bigint(20) DEFAULT NULL,
  `seller_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6bnyopikx8897yunbkppy1je4` (`art_id`),
  KEY `FKetu3uavfh67iqib490ti5ws3v` (`final_bid_id`),
  KEY `FK9l52iua7n4xtmeebgc1afxlq0` (`seller_id`),
  CONSTRAINT `FK6bnyopikx8897yunbkppy1je4` FOREIGN KEY (`art_id`) REFERENCES `art` (`id`),
  CONSTRAINT `FK9l52iua7n4xtmeebgc1afxlq0` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKetu3uavfh67iqib490ti5ws3v` FOREIGN KEY (`final_bid_id`) REFERENCES `bid` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal`
--

LOCK TABLES `deal` WRITE;
/*!40000 ALTER TABLE `deal` DISABLE KEYS */;
INSERT INTO `deal` VALUES (19,'2022-10-07 04:34:38','2022-10-07 04:35:56.296092','0x52a5a9F1c74609015adF64F6103306B9693831b8','2022-10-09 04:34:39',20,0,'갈망',256,9,38),(20,'2022-10-07 04:49:50','2022-10-07 04:49:49.903457','0x32a1B3eaAA5b50a82A3dd042F3CA13E5cbDa0bf7','2022-10-08 04:49:50',20,0,'하트',257,NULL,38),(21,'2022-10-07 05:06:50','2022-10-07 05:07:23.604316','0x7E044d89119E0A42846eFc7e3865AC4cF7202d15','2022-10-09 05:06:50',25,0,'',258,10,43),(22,'2022-10-07 06:02:56','2022-10-07 06:05:33.108257','0xC577d8228Dd6F6C9fD5B4425206A2dB1159D77cA','2022-10-08 06:02:56',10,0,'현대미술',268,11,38),(23,'2022-10-07 08:38:06','2022-10-07 08:38:06.461952','0x457a97BF10BD73Ed2C53d148e23862df7E7F8893','2022-10-09 08:38:07',10,0,'전통',279,NULL,38),(24,'2022-10-07 09:07:38','2022-10-07 09:09:49.684679','0x0Bea06f3cA9BdC36F56548a117f3543CB42B22AD','2022-10-07 09:09:50',10,0,'오프라인',273,12,38),(25,'2022-10-07 09:13:12','2022-10-07 09:14:43.052560','0xAB0B421b99EEAdAba19600f255796275816aBd79','2022-10-07 09:14:43',120,0,'사회적거리두기',273,13,44),(26,'2022-10-07 11:15:44','2022-10-07 11:15:44.020474','0x3AaF8fEa5549127C52139A736843707f03Bc3346','2022-10-09 11:15:44',25,0,'전통',271,NULL,38),(27,'2022-10-07 11:24:04','2022-10-07 11:24:03.772219','0x6a6530b9d75C350b876361C586cE8D134BCe0d13','2022-10-09 11:24:04',256,0,'영화',281,NULL,38);
/*!40000 ALTER TABLE `deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effect`
--

DROP TABLE IF EXISTS `effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effect` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  `effect` int(11) DEFAULT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `effect_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effect`
--

LOCK TABLES `effect` WRITE;
/*!40000 ALTER TABLE `effect` DISABLE KEYS */;
INSERT INTO `effect` VALUES (1,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',1,'S',10),(2,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',2,'S',60),(3,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',4,'S',3),(4,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',5,'S',250),(5,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',1,'A',7),(6,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',2,'A',40),(7,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',3,'A',0),(8,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',4,'A',2),(9,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',5,'A',200),(10,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',6,'A',0),(11,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',1,'B',5),(12,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',2,'B',20),(13,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',4,'B',1),(14,'2022-09-29 00:59:39','2022-10-07 02:00:13.000000',5,'B',150);
/*!40000 ALTER TABLE `effect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  `session` bigint(20) DEFAULT NULL,
  `is_open` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=596 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (529,'2022-10-07 02:10:59','2022-10-07 02:11:07.616032',0,_binary '\0'),(530,'2022-10-07 02:11:12','2022-10-07 02:12:31.982543',0,_binary '\0'),(531,'2022-10-07 02:48:00','2022-10-07 02:47:59.994126',1,_binary ''),(532,'2022-10-07 03:03:41','2022-10-07 03:03:41.286862',2,_binary ''),(533,'2022-10-07 03:08:26','2022-10-07 03:12:02.746619',0,_binary '\0'),(534,'2022-10-07 03:12:09','2022-10-07 03:21:38.800221',0,_binary '\0'),(535,'2022-10-07 03:14:12','2022-10-07 03:18:34.560175',0,_binary '\0'),(536,'2022-10-07 03:18:50','2022-10-07 03:18:50.148695',4,_binary ''),(537,'2022-10-07 03:21:10','2022-10-07 03:21:09.516070',5,_binary ''),(538,'2022-10-07 03:21:18','2022-10-07 03:21:17.563646',6,_binary ''),(539,'2022-10-07 03:21:34','2022-10-07 03:21:34.074457',7,_binary ''),(540,'2022-10-07 03:21:45','2022-10-07 03:27:20.146366',0,_binary '\0'),(541,'2022-10-07 03:31:02','2022-10-07 03:31:02.325943',3,_binary ''),(542,'2022-10-07 03:34:56','2022-10-07 03:48:59.100504',0,_binary '\0'),(543,'2022-10-07 03:46:13','2022-10-07 03:47:15.909511',0,_binary '\0'),(544,'2022-10-07 03:47:29','2022-10-07 03:48:56.127806',0,_binary '\0'),(545,'2022-10-07 03:50:17','2022-10-07 03:52:03.298914',0,_binary '\0'),(546,'2022-10-07 03:52:06','2022-10-07 03:52:06.147706',8,_binary ''),(547,'2022-10-07 03:55:02','2022-10-07 04:05:54.538625',0,_binary '\0'),(548,'2022-10-07 04:02:53','2022-10-07 04:02:53.479198',10,_binary ''),(549,'2022-10-07 04:23:04','2022-10-07 04:23:03.968537',1,_binary ''),(550,'2022-10-07 04:24:59','2022-10-07 04:24:58.649260',2,_binary ''),(551,'2022-10-07 04:45:23','2022-10-07 04:45:23.012008',3,_binary ''),(552,'2022-10-07 04:50:55','2022-10-07 04:50:55.334732',4,_binary ''),(553,'2022-10-07 04:57:34','2022-10-07 04:57:33.880984',5,_binary ''),(554,'2022-10-07 04:59:07','2022-10-07 04:59:07.362706',6,_binary ''),(555,'2022-10-07 05:02:41','2022-10-07 05:02:41.259084',7,_binary ''),(556,'2022-10-07 05:05:02','2022-10-07 05:05:01.767577',8,_binary ''),(557,'2022-10-07 05:09:26','2022-10-07 05:09:25.878409',9,_binary ''),(558,'2022-10-07 05:12:41','2022-10-07 05:12:40.906811',10,_binary ''),(559,'2022-10-07 05:13:18','2022-10-07 05:13:18.099408',11,_binary ''),(560,'2022-10-07 05:14:13','2022-10-07 05:14:12.723489',12,_binary ''),(561,'2022-10-07 05:15:34','2022-10-07 05:15:33.606593',1,_binary ''),(562,'2022-10-07 05:15:49','2022-10-07 05:15:49.045475',13,_binary ''),(563,'2022-10-07 05:15:55','2022-10-07 05:15:55.054473',2,_binary ''),(564,'2022-10-07 05:20:15','2022-10-07 05:20:15.190412',14,_binary ''),(565,'2022-10-07 05:21:19','2022-10-07 05:21:23.402140',0,_binary '\0'),(566,'2022-10-07 05:21:36','2022-10-07 05:28:41.393374',0,_binary '\0'),(567,'2022-10-07 05:29:08','2022-10-07 05:29:07.918868',15,_binary ''),(568,'2022-10-07 05:29:52','2022-10-07 05:31:24.124805',0,_binary '\0'),(569,'2022-10-07 05:30:48','2022-10-07 05:30:48.262581',1,_binary ''),(570,'2022-10-07 05:33:11','2022-10-07 05:33:11.244299',2,_binary ''),(571,'2022-10-07 05:43:48','2022-10-07 05:43:48.053862',1,_binary ''),(572,'2022-10-07 05:51:18','2022-10-07 05:51:18.137363',2,_binary ''),(573,'2022-10-07 06:00:33','2022-10-07 06:00:33.110939',3,_binary ''),(574,'2022-10-07 06:10:14','2022-10-07 06:10:13.792022',3,_binary ''),(575,'2022-10-07 06:10:45','2022-10-07 06:10:44.922163',4,_binary ''),(576,'2022-10-07 06:12:12','2022-10-07 06:12:12.203985',5,_binary ''),(577,'2022-10-07 06:17:32','2022-10-07 06:17:31.690865',6,_binary ''),(578,'2022-10-07 06:24:56','2022-10-07 06:24:55.614088',7,_binary ''),(579,'2022-10-07 07:39:46','2022-10-07 07:39:45.692461',1,_binary ''),(580,'2022-10-07 08:28:02','2022-10-07 08:28:01.571512',2,_binary ''),(581,'2022-10-07 08:44:39','2022-10-07 08:44:38.796854',1,_binary ''),(582,'2022-10-07 08:54:14','2022-10-07 08:54:13.718987',2,_binary ''),(583,'2022-10-07 08:55:13','2022-10-07 08:55:12.528122',3,_binary ''),(584,'2022-10-07 08:55:36','2022-10-07 08:55:35.590108',4,_binary ''),(585,'2022-10-07 08:59:55','2022-10-07 08:59:55.484057',5,_binary ''),(586,'2022-10-07 09:08:10','2022-10-07 09:08:09.865887',6,_binary ''),(587,'2022-10-07 09:18:17','2022-10-07 09:18:16.735196',7,_binary ''),(588,'2022-10-07 09:39:39','2022-10-07 09:39:38.783484',8,_binary ''),(589,'2022-10-07 09:42:15','2022-10-07 09:42:15.167348',9,_binary ''),(590,'2022-10-07 09:44:22','2022-10-07 09:44:22.308142',10,_binary ''),(591,'2022-10-07 09:47:40','2022-10-07 09:47:39.858260',11,_binary ''),(592,'2022-10-07 09:53:08','2022-10-07 09:53:07.920997',12,_binary ''),(593,'2022-10-07 10:16:39','2022-10-07 10:16:39.301146',13,_binary ''),(594,'2022-10-07 10:21:50','2022-10-07 10:21:49.683679',14,_binary ''),(595,'2022-10-07 10:37:00','2022-10-07 10:36:59.549312',15,_binary '');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `exp` int(11) DEFAULT '0',
  `lose` int(11) DEFAULT '0',
  `nickname` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  `profile` varchar(256) NOT NULL,
  `wallet` varchar(256) DEFAULT NULL,
  `win` int(11) DEFAULT '0',
  `level` int(11) DEFAULT '1',
  `winning_rate` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (37,'2022-10-06 17:05:40',NULL,'IMTELLER',0,0,'IMTELLER','$2a$10$gdNdcXiqO3vfPLcHNex3deOnS.OHVv.BoHmFMTC63Ay48Wa7pGbEa','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png','',0,0,-1),(38,'2022-10-07 02:06:16','2022-10-07 10:44:54.037439','whiterisi@naver.com',158,5,'전문가준비생','$2a$10$j3wTuHp6wyEmBwp3LKngbOYcaapejteIp95fOJ9E1.uqO6Vjin22q','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221106171102-KakaoTalk_20220905_173345449_04.jpg','0xc37d13b5523c1d80ba15ddfa5cd3bd1abb482aaf',7,4,58.333333333333336),(39,'2022-10-07 02:07:15','2022-10-07 11:10:37.541718','classic',175,15,'아임텔러최고','$2a$10$TdtSv7D2OOF9igngQZimSOQpjZBlctfhzPMul3JkeTTIII/BAJLAm','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222306182336-프로필.jpg','0x6b0d0410a414B20ec6c622F95f16df766F89Fc47',5,4,25),(40,'2022-10-07 02:08:12','2022-10-07 02:10:04.986271','gwhiterisi@gmail.com',0,0,'죠르디좋아','$2a$10$mFw.SVpWhtK/S5ZTh6KM6eDykl6yZJj..o4Sz6fkzu5JhnABnmDmy','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221006171004-화면 캡처 2022-10-07 020720.png',NULL,0,1,0),(41,'2022-10-07 02:08:25','2022-10-07 11:10:28.160506','kd8317@naver.com',212,32,'MoCCo','$2a$10$lYBKZ2Ai8O5ka4PDQ0jnG.k13wyduN3qgac8C.GxP885iTZFCTyva','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222806172840-unknown.png',NULL,10,5,23.809523809523807),(43,'2022-10-07 02:11:31','2022-10-07 10:25:58.198782','thgusdud123@gmail.com',28,2,'순혈어린왕자','$2a$10$SLplH1VAQWO4eqkxbbVY1.kjKl4Uualb0jjQttjRKg/05YOH2loXm','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222906182929-Screen Shot 2022-10-07 at 3.28.48 AM.png','0xd921ed176d08a76f448e8c221a3a5ab1a4bf4944',0,1,0),(44,'2022-10-07 02:13:24','2022-10-07 11:10:28.147567','dlscjs8646@gmail.com',225,27,'우아아아앙','$2a$10$UWqgG.Um5EX75dOyYxopFuMRSsy8j08Q8s3kOnKwzea2gOhwuz97a','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20221406171412-메타몽.jpg','0xb9a8b2f1f9766ba33eb044b080c369b147ef10a1',13,5,32.5),(45,'2022-10-07 03:04:49','2022-10-07 09:52:35.968735','kd8317@gmail.com',68,12,'TESTER','$2a$10$4s.vMuUYPzUe5AJNAbLIXed7bTfJJC5cH9epXpUG/PWigUEbyZCr6','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,8,2,40),(46,'2022-10-06 18:06:18','2022-10-07 11:10:28.153955','teller1@gmail.com',32,9,'나는텔러1','$2a$10$rRWwQn.WZEaCqBawAKRELudL7YpNVl7.WEFbBEztNLe1y1V41YmB.','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,4,1,30.76923076923077),(47,'2022-10-06 18:06:18',NULL,'teller2@gmail.com',0,0,'나는텔러2','$2a$10$rRWwQn.WZEaCqBawAKRELudL7YpNVl7.WEFbBEztNLe1y1V41YmB.','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,1,0),(48,'2022-10-06 18:06:18','2022-10-07 06:26:10.623853','teller3@gmail.com',36,1,'나는텔러3','$2a$10$rRWwQn.WZEaCqBawAKRELudL7YpNVl7.WEFbBEztNLe1y1V41YmB.','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,1,1,50),(49,'2022-10-06 18:06:18',NULL,'teller4@gmail.com',0,0,'나는텔러4','$2a$10$rRWwQn.WZEaCqBawAKRELudL7YpNVl7.WEFbBEztNLe1y1V41YmB.','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,1,0),(50,'2022-10-06 18:09:22',NULL,'teller5@gmail.com',0,0,'나는텔러5','$2a$10$rRWwQn.WZEaCqBawAKRELudL7YpNVl7.WEFbBEztNLe1y1V41YmB.','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,0,1,0),(51,'2022-10-07 03:16:32','2022-10-07 09:51:36.969056','metamask',18,3,'아임텔러다','$2a$10$NB0klljGGPwe2spbQCRqf./Ptp6/0zjCzcu.DNNEOYecJE/CZEsT6','https://imtellercard.s3.ap-northeast-2.amazonaws.com/20222406182401-MetaMask_Fox.svg.png',NULL,1,1,25),(52,'2022-10-07 05:25:46','2022-10-07 05:58:18.985783','whiterisi@daum.net',38,1,'minji','$2a$10$LM9d6s7ey8BGQyj2jZ62aOpWqOZNBa6Lj7yTWg.ot/FFkh2Lw9.BG','https://imtellercard.s3.ap-northeast-2.amazonaws.com/null.png',NULL,1,1,50);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vote`
--

DROP TABLE IF EXISTS `user_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` bigint(20) DEFAULT NULL,
  `vote_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2q50phs57njg6g0qvha1r8703` (`user_id`),
  KEY `FK9ebaimystehh1phnsgrtql67k` (`vote_id`),
  CONSTRAINT `FK2q50phs57njg6g0qvha1r8703` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK9ebaimystehh1phnsgrtql67k` FOREIGN KEY (`vote_id`) REFERENCES `vote` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vote`
--

LOCK TABLES `user_vote` WRITE;
/*!40000 ALTER TABLE `user_vote` DISABLE KEYS */;
INSERT INTO `user_vote` VALUES (114,'2022-10-07 02:23:09','2022-10-07 02:23:09',41,23),(115,'2022-10-07 02:23:10','2022-10-07 02:23:10',41,24),(116,'2022-10-07 02:24:00','2022-10-07 02:24:00',41,25),(120,'2022-10-07 02:27:23','2022-10-07 02:27:23',39,24),(121,'2022-10-07 02:27:24','2022-10-07 02:27:24',39,26),(122,'2022-10-07 02:27:25','2022-10-07 02:27:25',39,28),(124,'2022-10-07 02:27:28','2022-10-07 02:27:28',39,30),(126,'2022-10-07 02:28:50','2022-10-07 02:28:50',43,28),(127,'2022-10-07 02:28:56','2022-10-07 02:28:56',38,28),(128,'2022-10-07 02:29:00','2022-10-07 02:29:00',44,28),(129,'2022-10-07 02:30:08','2022-10-07 02:30:08',41,28),(130,'2022-10-07 04:33:15','2022-10-07 04:33:15',41,32),(131,'2022-10-07 05:15:54','2022-10-07 05:15:54',38,32),(132,'2022-10-07 06:08:27','2022-10-07 06:08:27',39,29),(133,'2022-10-07 06:08:28','2022-10-07 06:08:28',39,32),(134,'2022-10-07 09:03:20','2022-10-07 09:03:20',41,30),(135,'2022-10-07 09:03:32','2022-10-07 09:03:32',41,37),(136,'2022-10-07 10:16:32','2022-10-07 10:16:32',44,30);
/*!40000 ALTER TABLE `user_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `count` int(11) DEFAULT '0',
  `is_voting` int(11) DEFAULT NULL,
  `art_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfqdyclxmxyyft8p0exsevflv7` (`art_id`),
  CONSTRAINT `FKfqdyclxmxyyft8p0exsevflv7` FOREIGN KEY (`art_id`) REFERENCES `art` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (23,'2022-09-07 02:22:29','2022-10-07 02:48:51',1,0,252),(24,'2022-09-07 02:22:39','2022-10-07 04:30:18',2,0,250),(25,'2022-09-07 02:23:50','2022-10-06 17:32:12',1,0,256),(26,'2022-09-07 02:25:36','2022-10-06 17:32:12',1,1,253),(27,'2022-09-07 02:26:15','2022-10-06 17:32:12',0,0,266),(28,'2022-09-07 02:27:07','2022-10-06 17:32:12',5,2,260),(29,'2022-09-07 02:27:09','2022-10-07 06:08:27',1,1,254),(30,'2022-09-07 02:27:14','2022-10-07 10:16:32',3,1,266),(31,'2022-10-07 02:49:04','2022-10-07 04:42:29',0,0,257),(32,'2022-10-07 04:30:41','2022-10-07 06:08:28',3,1,250),(33,'2022-10-07 06:22:47','2022-10-07 06:22:47',0,1,272),(34,'2022-10-07 06:22:56','2022-10-07 10:46:46',0,0,276),(35,'2022-10-07 06:23:09','2022-10-07 06:23:09',0,1,269),(36,'2022-10-07 06:23:17','2022-10-07 06:23:17',0,1,274),(37,'2022-10-07 06:23:21','2022-10-07 09:03:32',1,1,275),(38,'2022-10-07 06:26:47','2022-10-07 10:47:43',0,0,277);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 11:27:55
