-- MariaDB dump 10.19-11.3.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: angular
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AccountLogins`
--

DROP TABLE IF EXISTS `AccountLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccountLogins` (
  `account_name` char(120) NOT NULL,
  `login_token` varchar(120) NOT NULL,
  `expiration_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_name`,`login_token`),
  UNIQUE KEY `login_token_UNIQUE` (`login_token`),
  CONSTRAINT `fk_account_login` FOREIGN KEY (`account_name`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Accounts` (
  `account_name` varchar(120) NOT NULL,
  `login_hash` varchar(120) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`account_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Challenges`
--

DROP TABLE IF EXISTS `Challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Challenges` (
  `challenge_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `challenge_name` varchar(80) DEFAULT NULL,
  `challenge_description` text DEFAULT NULL,
  `schedule_mode` varchar(45) DEFAULT NULL,
  `schedule_date` varchar(45) DEFAULT NULL,
  `schedule_period` int(11) DEFAULT NULL,
  `schedule_selection` varchar(120) DEFAULT NULL,
  `assigned_to` varchar(120) DEFAULT NULL,
  `needs_scheduling` char(1) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  PRIMARY KEY (`challenge_id`,`group_id`),
  UNIQUE KEY `challenge_id_UNIQUE` (`challenge_id`),
  KEY `fk_Challenges_Account_idx` (`assigned_to`),
  KEY `fk_Challenges_Group_idx` (`group_id`),
  CONSTRAINT `fk_Challenges_Account` FOREIGN KEY (`assigned_to`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Challenges_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GroupInvitations`
--

DROP TABLE IF EXISTS `GroupInvitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GroupInvitations` (
  `group_id` int(11) NOT NULL,
  `account_name` varchar(120) DEFAULT NULL,
  `invitation_code` varchar(60) NOT NULL,
  PRIMARY KEY (`invitation_code`),
  UNIQUE KEY `invitation_code_UNIQUE` (`invitation_code`),
  KEY `fk_account_idx` (`account_name`),
  KEY `fk_group` (`group_id`),
  CONSTRAINT `fk_account` FOREIGN KEY (`account_name`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GroupMembers`
--

DROP TABLE IF EXISTS `GroupMembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GroupMembers` (
  `group_id` int(11) NOT NULL,
  `account_name` varchar(120) NOT NULL,
  `group_role` varchar(45) DEFAULT NULL,
  `membership_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`membership_id`),
  UNIQUE KEY `membership_ip_UNIQUE` (`membership_id`),
  KEY `fk_GroupMembers_1_idx` (`account_name`),
  KEY `fk_GroupMembers_2_idx` (`group_id`),
  CONSTRAINT `fk_GroupMembers_1` FOREIGN KEY (`account_name`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_GroupMembers_2` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Groups`
--

DROP TABLE IF EXISTS `Groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HeroSkills`
--

DROP TABLE IF EXISTS `HeroSkills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HeroSkills` (
  `hero_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `account_name` varchar(120) DEFAULT NULL,
  `skill_value` int(11) DEFAULT NULL,
  `skill_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`hero_id`,`skill_id`),
  KEY `fk_HeroSkills_Account_idx` (`account_name`),
  KEY `fk_HeroSkills_Group_idx` (`group_id`),
  CONSTRAINT `fk_HeroSkills_Account` FOREIGN KEY (`account_name`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HeroSkills_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HeroSkills_Hero` FOREIGN KEY (`hero_id`) REFERENCES `Heros` (`hero_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Heros`
--

DROP TABLE IF EXISTS `Heros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Heros` (
  `hero_id` int(11) NOT NULL AUTO_INCREMENT,
  `hero_name` varchar(120) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `account_name` varchar(120) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`hero_id`),
  KEY `fk_Heros_Groups_idx` (`group_id`),
  KEY `fk_Heros_Accounts_idx` (`account_name`),
  CONSTRAINT `fk_Heros_Accounts` FOREIGN KEY (`account_name`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Heros_Groups` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Skills`
--

DROP TABLE IF EXISTS `Skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Skills` (
  `skill_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `skill_value` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `account_name` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`skill_id`,`challenge_id`),
  KEY `fk_Skills_Challenge_idx` (`challenge_id`),
  KEY `fk_Skills_Group_idx` (`group_id`),
  CONSTRAINT `fk_Skills_Challenge` FOREIGN KEY (`challenge_id`) REFERENCES `Challenges` (`challenge_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Skills_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tasks`
--

DROP TABLE IF EXISTS `Tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `assigned_to` varchar(120) DEFAULT NULL,
  `due_date` varchar(45) DEFAULT NULL,
  `task_name` varchar(80) DEFAULT NULL,
  `task_description` text DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `task_id_UNIQUE` (`task_id`),
  KEY `fk_Tasks_Group_idx` (`group_id`),
  KEY `fk_Tasks_Account_idx` (`assigned_to`),
  CONSTRAINT `fk_Tasks_Account` FOREIGN KEY (`assigned_to`) REFERENCES `Accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tasks_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 22:47:34
