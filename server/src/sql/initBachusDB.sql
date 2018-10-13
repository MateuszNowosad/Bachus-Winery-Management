use bachus_winery;

Create table adres (
  idadres int primary key AUTO_INCREMENT not null,
  miasto varchar(50) not null,
  kod_pocztowy varchar(100) null,
  ulica varchar(200) null,
  nr_lokalu varchar(100) not null
  nr_posesji varchar(100) not null
  kraj varchar(100) not null
);