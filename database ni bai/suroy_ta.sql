-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 08:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suroy_ta`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(3, 'Cityscape'),
(1, 'Landscape'),
(2, 'Seascape');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `promotionid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`, `promotionid`) VALUES
(12, 35, 3, 'This is an updated test commentsss. ahahah', '2024-11-25 09:40:12', NULL),
(54, NULL, 2, 'wow this is nice', '2024-12-03 14:26:25', 8),
(55, NULL, 2, 'this place is amazing', '2024-12-03 14:26:45', 6),
(56, NULL, 2, 'wow hahaha', '2024-12-03 14:27:09', 6),
(57, NULL, 2, 'sheeshh\n', '2024-12-03 15:44:06', 7),
(59, 48, 2, 'sure ba', '2024-12-04 02:22:26', NULL),
(60, 45, 2, 'ahhh', '2024-12-04 02:53:03', NULL),
(61, NULL, 2, 'ahh', '2024-12-04 05:01:43', 7),
(62, 46, 3, 'ahhaaa', '2024-12-04 07:14:31', NULL),
(71, 48, 2, 'gwapaaa', '2024-12-04 13:27:54', NULL),
(72, 48, 2, 'asaka', '2024-12-06 03:17:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `promotion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `user_id`, `created_at`, `promotion_id`) VALUES
(6, 34, 3, '2024-11-25 21:51:06', NULL),
(16, 35, 3, '2024-11-25 22:11:19', NULL),
(18, 42, 2, '2024-11-25 22:11:45', NULL),
(21, 34, 2, '2024-11-25 23:30:27', NULL),
(24, 42, 3, '2024-11-29 08:16:57', NULL),
(28, 34, 7, '2024-11-29 14:39:50', NULL),
(29, 33, 8, '2024-11-29 14:55:01', NULL),
(31, 46, 6, '2024-11-30 04:25:18', NULL),
(32, 45, 2, '2024-12-01 20:54:41', NULL),
(33, 48, 2, '2024-12-02 06:31:09', NULL),
(34, 43, 2, '2024-12-03 19:02:59', NULL),
(78, 28, 2, '2024-12-03 20:59:35', NULL),
(80, NULL, 2, '2024-12-03 20:59:50', 6),
(81, NULL, 2, '2024-12-03 21:18:15', 7),
(89, 46, 3, '2024-12-03 21:46:25', NULL),
(95, NULL, 3, '2024-12-03 22:02:34', 7),
(96, NULL, 3, '2024-12-03 22:16:56', 6),
(97, NULL, 3, '2024-12-03 22:27:17', 8),
(100, NULL, 3, '2024-12-04 01:03:31', 11);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `views` int(11) DEFAULT 0,
  `destination` varchar(255) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `title`, `content`, `created_at`, `category_id`, `image_url`, `likes`, `views`, `destination`, `latitude`, `longitude`) VALUES
(28, 3, 'hahaha abnoaaaa', '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, similique temporibus, minus nemo expedita facilis repudiandae distinctio est quam esse quisquam voluptatem ipsum quasi harum! Totam hic ullam reiciendis itaque!\r\n', '2024-11-23 18:47:38', 3, '/uploads/1732414828629.jpg', 0, 0, NULL, NULL, NULL),
(33, 3, 'Basilica', '⁦It is the oldest Roman Catholic church ⁩⁦in⁩⁦ the country, allegedly built on the spot where the image of the Santo Niño de ⁩⁦Cebú⁩⁦ was found.⁩', '2024-11-24 02:20:28', 1, '/uploads/1732414828629.jpg', 0, 0, 'Cebu City', NULL, NULL),
(34, 3, 'Ayala Mall', '⁦The best of the Queen ⁩⁦City⁩⁦ of the South, in one place. ⁩⁦Ayala Center Cebu⁩⁦ offers retail, dining, and entertainment options that are unparalleled in the South.⁩', '2024-11-24 02:47:02', 3, '/uploads/1732416422797.jpg,/uploads/1732416422798.jpg,/uploads/1732416422799.jpg', 0, 0, 'Cebu City', NULL, NULL),
(35, 2, 'TOPS Cebu Nindot Kasuroyan ', 'Tops⁩⁦ opened its doors in January 1, 1985. ⁩⁦Tops⁩⁦ is a mountain lookout and events venue with sweeping panoramic views of ⁩⁦Cebu City⁩.', '2024-11-24 07:09:31', 1, '/uploads/1732432171476.jpg,/uploads/1732432171477.jpg,/uploads/1732432171480.jpg', 0, 0, 'Naga City', NULL, NULL),
(42, 2, 'Padagat sa Moalboal', 'dsadasdas', '2024-11-26 00:52:40', 2, '/uploads/1732582360403.jpg,/uploads/1732582360409.jpg,/uploads/1732582360414.jpg', 0, 0, 'Carcar City', NULL, NULL),
(43, 2, 'Sugbo Mercado Food court', 'Sugbo Mercado\'s It Park, There\'a a lot of food stalls you can choose here with a very affordable price!', '2024-11-26 06:22:04', 1, '/uploads/1732602124195.jpg,/uploads/1732602124197.jpg,/uploads/1732602124198.jpg', 0, 0, 'Cebu City', NULL, NULL),
(45, 2, 'Cebu Ocean Park', 'Overall I think this place is a really good park you visit. Read more. Review of: Cebu Ocean Park. Written July 25, 2024. This review is the subjective opinion', '2024-11-28 13:56:27', 3, '/uploads/1732802187847.jfif,/uploads/1732802187848.jpg', 0, 0, 'Cebu City', NULL, NULL),
(46, 6, 'The mountain of Valley!', 'I was in this wonderful place in the south og naga city! With my families and friends', '2024-11-28 14:44:36', 1, '/uploads/1732805076583.jpg', 0, 0, 'Naga City', NULL, NULL),
(48, 2, 'Solea Mactan Resort', 'Bounded by pristine beaches, Solea Mactan Cebu Resort offers an outflow from the typical atmosphere of the city by taking you away from the wearisome of urban', '2024-12-02 14:20:11', 3, '/uploads/1733149211118.jpg,/uploads/1733149211123.jpg', 0, 0, 'Cordova', 10.254413, 123.960223);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `destination` text NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`id`, `title`, `description`, `start_date`, `end_date`, `created_at`, `updated_at`, `destination`, `author_id`, `latitude`, `longitude`) VALUES
(6, 'New Year Sale', 'Discounts on all products this New Year!', '2024-12-15', '2024-12-31', '2024-12-02 11:27:12', '2024-12-02 11:27:12', 'Cordova', 2, NULL, NULL),
(7, 'Solea Mactan Resort PROMO', 'Our rooms and suites offer relaxing views of the sea and our garden. Designed with trendy art decors that are locally sourced and modern amenities that will ...\r\n', '2024-12-18', '2024-12-28', '2024-12-02 11:37:56', '2024-12-02 11:37:56', 'Cordova', 2, NULL, NULL),
(8, 'NUSTAR Resort & Casino PROMO DON\'T MISS OUT', 'NUSTAR Fili Holiday Escape — Elevate Your Stay With Distinct Luxury, Efficient Service, & Joyful Nature At Fili Hotel. Experience Comfort And Care At Fili Hotel, Where Filipino Hospitality Shines Brightly.', '2024-12-19', '2024-12-31', '2024-12-02 12:27:53', '2024-12-03 01:59:14', 'Cebu City', 2, 10.27164015, 123.88111557466704),
(11, 'SM Seaside City Cebu PROMO SALE', 'SM Seaside City, is a large shopping mall owned and developed by SM Prime Holdings in South Road Properties, Cebu City, Philippines. The mall opened on November 27, 2015, exactly 22 years after SM City Cebu, another mall also owned by SM Prime in Cebu City, opened in 1993. ', '2024-12-20', '2024-12-31', '2024-12-03 15:48:29', '2024-12-03 15:48:29', 'Cebu City', 3, 10.28182623962326, 123.88232409954072);

-- --------------------------------------------------------

--
-- Table structure for table `promotion_images`
--

CREATE TABLE `promotion_images` (
  `id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotion_images`
--

INSERT INTO `promotion_images` (`id`, `promotion_id`, `image_url`) VALUES
(7, 6, '/uploads/1733138832496-ayala.jpg'),
(8, 7, '/uploads/1733139476560-2023-09-20.jpg'),
(9, 7, '/uploads/1733139476561-unnamed (1).jpg'),
(10, 7, '/uploads/1733139476563-20201231_195528.jpg'),
(11, 8, '/uploads/1733142473857-IMG_20230102_183142.jpg'),
(12, 8, '/uploads/1733142473861-2022-11-11.jpg'),
(13, 8, '/uploads/1733142473862-2024-12-02.jpg'),
(14, 8, '/uploads/1733142473866-2021-02-18.jpg'),
(19, 11, '/uploads/1733240909728-2022-12-27.jpg'),
(20, 11, '/uploads/1733240909731-unnamed (2).jpg'),
(21, 11, '/uploads/1733240909734-20191208_101745.jpg'),
(22, 11, '/uploads/1733240909737-20221125_200629.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL,
  `rating_value` int(11) NOT NULL CHECK (`rating_value` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`rating_id`, `user_id`, `post_id`, `promotion_id`, `rating_value`, `created_at`) VALUES
(1, 2, 35, NULL, 5, '2024-12-04 06:42:18'),
(8, 3, NULL, 6, 4, '2024-12-04 06:56:26'),
(9, 3, NULL, 8, 5, '2024-12-04 07:07:31'),
(12, 3, 48, NULL, 5, '2024-12-04 07:44:04'),
(13, 3, NULL, 7, 3, '2024-12-04 08:34:37'),
(14, 3, NULL, 11, 3, '2024-12-04 08:42:42'),
(15, 3, 33, NULL, 3, '2024-12-04 09:21:53'),
(16, 3, 46, NULL, 2, '2024-12-04 10:24:15'),
(17, 2, 48, NULL, 3, '2024-12-06 05:49:03');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','resolved','ignored') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `user_id`, `post_id`, `comment_id`, `promotion_id`, `reason`, `status`, `created_at`, `updated_at`) VALUES
(10, 2, 48, NULL, NULL, 'Inappropriate consatent', 'pending', '2024-12-04 11:19:54', '2024-12-04 11:19:54'),
(11, 2, 35, NULL, NULL, 'Inappropriate consatent', 'pending', '2024-12-04 11:20:30', '2024-12-04 11:20:30'),
(12, 2, NULL, 12, NULL, 'Inappropriate consatent', 'pending', '2024-12-04 11:21:02', '2024-12-04 11:21:02'),
(13, 2, NULL, NULL, 6, 'Inappropriate consatent', 'pending', '2024-12-04 11:21:34', '2024-12-04 11:21:34'),
(14, 2, NULL, NULL, 6, 'Inappropriate consatent', 'pending', '2024-12-04 11:39:44', '2024-12-04 11:39:44'),
(16, 2, 28, NULL, NULL, 'Inappropriate consatent', 'pending', '2024-12-04 11:43:51', '2024-12-04 11:43:51'),
(18, 2, 48, NULL, NULL, 'way polos', 'pending', '2024-12-04 11:52:31', '2024-12-04 11:52:31'),
(19, 2, 33, NULL, NULL, 'balik balik ang pic\n', 'pending', '2024-12-04 12:07:02', '2024-12-04 12:07:02'),
(20, 2, 45, NULL, NULL, 'atay', 'pending', '2024-12-04 12:15:25', '2024-12-04 12:15:25'),
(22, 2, 28, NULL, NULL, 'askanaaaa', 'pending', '2024-12-04 12:19:26', '2024-12-04 12:19:26'),
(23, 2, NULL, NULL, 6, 'hahahhahah', 'pending', '2024-12-04 12:33:42', '2024-12-04 12:33:42'),
(24, 2, NULL, 71, NULL, 'tinood', 'pending', '2024-12-04 13:41:03', '2024-12-04 13:41:03'),
(25, 2, NULL, 71, NULL, 'askana', 'pending', '2024-12-04 13:56:06', '2024-12-04 13:56:06'),
(26, 2, NULL, 71, NULL, 'tinood oy gwapa jd ni sha crush nako', 'pending', '2024-12-04 13:56:34', '2024-12-04 13:56:34'),
(27, 2, NULL, 55, NULL, 'amazing sa imong nawng', 'pending', '2024-12-04 13:59:30', '2024-12-04 13:59:30'),
(28, 2, NULL, 56, NULL, 'sure ba', 'pending', '2024-12-04 14:00:13', '2024-12-04 14:00:13'),
(29, 2, NULL, 55, NULL, 'gagaga', 'pending', '2024-12-04 14:00:55', '2024-12-04 14:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_photo` varchar(255) DEFAULT NULL,
  `bio` text NOT NULL,
  `user_type` enum('Admin','Regular') NOT NULL DEFAULT 'Regular'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`, `profile_photo`, `bio`, `user_type`) VALUES
(1, 'testuser', 'testuser@example.com', '$2a$10$sVEEit8MSwa573Y8P1tIbeWtifMGqpuYA4mwYaGcX5Pohof0Jwzrm', '2024-11-23 15:27:44', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s', '', 'Regular'),
(2, 'junjun', 'jungil@gmail.com', '$2a$10$IvrrjblamVwfjvHG1qZnHeK0if9OX2ek4WTTIOM5vufIGyFYbXxGq', '2024-11-23 15:41:10', '/uploads/1732920679554.jfif', 'Owner of Solea Resort', 'Admin'),
(3, 'Rovielyn', 'rovielyn@gmail.com', '$2a$10$QNGUwZkSuIpAODJR0VTuSOmJbo1O9WdP/WQXJzKcZmQ2EpV4/eUqS', '2024-11-23 16:02:37', '/uploads/1732541180271.png', 'bio nata', 'Regular'),
(4, 'junjun', 'jungilcasquejo5@gmail.com', '$2a$10$ve21E8tnmZzNGgLD5ixdx.IIF6y6kQbCKkhIC4UjNR5lRV.TQRSTO', '2024-11-26 09:40:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s', '', 'Regular'),
(6, 'renzz', 'renz@gmail.com', '$2a$10$ilNtBWFCtL6E4nQE2sOygu/rHjn7pnZv8iUFmtrc/DikmQmUGIIvi', '2024-11-28 14:38:43', '/uploads/1732969492341.jfif', '', 'Admin'),
(7, 'user', 'user@gmaiol.com', '$2a$10$4ebwZeSzlaubjjBH81gaO.OPFEx960kpwJz163NDcwoiIoNXL08BG', '2024-11-29 22:39:07', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s', 'iam a traveler in USA', 'Regular'),
(8, 'niko', 'nika@gmail.com', '$2a$10$wmHvsi2mKUggvW6p7k/uxOaD260ayiVZYNvrHMMLRvuNrNfPhaMg2', '2024-11-29 22:52:46', '/uploads/1732920829460.jpg', 'iam a follower', 'Regular');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_promotion` (`promotionid`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_author` (`author_id`);

--
-- Indexes for table `promotion_images`
--
ALTER TABLE `promotion_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `fk_user_rating` (`user_id`),
  ADD KEY `fk_post_rating` (`post_id`),
  ADD KEY `fk_promotion_rating` (`promotion_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `promotion_images`
--
ALTER TABLE `promotion_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_promotionid` FOREIGN KEY (`promotionid`) REFERENCES `promotion` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_promotion` FOREIGN KEY (`promotionid`) REFERENCES `promotion` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_promotion_id` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `promotion_images`
--
ALTER TABLE `promotion_images`
  ADD CONSTRAINT `promotion_images_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_post_rating` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_promotion_rating` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_rating` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`),
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
