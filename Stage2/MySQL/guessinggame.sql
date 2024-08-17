-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 17, 2024 at 04:21 PM
-- Server version: 8.3.0
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guessinggame`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `score` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`game_id`),
  KEY `users.user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `user_id`, `score`, `start_time`, `end_time`) VALUES
(1, 1, 6, '2024-08-16 22:00:00', '2024-08-16 23:07:49'),
(2, 1, 6, '2024-08-16 23:08:15', '2024-08-16 23:10:24'),
(3, 2, 8, '2024-08-17 19:02:25', '2024-08-17 19:03:00'),
(4, 5, 3, '2024-08-17 21:30:33', '2024-08-17 21:30:52'),
(5, 5, 13, '2024-08-17 21:32:56', '2024-08-17 21:34:27'),
(6, 2, 6, '2024-08-17 22:35:12', '2024-08-17 22:35:36'),
(7, 2, 12, '2024-08-17 22:35:46', '2024-08-17 22:38:33'),
(8, 2, 6, '2024-08-17 22:44:31', '2024-08-17 22:44:45'),
(9, 2, 7, '2024-08-17 22:44:50', '2024-08-17 22:45:23'),
(10, 2, 7, '2024-08-17 22:46:35', '2024-08-17 22:48:59'),
(11, 2, 8, '2024-08-17 23:07:23', '2024-08-17 23:12:56'),
(13, 7, 5, '2024-08-17 23:41:51', '2024-08-17 23:42:21'),
(14, 7, 7, '2024-08-17 23:42:30', '2024-08-17 23:42:59'),
(15, 7, 15, '2024-08-17 23:43:05', '2024-08-17 23:46:18'),
(16, 8, 5, '2024-08-17 23:53:23', '2024-08-17 23:53:53'),
(17, 8, 6, '2024-08-17 23:54:11', '2024-08-17 23:55:32'),
(18, 2, 7, '2024-08-18 00:18:45', '2024-08-18 00:19:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `nickname`, `password`) VALUES
(1, 'abdalghany', 'dada', '12345'),
(2, 'loral', 'Loral', '852'),
(5, 'alaa', 'lolo', '123456'),
(7, 'alaa', 'lolo', '1234'),
(8, 'Lolly', 'Lolla', '789'),
(9, 'Sofia', 'Sofia Sabrina', 'Sabri56'),
(10, 'Sabrina', 'Sofia Sabrina', 'Sofia89');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
