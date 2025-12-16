-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 14 fév. 2024 à 15:34
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `receipt_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_12_21_133504_create_receipts_table', 2),
(6, '2024_02_14_141941_add_cheque_details_to_receipt', 3);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `receipts`
--

CREATE TABLE `receipts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomComplet` varchar(255) NOT NULL,
  `paymentType` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `dossierNumber` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `classe` varchar(255) NOT NULL,
  `paymentReason` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `chequeDetails` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `receipts`
--

INSERT INTO `receipts` (`id`, `nomComplet`, `paymentType`, `date`, `dossierNumber`, `amount`, `phoneNumber`, `classe`, `paymentReason`, `created_at`, `updated_at`, `chequeDetails`) VALUES
(1, 'mohamed junior cherif', 'Espèce', '2023-08-21', '23-24 CYB01', '400000', '-', 'L1', 'INS', '2024-01-10 20:20:53', '2024-01-10 20:20:53', NULL),
(2, 'abdallah ndiaye', 'Espèce', '2023-09-19', 'CAT/373/1458', '795000', '-', 'L2', 'INS+TEN+3M', '2024-01-10 20:22:16', '2024-01-10 20:22:16', NULL),
(3, 'abdoul kader madior fall', 'Espèce', '2023-09-22', '23-24 CYB02', '575000', '-', 'L1', 'INS+1M+1TEN', '2024-01-10 20:27:16', '2024-01-10 20:27:16', NULL),
(4, 'sokhna fatoumata bintou kounta', 'Espèce', '2023-09-17', '23-24 CYB03', '575000', '773996387', 'L1', 'INS+TEN+M', '2024-01-11 18:11:36', '2024-01-11 18:11:36', NULL),
(5, 'baka georges chancel', 'Espèce', '2023-09-27', '23-24 CYB04', '500000', '-', 'L2', 'INS', '2024-01-10 20:38:12', '2024-01-10 20:38:12', NULL),
(7, 'aminata dia', 'Espèce', '2023-10-12', '23-24 CYB05', '450000', '-', 'M1', 'ins', '2024-01-11 18:17:49', '2024-01-11 18:17:49', NULL),
(8, 'adji fatou kane', 'Espèce', '2023-10-16', '23-24 CYB06', '100000', '-', 'M1', 'AVANCE INS', '2024-01-11 18:21:08', '2024-01-11 18:21:08', NULL),
(9, 'mohamed junior cherif', 'Espèce', '2023-10-17', '23-24 CYB01', '65000', '779994477', 'L1', 'ten', '2024-01-11 18:26:50', '2024-01-11 18:26:50', NULL),
(10, 'iloy ndoua nathan yann', 'Espèce', '2023-10-26', '23-24 CYB06', '650000', '772836194', 'L1', 'INS+1M', '2024-01-15 11:21:01', '2024-01-15 11:21:01', NULL),
(11, 'colette raymond mbouki', 'Chèque', '2023-10-26', 'CAT/373/0954', '615000', '778038188', 'L2', 'RINS+M1+TEN+AM2', '2024-01-15 11:22:38', '2024-01-15 11:22:38', NULL),
(12, 'ndeye khady fall', 'Espèce', '2023-10-30', 'CAT/373/LC2/239\n', '400000', '-', 'L3', 'INS', '2024-01-15 11:23:35', '2024-01-15 11:23:35', NULL),
(13, 'abdou khadre dieng', 'Espèce', '2023-10-30', 'CAT/373/LC1/1221', '400000', '785916354', 'L2', 'INS', '2024-01-15 11:24:49', '2024-01-15 11:24:49', NULL),
(14, 'abdoul kader madior fall', 'Espèce', '2023-11-01', '23-24 CYB02', '175000', '772827204', 'L1', '1M+TEN', '2024-01-15 11:26:35', '2024-01-15 11:26:35', NULL),
(15, 'mohamed junior cherif', 'Espèce', '2023-11-03', '23-24 CYB01', '110000', '-', 'L1', 'Mensualite', '2024-01-15 11:28:42', '2024-01-15 11:28:42', NULL),
(16, 'abdourahmane diouf', 'Chèque', '2023-11-06', '23-24 CYB09', '600000', '772596818', 'M1', 'INS+M1', '2024-01-15 11:30:42', '2024-01-15 11:30:42', NULL),
(17, 'sokhna fatoumata bintou kounta', 'Espèce', '2023-11-06', '23-24 CYB03', '110000', '-', 'L1', 'M2', '2024-01-15 11:32:17', '2024-01-15 11:32:17', NULL),
(18, 'adji mareme soda diallo', 'Espèce', '2023-11-08', 'CAT/373/LC1/1512', '575000', '-', 'L2', 'INS+TEN+1M', '2024-01-15 11:34:53', '2024-01-15 11:34:53', NULL),
(19, 'cheikh ahmed tidiane cherif dieng', 'Espèce', '2023-11-08', '23-24 CYB10', '250000', '773098454', 'M1', 'TR INS', '2024-01-15 11:38:50', '2024-01-15 11:38:50', NULL),
(20, 'abdou  salam aidara', 'Espèce', '2023-11-13', '23-24 CYB11', '465000', '-', 'L1', 'INS+TENUE', '2024-01-15 11:43:39', '2024-01-15 11:43:39', NULL),
(21, 'awa diagne', 'Chèque', '2023-11-15', 'CAT/373/1115', '510000', '-', 'L3', 'INS+M1', '2024-01-15 11:44:59', '2024-01-15 11:44:59', NULL),
(22, 'el haj ibra guisse', 'Espèce', '2023-11-15', 'CAT/373/1712', '150000', '-', 'L2', 'AVANCE INS', '2024-01-15 11:48:43', '2024-01-15 11:48:43', NULL),
(23, 'asta boye', 'Chèque', '2023-11-15', 'CAT/373/LC1/1221', '100000', '-', 'L2', 'AVANCE INS', '2024-01-15 11:50:00', '2024-01-15 11:50:00', NULL),
(24, 'marame thiewe sakho', 'Espèce', '2023-11-17', 'CAT/373/-', '150000', '762019605', 'L1', 'AVANCE INS', '2024-01-15 11:51:08', '2024-01-15 11:51:08', NULL),
(25, 'mekoue massah', 'Espèce', '2023-11-20', 'CAT/373/0959', '100000', '777232666', 'L2', 'TR1 REINS', '2024-01-15 11:52:17', '2024-01-15 11:52:17', NULL),
(26, 'babacar fall', 'Espèce', '2023-11-27', '23-24 CYB12', '400000', '778543579', 'L2', 'INSCRIPTION', '2024-01-15 11:54:33', '2024-01-15 11:54:33', NULL),
(27, 'adji fatou kane', 'Espèce', '2023-12-04', 'CAT/373/1403', '200000', '-', 'L3', 'COMP INS', '2024-01-15 11:58:46', '2024-01-15 11:58:46', NULL),
(28, 'mekoue massah', 'Espèce', '2023-12-04', 'CAT/373/0959', '410000', '-', 'L2', 'COMP INS+ M1', '2024-01-15 12:01:17', '2024-01-15 12:01:17', NULL),
(29, 'abdou salam aidara', 'Espèce', '2023-12-04', '23-24 CYB11', '110000', '-', 'L1', 'M1', '2024-01-15 12:04:31', '2024-01-15 12:04:31', NULL),
(30, 'sakho marame thiewe', 'Espèce', '2023-12-04', '23-24 CYB12', '210000', '-', 'L1', '1M+ AV2 INS', '2024-01-15 12:06:12', '2024-01-15 12:06:12', NULL),
(31, 'mohamed junior cherif', 'Espèce', '2023-12-04', '23-24 CYB01', '110000', '-', 'L1', 'MENSUALITE', '2024-01-15 12:07:01', '2024-01-15 12:07:01', NULL),
(32, 'mariama balde', 'Espèce', '2023-12-05', '23-24 CYB07', '400000', '-', 'L1', 'INSCRIPTION', '2024-01-15 12:09:43', '2024-01-15 12:09:43', NULL),
(33, 'babacar fall', 'Espèce', '2023-12-05', '23-24 CYB12', '140000', '-', 'L2', 'M1+AV TEN', '2024-01-15 12:10:47', '2024-01-15 12:10:47', NULL),
(34, 'el haj ibra guisse', 'Espèce', '2023-12-05', 'CAT/373/1712', '100000', '-', 'L2', 'Mensualite', '2024-01-15 12:16:36', '2024-01-15 12:16:36', NULL),
(35, 'coumba diongue', 'Espèce', '2023-12-06', '23-24 CYB', '200000', '-', 'L3', 'AVANCE INS', '2024-01-15 12:17:57', '2024-01-15 12:17:57', NULL),
(36, 'iloy ndoua nathan yann', 'Espèce', '2023-12-06', '23-24 CYB06', '150000', '-', 'L1', 'Mensualite', '2024-01-15 12:19:12', '2024-01-15 12:19:12', NULL),
(37, 'abdoul kader madior fall', 'Espèce', '2023-12-07', '23-24 CYB02', '110000', '-', 'L1', 'Mensualite', '2024-01-15 12:20:51', '2024-01-15 12:20:51', NULL),
(38, 'serigne mbacke sokhna lo', 'Espèce', '2023-12-07', '23-24 CYB14', '400000', '-', 'L3', 'INSCRIPTION', '2024-01-15 12:23:07', '2024-01-15 12:23:07', NULL),
(39, 'ndeye fatou niasse', 'Chèque', '2023-12-11', '23-24 CYB15', '221000', '-', 'L3', 'AVANCE INS', '2024-01-15 12:24:16', '2024-01-15 12:24:16', NULL),
(40, 'adji mareme soda diallo', 'Espèce', '2023-12-12', 'CAT/373/1512', '110000', '-', 'L2', 'Mensualite', '2024-01-15 12:25:09', '2024-01-15 12:25:09', NULL),
(41, 'asta boye', 'Chèque', '2023-12-13', 'CAT/373/LC1/1221', '90000', '-', 'L2', 'Mensualite', '2024-01-15 12:27:16', '2024-01-15 12:27:16', NULL),
(42, 'asta boye', 'Espèce', '2023-12-13', 'CAT/373/LC1/1221', '20000', '-', 'L2', 'COMP Mensualite', '2024-01-15 12:28:27', '2024-01-15 12:28:27', NULL),
(43, 'ndeye fatou ba', 'Espèce', '2023-12-13', 'CAT/373/1624', '110000', '-', 'L2', 'SOUTENANCE', '2024-01-15 12:31:01', '2024-01-15 12:31:01', NULL),
(44, 'darluche po nianga', 'Espèce', '2023-12-14', 'CAT/373/LC2/1501', '300000', '-', 'L3', 'AVANCE INS', '2024-01-15 12:32:01', '2024-01-15 12:32:01', NULL),
(45, 'maurice samuel ndour', 'Espèce', '2023-12-15', '23-24 CYB16', '450000', '-', 'M1', 'INSCRIPTION', '2024-01-15 12:37:38', '2024-01-15 12:37:38', NULL),
(46, 'dadi mahamat ben mahamad', 'Espèce', '2023-12-15', 'CAT/373/1310', '1000000', '-', 'M2', 'Mensualite', '2024-01-15 12:40:02', '2024-01-15 12:40:02', NULL),
(47, 'donga rosely c.d.', 'Espèce', '2023-12-21', '23-24 CYB18', '500000', '-', 'M1', 'INSCRIPTION', '2024-01-15 12:41:04', '2024-01-15 12:41:04', NULL),
(48, 'babacar fall', 'Espèce', '2023-12-22', '23-24 CYB12', '140000', '-', 'L2', 'M2+ AV TEN', '2024-01-15 12:42:01', '2024-01-15 12:42:01', NULL),
(49, 'hassime ba', 'Chèque', '2023-12-25', '23-24 CYB17', '600000', '781242628', 'M1', 'INS+M1', '2024-01-15 12:43:10', '2024-01-15 12:43:10', NULL),
(50, 'cheikh atab djiba', 'Espèce', '2023-12-27', 'CAT/373/1301', '105000', '-', 'M2', 'SOUTENANCE+ COMP CEH', '2024-01-15 12:45:23', '2024-01-15 12:45:23', NULL),
(51, 'marien bassene', 'Espèce', '2023-12-29', 'CAT/373/1543', '65000', '-', 'M1', 'COMP CEH', '2024-01-15 12:47:03', '2024-01-15 12:47:03', NULL),
(52, 'dominique ndour', 'Espèce', '2023-12-29', 'CAT/373/1230', '135000', '-', 'L3', 'COMP M9+ M10', '2024-01-15 12:48:21', '2024-01-15 12:48:21', NULL),
(53, 'mouhamadou lamine ba', 'Espèce', '2023-11-09', 'CAT/373lLC1/1416', '575000', '778500075', 'L2', 'INS+M+TEN', '2024-01-16 15:20:26', '2024-01-16 15:20:26', NULL),
(54, 'abdoul kader madior fall', 'Espèce', '2024-01-02', '23-24 CYB02', '110000', '-', 'L1', 'M4', '2024-01-24 16:35:32', '2024-01-24 16:35:32', NULL),
(55, 'marame thiewe sakho', 'Espèce', '2024-01-02', '23-24 CYB12', '210000', '-', 'L1', 'M2+ AV INS', '2024-01-24 16:48:38', '2024-01-24 16:48:38', NULL),
(56, 'ibrahima khalilou lahi samb', 'Espèce', '2024-01-03', '23-24 CYB19', '250000', '774833358', 'L3', 'INSCRIPTION', '2024-01-24 16:50:24', '2024-01-24 16:50:24', NULL),
(57, 'Souleymane Seck', 'Espèce', '2024-01-09', '23-24 CYB21', '120000', '773949117', 'M1', 'AVANCE INS', '2024-01-26 14:41:42', '2024-01-26 14:41:42', NULL),
(58, 'ndeye khady diagne', 'Espèce', '2024-01-08', '23-24 CYB20', '600000', '-', 'M1', 'INS+M1', '2024-01-26 14:43:14', '2024-01-26 14:43:14', NULL),
(59, 'abdou salam aidara', 'Espèce', '2024-01-08', '23-24 CYB11', '110000', '-', 'L1', 'Mensualite', '2024-01-26 14:46:48', '2024-01-26 14:46:48', NULL),
(60, 'mouhamadou lamine ba', 'Espèce', '2024-01-09', 'CAT/373/LC1/1214', '110000', '-', 'L2', 'Mensualite 2', '2024-01-26 14:47:48', '2024-01-26 14:47:48', NULL),
(61, 'abdou khadre dieng', 'Espèce', '2024-01-09', 'CAT/373/', '110000', '-', 'L2', 'AVANCE M1 (non)', '2024-01-26 14:49:15', '2024-01-26 14:49:15', NULL),
(62, 'adji mareme diallo', 'Espèce', '2024-01-09', 'CAT/373/1512', '110000', '-', 'L2', 'Mensualite 3', '2024-01-26 14:50:15', '2024-01-26 14:50:15', NULL),
(63, 'moussa diaw', 'Espèce', '2024-01-09', '23-24 CYB22', '450000', '-', 'M1', 'INSCRIPTION', '2024-01-26 14:50:55', '2024-01-26 14:50:55', NULL),
(64, 'sokhna fatoumata bintou kounta', 'Espèce', '2024-01-10', '23-24 CYB03', '280000', '-', 'L1', 'M3 + M4 + AV M5', '2024-01-26 14:51:52', '2024-01-26 14:51:52', NULL),
(65, 'mohamed junior cherif', 'Espèce', '2024-01-10', '23-24 CYB01', '110000', '-', 'L1', 'Mensualite 3', '2024-01-26 14:52:34', '2024-01-26 14:52:34', NULL),
(66, 'mamadou ba', 'Espèce', '2024-01-10', '23-24 CYB23', '450000', '-', 'M1', 'INSCRIPTION', '2024-01-26 14:53:14', '2024-01-26 14:53:14', NULL),
(67, 'baka georges chancel', 'Espèce', '2024-01-10', '23-24 CYB04', '150000', '-', 'L2', 'Mensualite 1', '2024-01-26 14:54:28', '2024-01-26 14:54:28', NULL),
(68, 'colette raymond mbouki', 'Chèque', '2024-01-10', 'CAT/373/0954', '180000', '-', 'L2', 'Comp M2 + M3', '2024-01-26 14:55:48', '2024-01-26 14:55:48', NULL),
(69, 'serigne mbacke sokhna lo', 'Espèce', '2024-01-10', '23-24 CYB14', '130000', '-', 'L3', 'Mensualite 1', '2024-01-26 14:58:17', '2024-01-26 14:58:17', NULL),
(70, 'dominique ndour', 'Espèce', '2024-01-12', 'CAT/373/1230', '100000', '-', 'M1', 'AVANCE INSCRIPTION', '2024-01-26 14:59:00', '2024-01-26 14:59:00', NULL),
(71, 'cheikh ndiaye', 'Espèce', '2024-01-12', '23-24 CYB24', '100000', '-', 'L3', 'AVANCE INSCRIPTION', '2024-01-26 14:59:45', '2024-01-26 14:59:45', NULL),
(72, 'adji fatou kane', 'Espèce', '2024-01-12', 'CAT/373/1403', '75000', '-', 'L3', 'Mensualite 1', '2024-01-26 15:01:01', '2024-01-26 15:01:01', NULL),
(73, 'el haj ibra guisse', 'Espèce', '2024-01-15', 'CAT/373/1712', '90000', '-', 'L2', 'AVANCE M2', '2024-01-26 15:02:19', '2024-01-26 15:02:19', NULL),
(74, 'baba ibrahima pam', 'Espèce', '2024-01-15', 'CAT/373/1258', '400000', '-', 'M1', 'INSCRIPTION', '2024-01-26 15:06:18', '2024-01-26 15:06:18', NULL),
(75, 'asta boye', 'Chèque', '2024-01-17', 'CAT/373/1221', '190000', '-', 'L3', 'AV INS 2 + M2', '2024-01-26 15:07:21', '2024-01-26 15:07:21', NULL),
(76, 'iloy ndoua nathan yann', 'Espèce', '2024-01-19', '23-24 CYB06', '150000', '-', 'L2', 'Mensualite 3', '2024-01-26 15:08:07', '2024-01-26 15:08:07', NULL),
(77, 'mekoue massah', 'Espèce', '2024-01-19', 'CAT/373/0959', '165000', '-', 'L2', 'TEN + AV M2', '2024-01-26 15:09:39', '2024-01-26 15:09:39', NULL),
(78, 'ndeye khady fall', 'Espèce', '2024-01-22', 'CAT/373/1239', '115000', '-', 'L3', 'Mensualite 1', '2024-01-26 15:20:46', '2024-01-26 15:20:46', NULL),
(79, 'baka georges chancel', 'Espèce', '2024-01-22', '23-24 CYB04', '300000', '-', 'L2', 'M2 + M3', '2024-01-26 15:21:51', '2024-01-26 15:21:51', NULL),
(80, 'Mouhamadou Moustapha DIOP', 'Espèce', '2024-01-22', 'CAT/373/1233', '100000', '-', 'M1', 'AVANCE INSCRIPTION', '2024-01-26 15:23:22', '2024-01-26 15:23:22', NULL),
(84, 'BABACAR FALL', 'Espèce', '2024-02-01', '23-24CYB12', '145000', '778543579', 'L2', '3e MENSUALITE(120 000)+COMP TENUE (25 000)', '2024-02-01 15:25:04', '2024-02-01 15:25:04', NULL),
(85, 'Souleymane Seck', 'Espèce', '2024-02-01', '23-24 CYB21', '180000', '773949117', 'M1', '2e TRANCHE INSCRIPTION', '2024-02-01 15:38:58', '2024-02-01 15:38:58', NULL),
(89, 'MOUHAMED JUNIOR CHERIF', 'Espèce', '2024-02-02', '23-24CYB01', '110000', '-', 'L1', 'PAIEMENT 4e MENSUALITE', '2024-02-06 17:19:13', '2024-02-06 17:19:13', NULL),
(90, 'NATHAN YANN NDOUA ILOY', 'Espèce', '2024-02-02', '23-24CYB06', '150000', '-', 'M1', 'PAIEMENT 4e MENSUALITE', '2024-02-06 17:26:21', '2024-02-06 17:26:21', NULL),
(91, 'MAURICE SAMUEL NDOUR', 'Espèce', '2024-02-06', '23-24CYB16', '150000', '-', 'M1', 'PAIEMENT 1ere MENSUALITE', '2024-02-06 17:29:01', '2024-02-06 17:29:01', NULL),
(92, 'NDEYE FATOU BA', 'Espèce', '2024-02-06', 'CAT/373/1624', '150000', '-', 'M1', 'AVNACE INSCRIP (40 000) + 1ERE MENSUALITE (110 000)', '2024-02-06 18:09:57', '2024-02-06 18:09:57', NULL),
(93, 'CHEIKH NDIAYE', 'Espèce', '2024-02-07', '23-24CYB24', '180000', '77 078 42 23', 'L3', '2e AVANCE INSCRIPTION (100 000)+ 1er MENSUALITE (80 000 )', '2024-02-07 16:54:59', '2024-02-07 16:54:59', NULL),
(95, 'HASSIM BA', 'Chèque', '2024-02-07', '23-24CYB17', '150000', '78 124 2628', 'M1', 'PAIEMENT 1ere MENSUALITE', '2024-02-07 17:27:47', '2024-02-07 17:27:47', NULL),
(96, 'MAME ASTA BOYE', 'Chèque', '2024-02-07', 'CAT/373/1221', '90000', '77 850 17 64', 'L2', 'PAIEMENT 3e Mensualite', '2024-02-07 17:48:25', '2024-02-07 17:48:25', NULL),
(97, 'MOUHAMAD ABDALLAH NDIAYE', 'Chèque', '2024-02-07', 'CAT/373/1458', '330000', '-', 'L2', 'PAIEMENT 4e ; 5e et 6e MENSUALITE', '2024-02-07 18:04:58', '2024-02-07 18:04:58', NULL),
(98, 'SERIGNE HABIB SY', 'Espèce', '2024-02-07', 'CAT/373/1157', '130000', '-', 'M1', 'AVANCE INS (20 000)+ 1ere Mensualité (110 000)', '2024-02-07 18:44:31', '2024-02-07 18:44:31', NULL),
(99, 'ABDOU KADER MADIOR FALL', 'Espèce', '2024-02-07', '23-24CYB02', '110000', '-', 'L1', 'PAIEMENT 5eme MENSUALITE', '2024-02-07 18:47:42', '2024-02-07 18:47:42', NULL),
(100, 'ABDOU SALAM AIDARA', 'Espèce', '2024-02-07', '23-24CYB11', '110000', '-', 'L1', 'PAIEMENT 3e Mensualité', '2024-02-07 19:04:02', '2024-02-07 19:04:02', NULL),
(101, 'IBRAHIMA KHALILOU LAHI SAMB', 'Espèce', '2024-02-07', '23-24-CYB19', '80000', '77 483 33 58', 'L3', 'PAIEMENT 1ere Mensualité', '2024-02-07 19:29:33', '2024-02-07 19:29:33', NULL),
(102, 'MOUSSA DIAW', 'Espèce', '2024-02-08', '23-24CYB22', '150000', '-', 'M1', 'PAIEMENT 1ere MENSUALITE', '2024-02-08 16:41:02', '2024-02-08 16:41:02', NULL),
(103, 'MARAM THIEWE SAKHO', 'Espèce', '2024-02-08', '23-24CYB12', '210000', '-', 'L1', '4e AVANCE INSCRIPTION (100 000) +3eme MENSUALITE (110 000)', '2024-02-08 16:47:40', '2024-02-08 16:47:40', NULL),
(104, 'NDEYE KHADY FALL', 'Espèce', '2024-02-08', 'CAT/373/1239', '115000', '77 503 08 37', 'L3', 'PAIEMENT 2e Mensualite', '2024-02-08 18:46:27', '2024-02-08 18:46:27', NULL),
(105, 'ABDOURAHMANE DIOUF', 'Chèque', '2024-02-08', '23-24CYB09', '150000', '77 259 68 18', 'M1', 'PAIEMENT 2e Mensualite', '2024-02-08 19:46:59', '2024-02-08 19:46:59', NULL),
(106, 'NDEYE KHADY DIAGNE', 'Espèce', '2024-02-12', '23-24CYB20', '150000', '77 668 40 49', 'M1', 'PAIEMENT 2EME MENSUALITE', '2024-02-12 16:34:32', '2024-02-12 16:34:32', NULL),
(107, 'ROSELVY DONGA', 'Espèce', '2024-02-12', '23-24CYB18', '200000', '76 530 26 49', 'M1', 'PAIEMENT 1ERE MENSUALITE', '2024-02-12 17:19:00', '2024-02-12 17:19:00', NULL),
(108, 'AMINATA DIA', 'Espèce', '2024-02-12', '23-24CYB05', '150000', '77 387 98 59', 'M1', 'PAIEMENT 1ere Mensualite', '2024-02-12 17:29:59', '2024-02-12 17:29:59', NULL),
(109, 'ADJI FATOU KANE', 'Espèce', '2024-02-12', 'CAT/373/', '75000', '78 241 44 01', 'L3', 'PAIEMENT 2EME MENSUALITE', '2024-02-12 17:41:56', '2024-02-12 17:41:56', NULL),
(110, 'CHEIKH AHMED TIDIANE CHERIF DIENG', 'Espèce', '2024-02-12', '23-24CYB10', '80000', '-', 'M1', 'PAIEMENT 1ERE MENSUALITE (ACOMPTE)', '2024-02-12 18:28:57', '2024-02-12 18:28:57', NULL),
(111, 'MOUHAMADOU MOUSTAPHA DIOP', 'Espèce', '2024-02-12', 'CAT/373/1233', '190000', '-', 'M1', 'PAIEMENT 1ERE MENS (110 000)+ 2e avance inscription (80 000)', '2024-02-12 19:35:06', '2024-02-12 19:35:06', NULL),
(117, 'test', 'Chèque', '2024-02-14', '-', '129000', '-', 'L3', '-', '2024-02-14 14:23:36', '2024-02-14 14:23:36', 'test123');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
