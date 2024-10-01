-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Sze 25. 12:19
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cszakacsbaszas`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categorys`
--

CREATE TABLE `categorys` (
  `ID` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `categorys`
--

INSERT INTO `categorys` (`ID`, `name`) VALUES
('047f3524-250f-4688-b140-c476e2c846c9', 'ő'),
('6afc6e94-e6d8-4c91-b258-b4d798c95bc6', 'Leves'),
('a99dc870-5046-4fd5-8f29-fbcc0714ed35', 'én'),
('b48e7492-d8ba-4c35-90f4-b52a21c1bc12', 'te'),
('d3f3255f-932c-4113-8ffc-00255055ddab', 'főétel'),
('e5f464ba-62c9-446a-a7ed-e01ddb22b6f8', 'Előétel'),
('f93d93a3-beca-4410-8b21-5f145424fb18', 'paci');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cat_kapcs`
--

CREATE TABLE `cat_kapcs` (
  `ID` varchar(40) NOT NULL,
  `recipeID` varchar(40) NOT NULL,
  `catID` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cat_kapcs`
--

INSERT INTO `cat_kapcs` (`ID`, `recipeID`, `catID`) VALUES
('236351b8-cf90-4dd9-ad3e-2f7410ec3c55', '11aeead1-be2d-4120-9855-0da3f6094fbb', 'e5f464ba-62c9-446a-a7ed-e01ddb22b6f8'),
('b86ff6da-53d9-468b-a7d4-6d8d8e41c84c', '203bc3c1-3dfa-47f5-8401-47440e71568c', '6afc6e94-e6d8-4c91-b258-b4d798c95bc6'),
('29c0fc53-3ca9-4ced-b0e4-1a9db4c7ac8d', '203bc3c1-3dfa-47f5-8401-47440e71568c', 'd3f3255f-932c-4113-8ffc-00255055ddab'),
('8c814a90-4138-40f0-8083-aca0036d4dee', '45df0b78-b137-4417-bbc0-5265e2ce0832', '047f3524-250f-4688-b140-c476e2c846c9'),
('a5756037-ccbd-4097-a979-cf164a8b9299', '45df0b78-b137-4417-bbc0-5265e2ce0832', 'f93d93a3-beca-4410-8b21-5f145424fb18'),
('79952f47-5d83-44b8-b494-32e44a2b5079', '481e41b2-e29e-424a-9057-90dcc31d64ee', 'd3f3255f-932c-4113-8ffc-00255055ddab'),
('848c05c5-f0fb-4c80-bf99-5586bd6f3aa9', '481e41b2-e29e-424a-9057-90dcc31d64ee', 'e5f464ba-62c9-446a-a7ed-e01ddb22b6f8'),
('fb7fdf75-d73d-46a7-be32-154efcfe8f6b', '645838ba-7a68-4d4d-9e2c-345dabcc2853', '6afc6e94-e6d8-4c91-b258-b4d798c95bc6'),
('f9e0faae-f708-42be-a9f1-91084cbb6c4e', '645838ba-7a68-4d4d-9e2c-345dabcc2853', 'd3f3255f-932c-4113-8ffc-00255055ddab'),
('5cdc21c6-2448-415c-a115-91d623f4b1d6', '645838ba-7a68-4d4d-9e2c-345dabcc2853', 'e5f464ba-62c9-446a-a7ed-e01ddb22b6f8'),
('71b2cf70-2f0b-4a11-adb5-54826fc960d0', 'bb2ec490-bd78-4323-9fb6-4db0418e5822', '047f3524-250f-4688-b140-c476e2c846c9'),
('1221a99f-1121-4c9e-b21a-8a37ddd19a21', 'd24f3d72-ff3b-42f0-8340-4be703009986', 'd3f3255f-932c-4113-8ffc-00255055ddab'),
('853949cd-8079-44df-9201-1e73e6a810ca', 'd24f3d72-ff3b-42f0-8340-4be703009986', 'e5f464ba-62c9-446a-a7ed-e01ddb22b6f8'),
('c97eb48d-51ed-4bc0-b46b-1d8df95a66bc', 'e1c4662e-1329-4154-bd9e-7a7012a13a3a', '6afc6e94-e6d8-4c91-b258-b4d798c95bc6'),
('17f7a2bb-c400-4cda-b2a4-974353fbee7f', 'fe17014d-9656-426b-ae03-46d0349b8d01', '047f3524-250f-4688-b140-c476e2c846c9'),
('0999cccf-0212-4527-bb6c-e4dc420c6911', 'fe17014d-9656-426b-ae03-46d0349b8d01', 'a99dc870-5046-4fd5-8f29-fbcc0714ed35'),
('183a2b67-03bb-45ab-bdd1-d97b39987d80', 'fe17014d-9656-426b-ae03-46d0349b8d01', 'e5f464ba-62c9-446a-a7ed-e01ddb22b6f8');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `ID` varchar(40) NOT NULL,
  `userID` varchar(40) NOT NULL,
  `title` varchar(40) NOT NULL,
  `additions` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `time` varchar(10) NOT NULL,
  `calory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`ID`, `userID`, `title`, `additions`, `description`, `time`, `calory`) VALUES
('11aeead1-be2d-4120-9855-0da3f6094fbb', 'f9c00f52-0381-431d-866e-b14bb26f3ad5', 'Jani', 'asd', 'ds', '52', 1234),
('203bc3c1-3dfa-47f5-8401-47440e71568c', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'Csoki', 'nyomod', 'kedvencem', '89', 1244),
('45df0b78-b137-4417-bbc0-5265e2ce0832', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'ő', 'ő', 'ő', 'ő', 345),
('481e41b2-e29e-424a-9057-90dcc31d64ee', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'Áronka', 'áron + finom', 'nyomod kedvenc healerem', '61', 987),
('645838ba-7a68-4d4d-9e2c-345dabcc2853', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'asd', 'asdasd', 'ascsadasf', '45', 5532),
('bb2ec490-bd78-4323-9fb6-4db0418e5822', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'sadsad', 'asdsad', 'asdsadsadsa', 'KURVA', 341),
('d24f3d72-ff3b-42f0-8340-4be703009986', 'e8b078df-e00f-429f-9521-999e6010dd92', 'Tarr', 'tarr', 'tarr', '23', 3541),
('e1c4662e-1329-4154-bd9e-7a7012a13a3a', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'Balázska', 'bal+ázs', 'nagyon jó nagyon finom nagyon gyors', '6 perc', 350),
('fe17014d-9656-426b-ae03-46d0349b8d01', 'd7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'Kulimák', 'asd', 'asd', '234', 1442);

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `recipes_vt`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `recipes_vt` (
`ID` varchar(40)
,`userID` varchar(40)
,`name` varchar(40)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `password`, `role`, `status`, `phone`) VALUES
('d7d00a34-dc03-4ea6-b10f-d538c16fe28e', 'Béla', 'bela@gmail.com', '50eb453581f9126f30d21821445c2cd75d2b4165', 'admin', 0, '420'),
('e8b078df-e00f-429f-9521-999e6010dd92', 'Csoki', 'csoki@gmail.com', '0f25b7bb8b73d4edeb67d75c670a975ec9af0fe3', 'user', 0, '1244'),
('ee0ddf77-3f6c-4e53-a642-6c44f4cb80b7', 'Balázs', 'balazs@gmail.com', '10ec34e18708a0043bb154427c66574f0b23f405', 'user', 0, ''),
('f9c00f52-0381-431d-866e-b14bb26f3ad5', 'Áron', 'aron@gmail.com', 'ce30127eefa07a02d568832e3de6952fb491981c', 'admin', 1, '123457');

-- --------------------------------------------------------

--
-- Nézet szerkezete `recipes_vt`
--
DROP TABLE IF EXISTS `recipes_vt`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `recipes_vt`  AS SELECT `recipes`.`ID` AS `ID`, `recipes`.`userID` AS `userID`, `users`.`name` AS `name` FROM (`recipes` join `users` on(`users`.`ID` = `recipes`.`userID`)) ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `cat_kapcs`
--
ALTER TABLE `cat_kapcs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `recipeID` (`recipeID`,`catID`),
  ADD KEY `catID` (`catID`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cat_kapcs`
--
ALTER TABLE `cat_kapcs`
  ADD CONSTRAINT `cat_kapcs_ibfk_2` FOREIGN KEY (`catID`) REFERENCES `categorys` (`ID`),
  ADD CONSTRAINT `cat_kapcs_ibfk_3` FOREIGN KEY (`recipeID`) REFERENCES `recipes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
