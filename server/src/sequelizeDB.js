// import Sequelize from 'sequelize';
// import jwt from 'jsonwebtoken';
// import createJwtToken from '../utils/createJwtToken';
// import { getSetQueryFragments } from '../utils/sequelize';
// import moment from 'moment';
// import ConnectDataService from '../services/ConnectDataService';
// var faker = require('faker/locale/pl');
// import * as table from './sql/tableDefinition';
// import * as generate from './sql/generateTableData';

const _ = require('underscore');
const faker = require('faker');
const Sequelize = require('sequelize');

// TODO ADD many-to-many tables to docker
// TODO ADD many-to-many tables to docker
// TODO ADD many-to-many tables to docker
// TODO ADD many-to-many tables to docker

// const sequelize = new Sequelize('mysql://test@172.17.0.2:3306/bachusWinery');
const sequelize = new Sequelize({
  database: 'bachusWinery',
  username: 'test',
  password: 'test',
  dialect: 'mysql',
  host: '172.17.0.2',
  connectionTimeout: 0,
  pool: {
    min: 1,
    idle: 10000
  },
  retry: { max: 3 },
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

const recordsToGenerate = 1;
const fkKeyPoolNumber = { min: 1, max: 2 };

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// ^[a-z0-9][a-z0-9\- ]{0,12}[a-z0-9]$
async function createAdres() {
  await sequelize.sync().then(() =>
    ADRES.create({
      miasto: faker.fake('{{address.city}}'),
      kodPocztowy: faker.fake('{{address.zipCode}}'),
      ulica: faker.fake('{{address.streetName}}'),
      nrLokalu: faker.random.number(20),
      nrPosesji: faker.random.number(9999),
      kraj: faker.fake('{{address.country}}')
    })
  );
}

async function createDictKategoriaWina() {
  await sequelize.sync().then(() =>
    DICTKATEGORIAWINA.create({
      nazwaKategoria: faker.lorem.word(faker.random.number(10)),
      opis: faker.lorem.words(8)
    })
  );
}

let word = 0;

async function createDictKategorie() {
  await sequelize.sync().then(() =>
    DICTKATEGORIE.create({
      nazwa: faker.lorem.word((word += 1)),
      jednostka: faker.random.arrayElement(['sztuki', 'kilogramy', 'gramy', 'tony', 'mililitry', 'litry']),
      opis: faker.lorem.words(8)
    })
  );
}

async function createDictOdmianaWinogron() {
  await sequelize.sync().then(() =>
    DICTODMIANAWINOGRON.create({
      nazwa: faker.lorem.word((word += 1)),
      opis: faker.lorem.words(9)
    })
  );
}

async function createDictOperacjeNaWinnicy() {
  await sequelize.sync().then(() =>
    DICTOPERACJENAWINNICY.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      opis: faker.lorem.words(10),
      dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: faker.random.number(fkKeyPoolNumber),
      winnicaIdWinnica: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createDictProcesy() {
  await sequelize.sync().then(() =>
    DICTPROCESY.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      opis: faker.lorem.words(10),
      dodatkowe: faker.lorem.word(faker.random.number(100))
    })
  );
}

async function createDictRolaUzytkownikow() {
  await sequelize.sync().then(() =>
    DICTROLAUZYTKOWNIKOW.create({
      nazwa: faker.lorem.word((word += 1)),
      opis: faker.lorem.words(10),
      typ: faker.random.arrayElement(['administrator', 'pracownik', 'pracownik', 'pracownik', 'pracownik'])
    })
  );
}

async function createDictTypPartii() {
  await sequelize.sync().then(() =>
    DICTTYPPARTII.create({
      nazwa: faker.lorem.word((word += 1)),
      jednostka: faker.random.arrayElement(['sztuki', 'kilogramy', 'gramy', 'tony', 'mililitry', 'litry'])
    })
  );
}

async function createInformacjeOWinie() {
  await sequelize.sync().then(() =>
    INFORMACJEOWINIE.create({
      nazwa: faker.lorem.word((word += 1)),
      motto: faker.lorem.words(10),
      zawartoscPotAlergenow: faker.random.word(2),
      wartoscEnergetyczna: faker.random.number(999),
      dictKategoriaWinaIdDictKategoriaWina: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createKontrahenci() {
  await sequelize.sync().then(() =>
    KONTRAHENCI.create({
      NIP: faker.finance.account(10),
      nazwaSpolki: faker.company.companyName(),
      telefon: faker.phone.phoneNumberFormat(),
      eMail: faker.internet.email(),
      stronaWww: faker.internet.url(),
      KRS: faker.finance.account(10),
      nrKonta: faker.finance.account(26),
      fax: faker.phone.phoneNumberFormat(),
      adresIdAdres: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createListPrzewozowy() {
  await sequelize.sync().then(() =>
    LISTPRZEWOZOWY.create({
      imieKierowcy: faker.name.firstName(),
      nazwiskoKierowcy: faker.name.lastName(),
      uwagiPrzewoznika: faker.random.words(3),
      zastrzezeniaOdbiorcy: faker.random.words(5),
      eDokument: 'web/src/' + faker.random.word(1),
      przesylkaIdPrzesylka: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createMagazyn() {
  await sequelize.sync().then(() =>
    MAGAZYN.create({
      rodzaj: faker.random.arrayElement(['polproduktow', 'materialow', 'produktow_skonczonych']),
      pojemnosc: faker.random.number({ min: 1, max: 99999 }) + '.' + faker.random.number(9),
      adresIdAdres: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createOperacje() {
  await sequelize.sync().then(() =>
    OPERACJE.create({
      iloscPrzed: faker.random.number({ min: 1, max: 9999 }) + '.' + faker.random.number(99),
      iloscPo: faker.random.number({ min: 1, max: 9999 }) + '.' + faker.random.number(99),
      dataPoczatku: faker.date.recent(),
      dataZakonczenia: faker.date.future(),
      zawartoscAlkoholu: faker.random.number(9) + '.' + faker.random.number(9),
      iloscDodatku: faker.random.number(9) + '.' + faker.random.number(9),
      zawartoscCukru: faker.random.number(9) + '.' + faker.random.number(9),
      kwasowosc: faker.random.number(9) + '.' + faker.random.number(9),
      temperatura: faker.random.number(9) + '.' + faker.random.number(9),
      opis: faker.random.words(5),
      uzytkownicyIdUzytkownicy: faker.random.number(fkKeyPoolNumber),
      dictProcesyIdDictProcesy: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createOperacjeNaWinnicy() {
  await sequelize.sync().then(() =>
    OPERACJENAWINNICY.create({
      data: faker.date.recent(),
      opis: faker.random.words(5),
      dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: faker.random.number(fkKeyPoolNumber),
      winnicaIdWinnica: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createPartie() {
  await sequelize.sync().then(() =>
    PARTIE.create({
      ilosc: faker.random.number({ min: 1, max: 999 }) + '.' + faker.random.number(9),
      opis: faker.random.words(5),
      dataUtworzenia: faker.date.recent(),
      winobranieIdWinobranie: faker.random.number(fkKeyPoolNumber),
      partieIdPartie: faker.random.number(fkKeyPoolNumber),
      typPartiiIdTypPartii: faker.random.number(fkKeyPoolNumber),
      informacjeOWinieIdInformacjeOWinie: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createPlanyProdukcyjne() {
  await sequelize.sync().then(() =>
    PLANYPRODUKCYJNE.create({
      nazwa: faker.random.word(1),
      opis: faker.random.words(5),
      dictRodzajWinogronIdOdmianaWinogron: faker.random.number(fkKeyPoolNumber),
      dictTypPartiiIdTypPartii: faker.random.number(fkKeyPoolNumber),
      dictKategorieIdKategorie: faker.random.number(fkKeyPoolNumber),
      eDokument: 'web/documents/plans/' + faker.random.word(1) + '.pdf'
    })
  );
}

async function createPozycjaWMagazynie() {
  await sequelize.sync().then(() =>
    POZYCJAWMAGAZYNIE.create({
      nazwa: faker.random.word(1),
      opis: faker.random.words(5),
      ilosc: faker.random.number({ min: 1, max: 999 }) + '.' + faker.random.number(9),
      kodKreskowy: faker.address.zipCode(),
      stanAktualny: faker.random.boolean(),
      dataPrzyjecia: faker.date.past(),
      dataWydania: faker.date.recent(),
      nazwaSektora: faker.random.arrayElement(['SektorA', 'SektorB', 'SektorC', 'SektorD', 'SektorE', 'SektorF']),
      kategorieIdKategorie: faker.random.number(fkKeyPoolNumber),
      magazynIdMagazyn: faker.random.number(fkKeyPoolNumber),
      partieIdPartie: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createPrzesylka() {
  await sequelize.sync().then(() =>
    PRZESYLKA.create({
      nazwaPrzesylki: faker.random.word(1),
      ciezarLadunku: faker.random.number({ min: 0, max: 9999 }) + '.' + faker.random.number({ min: 0, max: 99 }),
      data: faker.date.past()
    })
  );
}

async function createRaporty() {
  await sequelize.sync().then(() =>
    RAPORTY.create({
      nazwa: faker.random.word(1),
      eDokument: 'web/documents/raports/' + faker.random.word(1) + '.pdf',
      dataUtworzenia: faker.date.past()
    })
  );
}

async function createUzytkownicy() {
  await sequelize.sync().then(() =>
    UZYTKOWNICY.create({
      imie: faker.name.firstName(),
      nazwisko: faker.name.lastName(),
      login: faker.internet.userName(),
      haslo: faker.random.uuid(),
      PESEL:
        faker.random.number({ min: 50, max: 98 }) +
        faker.random.number(12) +
        faker.random.number(31) +
        faker.random.number(99999),
      eMail: faker.internet.email(),
      nrTelefonu: faker.random.number(999) + '-' + faker.random.number(999) + '-' + faker.random.number(999),
      dataOstatniegoLogowania: faker.date.recent(),
      adresIdAdres: faker.random.number(fkKeyPoolNumber),
      dictRolaUzytkownikowIdRolaUzytkownikow: faker.random.number(fkKeyPoolNumber),
      zdjecie: faker.internet.avatar(),
      czyAktywne: faker.random.boolean()
    })
  );
}

async function createWinnica() {
  await sequelize.sync().then(() =>
    WINNICA.create({
      nazwa: faker.random.word(1),
      powierzchnia: faker.random.number(9999) + '.' + faker.random.number(99),
      stan: faker.random.arrayElement(['Aktywna', 'Aktywna', 'Aktywna', 'Aktywna', 'Aktywna', 'Nieczynna']),
      terroir: faker.random.words(10),
      dataOstatniegoZbioru: faker.date.recent(),
      dataZasadzenia: faker.date.past(),
      ewidencyjnyIdDzialki:
        faker.random.number(999999) +
        '_' +
        faker.random.number(9) +
        '.' +
        faker.random.number(9999) +
        '.' +
        faker.random.number(999),
      odmianiaWinogronIdOdmianaWinogron: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createWinobranie() {
  await sequelize.sync().then(() =>
    WINOBRANIE.create({
      dataWinobrania: faker.date.past(),
      iloscZebranychWinogron: faker.random.number(999) + '.' + faker.random.number(9),
      winnicaIdWinnica: faker.random.number(fkKeyPoolNumber)
    })
  );
}

async function createListPrzewozowyHasAdres() {
  await sequelize.sync().then(() => {
    LISTPRZEWOZOWYHASADRES.create({
      adresIdAdres: faker.random.number(fkKeyPoolNumber),
      miejsce: faker.random.arrayElement(['Nadania', 'Odbioru']),
      listPrzewozowyIdListPrzewozowy: faker.random.number(fkKeyPoolNumber)
    });
  });
}
async function createListPrzewozowyHasKontrahenci() {
  await sequelize.sync().then(() => {
    LISTPRZEWOZOWYHASKONTRAHENCI.create({
      listPrzewozowyIdListPrzewozowy: faker.random.number(fkKeyPoolNumber),
      kontrahenciIdKontrahenci: faker.random.number(fkKeyPoolNumber),
      typ: faker.random.arrayElement(['Odbiorca', 'Przewoznik'])
    });
  });
}
async function createOperacjeHasPartie() {
  await sequelize.sync().then(() => {
    OPERACJEHASPARTIE.create({
      operacjeIdOperacja: faker.random.number(fkKeyPoolNumber),
      partieIdPartie: faker.random.number(fkKeyPoolNumber),
      ilosc: faker.random.number(99) + '.' + faker.random.number(9)
    });
  });
}
async function createOperacjeHasPozycjaWMagazynie() {
  await sequelize.sync().then(() => {
    OPERACJEHASPOZYCJAWMAGAZYNIE.create({
      operacjeIdOperacja: faker.random.number(fkKeyPoolNumber),
      pozycjaWMagazynieIdPozycja: faker.random.number(fkKeyPoolNumber),
      ilosc: faker.random.number(99) + '.' + faker.random.number(99)
    });
  });
}
async function createPlanyProdukcyjneHasDictProcesy() {
  await sequelize.sync().then(() => {
    PLANYPRODUKCYJNEHASDICTPROCESY.create({
      planyProdukcyjneIdPlanyProdukcyjne: faker.random.number(fkKeyPoolNumber),
      dictProcesyIdDictProcesy: faker.random.number(fkKeyPoolNumber)
    });
  });
}
async function createPrzesylkaHasPozycjaWMagazynie() {
  await sequelize.sync().then(() => {
    PRZESYLKAHASPOZYCJAWMAGAZYNIE.create({
      przesylkaIdPrzesylka: faker.random.number(fkKeyPoolNumber),
      pozycjaWMagazynieIdPozycja: faker.random.number(fkKeyPoolNumber),
      ilosc: faker.random.number(99) + '.' + faker.random.number(99)
    });
  });
}
async function createRaportyHasUzytkownicy() {
  await sequelize.sync().then(() => {
    RAPORTYHASUZYTKOWNICY.create({
      raportyIdRaport: faker.random.number(fkKeyPoolNumber),
      uzytkownicyIdUzytkownika: faker.random.number(fkKeyPoolNumber)
    });
  });
}

const ADRES = sequelize.define('Adres', {
  idAdres: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  miasto: {
    type: Sequelize.STRING(40),
    allowNull: false,
    validate: {
      is: /^([\p{L}\d' ]{2,40})$/u
    }
  },
  kodPocztowy: {
    type: Sequelize.STRING(12),
    allowNull: false
  },
  ulica: {
    type: Sequelize.STRING(45),
    allowNull: false,
    validate: {
      is: /^([\p{L}\d' ]{2,45})$/u
    }
  },
  nrLokalu: {
    type: Sequelize.STRING(2),
    allowNull: true,
    validate: {
      is: /^(|\d{1,2})$/
    }
  },
  nrPosesji: {
    type: Sequelize.STRING(4),
    allowNull: false,
    validate: {
      is: /^\d{1,4}$/
    }
  },
  kraj: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      is: /^([\p{L}' ()]{2,60})$/u
    }
  }
});

const DICTKATEGORIAWINA = sequelize.define('DictKategoriaWina', {
  idDictKategoriaWina: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwaKategoria: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    validate: { is: /^([\\p{L}\' ()]{3,45})$/u }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: /^(|[\\s\\S]{2,255})$/u } }
});

const DICTKATEGORIE = sequelize.define('DictKategorie', {
  idKategorie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(20), allowNull: false, unique: true, validate: { is: /^([\\p{L}\' ()]{3,20})$/u } },
  jednostka: { type: Sequelize.STRING(20), allowNull: false, validate: { is: /^\p{L}{2,20}$/u } },
  opis: { type: Sequelize.STRING(250), allowNull: true, validate: { is: /^(|[\\s\\S]{2,250})$/u } }
});

const DICTODMIANAWINOGRON = sequelize.define('DictOdmianaWinogron', {
  idOdmianaWinogron: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false, unique: true, validate: { is: /^([\\p{L}\' ()]{3,45})$/u } },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: /^(|[\\s\\S]{2,255})$/u } }
});

const DICTOPERACJENAWINNICY = sequelize.define('DictOperacjeNaWinnicy', {
  idDictOperacjeNaWinnicy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false, unique: true, validate: { is: /^([\\p{L}\' ()]{3,45})$/u } },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: /^(|[\\s\\S]{2,255})$/u } }
});

const DICTPROCESY = sequelize.define('DictProcesy', {
  idDictProcesy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(40), allowNull: false, unique: true },
  opis: { type: Sequelize.STRING(255), allowNull: true },
  dodatkowe: { type: Sequelize.STRING(80), allowNull: true }
});

const DICTROLAUZYTKOWNIKOW = sequelize.define('DictRolaUzytkownikow', {
  idRolaUzytkownikow: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false, unique: true },
  opis: { type: Sequelize.STRING(255), allowNull: true },
  typ: { type: Sequelize.STRING(45), allowNull: false }
});

const DICTTYPPARTII = sequelize.define('DictTypPartii', {
  idTypPartii: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false, unique: true },
  jednostka: { type: Sequelize.STRING(45), allowNull: true }
});

const INFORMACJEOWINIE = sequelize.define('InformacjeOWinie', {
  idInformacjeOWinie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  motto: { type: Sequelize.STRING(100), allowNull: true },
  zawartoscPotAlergenow: { type: Sequelize.STRING(20), allowNull: true },
  wartoscEnergetyczna: { type: Sequelize.INTEGER(3), allowNull: false },
  dictKategoriaWinaIdDictKategoriaWina: Sequelize.INTEGER
});

const KONTRAHENCI = sequelize.define('Kontrahenci', {
  idKontrahenci: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIP: { type: Sequelize.STRING(10), allowNull: true, unique: true },
  nazwaSpolki: { type: Sequelize.STRING(40), allowNull: false, unique: true },
  telefon: { type: Sequelize.STRING(14), allowNull: false, unique: true },
  eMail: { type: Sequelize.STRING(90), allowNull: false, unique: true },
  stronaWww: { type: Sequelize.STRING(255), allowNull: true },
  KRS: { type: Sequelize.STRING(10), allowNull: true, unique: true },
  nrKonta: { type: Sequelize.STRING(26), allowNull: false, unique: true },
  fax: { type: Sequelize.STRING(45), allowNull: true },
  adresIdAdres: Sequelize.INTEGER(11)
});

const LISTPRZEWOZOWY = sequelize.define('ListPrzewozowy', {
  idListPrzewozowy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imieKierowcy: { type: Sequelize.STRING(45), allowNull: false },
  nazwiskoKierowcy: { type: Sequelize.STRING(60), allowNull: false },
  uwagiPrzewoznika: { type: Sequelize.STRING(255), allowNull: true },
  zastrzezeniaOdbiorcy: { type: Sequelize.STRING(255), allowNull: true },
  eDokument: { type: Sequelize.STRING(255), allowNull: false },
  przesylkaIdPrzesylka: Sequelize.INTEGER
});

const MAGAZYN = sequelize.define('Magazyn', {
  idMagazyn: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rodzaj: { type: Sequelize.ENUM('polproduktow', 'materialow', 'produktow_skonczonych'), allowNull: false },
  pojemnosc: { type: Sequelize.DECIMAL(6, 1), allowNull: false },
  adresIdAdres: Sequelize.INTEGER
});

const OPERACJE = sequelize.define('Operacje', {
  idOperacja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iloscPrzed: { type: Sequelize.DECIMAL(6, 2), allowNull: false },
  iloscPo: { type: Sequelize.DECIMAL(6, 2), allowNull: true },
  dataPoczatku: { type: Sequelize.DATE, allowNull: false },
  dataZakonczenia: { type: Sequelize.DATE, allowNull: true },
  zawartoscAlkoholu: { type: Sequelize.DECIMAL(2, 1), allowNull: true },
  iloscDodatku: { type: Sequelize.DECIMAL(3, 1), allowNull: true },
  zawartoscCukru: { type: Sequelize.DECIMAL(2, 1), allowNull: true },
  kwasowosc: { type: Sequelize.DECIMAL(2, 1), allowNull: true },
  temperatura: { type: Sequelize.DECIMAL(2, 1), allowNull: true },
  opis: { type: Sequelize.STRING(255), allowNull: true },
  uzytkownicyIdUzytkownicy: Sequelize.INTEGER,
  dictProcesyIdDictProcesy: Sequelize.INTEGER
});

const OPERACJENAWINNICY = sequelize.define('OperacjeNaWinnicy', {
  idOperacja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: { type: Sequelize.DATE, allowNull: false },
  opis: Sequelize.STRING(255),
  dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: Sequelize.INTEGER,
  winnicaIdWinnica: Sequelize.INTEGER
});

const PARTIE = sequelize.define('Partie', {
  idPartie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ilosc: { type: Sequelize.DECIMAL(4, 1), allowNull: false },
  opis: { type: Sequelize.STRING(255), allowNull: true },
  dataUtworzenia: { type: Sequelize.DATE, allowNull: false },
  winobranieIdWinobranie: Sequelize.INTEGER,
  partieIdPartie: Sequelize.INTEGER,
  typPartiiIdTypPartii: Sequelize.INTEGER,
  informacjeOWinieIdInformacjeOWinie: Sequelize.INTEGER
});

const PLANYPRODUKCYJNE = sequelize.define('PlanyProdukcyjne', {
  idPlanyProdukcyjne: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  opis: Sequelize.STRING(255),
  dictRodzajWinogronIdOdmianaWinogron: Sequelize.INTEGER,
  dictTypPartiiIdTypPartii: Sequelize.INTEGER,
  dictKategorieIdKategorie: Sequelize.INTEGER,
  eDokument: { type: Sequelize.STRING(255), allowNull: false }
});

const POZYCJAWMAGAZYNIE = sequelize.define('PozycjaWMagazynie', {
  idPozycja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  opis: { type: Sequelize.STRING(255), allowNull: true },
  ilosc: { type: Sequelize.DECIMAL(4, 1), allowNull: false },
  kodKreskowy: { type: Sequelize.STRING(13), allowNull: false },
  stanAktualny: { type: Sequelize.BOOLEAN, allowNull: false },
  dataPrzyjecia: { type: Sequelize.DATE, allowNull: false },
  dataWydania: { type: Sequelize.DATE, allowNull: true },
  nazwaSektora: { type: Sequelize.STRING(45), allowNull: false },
  kategorieIdKategorie: Sequelize.INTEGER,
  magazynIdMagazyn: Sequelize.INTEGER,
  partieIdPartie: Sequelize.INTEGER
});

const PRZESYLKA = sequelize.define('Przesylka', {
  idPrzesylka: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwaPrzesylki: { type: Sequelize.STRING(45), allowNull: false },
  ciezarLadunku: { type: Sequelize.DECIMAL(6, 2), allowNull: false },
  data: { type: Sequelize.DATE, allowNull: false }
});

const RAPORTY = sequelize.define('Raporty', {
  idRaport: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  eDokument: { type: Sequelize.STRING(255), allowNull: false },
  dataUtworzenia: { type: Sequelize.DATE, allowNull: false }
});

const UZYTKOWNICY = sequelize.define('Uzytkownicy', {
  idUzytkownika: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imie: { type: Sequelize.STRING(30), allowNull: false },
  nazwisko: { type: Sequelize.STRING(30), allowNull: false },
  login: { type: Sequelize.STRING(20), allowNull: false, unique: true },
  haslo: { type: Sequelize.STRING(60), allowNull: false },
  PESEL: { type: Sequelize.STRING(11), allowNull: false, unique: true },
  eMail: { type: Sequelize.STRING(60), allowNull: false, unique: true },
  nrTelefonu: { type: Sequelize.STRING(14), allowNull: false, unique: true },
  dataOstatniegoLogowania: { type: Sequelize.DATE, allowNull: false },
  adresIdAdres: { type: Sequelize.INTEGER, allowNull: false },
  dictRolaUzytkownikowIdRolaUzytkownikow: { type: Sequelize.INTEGER, allowNull: false },
  zdjecie: { type: Sequelize.STRING(100), allowNull: true },
  czyAktywne: { type: Sequelize.BOOLEAN, allowNull: false }
});

const WINNICA = sequelize.define('Winnica', {
  idWinnica: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(40), allowNull: false },
  powierzchnia: { type: Sequelize.DECIMAL(6, 2), allowNull: false },
  stan: { type: Sequelize.ENUM('Aktywna', 'Nieczynna'), allowNull: false },
  terroir: { type: Sequelize.STRING(255), allowNull: true },
  dataOstatniegoZbioru: { type: Sequelize.DATE, allowNull: true },
  dataZasadzenia: { type: Sequelize.DATE, allowNull: false },
  ewidencyjnyIdDzialki: { type: Sequelize.STRING(45), allowNull: false, unique: true },
  odmianiaWinogronIdOdmianaWinogron: { type: Sequelize.INTEGER, allowNull: false }
});

const WINOBRANIE = sequelize.define('Winobranie', {
  idWinobranie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dataWinobrania: { type: Sequelize.DATE, allowNull: false },
  iloscZebranychWinogron: { type: Sequelize.DECIMAL(4, 1), allowNull: false },
  winnicaIdWinnica: { type: Sequelize.INTEGER, allowNull: false }
});

// TABELE LACZACE

const LISTPRZEWOZOWYHASADRES = sequelize.define('ListPrzewozowyHasAdres', {
  idListPrzewozowyHasAdres: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  adresIdAdres: { type: Sequelize.INTEGER, allowNull: false },
  miejsce: { type: Sequelize.ENUM('Nadania', 'Odbioru'), allowNull: false },
  listPrzewozowyIdListPrzewozowy: { type: Sequelize.INTEGER, allowNull: false }
});
const LISTPRZEWOZOWYHASKONTRAHENCI = sequelize.define('ListPrzewozowyHasKontrahenci', {
  idListPrzewozowyHasKontrahenci: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  listPrzewozowyIdListPrzewozowy: { type: Sequelize.INTEGER, allowNull: false },
  kontrahenciIdKontrahenci: { type: Sequelize.INTEGER, allowNull: false },
  typ: { type: Sequelize.ENUM('Odbiorca', 'Przewoznik'), allowNull: false }
});
const OPERACJEHASPARTIE = sequelize.define('OperacjeHasPartie', {
  idOperacjeHasPartie: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  operacjeIdOperacja: { type: Sequelize.INTEGER, allowNull: false },
  partieIdPartie: { type: Sequelize.INTEGER, allowNull: false },
  ilosc: { type: Sequelize.DECIMAL(4, 1), allowNull: false }
});
const OPERACJEHASPOZYCJAWMAGAZYNIE = sequelize.define('OperacjeHasPozycjaWMagazynie', {
  idOperacjeHasPozycjaWMagazynie: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  operacjeIdOperacja: { type: Sequelize.INTEGER, allowNull: false },
  pozycjaWMagazynieIdPozycja: { type: Sequelize.INTEGER, allowNull: false },
  ilosc: { type: Sequelize.STRING(45), allowNull: false }
});
const PLANYPRODUKCYJNEHASDICTPROCESY = sequelize.define('PlanyProdukcyjneHasDictProcesy', {
  idPlanyProdukcyjneHasDictProcesy: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  planyProdukcyjneIdPlanyProdukcyjne: { type: Sequelize.INTEGER, allowNull: false },
  dictProcesyIdDictProcesy: { type: Sequelize.INTEGER, allowNull: false }
});
const PRZESYLKAHASPOZYCJAWMAGAZYNIE = sequelize.define('PrzesylkaHasPozycjaWMagazynie', {
  idPrzesylkaHasPozycjaWMagazynie: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  przesylkaIdPrzesylka: { type: Sequelize.INTEGER, allowNull: false },
  pozycjaWMagazynieIdPozycja: { type: Sequelize.INTEGER, allowNull: false },
  ilosc: { type: Sequelize.DECIMAL(4, 1), allowNull: false }
});
const RAPORTYHASUZYTKOWNICY = sequelize.define('RaportyHasUzytkownicy', {
  idRaportyHasUzytkownicy: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  raportyIdRaport: { type: Sequelize.INTEGER, allowNull: false },
  uzytkownicyIdUzytkownika: { type: Sequelize.INTEGER, allowNull: false }
});

for (let i = 0; i < recordsToGenerate; i += 1) {
  // TODO set in docker container after inserting SET FOREIGN_KEY_CHECKS=1;
  // createAdres();
  // createKontrahenci();
  // createDictKategoriaWina();
  // createDictKategorie();
  // createDictOdmianaWinogron();
  // createDictOperacjeNaWinnicy();
  // createDictProcesy();
  // createDictRolaUzytkownikow();
  // createDictTypPartii();
  // createInformacjeOWinie();
  // createListPrzewozowy();
  // createOperacjeNaWinnicy();
  // createRaporty();
  // createPlanyProdukcyjne();
  // createMagazyn();
  // createOperacje();
  // createPartie();
  // createPozycjaWMagazynie();
  // createPrzesylka();
  // createUzytkownicy();
  // createWinnica();
  // createWinobranie();
  // createListPrzewozowyHasAdres();
  // createListPrzewozowyHasKontrahenci();
  // createOperacjeHasPartie();
  // createOperacjeHasPozycjaWMagazynie();
  // createPlanyProdukcyjneHasDictProcesy();
  // createPrzesylkaHasPozycjaWMagazynie();
  // createRaportyHasUzytkownicy();
  // ------ above working data generation
  // TODO FIX tables below this todo
}

// INSERT OR UPDATE
// async function insertAnyRecord(tableName, query) {
//   let sqlQuery = `INSERT INTO ${tableName} (`;
//   let keys = '';
//   let values = '';
//
//   _.each(query, (value, key) => {
//     values += `"${value}", `;
//     keys += `${key}, `;
//   });
//
//   keys = keys.slice(0, -2);
//   values = values.slice(0, -2);
//   sqlQuery += `${keys}) VALUES (${values})`;
//   return await sequelize.query(sqlQuery, ADRES, { raw: true, type: Sequelize.QueryTypes.INSERT });
// }
async function insertAnyRecord(tableName, query) {
  const result = await sequelize.sync().then(() =>
    ADRES.create({
      idAdres: query.idAdres,
      miasto: query.miasto,
      kodPocztowy: query.kodPocztowy,
      ulica: query.ulica,
      nrLokalu: query.nrLokalu,
      nrPosesji: query.nrPosesji,
      kraj: query.kraj
    })
  );
  return [178]; // TODO fix correct return id of created record
}

async function updateAnyRecord(tableName, query) {
  let sqlQuery = `UPDATE ${tableName} SET `;
  let whereQuery = `${Object.keys(query)[0]}="${Object.values(query)[0]}"`;
  delete query[Object.keys(query)[0]];
  _.each(query, (value, key) => {
    sqlQuery += `${key}="${value}", `;
  });
  sqlQuery = sqlQuery.slice(0, -2);
  sqlQuery += ` WHERE ${whereQuery}`;
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.INSERT });
}

async function deleteAnyRecord(tableName, query) {
  let sqlQuery = `DELETE FROM ${tableName} WHERE ${Object.keys(query)[0]}="${Object.values(query)[0]}"`;
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.DELETE });
}

export async function selectLast(sqlQuery) {
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.SELECT });
}

//
export async function insertAddress(query) {
  if (Object.keys(query)[0] === 'idAdres') {
    return await updateAnyRecord('Adres', query);
  }
  return await insertAnyRecord('Adres', query);
}

// SELECT ANY FROM DATABASE

// TODO klucze obce jako id, które obsłuży resolver
// TODO extract to generic function

async function selectAnyQuery(tableName, query) {
  let sqlQuery = `select * from ${tableName} where 1=1`;

  if (query) {
    Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);
    _.each(query, (value, key) => {
      sqlQuery += ` and ${key} = "${value}"`;
    });
  }
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.SELECT });
}

// MYSQL DELETES

// MYSQL UPSERTS

// MYSQL SELECTS
export async function getAddresses(query) {
  return await selectAnyQuery('Adres', query);
}

export async function getDictKategoriaWina(query) {
  return await selectAnyQuery('DictKategoriaWina', query);
}

export async function getDictKategorie(query) {
  return await selectAnyQuery('DictKategorie', query);
}

export async function getDictOdmianaWinogron(query) {
  return await selectAnyQuery('DictOdmianaWinogron', query);
}

export async function getDictOperacjeNaWinnicy(query) {
  return await selectAnyQuery('DictOperacjeNaWinnicy', query);
}

export async function getDictProcesy(query) {
  return await selectAnyQuery('DictProcesy', query);
}

export async function getDictRolaUzytkownikow(query) {
  return await selectAnyQuery('DictRolaUzytkownikow', query);
}

export async function getDictTypPartii(query) {
  return await selectAnyQuery('DictTypPartii', query);
}

export async function getInformacjeOWinie(query) {
  return await selectAnyQuery('InformacjeOWinie', query);
}

export async function getKontrahenci(query) {
  return await selectAnyQuery('Kontrahenci', query);
}

export async function getListPrzewozowy(query) {
  return await selectAnyQuery('ListPrzewozowy', query);
}

export async function getMagazyn(query) {
  return await selectAnyQuery('Magazyn', query);
}

export async function getOperacje(query) {
  return await selectAnyQuery('Operacje', query);
}

export async function getOperacjeNaWinnicy(query) {
  return await selectAnyQuery('OperacjeNaWinnicy', query);
}

export async function getPartie(query) {
  return await selectAnyQuery('Partie', query);
}

export async function getPlanyProdukcyjne(query) {
  return await selectAnyQuery('PlanyProdukcyjne', query);
}

export async function getPozycjaWMagazynie(query) {
  return await selectAnyQuery('PozycjaWMagazynie', query);
}

export async function getPrzesylka(query) {
  return await selectAnyQuery('Przesylka', query);
}

export async function getRaporty(query) {
  return await selectAnyQuery('Raporty', query);
}

export async function getUzytkownicy(query) {
  return await selectAnyQuery('Uzytkownicy', query);
}

export async function getWinnica(query) {
  return await selectAnyQuery('Winnica', query);
}

export async function getWinobranie(query) {
  return await selectAnyQuery('Winobranie', query);
}

export async function getListPrzewozowyHasAdres(query) {
  return await selectAnyQuery('ListPrzewozowyHasAdres', query);
}
export async function getListPrzewozowyHasKontrahenci(query) {
  return await selectAnyQuery('ListPrzewozowyHasKontrahenci', query);
}
export async function getOperacjeHasPartie(query) {
  return await selectAnyQuery('OperacjeHasPartie', query);
}
export async function getOperacjeHasPozycjaWMagazynie(query) {
  return await selectAnyQuery('OperacjeHasPozycjaWMagazynie', query);
}
export async function getPlanyProdukcyjneHasDictProcesy(query) {
  return await selectAnyQuery('PlanyProdukcyjneHasDictProcesy', query);
}
export async function getPrzesylkaHasPozycjaWMagazynie(query) {
  return await selectAnyQuery('PrzesylkaHasPozycjaWMagazynie', query);
}
export async function getRaportyHasUzytkownicy(query) {
  return await selectAnyQuery('RaportyHasUzytkownicy', query);
}

/*
export default class ConnectMySqlRepository {
    static async login(email, passwordHash) {
        const userRecord = await sequelize.query(
            'Select * from users where email = :email',
            { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email }, }
        );
        const storedPasswordHash = userRecord[0] && userRecord[0].passwordHash;
        const passwordMatch = passwordHash === storedPasswordHash;
        if (passwordMatch) {
            const userPermissions = await sequelize.query(
                'Select * from vwUserPermissions where email = :email',
                { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email }, }
            );
            const permittedActions = userPermissions
                .filter(permission => permission.claimType === 'route action')
                .map(permission => ({
                    claimName: permission.claimName,
                    routeName: permission.routeName,
                    actionVerb: permission.actionVerb,
                    actionSubject: permission.actionSubject,
                }));
            const defaultPath = userPermissions
                .find(permission => permission.claimType === 'route' && permission.claimOrder === 1).routeName;
            const user = {
                districtLabel: userRecord[0].districtLabel,
                email: userRecord[0].email,
                id: userRecord[0].id,
                role: userPermissions[0].roleName,
                roleId: userPermissions[0].roleId,
                defaultPath,
                drawerItems: [...new Set(userPermissions.map(permission => permission.routeName))],
                permittedActions,
            };
            return createJwtToken(user);
        }
        return null;
    }
    static async getUsers() {
        const users = await sequelize.query(
            `select u.*, r.id roleId, r.name roleName
      from users u
      join userRoles ur on u.id = ur.userId
      join roles r on ur.roleId = r.id`,
            { raw: true, type: Sequelize.QueryTypes.SELECT },
        );
        return users;
    }
    static async getRoles() {
        const roles = await sequelize.query(
            'Select * from roles',
            { raw: true, type: Sequelize.QueryTypes.SELECT }
        );
        return roles;
    }
    static async getDistricts(state, filterString) {
        return
    }
    static async getRecordStats(districtNumber, date) {
        return
    }
    static async getWhiteListedDomains() {
        return
    }
    static async getLegalTerms() {
        const legalTermsData = await sequelize.query(
            `select ltt.name, lt.uri, lt.description
        from legalTerms lt
        join legalTermTypes ltt on lt.type = ltt.id
        where lt.active = 1;`,
            { raw: true, type: Sequelize.QueryTypes.SELECT }
        );
        const legalTerms = legalTermsData.reduce((acc, curr) => {
            const { name, uri, description } = curr;
            if (!acc[name]) {
                acc[name] = { uri, description };
            }
            return acc;
        }, {});
        return legalTerms;
    }
    static async checkUserExists({ email }) {
        const userResponse = await sequelize.query(
            'select 1 from users where email = :email',
            { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email } },
        );
        return Boolean(userResponse[0]);
    }
    static async createUser({ email, firstName, lastName, active, roleId }) {
        const userResponse = await sequelize.query(`Insert into users (email, firstName, lastName, active, passwordExpiration, prescribedRoleId)
      values (:email, :firstName, :lastName, :active, date_add(current_timestamp, interval 24 hour), :roleId);`,
            {
                raw: true,
                type: Sequelize.QueryTypes.INSERT,
                replacements: { email, firstName, lastName, active, roleId },
            }
        );
        const userId = userResponse[0];
        const userRoleResponse = await sequelize.query(`Insert into userRoles (userId, roleId)
      select :userId, (select id from roles where name = 'unverifiedUser' limit 1);`,
            {
                raw: true,
                type: Sequelize.QueryTypes.INSERT,
                replacements: { userId, roleId },
            }
        );
        return userId;
    }
    static async editUser(userId, updatedUserData) {
        const { roleId, ...rest } = updatedUserData;
        const setQueryFragments = getSetQueryFragments(rest);
        const { email, firstName, lastName, active } = rest;
        const editUserResponse = await sequelize.query(
            `update users
          set ${setQueryFragments.join(', ')}
          where id = :userId`,
            {
                raw: true,
                type: Sequelize.QueryTypes.UPDATE,
                replacements: { userId, email, firstName, lastName, active }
            }
        );

        if (roleId) {
            const editRolesResponse = await sequelize.query(
                `update userRoles set roleId = :roleId where userId = :userId`,
                {
                    raw: true,
                    type: Sequelize.QueryTypes.UPDATE,
                    replacements: { userId, roleId },
                }
            )
        }
    }
    static async verifyUserAndSetPassword(token, passwordHash) {
        // TODO: Add handling if decode fails...
        const decodedToken = jwt.decode(token, process.env.REACT_APP_SECRET);
        if (!decodedToken) {
            throw new Error('Could not decode provided token');
        }
        const user = await ConnectMySqlRepository.getUserByEmail({
            email: decodedToken.user.email,
        });
        const isVerified = user &&
            moment(user.passwordExpiration).isAfter(moment());
        if (isVerified) {
            const userData = {
                passwordHash,
                roleId: user.prescribedRoleId,
            };
            await ConnectDataService.editUser(user.id, userData);

            const updatedUser = await ConnectMySqlRepository.getUserById({userId: user.id});
            const tokenizedUser = createJwtToken(updatedUser);

            return {message: `Password successfully changed for ${user.email}`, token: tokenizedUser};
        } else {
            throw new Error('Password reset link is expired.');
        }
    }
    static async getUserByEmail({ email }) {
        const user = await sequelize.query(
            'select * from users where email = :email limit 1',
            {
                raw: true,
                type: Sequelize.QueryTypes.SELECT,
                replacements: { email }
            });
        return user[0];
    }
    static async getUserById({ userId }) {
        const user = await sequelize.query(
            'select * from users where id = :userId limit 1',
            {
                raw: true,
                type: Sequelize.QueryTypes.SELECT,
                replacements: { userId }
            });
        return user[0];
    }
}
*/
