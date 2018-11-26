export const ADRES = [
  {
    idAdres: '1',
    miasto: 'Warszawa',
    kodPocztowy: '32-543',
    ulica: 'Ladna',
    nrLokalu: '2',
    nrPosesji: '15',
    kraj: 'Polska',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idAdres: '2',
    miasto: 'Lublin',
    kodPocztowy: '45-432',
    ulica: 'Kwiatowa',
    nrLokalu: '3',
    nrPosesji: '12',
    kraj: 'Polska',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const DICTKATEGORIAWINA = [
  {
    idDictKategoriaWina: '1',
    nazwaKategoria: '',
    opis: ''
  },
  {
    idDictKategoriaWina: '2',
    nazwaKategoria: '',
    opis: ''
  }
];
export const DICTKATEGORIE = [
  {
    idKategorie: '1',
    nazwa: '',
    jednostka: '',
    opis: ''
  },
  {
    idKategorie: '2',
    nazwa: '',
    jednostka: '',
    opis: ''
  }
];
export const DICTODMIANAWINOGRON = [
  {
    idOdmianaWinogron: '1',
    nazwa: '',
    opis: ''
  },
  {
    idOdmianaWinogron: '2',
    nazwa: '',
    opis: ''
  }
];

export const DICTOPERACJENAWINNICY = [
  {
    idDictOperacjeNaWinnicy: '1',
    nazwa: 'zbieranie winogron',
    opis: 'zbieranie winogron z winnicy',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idDictOperacjeNaWinnicy: '2',
    nazwa: 'podlewanie winogron',
    opis: 'podlewanie winogron w winnicy',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const DICTPROCESY = [
  {
    idDictProcesy: '1',
    nazwa: '',
    opis: '',
    dodatkowe: ''
  },
  {
    idDictProcesy: '2',
    nazwa: '',
    opis: '',
    dodatkowe: ''
  }
];
export const DICTROLAUZYTKOWNIKOW = [
  {
    idRolaUzytkownikow: '1',
    nazwa: '',
    opis: ''
  },
  {
    idRolaUzytkownikow: '2',
    nazwa: '',
    opis: ''
  }
];
export const DICTTYPPARTII = [
  {
    idTypPartii: '1',
    nazwa: '',
    jednostka: ''
  },
  {
    idTypPartii: '2',
    nazwa: '',
    jednostka: ''
  }
];
export const INFORMACJEOWINIE = [
  {
    idInformacjeOWinie: '1',
    nazwa: '',
    motto: '',
    zawartoscPotAlergenow: '',
    wartoscEnergetyczna: '',
    kategoriaWina: ''
  },
  {
    idInformacjeOWinie: '2',
    nazwa: '',
    motto: '',
    zawartoscPotAlergenow: '',
    wartoscEnergetyczna: '',
    kategoriaWina: ''
  }
];

export const KONTRAHENCI = [
  {
    idKontrahenci: '1',
    NIP: '123-456-32-18',
    nazwaSpolki: 'Spolka1',
    telefon: '432-321-123',
    eMail: 'mail1@cos.pl',
    strona_www: 'www.strona1.pl',
    KRS: '3000501372',
    nrKonta: '77 2370 0008 3643 5881 8319 4956',
    fax: '+44-208-1234567',
    idAdres: '2',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idKontrahenci: '2',
    NIP: '223-446-32-18',
    nazwaSpolki: 'Spolka2',
    telefon: '765-543-432',
    eMail: 'mail3@cos.pl',
    strona_www: 'www.strona2.pl',
    KRS: '2000501372',
    nrKonta: '77 2370 0008 3643 5881 8319 4956',
    fax: '+44-208-1234567',
    idAdres: '1',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const LISTPRZEWOZOWY = [
  {
    idListPrzewozowy: '1',
    imieKierowcy: 'Jan',
    nazwiskoKierowcy: 'Kowalski',
    uwagiPrzewoznika: '',
    zastrzezeniaOdbiorcy: '',
    eDokument: '/dokumenty/5.pdf',
    kontrahen: '1',
    przesylka: '1',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idListPrzewozowy: '2',
    imieKierowcy: 'Michal',
    nazwiskoKierowcy: 'Kwit',
    uwagiPrzewoznika: '',
    zastrzezeniaOdbiorcy: '',
    eDokument: '/dokumenty/7.pdf',
    kontrahent: '2',
    przesylka: '2',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const MAGAZYN = [
  {
    idMagazyn: '1',
    rodzaj: 'polProdukty',
    pojemnosc: 10,
    idAdres: '1',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idMagazyn: '2',
    rodzaj: 'produktySkonczone',
    pojemnosc: 20,
    idAdres: '2',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idMagazyn: '3',
    rodzaj: 'sklad',
    pojemnosc: 50,
    idAdres: '2',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const OPERACJE = [
  {
    idOperacja: '1',
    iloscPrzed: '',
    iloscPo: '',
    dataPoczatku: '',
    dataZakonczenia: '',
    zawartoscAlkoholu: '',
    iloscDodatku: '',
    zawartoscCukru: '',
    kwasowosc: '',
    temperatura: '',
    opis: '',
    uzytkownicy: '',
    procesy: ''
  },
  {
    idOperacja: '2',
    iloscPrzed: '',
    iloscPo: '',
    dataPoczatku: '',
    dataZakonczenia: '',
    zawartoscAlkoholu: '',
    iloscDodatku: '',
    zawartoscCukru: '',
    kwasowosc: '',
    temperatura: '',
    opis: '',
    uzytkownicy: '',
    procesy: ''
  }
];
export const OPERACJENAWINNICY = [
  {
    idOperacja: '1',
    data: '',
    opis: '',
    dictOperacjeNaWinnicy: '',
    winnica: ''
  },
  {
    idOperacja: '2',
    data: '',
    opis: '',
    dictOperacjeNaWinnicy: '',
    winnica: ''
  }
];
export const PARTIE = [
  {
    idPartie: '1',
    ilosc: '',
    opis: '',
    dataUtworzenia: '',
    winobranie: '',
    partie: '',
    typPartii: '',
    informacjeOWinie: ''
  },
  {
    idPartie: '2',
    ilosc: '',
    opis: '',
    dataUtworzenia: '',
    winobranie: '',
    partie: '',
    typPartii: '',
    informacjeOWinie: ''
  }
];
export const PLANYPRODUKCYJNE = [
  {
    idPlanyProdukcyjne: '1',
    nazwa: '',
    opis: '',
    rodzajWinogron: '',
    typPartii: '',
    kategorie: '',
    eDokument: ''
  },
  {
    idPlanyProdukcyjne: '2',
    nazwa: '',
    opis: '',
    rodzajWinogron: '',
    typPartii: '',
    kategorie: '',
    eDokument: ''
  }
];
export const POZYCJAWMAGAZYNIE = [
  {
    idPozycja: '1',
    nazwa: '',
    opis: '',
    ilosc: '',
    kodKreskowy: '',
    stanAktualny: '',
    dataPrzyjecia: '',
    dataWydania: '',
    nazwaSektora: '',
    kategorie: '',
    magazyn: '',
    partie: ''
  },
  {
    idPozycja: '2',
    nazwa: '',
    opis: '',
    ilosc: '',
    kodKreskowy: '',
    stanAktualny: '',
    dataPrzyjecia: '',
    dataWydania: '',
    nazwaSektora: '',
    kategorie: '',
    magazyn: '',
    partie: ''
  }
];

export const PRZESYLKA = [
  {
    idPrzesylka: '1',
    nazwaPrzesylki: 'butelki',
    ciezarLadunku: '300',
    date: '15-10-2018',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  },
  {
    idPrzesylka: '2',
    nazwaPrzesylki: 'korek',
    ciezarLadunku: '220',
    date: '18-9-2018',
    createdAt: '2018-11-02 16:42:39',
    updatedAt: '2018-11-02 16:42:39'
  }
];

export const RAPORTY = [
  {
    idRaport: '1',
    nazwa: '',
    eDokument: '',
    dataUtworzenia: ''
  },
  {
    idRaport: '2',
    nazwa: '',
    eDokument: '',
    dataUtworzenia: ''
  }
];
export const UZYTKOWNICY = [
  {
    idUzytkownika: '1',
    imie: '',
    nazwisko: '',
    login: '',
    haslo: '',
    PESEL: '',
    eMail: '',
    nrTelefonu: '',
    dataOstatniegoLogowania: '',
    zdjecie: '',
    czyAktywne: '',
    adres: '',
    rola: ''
  },
  {
    idUzytkownika: '2',
    imie: '',
    nazwisko: '',
    login: '',
    haslo: '',
    PESEL: '',
    eMail: '',
    nrTelefonu: '',
    dataOstatniegoLogowania: '',
    zdjecie: '',
    czyAktywne: '',
    adres: '',
    rola: ''
  }
];
export const WINNICA = [
  {
    idWinnica: '1',
    nazwa: '',
    powierzchnia: '',
    stan: '',
    terroir: '',
    dataOstatniegoZbioru: '',
    dataZasadzenia: '',
    ewidencyjnyIdDzialki: '',
    dictOdmianaWinogron: ''
  },
  {
    idWinnica: '2',
    nazwa: '',
    powierzchnia: '',
    stan: '',
    terroir: '',
    dataOstatniegoZbioru: '',
    dataZasadzenia: '',
    ewidencyjnyIdDzialki: '',
    dictOdmianaWinogron: ''
  }
];
export const WINORBANIE = [
  {
    idWinobranie: '1',
    dataWinobrania: '',
    iloscZebranychWinogron: '',
    winnica: ''
  },
  {
    idWinobranie: '2',
    dataWinobrania: '',
    iloscZebranychWinogron: '',
    winnica: ''
  }
];
