CREATE DATABASE  IF NOT EXISTS `bachusWinery` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bachusWinery`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bachus-winery
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Adres`
--

DROP TABLE IF EXISTS `Adres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Adres` (
  `idAdres` int(11) NOT NULL AUTO_INCREMENT,
  `miasto` varchar(40) NOT NULL,
  `kodPocztowy` varchar(12) NOT NULL,
  `ulica` varchar(45) NOT NULL,
  `nrLokalu` varchar(2) DEFAULT NULL,
  `nrPosesji` varchar(5) NOT NULL,
  `kraj` varchar(60) NOT NULL,
  PRIMARY KEY (`idAdres`),
  UNIQUE KEY `idAdres_UNIQUE` (`idAdres`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictKategoriaWina`
--

DROP TABLE IF EXISTS `DictKategoriaWina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictKategoriaWina` (
  `idDictKategoriaWina` int(11) NOT NULL AUTO_INCREMENT,
  `nazwaKategoria` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idDictKategoriaWina`),
  UNIQUE KEY `idDictKategoriaWina_UNIQUE` (`idDictKategoriaWina`),
  UNIQUE KEY `nazwaKategoria_UNIQUE` (`nazwaKategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictKategorie`
--

DROP TABLE IF EXISTS `DictKategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictKategorie` (
  `idKategorie` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(20) NOT NULL,
  `jednostka` varchar(20) NOT NULL,
  `opis` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idKategorie`),
  UNIQUE KEY `idKategorie_UNIQUE` (`idKategorie`),
  UNIQUE KEY `nazwa_UNIQUE` (`nazwa`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictOdmianaWinogron`
--

DROP TABLE IF EXISTS `DictOdmianaWinogron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictOdmianaWinogron` (
  `idOdmianaWinogron` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idOdmianaWinogron`),
  UNIQUE KEY `idOdmianaWinogron_UNIQUE` (`idOdmianaWinogron`),
  UNIQUE KEY `nazwa_UNIQUE` (`nazwa`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictOperacjeNaWinnicy`
--

DROP TABLE IF EXISTS `DictOperacjeNaWinnicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictOperacjeNaWinnicy` (
  `idDictOperacjeNaWinnicy` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idDictOperacjeNaWinnicy`),
  UNIQUE KEY `idDictOperacjeNaWinnicy_UNIQUE` (`idDictOperacjeNaWinnicy`),
  UNIQUE KEY `nazwa_UNIQUE` (`nazwa`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictProcesy`
--

DROP TABLE IF EXISTS `DictProcesy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictProcesy` (
  `idDictProcesy` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(40) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `dodatkowe` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`idDictProcesy`),
  UNIQUE KEY `idDictProcesy_UNIQUE` (`idDictProcesy`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictRolaUzytkownikow`
--

DROP TABLE IF EXISTS `DictRolaUzytkownikow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictRolaUzytkownikow` (
  `idRolaUzytkownikow` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `typ` varchar(45) NOT NULL COMMENT 'poziom uprawnien',
  PRIMARY KEY (`idRolaUzytkownikow`),
  UNIQUE KEY `idRolaUzytkownikow_UNIQUE` (`idRolaUzytkownikow`),
  UNIQUE KEY `nazwa_roli_UNIQUE` (`nazwa`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DictTypPartii`
--

DROP TABLE IF EXISTS `DictTypPartii`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DictTypPartii` (
  `idTypPartii` int(11) NOT NULL AUTO_INCREMENT COMMENT 'slownikowa\ninne dane niz w dict_kategorie',
  `nazwa` varchar(45) NOT NULL COMMENT 'typ_partii',
  `jednostka` varchar(45) NOT NULL COMMENT 'sztuki, kilkogramy, itd',
  PRIMARY KEY (`idTypPartii`),
  UNIQUE KEY `idTypPartii_UNIQUE` (`idTypPartii`),
  UNIQUE KEY `nazwa_UNIQUE` (`nazwa`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InformacjeOWinie`
--

DROP TABLE IF EXISTS `InformacjeOWinie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InformacjeOWinie` (
  `idInformacjeOWinie` int(11) NOT NULL AUTO_INCREMENT COMMENT 'usunięto:\nzawartosc_alkocholu\nzawartoscCukru\n',
  `nazwa` varchar(45) NOT NULL,
  `motto` varchar(100) DEFAULT NULL COMMENT 'mysl przewodnia etykiety\n',
  `zawartoscPotAlergenow` varchar(255) DEFAULT NULL COMMENT 'zawartosc potencjalnych alergenow',
  `wartoscEnergetyczna` int(3) NOT NULL,
  `dictKategoriaWinaIdDictKategoriaWina` int(11) NOT NULL,
  PRIMARY KEY (`idInformacjeOWinie`),
  UNIQUE KEY `idInformacjeOWinie_UNIQUE` (`idInformacjeOWinie`),
  KEY `fk_informacje_o_winie_dict_kategoria_wina1_idx` (`dictKategoriaWinaIdDictKategoriaWina`),
  CONSTRAINT `fk_informacje_o_winie_dict_kategoria_wina1` FOREIGN KEY (`dictKategoriaWinaIdDictKategoriaWina`) REFERENCES `DictKategoriaWina` (`idDictKategoriaWina`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Kontrahenci`
--

DROP TABLE IF EXISTS `Kontrahenci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kontrahenci` (
  `idKontrahenci` int(11) NOT NULL AUTO_INCREMENT,
  `NIP` varchar(10) DEFAULT NULL,
  `nazwaSpolki` varchar(40) NOT NULL,
  `telefon` varchar(14) NOT NULL,
  `eMail` varchar(90) NOT NULL,
  `stronaWww` varchar(255) DEFAULT NULL,
  `KRS` varchar(10) DEFAULT NULL,
  `nrKonta` varchar(26) NOT NULL,
  `fax` varchar(45) DEFAULT NULL,
  `adresIdAdres` int(11) NOT NULL,
  PRIMARY KEY (`idKontrahenci`),
  UNIQUE KEY `telefon_UNIQUE` (`telefon`),
  UNIQUE KEY `eMail_UNIQUE` (`eMail`),
  UNIQUE KEY `nazwaSpolki_UNIQUE` (`nazwaSpolki`),
  UNIQUE KEY `idKontrahenci_UNIQUE` (`idKontrahenci`),
  UNIQUE KEY `nrKonta_UNIQUE` (`nrKonta`),
  UNIQUE KEY `NIP_UNIQUE` (`NIP`),
  UNIQUE KEY `KRS_UNIQUE` (`KRS`),
  KEY `fk_kontrahenci_adres1_idx` (`adresIdAdres`),
  CONSTRAINT `fk_kontrahenci_adres1` FOREIGN KEY (`adresIdAdres`) REFERENCES `Adres` (`idAdres`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ListPrzewozowy`
--

DROP TABLE IF EXISTS `ListPrzewozowy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListPrzewozowy` (
  `idListPrzewozowy` int(11) NOT NULL AUTO_INCREMENT,
  `imieKierowcy` varchar(45) NOT NULL,
  `nazwiskoKierowcy` varchar(60) NOT NULL,
  `uwagiPrzewoznika` varchar(255) DEFAULT NULL,
  `zastrzezeniaOdbiorcy` varchar(255) DEFAULT NULL,
  `eDokument` MEDIUMBLOB NOT NULL COMMENT 'urle do podpisow/pieczatek',
  `przesylkaIdPrzesylka` int(11) NOT NULL,
  PRIMARY KEY (`idListPrzewozowy`),
  UNIQUE KEY `idListPrzewozowy_UNIQUE` (`idListPrzewozowy`),
  KEY `fk_list_przewozowy_przesylka1_idx` (`przesylkaIdPrzesylka`),
  CONSTRAINT `fk_list_przewozowy_przesylka1` FOREIGN KEY (`przesylkaIdPrzesylka`) REFERENCES `Przesylka` (`idPrzesylka`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ListPrzewozowyHasAdres`
--

DROP TABLE IF EXISTS `ListPrzewozowyHasAdres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListPrzewozowyHasAdres` (
  `idListPrzewozowyHasAdres` int(11) NOT NULL AUTO_INCREMENT,
  `adresIdAdres` int(11) NOT NULL,
  `miejsce` enum('Nadania','Odbioru') NOT NULL,
  `listPrzewozowyIdListPrzewozowy` int(11) NOT NULL,
  PRIMARY KEY (`idListPrzewozowyHasAdres`),
  UNIQUE KEY `idListPrzewozowyHasAdres_UNIQUE` (`idListPrzewozowyHasAdres`),
  KEY `fk_przesylka_has_adres_adres1_idx` (`adresIdAdres`),
  KEY `fk_przesylka_has_adres_list_przewozowy1_idx` (`listPrzewozowyIdListPrzewozowy`),
  CONSTRAINT `fk_przesylka_has_adres_adres1` FOREIGN KEY (`adresIdAdres`) REFERENCES `Adres` (`idAdres`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_przesylka_has_adres_list_przewozowy1` FOREIGN KEY (`listPrzewozowyIdListPrzewozowy`) REFERENCES `ListPrzewozowy` (`idListPrzewozowy`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ListPrzewozowyHasKontrahenci`
--

DROP TABLE IF EXISTS `ListPrzewozowyHasKontrahenci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListPrzewozowyHasKontrahenci` (
  `idListPrzewozowyHasKontrahenci` int(11) NOT NULL AUTO_INCREMENT,
  `listPrzewozowyIdListPrzewozowy` int(11) NOT NULL,
  `kontrahenciIdKontrahenci` int(11) NOT NULL,
  `typ` enum('Odbiorca','Przewoznik', 'Nadawca') NOT NULL,
  PRIMARY KEY (`idListPrzewozowyHasKontrahenci`),
  UNIQUE KEY `idListPrzewozowyHasKontrahenci_UNIQUE` (`idListPrzewozowyHasKontrahenci`),
  KEY `fk_list_przewozowy_has_kontrahenci_kontrahenci1_idx` (`kontrahenciIdKontrahenci`),
  KEY `fk_list_przewozowy_has_kontrahenci_list_przewozowy1_idx` (`listPrzewozowyIdListPrzewozowy`),
  CONSTRAINT `fk_list_przewozowy_has_kontrahenci_kontrahenci1` FOREIGN KEY (`kontrahenciIdKontrahenci`) REFERENCES `Kontrahenci` (`idKontrahenci`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_list_przewozowy_has_kontrahenci_list_przewozowy1` FOREIGN KEY (`listPrzewozowyIdListPrzewozowy`) REFERENCES `ListPrzewozowy` (`idListPrzewozowy`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Magazyn`
--

DROP TABLE IF EXISTS `Magazyn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Magazyn` (
  `idMagazyn` int(11) NOT NULL AUTO_INCREMENT,
  `rodzaj` enum('polproduktow','materialow','produktow_skonczonych') NOT NULL,
  `pojemnosc` decimal(6,1) NOT NULL,
  `adresIdAdres` int(11) NOT NULL,
  PRIMARY KEY (`idMagazyn`),
  UNIQUE KEY `idMagazyn_UNIQUE` (`idMagazyn`),
  KEY `fk_magazyn_adres1_idx` (`adresIdAdres`),
  CONSTRAINT `fk_magazyn_adres1` FOREIGN KEY (`adresIdAdres`) REFERENCES `Adres` (`idAdres`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Operacje`
--

DROP TABLE IF EXISTS `Operacje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Operacje` (
  `idOperacja` int(11) NOT NULL AUTO_INCREMENT,
  `iloscPrzed` decimal(6,2) NOT NULL,
  `iloscPo` decimal(6,2) DEFAULT NULL,
  `dataPoczatku` datetime NOT NULL,
  `dataZakonczenia` datetime DEFAULT NULL,
  `zawartoscAlkoholu` decimal(2,1) DEFAULT NULL,
  `iloscDodatku` decimal(3,1) DEFAULT NULL COMMENT 'np pozywka drozdzy\n',
  `zawartoscCukru` decimal(2,1) DEFAULT NULL,
  `kwasowosc` decimal(2,1) DEFAULT NULL COMMENT 'pH',
  `temperatura` decimal(2,1) DEFAULT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `uzytkownicyIdUzytkownicy` int(11) NOT NULL,
  `dictProcesyIdDictProcesy` int(11) NOT NULL,
  PRIMARY KEY (`idOperacja`),
  UNIQUE KEY `idOperacja_UNIQUE` (`idOperacja`),
  KEY `fk_operacyjna_uzytkownicy1_idx` (`uzytkownicyIdUzytkownicy`),
  KEY `fk_operacyjna_dict_procesy1_idx` (`dictProcesyIdDictProcesy`),
  CONSTRAINT `fk_operacyjna_dict_procesy1` FOREIGN KEY (`dictProcesyIdDictProcesy`) REFERENCES `DictProcesy` (`idDictProcesy`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_operacyjna_uzytkownicy1` FOREIGN KEY (`uzytkownicyIdUzytkownicy`) REFERENCES `Uzytkownicy` (`idUzytkownika`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OperacjeHasPartie`
--

DROP TABLE IF EXISTS `OperacjeHasPartie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperacjeHasPartie` (
  `idOperacjeHasPartie` int(11) NOT NULL AUTO_INCREMENT,
  `operacjeIdOperacja` int(11) NOT NULL,
  `partieIdPartie` int(11) NOT NULL,
  `ilosc` decimal(4,1) NOT NULL,
  PRIMARY KEY (`idOperacjeHasPartie`),
  UNIQUE KEY `operacje_has_partiecol_UNIQUE` (`idOperacjeHasPartie`),
  KEY `fk_operacyjna_has_partie_partie1_idx` (`partieIdPartie`),
  KEY `fk_operacyjna_has_partie_operacyjna1_idx` (`operacjeIdOperacja`),
  CONSTRAINT `fk_operacyjna_has_partie_operacyjna1` FOREIGN KEY (`operacjeIdOperacja`) REFERENCES `Operacje` (`idOperacja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_operacyjna_has_partie_partie1` FOREIGN KEY (`partieIdPartie`) REFERENCES `Partie` (`idPartie`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OperacjeHasPozycjaWMagazynie`
--

DROP TABLE IF EXISTS `OperacjeHasPozycjaWMagazynie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperacjeHasPozycjaWMagazynie` (
  `idOperacjeHasPozycjaWMagazynie` int(11) NOT NULL AUTO_INCREMENT,
  `operacjeIdOperacja` int(11) NOT NULL,
  `pozycjaWMagazynieIdPozycja` int(11) NOT NULL,
  `ilosc` varchar(45) NOT NULL,
  PRIMARY KEY (`idOperacjeHasPozycjaWMagazynie`),
  UNIQUE KEY `idOperacjeHasPozycjaWMagazynie_UNIQUE` (`idOperacjeHasPozycjaWMagazynie`),
  KEY `fk_operacyjna_has_pozycja_w_magazynie_materialow_pozycja_w__idx` (`pozycjaWMagazynieIdPozycja`),
  KEY `fk_operacyjna_has_pozycja_w_magazynie_materialow_operacyjna_idx` (`operacjeIdOperacja`),
  CONSTRAINT `fk_operacyjna_has_pozycja_w_magazynie_materialow_operacyjna1` FOREIGN KEY (`operacjeIdOperacja`) REFERENCES `Operacje` (`idOperacja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_operacyjna_has_pozycja_w_magazynie_materialow_pozycja_w_ma1` FOREIGN KEY (`pozycjaWMagazynieIdPozycja`) REFERENCES `PozycjaWMagazynie` (`idPozycja`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OperacjeNaWinnicy`
--

DROP TABLE IF EXISTS `OperacjeNaWinnicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OperacjeNaWinnicy` (
  `idOperacja` int(11) NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy` int(11) NOT NULL,
  `winnicaIdWinnica` int(11) NOT NULL,
  PRIMARY KEY (`idOperacja`),
  UNIQUE KEY `idoperacje_na_winnicy_UNIQUE` (`idOperacja`),
  KEY `fk_operacje_na_winnicy_dict_operacje_na_winnicy1_idx` (`dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy`),
  KEY `fk_operacje_na_winnicy_winnica1_idx` (`winnicaIdWinnica`),
  CONSTRAINT `fk_operacje_na_winnicy_dict_operacje_na_winnicy1` FOREIGN KEY (`dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy`) REFERENCES `DictOperacjeNaWinnicy` (`idDictOperacjeNaWinnicy`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_operacje_na_winnicy_winnica1` FOREIGN KEY (`winnicaIdWinnica`) REFERENCES `Winnica` (`idWinnica`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Partie`
--

DROP TABLE IF EXISTS `Partie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Partie` (
  `idPartie` int(11) NOT NULL AUTO_INCREMENT,
  `ilosc` decimal(4,1) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `dataUtworzenia` datetime NOT NULL,
  `winobranieIdWinobranie` int(11) DEFAULT NULL,
  `partieIdPartie` int(11) DEFAULT NULL,
  `typPartiiIdTypPartii` int(11) NOT NULL,
  `informacjeOWinieIdInformacjeOWinie` int(11) DEFAULT NULL,
  `planyProdukcyjneIdPlanyProdukcyjne` int(11) DEFAULT NULL,
  `czyPrzepis` tinyint(4) NOT NULL,
  PRIMARY KEY (`idPartie`),
  UNIQUE KEY `idPartie_UNIQUE` (`idPartie`),
  KEY `fk_partie_winobranie1_idx` (`winobranieIdWinobranie`),
  KEY `fk_partie_partie1_idx` (`partieIdPartie`),
  KEY `fk_partie_typ_partii1_idx` (`typPartiiIdTypPartii`),
  KEY `fk_partie_informacje_o_winie1_idx` (`informacjeOWinieIdInformacjeOWinie`),
  KEY `fk_partie_plany_produkcyjne1_idx` (`planyProdukcyjneIdPlanyProdukcyjne`),
  CONSTRAINT `fk_partie_informacje_o_winie1` FOREIGN KEY (`informacjeOWinieIdInformacjeOWinie`) REFERENCES `InformacjeOWinie` (`idInformacjeOWinie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_partie_partie1` FOREIGN KEY (`partieIdPartie`) REFERENCES `Partie` (`idPartie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_partie_typ_partii1` FOREIGN KEY (`typPartiiIdTypPartii`) REFERENCES `DictTypPartii` (`idTypPartii`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_partie_plany_produkcyjne1` FOREIGN KEY (`planyProdukcyjneIdPlanyProdukcyjne`) REFERENCES `PlanyProdukcyjne` (`idPlanyProdukcyjne`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlanyProdukcyjne`
--

DROP TABLE IF EXISTS `PlanyProdukcyjne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlanyProdukcyjne` (
  `idPlanyProdukcyjne` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `eDokument` MEDIUMBLOB NOT NULL,
  PRIMARY KEY (`idPlanyProdukcyjne`),
  UNIQUE KEY `idPlanyProdukcyjne_UNIQUE` (`idPlanyProdukcyjne`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlanyProdukcyjneHasPozycjaWMagazynie`
--

DROP TABLE IF EXISTS `PlanyProdukcyjneHasPozycjaWMagazynie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlanyProdukcyjneHasPozycjaWMagazynie` (
  `idPlanyProdukcyjneHasPozycjaWMagazynie` int(11) NOT NULL AUTO_INCREMENT,
  `planyProdukcyjneIdPlanyProdukcyjne` int(11) NOT NULL,
  `pozycjaWMagazynieIdPozycja` int(11) NOT NULL,
  PRIMARY KEY (`idPlanyProdukcyjneHasPozycjaWMagazynie`),
  UNIQUE KEY `idPlanyProdukcyjneHasPozycjaWMagazynie_UNIQUE` (`idPlanyProdukcyjneHasPozycjaWMagazynie`),
  KEY `fk_plany_produkcyjne_has_pozycja__w_magazynie1_idx` (`pozycjaWMagazynieIdPozycja`),
  KEY `fk_plany_produkcyjne_has_dict_procesy_plany_produkcyjne2_idx` (`planyProdukcyjneIdPlanyProdukcyjne`),
  CONSTRAINT `fk_plany_produkcyjne_has_pozycja__w_magazynie1` FOREIGN KEY (`pozycjaWMagazynieIdPozycja`) REFERENCES `PozycjaWMagazynie` (`idPozycja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_plany_produkcyjne_has_dict_procesy_plany_produkcyjne2` FOREIGN KEY (`planyProdukcyjneIdPlanyProdukcyjne`) REFERENCES `PlanyProdukcyjne` (`idPlanyProdukcyjne`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PozycjaWMagazynie`
--

DROP TABLE IF EXISTS `PozycjaWMagazynie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PozycjaWMagazynie` (
  `idPozycja` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `ilosc` decimal(4,1) NOT NULL,
  `kodKreskowy` varchar(13) NOT NULL,
  `stanAktualny` tinyint(4) NOT NULL COMMENT 'boolean - jest, nie ma(archiwum)',
  `dataPrzyjecia` datetime NOT NULL,
  `dataWydania` datetime DEFAULT NULL,
  `nazwaSektora` varchar(45) NOT NULL COMMENT 'lokalizacja poszczegolnych dobr na terenie magazynu',
  `kategorieIdKategorie` int(11) NOT NULL,
  `magazynIdMagazyn` int(11) NOT NULL,
  `partieIdPartie` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPozycja`),
  UNIQUE KEY `idPozycja_UNIQUE` (`idPozycja`),
  KEY `fk_magazyn_materialow_kategorie1_idx` (`kategorieIdKategorie`),
  KEY `fk_pozycja_w_magazynie_materialow_magazyn1_idx` (`magazynIdMagazyn`),
  KEY `fk_pozycja_w_magazynie_materialow_partie1_idx` (`partieIdPartie`),
  CONSTRAINT `fk_magazyn_materialow_kategorie1` FOREIGN KEY (`kategorieIdKategorie`) REFERENCES `DictKategorie` (`idKategorie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pozycja_w_magazynie_materialow_magazyn1` FOREIGN KEY (`magazynIdMagazyn`) REFERENCES `Magazyn` (`idMagazyn`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pozycja_w_magazynie_materialow_partie1` FOREIGN KEY (`partieIdPartie`) REFERENCES `Partie` (`idPartie`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Przesylka`
--

DROP TABLE IF EXISTS `Przesylka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Przesylka` (
  `idPrzesylka` int(11) NOT NULL AUTO_INCREMENT,
  `nazwaPrzesylki` varchar(45) NOT NULL,
  `ciezarLadunku` decimal(6,2) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`idPrzesylka`),
  UNIQUE KEY `idPrzesylka_UNIQUE` (`idPrzesylka`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PrzesylkaHasPozycjaWMagazynie`
--

DROP TABLE IF EXISTS `PrzesylkaHasPozycjaWMagazynie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PrzesylkaHasPozycjaWMagazynie` (
  `idPrzesylkaHasPozycjaWMagazynie` int(11) NOT NULL AUTO_INCREMENT,
  `przesylkaIdPrzesylka` int(11) NOT NULL,
  `pozycjaWMagazynieIdPozycja` int(11) NOT NULL,
  `ilosc` decimal(4,1) NOT NULL,
  PRIMARY KEY (`idPrzesylkaHasPozycjaWMagazynie`),
  UNIQUE KEY `idPrzesylkaHasPozycjaWMagazynie_UNIQUE` (`idPrzesylkaHasPozycjaWMagazynie`),
  KEY `fk_przesylka_has_pozycja_w_magazynie_materialow_pozycja_w_m_idx` (`pozycjaWMagazynieIdPozycja`),
  KEY `fk_przesylka_has_pozycja_w_magazynie_materialow_przesylka1_idx` (`przesylkaIdPrzesylka`),
  CONSTRAINT `fk_przesylka_has_pozycja_w_magazynie_materialow_pozycja_w_mag1` FOREIGN KEY (`pozycjaWMagazynieIdPozycja`) REFERENCES `PozycjaWMagazynie` (`idPozycja`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_przesylka_has_pozycja_w_magazynie_materialow_przesylka1` FOREIGN KEY (`przesylkaIdPrzesylka`) REFERENCES `Przesylka` (`idPrzesylka`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Raporty`
--

DROP TABLE IF EXISTS `Raporty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Raporty` (
  `idRaport` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  `eDokument` MEDIUMBLOB NOT NULL,
  `dataUtworzenia` datetime NOT NULL,
  PRIMARY KEY (`idRaport`),
  UNIQUE KEY `idRaport_UNIQUE` (`idRaport`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `RaportyHasUzytkownicy`
--

DROP TABLE IF EXISTS `RaportyHasUzytkownicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RaportyHasUzytkownicy` (
  `idRaportyHasUzytkownicy` int(11) NOT NULL AUTO_INCREMENT,
  `raportyIdRaport` int(11) NOT NULL,
  `uzytkownicyIdUzytkownika` int(11) NOT NULL,
  PRIMARY KEY (`idRaportyHasUzytkownicy`),
  UNIQUE KEY `idRaportyHasUzytkownicy_UNIQUE` (`idRaportyHasUzytkownicy`),
  KEY `fk_raporty_has_uzytkownicy_uzytkownicy1_idx` (`uzytkownicyIdUzytkownika`),
  KEY `fk_raporty_has_uzytkownicy_raporty1_idx` (`raportyIdRaport`),
  CONSTRAINT `fk_raporty_has_uzytkownicy_raporty1` FOREIGN KEY (`raportyIdRaport`) REFERENCES `Raporty` (`idRaport`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_raporty_has_uzytkownicy_uzytkownicy1` FOREIGN KEY (`uzytkownicyIdUzytkownika`) REFERENCES `Uzytkownicy` (`idUzytkownika`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `Uzytkownicy`
--

DROP TABLE IF EXISTS `Uzytkownicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Uzytkownicy` (
  `idUzytkownika` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(30) NOT NULL,
  `nazwisko` varchar(30) NOT NULL,
  `login` varchar(20) NOT NULL,
  `haslo` binary(60) NOT NULL COMMENT 'niejawne',
  `PESEL` varchar(11) NOT NULL,
  `eMail` varchar(60) NOT NULL,
  `nrTelefonu` varchar(14) NOT NULL,
  `dataOstatniegoLogowania` datetime NOT NULL,
  `adresIdAdres` int(11) NOT NULL,
  `dictRolaUzytkownikowIdRolaUzytkownikow` int(11) NOT NULL,
  `zdjecie` MEDIUMBLOB DEFAULT NULL,
  `czyAktywne` tinyint(1) NOT NULL,
  PRIMARY KEY (`idUzytkownika`),
  UNIQUE KEY `nrTelefonu_UNIQUE` (`nrTelefonu`),
  UNIQUE KEY `eMail_UNIQUE` (`eMail`),
  UNIQUE KEY `PESEL_UNIQUE` (`PESEL`),
  UNIQUE KEY `login_UNIQUE` (`login`),
  UNIQUE KEY `idUzytkownika_UNIQUE` (`idUzytkownika`),
  KEY `fk_uzytkownicy_adres1_idx` (`adresIdAdres`),
  KEY `fk_uzytkownicy_dict_rola_uzytkownikow1_idx` (`dictRolaUzytkownikowIdRolaUzytkownikow`),
  CONSTRAINT `fk_uzytkownicy_adres1` FOREIGN KEY (`adresIdAdres`) REFERENCES `Adres` (`idAdres`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_uzytkownicy_dict_rola_uzytkownikow1` FOREIGN KEY (`dictRolaUzytkownikowIdRolaUzytkownikow`) REFERENCES `DictRolaUzytkownikow` (`idRolaUzytkownikow`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
UNLOCK TABLES;

--
-- Table structure for table `Winnica`
--

DROP TABLE IF EXISTS `Winnica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Winnica` (
  `idWinnica` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(40) NOT NULL,
  `powierzchnia` decimal(6,2) NOT NULL,
  `stan` enum('Aktywna','Nieczynna') NOT NULL,
  `terroir` varchar(255) DEFAULT NULL,
  `dataOstatniegoZbioru` date DEFAULT NULL,
  `dataZasadzenia` date NOT NULL,
  `ewidencyjnyIdDzialki` varchar(45) NOT NULL,
  `odmianiaWinogronIdOdmianaWinogron` int(11) NOT NULL,
  PRIMARY KEY (`idWinnica`),
  UNIQUE KEY `idWinnica_UNIQUE` (`idWinnica`),
  UNIQUE KEY `nazwa_UNIQUE` (`nazwa`),
  UNIQUE KEY `ewidencyjnyIdDzialki_UNIQUE` (`ewidencyjnyIdDzialki`),
  KEY `fk_winnica_rodzaj_winogron1_idx` (`odmianiaWinogronIdOdmianaWinogron`),
  CONSTRAINT `fk_winnica_rodzaj_winogron1` FOREIGN KEY (`odmianiaWinogronIdOdmianaWinogron`) REFERENCES `DictOdmianaWinogron` (`idOdmianaWinogron`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Winobranie`
--

DROP TABLE IF EXISTS `Winobranie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Winobranie` (
  `idWinobranie` int(11) NOT NULL AUTO_INCREMENT,
  `dataWinobrania` date NOT NULL,
  `iloscZebranychWinogron` decimal(4,1) NOT NULL,
  `winnicaIdWinnica` int(11) NOT NULL,
  PRIMARY KEY (`idWinobranie`),
  UNIQUE KEY `idWinobranie_UNIQUE` (`idWinobranie`),
  KEY `fk_winobranie_winnica1_idx` (`winnicaIdWinnica`),
  CONSTRAINT `fk_winobranie_winnica1` FOREIGN KEY (`winnicaIdWinnica`) REFERENCES `Winnica` (`idWinnica`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-24 16:56:30
