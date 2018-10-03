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
        idkontrahenci: 1,
        NIP: 123-456-32-18,
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
        idkontrahenci: 2,
        NIP: 223-446-32-18,
        nazwa_spolki: 'Spolka2',
        telefon: '765-543-432',
        e_mail: 'mail3@cos.pl',
        strona_www: 'www.strona2.pl',
        KRS: '2000501372',
        nr_konta: '77 2370 0008 3643 5881 8319 4956',
        fax: '+44-208-1234567',
        idadres: '1'
    }
]

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
        Magazyn: (_, input, context) => {
            return magazyny.find(magazyn => magazyn.idmagazyn === input.idmagazyn)
        },
        Kontrahenci:  (_, input, context) => {
            return kontrachenci;
        },
        Kontrahent:  (_, input, context) => {
            return kontrachenci;
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
        }
    }
    // Mutation: {}
};
