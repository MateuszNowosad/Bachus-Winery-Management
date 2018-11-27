CREATE DATABASE bachusWinery;
use bachusWinery;

Create table Adres (
  idAdres int primary key AUTO_INCREMENT not null,
  miasto varchar(50) not null,
  kodPocztowy varchar(5) null,
  ulica varchar(200) null,
  nrLokalu varchar(100) not null,
  nrPosesji varchar(100) not null,
  kraj varchar(100) not null
);

--CREATE TABLE `Adres` (
--  `idAdres` int(11) NOT NULL AUTO_INCREMENT,
--  `miasto` varchar(20) NOT NULL,
--  `kodPocztowy` varchar(5) NOT NULL,
--  `ulica` varchar(45) NOT NULL,
--  `nrLokalu` varchar(2) DEFAULT NULL,
--  `nrPosesji` varchar(5) NOT NULL,
--  `kraj` varchar(45) NOT NULL,
--  PRIMARY KEY (`idAdres`),
--  UNIQUE KEY `idAdres_UNIQUE` (`idAdres`)
--) ENGINE=InnoDB AUTO_INCREMENT=5001 DEFAULT CHARSET=utf8;
