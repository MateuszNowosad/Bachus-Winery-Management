const adresy = [
    {
        idadres: '1',
        miasto: 'Warszawa',
        kod_pocztowy: '32-543',
        ulica: 'Ladna',
        nr_lokalu: '2',
        nr_posesji: '15',
        kraj: 'Polska',
    },
    {
        idadres: '2',
        miasto: 'Lublin',
        kod_pocztowy: '45-432',
        ulica: 'Kwiatowa',
        nr_lokalu: '3',
        nr_posesji: '12',
        kraj: 'Polska',
    }
];

const magazyny = [
    {
        idmagazyn: '1',
        rodzaj: 'polProdukty',
        pojemnosc: 10,
        idadres: '1',
    },
    {
        idmagazyn: '2',
        rodzaj: 'produktySkonczone',
        pojemnosc: 20,
        idadres: '2',
    },
    {
        idmagazyn: '3',
        rodzaj: 'sklad',
        pojemnosc: 50,
        idadres: '2',
    }
];

const kontrahenci = [
    {
        idkontrahenci: '1',
        NIP: '123-456-32-18',
        nazwa_spolki: 'Spolka1',
        telefon: '432-321-123',
        e_mail: 'mail1@cos.pl',
        strona_www: 'www.strona1.pl',
        KRS: '3000501372',
        nr_konta: '77 2370 0008 3643 5881 8319 4956',
        fax: '+44-208-1234567',
        idadres: '2'
    },
    {
        idkontrahenci: '2',
        NIP: '223-446-32-18',
        nazwa_spolki: 'Spolka2',
        telefon: '765-543-432',
        e_mail: 'mail3@cos.pl',
        strona_www: 'www.strona2.pl',
        KRS: '2000501372',
        nr_konta: '77 2370 0008 3643 5881 8319 4956',
        fax: '+44-208-1234567',
        idadres: '1'
    }
];

const listyPrzewozowe = [
    {
        idlist_przewozowy: '1',
        imie_kierowcy: 'Jan',
        nazwisko_kierowcy: 'Kowalski',
        uwagi_przewoznika: '',
        zastrzezenia_odbiorcy: '',
        edokument: '/dokumenty/5.pdf',
        idkontrahent: '1',
        idprzesylka: '1'
    },
    {
        idlist_przewozowy: '2',
        imie_kierowcy: 'Michal',
        nazwisko_kierowcy: 'Kwit',
        uwagi_przewoznika: '',
        zastrzezenia_odbiorcy: '',
        edokument: '/dokumenty/7.pdf',
        idkontrahent: '2',
        idprzesylka: '2'
    }
];

const przesylki = [
    {
        idprzesylka: '1',
        nazwa_przesylki: 'butelki',
        ciezar_ladunku: '300',
        date: '15-10-2018'
    },
    {
        idprzesylka: '2',
        nazwa_przesylki: 'korek',
        ciezar_ladunku: '220',
        date: '18-9-2018'
    }
];

const dictOperacjeNaWinnicy = [
    {
        iddict_operacje_na_winnicy: '1',
        nazwa: 'zbieranie winogron',
        opis: 'zbieranie winogron z winnicy',
    },
    {
        iddict_operacje_na_winnicy: '2',
        nazwa: 'podlewanie winogron',
        opis: 'podlewanie winogron w winnicy',
    }
];

export default {
    Query: {
        Adresy: (_, input, context) => {
            return adresy;
        },
        Adres: (_, { idadres }, context) => {
            return adresy.find(adres => adres.idadres === idadres);
        },
        Magazyny: (_, input, context) => {
            return magazyny;
        },
        Magazyn: (_, { idmagazyn }, context) => {
            return magazyny.find(magazyn => magazyn.idmagazyn === idmagazyn)
        },
        Kontrahenci: (_, input, context) => {
            console.log('85, _ filip: ', _);
            console.log('86, input filip: ', input);
            console.log('87, context filip: ', context);
            return kontrahenci;
        },
        Kontrahent: (_, { idkontrahenci }, context) => {
            return kontrahenci.find(kontrahent => kontrahent.idkontrahenci === idkontrahenci);
        },
        ListyPrzewozowe: (_, input, context) => {
            return listyPrzewozowe;
        },
        ListPrzewozowy: (_, { idlist_przewozowy }, context) => {
            return listyPrzewozowe.find(listPrzewozowy => listPrzewozowy.idlist_przewozowy === idlist_przewozowy)
        },
        Przesylki: (_, input, context) => {
            return przesylki;
        },
        Przesylka: (_, { idprzesylka }, context) => {
            return przesylki.find(przesylka => przesylka.idprzesylka === idprzesylka);
        },
        DictOperacjeNaWinnicy: (_, input, context) => {
            return dictOperacjeNaWinnicy;
        },
        DictOperacjaNaWinnicy: (_, { iddict_operacje_na_winnicy }, context) => {
            return dictOperacjeNaWinnicy.find(operacja => operacja.iddict_operacje_na_winnicy === iddict_operacje_na_winnicy);
        }
    },
    Magazyn: {
        adres: (_, input, context) => {
            return adresy.find(adres => adres.idadres === _.idadres);
        }
    },
    Kontrahent: {
        adres: (_, input, context) => {
            return adresy.find(adres => adres.idadres === _.idadres);
        },
        listprzewozowy: (_, input, context) => {
            // return w jaki sposób znaleźć listy przewozowe dla danego kontrahenta
            // dane obecnego kontrahenta są w obiekcie _
            console.log('106, _ filip: ', _);
            // return adresy.find(adres => adres.idadres === _.idadres);
        },
        e_mail: (_, input, context) => {
            //return zamień e-mail na e_mail
            // return e_mail = _.'e-mail';
        }
    }
    // Mutation: {}
};
