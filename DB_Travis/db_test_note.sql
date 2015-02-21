-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Sam 21 Février 2015 à 13:21
-- Version du serveur :  5.5.34
-- Version de PHP :  5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `travis`
--

-- --------------------------------------------------------

--
-- Structure de la table `Tool_log`
--

CREATE TABLE `Tool_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Log identifier',
  `IDTrace` int(10) NOT NULL COMMENT 'Reference identifier that links table Tool_log and User_log',
  `HTTPQuery` text NOT NULL COMMENT 'Raw data of a HTTP query sent and received when a user interacts with TrAVis',
  `Date` date NOT NULL COMMENT 'Date of a HTTP Query',
  `Time` time NOT NULL COMMENT 'Time of a HTTP Query',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `Typeu`
--

CREATE TABLE `Typeu` (
  `IDTypeU` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User type identifier',
  `Title` varchar(100) NOT NULL COMMENT 'Label of user profile. For example: 1: Administrator 2: Tutor 3: Learner',
  PRIMARY KEY (`IDTypeU`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `IDUser` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User identifier',
  `Name` varchar(100) NOT NULL COMMENT 'User name',
  `Surname` varchar(100) NOT NULL COMMENT 'User surname',
  `Email` varchar(250) NOT NULL COMMENT 'User email address',
  `Login` varchar(250) NOT NULL COMMENT 'User login',
  `Password` varchar(250) NOT NULL COMMENT 'User password',
  `Type` int(5) NOT NULL COMMENT 'Reference identifier that links table User and Typeu',
  `Comment` text NOT NULL COMMENT 'Comment on user account',
  PRIMARY KEY (`IDUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `User`
--

INSERT INTO `User` (`IDUser`, `Name`, `Surname`, `Email`, `Login`, `Password`, `Type`, `Comment`) VALUES
(1, 'LEDUNOIS', 'Simon', 'simon.ledunois@gmail.com', 'SimonL', 'password', 1, ''),
(2, 'LEDUNOIS', 'Simon', 'simon.ledunois@gmail.com', 'SimonLEDUNOIS', 'password', 1, ''),
(3, 'LOQUIN', 'Gweltaz', 'gweltaz.loquin@gmail.com', 'GweltazL', 'password', 1, ''),
(4, 'COULON', 'Jonathan', 'jonathan.coulon.jc@gmail.com', 'CoulonJ', 'password', 2, '');

-- --------------------------------------------------------

--
-- Structure de la table `User_log`
--

CREATE TABLE `User_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Log identifier',
  `IDTraces` int(10) NOT NULL COMMENT 'Reference identifier that links table User_log and Tool_log',
  `User` varchar(250) NOT NULL COMMENT 'Reference identifier that links table User_log and User',
  `HCI` varchar(250) NOT NULL COMMENT 'Title of a Human–Computer Interaction',
  `Tool` varchar(250) NOT NULL COMMENT 'Title of TrAVis functionality accessed by the user',
  `Date` date NOT NULL COMMENT 'Date of HCI',
  `Time` time NOT NULL COMMENT 'Time of HCI',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `User_notes`
--

CREATE TABLE `User_notes` (
  `IdNotes` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Note identifier',
  `Username` varchar(250) NOT NULL COMMENT 'Reference identifier that links table User_notes and User',
  `Share` tinyint(1) NOT NULL COMMENT 'Note shareable status : ￼ 0: not shareable 1: sharable',
  `Nbmax` int(10) NOT NULL COMMENT 'Number of users that a note can be shared',
  `Titre` varchar(100) NOT NULL COMMENT 'Note Title',
  `Note` text NOT NULL COMMENT 'Note',
  `Date` date NOT NULL COMMENT 'Date of a Note',
  `Lastaccess` date NOT NULL COMMENT 'Last access date of a note',
  PRIMARY KEY (`IdNotes`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Contenu de la table `User_notes`
--

INSERT INTO `User_notes` (`IdNotes`, `Username`, `Share`, `Nbmax`, `Titre`, `Note`, `Date`, `Lastaccess`) VALUES
(1, 'SimonL', 1, 2, 'Titre note 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-14', '2015-01-23'),
(2, 'GweltazL', 0, 5, 'Titre note 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-22', '2015-01-22'),
(3, 'JonathanC', 1, 4, 'Titre note 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-21', '2015-01-20'),
(4, 'SimonL', 0, 9, 'Titre note 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-06', '2015-01-21'),
(5, 'SimonL', 0, 4, 'Titre note 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-21', '2015-01-21'),
(6, 'SimonL', 1, 3, 'Titre Note 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-19', '2015-01-06'),
(7, 'SimonL', 0, 4, 'Titre', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-01-21', '2015-01-21'),
(35, 'SimonL', 1, 0, 'Titre de la note', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus, diam a condimentum facilisis, lorem ligula dignissim sapien, in commodo lorem dolor at massa. Curabitur semper dictum rhoncus. Nulla eget tellus volutpat, tincidunt nisi ut, ultricies turpis. Mauris sed leo mi. Donec consectetur blandit imperdiet. Proin vitae mi viverra, tristique velit quis, pharetra velit. Vestibulum et enim ornare, hendrerit nibh at, egestas risus.', '2015-02-16', '2015-02-16');

-- --------------------------------------------------------

--
-- Structure de la table `User_param`
--

CREATE TABLE `User_param` (
  `IDParam` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Parameter identifier',
  `Username` varchar(250) NOT NULL COMMENT 'Reference identifier that links table User_param and User',
  `ParamName1` varchar(250) NOT NULL COMMENT 'Parameter name where X is parameter order. For example, ParamName1 is the first parameter',
  `ParamValue1` varchar(250) NOT NULL COMMENT 'Parameter value where X is parameter order. For example, ParamValue1 is the value of the first parameter',
  `Description1` text NOT NULL COMMENT 'Parameter description where X is parameter order. For example, Description1 is the description of the first parameter',
  PRIMARY KEY (`IDParam`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `User_sharenote`
--

CREATE TABLE `User_sharenote` (
  `IDShare` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Share identifier',
  `Username` varchar(250) NOT NULL COMMENT 'List of user names who have access to the shared note',
  `IDNote` int(10) NOT NULL COMMENT 'Reference identifier that links table User_sharenote and User_notes',
  `Dateshare` date NOT NULL COMMENT 'Date of a shared note',
  `Lastaccess` date NOT NULL COMMENT 'Last access date of a shared note',
  PRIMARY KEY (`IDShare`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `User_sharenote`
--

INSERT INTO `User_sharenote` (`IDShare`, `Username`, `IDNote`, `Dateshare`, `Lastaccess`) VALUES
(1, 'LoquinG;SimonL', 1, '2015-01-21', '2015-01-22'),
(2, 'SimonL;GweltazL', 6, '2015-01-07', '2015-01-23'),
(3, 'SimonLEDUNOIS;GweltazL;CoulonJ', 35, '2015-02-16', '2015-02-16');
