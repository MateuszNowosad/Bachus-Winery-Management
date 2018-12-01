export const userDatabaseLabels = {
  idUzytkownika: 'ID Użytkownika',
  imie: 'Imie',
  nazwisko: 'Nazwisko',
  login: 'Login',
  haslo: 'Hasło',
  PESEL: 'PESEL',
  eMail: 'E-Mail',
  nrTelefonu: 'Nr telefonu',
  rola: 'Rola użytkownika',
  dataOstatniegoLogowania: 'Data ostatniego logowania'
};

export const addressDatabaseLabels = {
  idAdres: 'ID Adresu',
  miasto: 'Miasto',
  kodPocztowy: 'Kod pocztowy',
  ulica: 'Ulica',
  nrLokalu: 'Nr lokalu',
  nrPosesji: 'Nr posesji'
};

export const categoriesDatabaseLabels = {
  idKategorie: 'ID Kategorii',
  nazwa: 'Nazwa',
  jednostka: 'Jednostka',
  opis: 'Opis'
};

export const wineCategoriesDictDatabaseLabels = {
  idDictKategoriaWina: 'ID Kategorii wina',
  nazwaKategoria: 'Nazwa kategorii',
  opis: 'Opis'
};

export const grapeTypeDictDatabaseLabels = {
  idOdmianaWinogron: 'ID Odmiany Winogron',
  nazwa: 'Nazwa odmiany',
  opis: 'Opis'
};

export const vineyardOperationsDictDatabaseLabels = {
  idDictOperacjeNaWinnicy: 'ID Operacji na winnicy',
  nazwa: 'Nazwa operacji',
  opis: 'Opis'
};

export const processesDictDatabaseLabels = {
  idDictProcesy: 'ID Procesu',
  nazwa: 'Nazwa',
  opis: 'Opis',
  dodatkowe: 'Dodatkowe'
};

export const userRoleDictDatabaseLabels = {
  idRolaUzytkownikow: 'ID Roli Użytkownika',
  nazwa: 'Nazwa roli użytkownika',
  opis: 'Opis'
};

export const batchTypeDictDatabaseLabels = {
  idTypPartii: 'ID Typu Partii',
  nazwa: 'Nazwa typu partii',
  jednostka: 'Jednostka',
  typ: 'Typ'
};

export const wineInformationDatabaseLabels = {
  idInformacjeOWinie: 'ID Informacji o winie',
  nazwa: 'Informacje o winie',
  motto: 'Motto',
  zawartoscPotAlergenow: 'Zawartość alergenów',
  wartoscEnergetyczna: 'Wartość energetyczna'
};

export const contractorsDatabaseLabels = {
  idKontrahenci: 'ID Kontrahenta',
  NIP: 'NIP',
  nazwaSpolki: 'Nazwa spółki',
  telefon: 'Nr telefonu',
  eMail: 'E-mail',
  stronaWww: 'Strona WWW',
  KRS: 'KRS',
  nrKonta: 'Nr konta bankowego'
};

export const waybillDatabaseLabels = {
  idListPrzewozowy: 'ID List przewozowy',
  imieKierowcy: 'Imie kierowcy',
  nazwiskoKierowcy: 'Nazwisko kierowcy',
  uwagiPrzewoznika: 'Uwagi przewoźnika',
  zastrzezeniaOdbiorcy: 'Zastrzeżenia odbiorcy',
  eDokument: 'E-dokument'
};

export const warehouseDatabaseLabels = {
  idMagazyn: 'ID Magazynu',
  rodzaj: 'Rodzaj',
  pojemnosc: 'Pojemność'
};

export const vineyardOperationsDatabaseLabels = {
  idOperacja: 'ID Operacji',
  data: 'Data',
  opis: 'Opis'
};

export const batchDatabaseLabels = {
  idPartie: 'ID Partii',
  ilosc: 'Ilość',
  opis: 'Opis',
  dataUtworzenia: 'Data utowrzenia'
};

export const vineyardDatabaseLabels = {
  idWinnica: 'ID Winnicy',
  nazwa: 'Nazwa winnicy',
  powierzchnia: 'Powierzchnia',
  stan: 'Stan',
  terroir: 'Terroir',
  dataOstatniegoZbioru: 'Data ostatniego zbioru',
  dataZasadzenia: 'Data zasadzenia'
};

export const operationsDatabaseLabels = {
  idOperacja: 'ID Operacji',
  iloscPrzed: 'Ilość przed',
  iloscPo: 'Ilość po',
  dataPoczatku: 'Data rozpoczęcia',
  dataZakonczenia: 'Data zakończenia',
  zawartoscAlkoholu: 'Zawartość alkoholu',
  iloscDodatku: 'Ilość dodatku',
  zawartoscCukru: 'Zawartość cukru',
  kwasowosc: 'Kwasowość',
  temperatura: 'Temperatura',
  opis: 'Opis'
};

export const itemInStockDatabaseLabels = {
  idPozycja: 'ID Pozycji',
  nazwa: 'Nazwa',
  opis: 'Opis',
  ilosc: 'Ilość',
  kodKreskowy: 'Kod kreskowy',
  stanAktualny: 'Stan aktualny?',
  dataPrzyjecia: 'Data przyjęcia',
  dataWydania: 'Data wydania',
  nazwaSektora: 'Nazwa sektora'
};

export const parcelDatabaseLabels = {
  idPrzesylka: 'ID Przesyłki',
  nazwaPrzesylki: 'Nazwa przesyłki',
  ciezarLadunku: 'Ciężar ładunku',
  data: 'Data'
};

export const harvestDatabaseLabels = {
  idWinobranie: 'ID Winobrania',
  dataWinobrania: 'Data winobrania',
  iloscZebranychWinogron: 'Ilość zebranych winogron'
};
