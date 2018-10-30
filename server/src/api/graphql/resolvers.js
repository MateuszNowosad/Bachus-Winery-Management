const adresy = [
    {
        idAdres: '1',
        miasto: 'Warszawa',
        kodPocztowy: '32-543',
        ulica: 'Ladna',
        nrLokalu: '2',
        nrPosesji: '15',
        kraj: 'Polska',
    },
    {
        idAdres: '2',
        miasto: 'Lublin',
        kodPocztowy: '45-432',
        ulica: 'Kwiatowa',
        nrLokalu: '3',
        nrPosesji: '12',
        kraj: 'Polska',
    }
];

const magazyny = [
    {
        idMagazyn: '1',
        rodzaj: 'polProdukty',
        pojemnosc: 10,
        idAdres: '1',
    },
    {
        idMagazyn: '2',
        rodzaj: 'produktySkonczone',
        pojemnosc: 20,
        idAdres: '2',
    },
    {
        idMagazyn: '3',
        rodzaj: 'sklad',
        pojemnosc: 50,
        idAdres: '2',
    }
];

const kontrahenci = [
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
        idAdres: '2'
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
        idAdres: '1'
    }
];

const listyPrzewozowe = [
    {
        idListPrzewozowy: '1',
        imieKierowcy: 'Jan',
        nazwiskoKierowcy: 'Kowalski',
        uwagiPrzewoznika: '',
        zastrzezeniaOdbiorcy: '',
        eDokument: '/dokumenty/5.pdf',
        kontrahen: '1',
        przesylka: '1'
    },
    {
        idListPrzewozowy: '2',
        imieKierowcy: 'Michal',
        nazwiskoKierowcy: 'Kwit',
        uwagiPrzewoznika: '',
        zastrzezeniaOdbiorcy: '',
        eDokument: '/dokumenty/7.pdf',
        kontrahent: '2',
        przesylka: '2'
    }
];

const przesylki = [
    {
        idPrzesylka: '1',
        nazwaPrzesylki: 'butelki',
        ciezarLadunku: '300',
        date: '15-10-2018'
    },
    {
        idPrzesylka: '2',
        nazwaPrzesylki: 'korek',
        ciezarLadunku: '220',
        date: '18-9-2018'
    }
];

const dictOperacjeNaWinnicy = [
    {
        idDictOperacjeNaWinnicy: '1',
        nazwa: 'zbieranie winogron',
        opis: 'zbieranie winogron z winnicy',
    },
    {
        idDictOperacjeNaWinnicy: '2',
        nazwa: 'podlewanie winogron',
        opis: 'podlewanie winogron w winnicy',
    }
];

export default {
    Query: {
        Adresy: (_, input, context) => {
            return adresy;
        },
        Adres: (_, { idAdres }, context) => {
            return adresy.find(adres => adres.idAdres === idAdres);
        },
        Magazyny: (_, input, context) => {
            return magazyny;
        },
        Magazyn: (_, { idMagazyn }, context) => {
            return magazyny.find(magazyn => magazyn.idMagazyn === idMagazyn)
        },
        Kontrahenci: (_, input, context) => {
            console.log('85, _ filip: ', _);
            console.log('86, input filip: ', input);
            console.log('87, context filip: ', context);
            return kontrahenci;
        },
        KontrahentPlural: (_, { idKontrahenci }, context) => {
            return kontrahenci.find(kontrahent => kontrahent.idKontrahenci === idKontrahenci);
        },
        ListyPrzewozowe: (_, input, context) => {
            return listyPrzewozowe;
        },
        ListPrzewozowy: (_, { idListPrzewozowy }, context) => {
            return listyPrzewozowe.find(listPrzewozowy => listPrzewozowy.idListPrzewozowy === idListPrzewozowy)
        },
        Przesylki: (_, input, context) => {
            return przesylki;
        },
        Przesylka: (_, { idPrzesylka }, context) => {
            return przesylki.find(przesylka => przesylka.idPrzesylka === idPrzesylka);
        },
        DictOperacjeNaWinnicy: (_, input, context) => {
            return dictOperacjeNaWinnicy;
        },
        DictOperacjaNaWinnicy: (_, { idDictOperacjeNaWinnicy }, context) => {
            return dictOperacjeNaWinnicy.find(operacja => operacja.idDictOperacjeNaWinnicy === idDictOperacjeNaWinnicy);
        }
    },
    Magazyn: {
        adres: (_, input, context) => {
            return adresy.find(adres => adres.idAdres === _.idAdres);
        }
    },
    Kontrahenci: {
        adres: (_, input, context) => {
            return adresy.find(adres => adres.idAdres === _.idAdres);
        },
        listprzewozowy: (_, input, context) => {
            // return w jaki sposób znaleźć listy przewozowe dla danego kontrahenta
            // dane obecnego kontrahenta są w obiekcie _
            console.log('106, _ filip: ', _);
            // return adresy.find(adres => adres.idAdres === _.idAdres);
        }
    }
    // Mutation: {}
};
