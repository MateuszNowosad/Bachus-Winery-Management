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
  retry: { max: 1 },
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

export default sequelize;

const recordsToGenerate = 300;
let fkKeyNumber = 0;
let generateDictTables = 1;
let generateDictNumber = 0;
let generateDictRola = 0;

let uniqueLogins = [];
let uniqueWinery = [];
while (uniqueLogins.length < recordsToGenerate + 20) {
  if (uniqueLogins < recordsToGenerate + 20) {
    uniqueLogins = _.uniq(uniqueLogins);
  }
  uniqueLogins.push(faker.internet.userName().substr(0, 20));
}

while (uniqueWinery.length < recordsToGenerate + 20) {
  if (uniqueWinery < recordsToGenerate + 20) {
    uniqueWinery = _.uniq(uniqueWinery);
  }
  uniqueWinery.push(faker.random.word().substr(0, 20));
}

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

async function createDictKategoriaWina(iterator) {
  const cat = [
    'KAT 1: Wina musujące',
    'KAT 2: Wina białe lekkie i świeże',
    'KAT 3: Wina białe klasyczne i wytrawne',
    'KAT 4: Wina białe bogate o mocnej budowie',
    'KAT 5: Wina różowe pikantne i owocowe',
    'KAT 6: Wina czerwone klasyczne i owocowe',
    'KAT 7: Wina czerwone ciężkie i skoncentrowane',
    'KAT 8: Wina białe o owocowej słodyczy',
    'KAT 9: Szlachetne słodkie wina'
  ];
  await sequelize.sync().then(() =>
    DICTKATEGORIAWINA.create({
      nazwaKategoria: cat[iterator],
      opis: faker.lorem.words(5)
    })
  );
}

let word = 0;

async function createDictKategorie(iterator) {
  const cat = ['Butelki', 'Korki'];
  await sequelize.sync().then(() =>
    DICTKATEGORIE.create({
      nazwa: cat[iterator],
      jednostka: 'sztuki',
      opis: faker.lorem.words(5)
    })
  );
}

async function createDictOdmianaWinogron(iterator) {
  const name = [
    'Agat Donski',
    'Ajwaz',
    'Alden',
    'Arkadia',
    'Arocznyj',
    'Einset Seedless',
    'Festivee',
    'Frumoasa Albae',
    'Kodrianka',
    'Kryzownikowyj'
  ];
  const desc = [
    'pora dojrzewania owoców wczesna, plenność wysoka. Grona duże, stożkowate, średnio zwarte, ładne. ',
    'owoce dojrzewają wcześnie, plenność krzewów wysoka. Grona duże, stożkowate, średnio zwarte.',
    'odmiana o średnio późnej porze dojrzewania owoców, dlatego powinna być uprawiana pod ciepłymi ścianami i murami, szczególnie w chłodniejszych rejonach Polski.',
    'wysokiej jakości odmiana deserowa o wczesnej porze dojrzewania owoców. Plenność krzewów bardzo wysoka. Grona duże, do bardzo dużych, średnio zwarte.',
    'nowa, interesująca odmiana rosyjska. Owoce dojrzewają wcześnie. Grona duże, średnio zwarte.',
    'beznasienna odmiana amerykańska, pora dojrzewania owoców wczesna, plenność średnia.',
    'pora dojrzewania owoców średnio późna (przełom września i października).',
    'odmiana pochodzi z Mołdowy. Owoce dojrzewają dość późno zazwyczaj na przełomie września i października.',
    'odmiana mołdawska. Pora dojrzewania owoców wczesna, wzrost krzewów silny, plenność dobra.',
    'owoce dojrzewają średnio wcześnie - w uprawie w drugiej połowie września. '
  ];
  await sequelize.sync().then(() =>
    DICTODMIANAWINOGRON.create({
      nazwa: name[iterator],
      opis: desc[iterator]
    })
  );
}

async function createDictOperacjeNaWinnicy(iterator) {
  const proces = ['Podcinanie', 'Podlewanie', 'Sadzenie', 'Zbiory winogron'];
  await sequelize.sync().then(() =>
    DICTOPERACJENAWINNICY.create({
      nazwa: proces[iterator],
      opis: faker.lorem.words(10),
      dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: iterator,
      winnicaIdWinnica: iterator
    })
  );
}

async function createDictProcesy(arrayIterator) {
  const proces = [
    'Winobranie',
    'Ewidencja dostaw winogron',
    'Oddzielenie szypulek',
    'Miazdzenie',
    'Maceracja',
    'Sprawdzenie skladu',
    'Tloczenie',
    'Fermentacja',
    'Obciąg wina',
    'Klarowanie i stabilizacja wina',
    'Dojrzewanie',
    'Kupazowanie',
    'Rozlew',
    'Obrobka moszczu przed fermentacja'
  ];
  const innerProces = [
    'dodatek SO2',
    'szaptalizacja',
    'zakwaszanie',
    'odkwaszanie',
    'dodatek pozywki dla drozdzy',
    'dodatek drozdzy'
  ];
  await sequelize.sync().then(() =>
    DICTPROCESY.create({
      nazwa: proces[arrayIterator],
      opis: faker.lorem.words(5),
      dodatkowe: faker.lorem.word(faker.random.number(100))
    })
  );
  if (arrayIterator === 11) {
    for (let i = 0; i < 6; i += 1) {
      await sequelize.sync().then(() =>
        DICTPROCESY.create({
          nazwa: proces[13],
          opis: faker.lorem.words(5),
          dodatkowe: innerProces[i]
        })
      );
    }
  }
}

async function createDictRolaUzytkownikow(orderNumber) {
  const name = ['ADMIN', 'PRODUCTION', 'WAREHOUSE', 'ACCOUNTING'];
  await sequelize.sync().then(() =>
    DICTROLAUZYTKOWNIKOW.create({
      nazwa: name[orderNumber],
      opis: faker.lorem.words(10),
      typ: orderNumber === 1 ? 'administrator' : 'pracownik'
    })
  );
}

async function createDictTypPartii(iterator) {
  const name = ['Moszczu', 'Butelek wina', 'Winogron', 'Wina'];
  const type = ['kilogramy', 'sztuki', 'tony', 'litry'];
  await sequelize.sync().then(() =>
    DICTTYPPARTII.create({
      nazwa: name[iterator],
      jednostka: type[iterator]
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
      dictKategoriaWinaIdDictKategoriaWina: faker.random.number({ min: 1, max: 9 })
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
      adresIdAdres: fkKeyNumber
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
      przesylkaIdPrzesylka: fkKeyNumber
    })
  );
}

async function createMagazyn() {
  await sequelize.sync().then(() =>
    MAGAZYN.create({
      rodzaj: faker.random.arrayElement(['polproduktow', 'materialow', 'produktow_skonczonych']),
      pojemnosc: faker.random.number({ min: 1, max: 99999 }) + '.' + faker.random.number(9),
      adresIdAdres: fkKeyNumber
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
      uzytkownicyIdUzytkownicy: fkKeyNumber,
      dictProcesyIdDictProcesy: faker.random.number({ min: 1, max: 11 })
    })
  );
}

async function createOperacjeNaWinnicy() {
  await sequelize.sync().then(() =>
    OPERACJENAWINNICY.create({
      data: faker.date.recent(),
      opis: faker.random.words(5),
      dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: faker.random.number({ min: 1, max: 4 }),
      winnicaIdWinnica: fkKeyNumber
    })
  );
}

async function createPartie() {
  await sequelize.sync().then(() =>
    PARTIE.create({
      ilosc: faker.random.number({ min: 1, max: 999 }) + '.' + faker.random.number(9),
      opis: faker.random.words(5),
      dataUtworzenia: faker.date.recent(),
      winobranieIdWinobranie: fkKeyNumber,
      partieIdPartie: fkKeyNumber,
      typPartiiIdTypPartii: faker.random.number({ min: 1, max: 4 }),
      informacjeOWinieIdInformacjeOWinie: fkKeyNumber,
      planyProdukcyjneIdPlanyProdukcyjne: fkKeyNumber,
      czyPrzepis: faker.random.arrayElement(['0', '0', '0', '0', '1'])
    })
  );
}

async function createPlanyProdukcyjne() {
  await sequelize.sync().then(() =>
    PLANYPRODUKCYJNE.create({
      nazwa: faker.random.word(1),
      opis: faker.random.words(5),
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
      kategorieIdKategorie: faker.random.number({ min: 1, max: 2 }),
      magazynIdMagazyn: fkKeyNumber,
      partieIdPartie: fkKeyNumber
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
      login: uniqueLogins[fkKeyNumber],
      haslo: faker.random.uuid(),
      PESEL:
        faker.random.number({ min: 50, max: 98 }) +
        faker.random.number(12) +
        faker.random.number(31) +
        faker.random.number(99999),
      eMail: faker.internet.email(),
      nrTelefonu: faker.random.number(999) + '-' + faker.random.number(999) + '-' + faker.random.number(999),
      dataOstatniegoLogowania: faker.date.recent(),
      adresIdAdres: fkKeyNumber,
      dictRolaUzytkownikowIdRolaUzytkownikow: faker.random.number({ min: 1, max: 4 }),
      zdjecie: faker.internet.avatar(),
      czyAktywne: faker.random.boolean()
    })
  );
}

async function createWinnica() {
  await sequelize.sync().then(() =>
    WINNICA.create({
      nazwa: `${uniqueWinery[fkKeyNumber]}${fkKeyNumber}`,
      powierzchnia: faker.random.number(9999) + '.' + faker.random.number(99),
      stan: faker.random.arrayElement(['Aktywna', 'Aktywna', 'Aktywna', 'Aktywna', 'Aktywna', 'Nieczynna']),
      terroir: faker.random.words(10),
      dataOstatniegoZbioru: faker.date.recent(),
      dataZasadzenia: faker.date.past(),
      ewidencyjnyIdDzialki: fkKeyNumber,
      odmianiaWinogronIdOdmianaWinogron: faker.random.number({ min: 1, max: 10 })
    })
  );
}

async function createWinobranie() {
  await sequelize.sync().then(() =>
    WINOBRANIE.create({
      dataWinobrania: faker.date.past(),
      iloscZebranychWinogron: faker.random.number(999) + '.' + faker.random.number(9),
      winnicaIdWinnica: fkKeyNumber
    })
  );
}

async function createListPrzewozowyHasAdres() {
  // faker.random.arrayElement(['Nadania', 'Odbioru']),
  await sequelize.sync().then(() => {
    LISTPRZEWOZOWYHASADRES.create({
      adresIdAdres: fkKeyNumber,
      miejsce: 'Odbioru',
      listPrzewozowyIdListPrzewozowy: fkKeyNumber
    });
  });
}
async function createListPrzewozowyHasKontrahenci() {
  // faker.random.arrayElement(['Odbiorca', 'Przewoznik', 'Nadawca'])
  await sequelize.sync().then(() => {
    LISTPRZEWOZOWYHASKONTRAHENCI.create({
      listPrzewozowyIdListPrzewozowy: fkKeyNumber,
      kontrahenciIdKontrahenci: fkKeyNumber,
      typ: 'Nadawca'
    });
  });
}
async function createOperacjeHasPartie() {
  await sequelize.sync().then(() => {
    OPERACJEHASPARTIE.create({
      operacjeIdOperacja: fkKeyNumber,
      partieIdPartie: fkKeyNumber,
      ilosc: faker.random.number(99) + '.' + faker.random.number(9)
    });
  });
}
async function createOperacjeHasPozycjaWMagazynie() {
  await sequelize.sync().then(() => {
    OPERACJEHASPOZYCJAWMAGAZYNIE.create({
      operacjeIdOperacja: fkKeyNumber,
      pozycjaWMagazynieIdPozycja: fkKeyNumber,
      ilosc: faker.random.number(99) + '.' + faker.random.number(99)
    });
  });
}
async function createPlanyProdukcyjneHasPozycjaWMagazynie() {
  await sequelize.sync().then(() => {
    PLANYPRODUKCYJNEHASPOZYCJAWMAGAZYNIE.create({
      planyProdukcyjneIdPlanyProdukcyjne: fkKeyNumber,
      pozycjaWMagazynieIdPozycja: fkKeyNumber
    });
  });
}
async function createPrzesylkaHasPozycjaWMagazynie() {
  await sequelize.sync().then(() => {
    PRZESYLKAHASPOZYCJAWMAGAZYNIE.create({
      przesylkaIdPrzesylka: fkKeyNumber,
      pozycjaWMagazynieIdPozycja: fkKeyNumber,
      ilosc: faker.random.number(99) + '.' + faker.random.number(99)
    });
  });
}
async function createRaportyHasUzytkownicy() {
  await sequelize.sync().then(() => {
    RAPORTYHASUZYTKOWNICY.create({
      raportyIdRaport: fkKeyNumber,
      uzytkownicyIdUzytkownika: fkKeyNumber
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
      // is: /^([\p{L}' ()]{2,80})$/u
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
    unique: true
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } }
});

const DICTKATEGORIE = sequelize.define('DictKategorie', {
  idKategorie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,20})$", 'u') }
  },
  jednostka: { type: Sequelize.STRING(20), allowNull: false, validate: { is: new RegExp('^\\p{L}{2,20}$', 'u') } },
  opis: { type: Sequelize.STRING(250), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,250})$', 'u') } }
});

const DICTODMIANAWINOGRON = sequelize.define('DictOdmianaWinogron', {
  idOdmianaWinogron: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,45})$", 'u') }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } }
});

const DICTOPERACJENAWINNICY = sequelize.define('DictOperacjeNaWinnicy', {
  idDictOperacjeNaWinnicy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,45})$", 'u') }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } }
});

const DICTPROCESY = sequelize.define('DictProcesy', {
  idDictProcesy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,40})$", 'u') }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
  dodatkowe: { type: Sequelize.STRING(80), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,80})$', 'u') } }
});

const DICTROLAUZYTKOWNIKOW = sequelize.define('DictRolaUzytkownikow', {
  idRolaUzytkownikow: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,45})$", 'u') }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
  typ: { type: Sequelize.STRING(45), allowNull: false, validate: { is: new RegExp('^[\\S]{2,45}$', 'u') } }
});

const DICTTYPPARTII = sequelize.define('DictTypPartii', {
  idTypPartii: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,45})$", 'u') }
  },
  jednostka: { type: Sequelize.STRING(45), allowNull: true, validate: { is: new RegExp('^[\\w]{1,45}$', 'u') } }
});

const INFORMACJEOWINIE = sequelize.define('InformacjeOWinie', {
  idInformacjeOWinie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  motto: { type: Sequelize.STRING(100), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,100})$', 'u') } },
  zawartoscPotAlergenow: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  wartoscEnergetyczna: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  dictKategoriaWinaIdDictKategoriaWina: Sequelize.INTEGER
});

const KONTRAHENCI = sequelize.define('Kontrahenci', {
  idKontrahenci: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIP: { type: Sequelize.STRING(10), allowNull: true, unique: true, validate: { is: /^($|\d{10})$/u } },
  nazwaSpolki: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp('^[\\s\\S]{2,40}$', 'u') }
  },
  telefon: { type: Sequelize.STRING(14), allowNull: false, unique: true },
  eMail: {
    type: Sequelize.STRING(90),
    allowNull: false,
    unique: true,
    validate: {
      is: /^(?=.{5,90}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  stronaWww: {
    type: Sequelize.STRING(255),
    allowNull: true,
    validate: {
      is: /^(?=.{4,255}$)(|(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)$/
    }
  },
  KRS: { type: Sequelize.STRING(10), allowNull: true, unique: true, validate: { is: /^($|\d{10})$/ } },
  nrKonta: { type: Sequelize.STRING(26), allowNull: false, unique: true, validate: { is: /^\d{26}$/ } },
  fax: {
    type: Sequelize.STRING(45),
    allowNull: true
  },
  adresIdAdres: Sequelize.INTEGER(11)
});

const LISTPRZEWOZOWY = sequelize.define('ListPrzewozowy', {
  idListPrzewozowy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imieKierowcy: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  nazwiskoKierowcy: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  uwagiPrzewoznika: {
    type: Sequelize.STRING(255),
    allowNull: true,
    validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') }
  },
  zastrzezeniaOdbiorcy: {
    type: Sequelize.STRING(255),
    allowNull: true,
    validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') }
  },
  eDokument: { type: Sequelize.STRING(255), allowNull: false },
  przesylkaIdPrzesylka: Sequelize.INTEGER
});

const MAGAZYN = sequelize.define('Magazyn', {
  idMagazyn: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rodzaj: {
    type: Sequelize.ENUM('polproduktow', 'materialow', 'produktow_skonczonych'),
    allowNull: false
  },
  pojemnosc: {
    type: Sequelize.DECIMAL(6, 1),
    allowNull: false,
    validate: { is: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d|0{1,6}\.[1-9])$/ }
  },
  adresIdAdres: Sequelize.INTEGER
});

const OPERACJE = sequelize.define('Operacje', {
  idOperacja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iloscPrzed: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    validate: { is: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/ }
  },
  iloscPo: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: true,
    validate: { is: /^($|(?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/ }
  },
  dataPoczatku: { type: Sequelize.DATE, allowNull: false },
  dataZakonczenia: { type: Sequelize.DATE, allowNull: true },
  zawartoscAlkoholu: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: true,
    validate: { is: /^($|\d{1,2}|\d{1,2}\.\d?)$/ }
  },
  iloscDodatku: { type: Sequelize.DECIMAL(3, 1), allowNull: true, validate: { is: /^($|\d{1,3}|\d{1,3}\.\d?)$/ } },
  zawartoscCukru: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: true,
    validate: { is: /^($|\d{1,2}|\d{1,2}\.\d?)$/ }
  },
  kwasowosc: { type: Sequelize.DECIMAL(2, 1), allowNull: true, validate: { is: /^($|\d{1,2}|\d{1,2}\.\d?)$/ } },
  temperatura: { type: Sequelize.DECIMAL(2, 1), allowNull: true, validate: { is: /^($|\d{1,2}|\d{1,2}\.\d?)$/ } },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
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
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
  dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: Sequelize.INTEGER,
  winnicaIdWinnica: Sequelize.INTEGER
});

const PARTIE = sequelize.define('Partie', {
  idPartie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ilosc: {
    type: Sequelize.DECIMAL(4, 1),
    allowNull: false,
    validate: { is: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d|0{1,4}\.[1-9])$/ }
  },
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
  dataUtworzenia: { type: Sequelize.DATE, allowNull: false },
  winobranieIdWinobranie: Sequelize.INTEGER,
  partieIdPartie: Sequelize.INTEGER,
  typPartiiIdTypPartii: Sequelize.INTEGER,
  informacjeOWinieIdInformacjeOWinie: Sequelize.INTEGER,
  planyProdukcyjneIdPlanyProdukcyjne: Sequelize.INTEGER,
  czyPrzepis: { type: Sequelize.STRING, allowNull: false }
});

const PLANYPRODUKCYJNE = sequelize.define('PlanyProdukcyjne', {
  idPlanyProdukcyjne: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(45), allowNull: false },
  opis: { type: Sequelize.STRING(255), allowNull: true },
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
  opis: { type: Sequelize.STRING(255), allowNull: true, validate: { is: new RegExp('^(|[\\s\\S]{2,255})$', 'u') } },
  ilosc: {
    type: Sequelize.DECIMAL(4, 1),
    allowNull: false,
    validate: { is: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d|0{1,6}\.[1-9])$/ }
  },
  kodKreskowy: { type: Sequelize.STRING(13), allowNull: false },
  stanAktualny: { type: Sequelize.BOOLEAN, allowNull: false },
  dataPrzyjecia: { type: Sequelize.DATE, allowNull: false },
  dataWydania: { type: Sequelize.DATE, allowNull: true },
  nazwaSektora: {
    type: Sequelize.STRING(45),
    allowNull: false,
    validate: { is: new RegExp("^([\\p{L}' ()]{3,45})$", 'u') }
  },
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
  nazwaPrzesylki: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  ciezarLadunku: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    validate: { is: /^((?=.{1,6}\.)(\d*[1-9]+\d*)\.\d{1,2}|0{1,6}\.\d[1-9])$/ }
  },
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
  login: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
    validate: { is: new RegExp('^([\\s\\S]{2,20})$', 'u') }
  },
  haslo: {
    type: Sequelize.STRING(60),
    allowNull: false
    // validate: { is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ }
  },
  PESEL: {
    type: Sequelize.STRING(11),
    allowNull: false,
    unique: true
    // validate: { is: /^\d{11}$/ }
  },
  eMail: {
    type: Sequelize.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      is: /^(?=.{5,90}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  nrTelefonu: {
    type: Sequelize.STRING(14),
    allowNull: false,
    unique: true
    // validate: { is: /^\d{14}$/ }
  },
  dataOstatniegoLogowania: { type: Sequelize.DATE, allowNull: false },
  adresIdAdres: { type: Sequelize.INTEGER, allowNull: false },
  dictRolaUzytkownikowIdRolaUzytkownikow: { type: Sequelize.INTEGER, allowNull: false },
  zdjecie: { type: Sequelize.STRING(100), allowNull: true, validate: { is: /^.{5,100}$/ } },
  czyAktywne: { type: Sequelize.BOOLEAN, allowNull: false }
});

const WINNICA = sequelize.define('Winnica', {
  idWinnica: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: { type: Sequelize.STRING(40), allowNull: false },
  powierzchnia: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false
  },
  stan: {
    type: Sequelize.ENUM('Aktywna', 'Nieczynna'),
    allowNull: false
  },
  terroir: { type: Sequelize.STRING(255), allowNull: true },
  dataOstatniegoZbioru: { type: Sequelize.DATE, allowNull: true },
  dataZasadzenia: { type: Sequelize.DATE, allowNull: false },
  ewidencyjnyIdDzialki: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  odmianiaWinogronIdOdmianaWinogron: { type: Sequelize.INTEGER, allowNull: false }
});

const WINOBRANIE = sequelize.define('Winobranie', {
  idWinobranie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dataWinobrania: { type: Sequelize.DATE, allowNull: false },
  iloscZebranychWinogron: {
    type: Sequelize.DECIMAL(4, 1),
    allowNull: false,
    validate: { is: /^((?=.{1,4}\.)(\d*[1-9]+\d*)\.\d|0{1,4}\.[1-9])$/ }
  },
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
const PLANYPRODUKCYJNEHASPOZYCJAWMAGAZYNIE = sequelize.define('PlanyProdukcyjneHasPozycjaWMagazynie', {
  idPlanyProdukcyjneHasPozycjaWMagazynie: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  planyProdukcyjneIdPlanyProdukcyjne: { type: Sequelize.INTEGER, allowNull: false },
  pozycjaWMagazynieIdPozycja: { type: Sequelize.INTEGER, allowNull: false }
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

const models = {
  Adres: ADRES,
  DictKategoriaWina: DICTKATEGORIAWINA,
  DictKategorie: DICTKATEGORIE,
  DictOdmianaWinogron: DICTODMIANAWINOGRON,
  DictOperacjeNaWinnicy: DICTOPERACJENAWINNICY,
  DictProcesy: DICTPROCESY,
  DictRolaUzytkownikow: DICTROLAUZYTKOWNIKOW,
  DictTypPartii: DICTTYPPARTII,
  InformacjeOWinie: INFORMACJEOWINIE,
  Kontrahenci: KONTRAHENCI,
  ListPrzewozowy: LISTPRZEWOZOWY,
  ListPrzewozowyHasAdres: LISTPRZEWOZOWYHASADRES,
  ListPrzewozowyHasKontrahenci: LISTPRZEWOZOWYHASKONTRAHENCI,
  Magazyn: MAGAZYN,
  Operacje: OPERACJE,
  OperacjeHasPartie: OPERACJEHASPARTIE,
  OperacjeHasPozycjaWMagazynie: OPERACJEHASPOZYCJAWMAGAZYNIE,
  OperacjeNaWinnicy: OPERACJENAWINNICY,
  Partie: PARTIE,
  PlanyProdukcyjne: PLANYPRODUKCYJNE,
  PlanyProdukcyjneHasPozycjaWMagazynie: PLANYPRODUKCYJNEHASPOZYCJAWMAGAZYNIE,
  PozycjaWMagazynie: POZYCJAWMAGAZYNIE,
  Przesylka: PRZESYLKA,
  PrzesylkaHasPozycjaWMagazynie: PRZESYLKAHASPOZYCJAWMAGAZYNIE,
  Raporty: RAPORTY,
  RaportyHasUzytkownicy: RAPORTYHASUZYTKOWNICY,
  Uzytkownicy: UZYTKOWNICY,
  Winnica: WINNICA,
  Winobranie: WINOBRANIE
};

async function generateRows() {
  for (let i = 0; i < recordsToGenerate; i += 1) {
    fkKeyNumber = i + 1;
    // TODO set in docker container after inserting
    // TODO SET FOREIGN_KEY_CHECKS=1; and SET GLOBAL FOREIGN_KEY_CHECKS=1;
    // await createAdres();
    // await createInformacjeOWinie();
    // await createKontrahenci();
    // await createListPrzewozowy();
    // await createListPrzewozowyHasAdres();
    // await createListPrzewozowyHasKontrahenci();
    // await createMagazyn();
    // await createOperacje();
    // await createOperacjeHasPartie();
    // await createOperacjeHasPozycjaWMagazynie(); //TODO FIX KEY NAMES
    // await createOperacjeNaWinnicy();
    // await createPartie();
    // await createPlanyProdukcyjne();
    // await createPlanyProdukcyjneHasPozycjaWMagazynie();
    // await createPozycjaWMagazynie();
    // await createPrzesylka();
    // await createPrzesylkaHasPozycjaWMagazynie();
    // await createRaporty();
    // await createRaportyHasUzytkownicy();
    // await createUzytkownicy();
    // await createWinnica();
    // await createWinobranie();
  }
  if (generateDictTables === 1) {
    // for (let i = 0; i < 4; i += 1) {
    //   await createDictRolaUzytkownikow(i);
    // }
    // for (let i = 0; i < 12; i += 1) {
    //   await createDictProcesy(i);
    // }
    // for (let i = 0; i < 9; i += 1) {
    //   await createDictKategoriaWina(i);
    // }
    // for (let i = 0; i < 2; i += 1) {
    //   await createDictKategorie(i);
    // }
    // for (let i = 0; i < 10; i += 1) {
    //   await createDictOdmianaWinogron(i);
    // }
    // for (let i = 0; i < 4; i += 1) {
    //   await createDictOperacjeNaWinnicy(i);
    // }
    // for (let i = 0; i < 4; i += 1) {
    //   await createDictTypPartii(i);
    // }
  }
}
generateRows();

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
// async function updateAnyRecord(tableName, query) {
//   let sqlQuery = `UPDATE ${tableName} SET `;
//   let whereQuery = `${Object.keys(query)[0]}="${Object.values(query)[0]}"`;
//   delete query[Object.keys(query)[0]];
//   _.each(query, (value, key) => {
//     sqlQuery += `${key}="${value}", `;
//   });
//   sqlQuery = sqlQuery.slice(0, -2);
//   sqlQuery += ` WHERE ${whereQuery}`;
//   return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.INSERT });
// }

async function insertAnyRecord(tableName, query) {
  let lastId = null;
  await sequelize
    .sync()
    .then(() => models[tableName].create(query))
    .then(async () => {
      lastId = await sequelize.query(`SELECT * FROM ${tableName} ORDER BY ${tableIdName[tableName]} DESC LIMIT 1`, {
        raw: true,
        type: Sequelize.QueryTypes.SELECT
      });
    });
  return lastId;
}

async function updateAnyRecord(tableName, query) {
  return await sequelize
    .sync()
    .then(() =>
      models[tableName].update(query, { returning: true, where: { [Object.keys(query)[0]]: Object.values(query)[0] } })
    );
}

// async function deleteAnyRecord(tableName, query) {
//   let sqlQuery = `DELETE FROM ${tableName} WHERE ${Object.keys(query)[0]}="${Object.values(query)[0]}"`;
//   return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.DELETE });
// }

async function deleteAnyRecord(tableName, query) {
  await sequelize.sync().then(() =>
    models[tableName].destroy({
      where: { [tableIdName[tableName]]: Object.values(query)[0] }
    })
  );
}

export async function selectLast(sqlQuery) {
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.SELECT });
}

export const tableIdName = {
  Adres: 'idAdres',
  DictKategoriaWina: 'idDictKategoriaWina',
  DictKategorie: 'idKategorie',
  DictOdmianaWinogron: 'idOdmianaWinogron',
  DictOperacjeNaWinnicy: 'idDictOperacjeNaWinnicy',
  DictProcesy: 'idDictProcesy',
  DictRolaUzytkownikow: 'idRolaUzytkownikow',
  DictTypPartii: 'idTypPartii',
  InformacjeOWinie: 'idInformacjeOWinie',
  Kontrahenci: 'idKontrahenci',
  ListPrzewozowy: 'idListPrzewozowy',
  ListPrzewozowyHasAdres: 'idListPrzewozowyHasAdres',
  ListPrzewozowyHasKontrahenci: 'idListPrzewozowyHasKontrahenci',
  Magazyn: 'idMagazyn',
  Operacje: 'idOperacja',
  OperacjeHasPartie: 'idOperacjeHasPartie',
  OperacjeHasPozycjaWMagazynie: 'idOperacjeHasPozycjaWMagazynie',
  OperacjeNaWinnicy: 'idOperacja',
  Partie: 'idPartie',
  PlanyProdukcyjne: 'idPlanyProdukcyjne',
  PlanyProdukcyjneHasPozycjaWMagazynie: 'idPlanyProdukcyjneHasPozycjaWMagazynie',
  PozycjaWMagazynie: 'idPozycja',
  Przesylka: 'idPrzesylka',
  PrzesylkaHasPozycjaWMagazynie: 'idPrzesylkaHasPozycjaWMagazynie',
  Raporty: 'idRaport',
  RaportyHasUzytkownicy: 'idRaportyHasUzytkownicy',
  Uzytkownicy: 'idUzytkownika',
  Winnica: 'idWinnica',
  Winobranie: 'idWinobranie'
};

async function upsertRow(tableName, query) {
  if (Object.keys(query)[0] === tableIdName[tableName]) {
    return await updateAnyRecord(tableName, query);
  }
  return await insertAnyRecord(tableName, query);
}

// UPSERT ANY
// TODO add logic to update join tables
export async function insertAdres(query) {
  return await upsertRow('Adres', query);
}
export async function insertDictKategoriaWina(query) {
  return await upsertRow('DictKategoriaWina', query);
}
export async function insertDictKategorie(query) {
  return await upsertRow('DictKategorie', query);
}
export async function insertDictOdmianaWinogron(query) {
  return await upsertRow('DictOdmianaWinogron', query);
}
export async function insertDictOperacjeNaWinnicy(query) {
  return await upsertRow('DictOperacjeNaWinnicy', query);
}
export async function insertDictProcesy(query) {
  return await upsertRow('DictProcesy', query);
}
export async function insertDictRolaUzytkownikow(query) {
  return await upsertRow('DictRolaUzytkownikow', query);
}
export async function insertDictTypPartii(query) {
  return await upsertRow('DictTypPartii', query);
}
export async function insertInformacjeOWinie(query) {
  return await upsertRow('InformacjeOWinie', query);
}
export async function insertKontrahenci(query) {
  return await upsertRow('Kontrahenci', query);
}
export async function insertListPrzewozowy(query) {
  return await upsertRow('ListPrzewozowy', query);
}
export async function insertListPrzewozowyHasAdres(query) {
  return await upsertRow('ListPrzewozowyHasAdres', query);
}
export async function insertListPrzewozowyHasKontrahenci(query) {
  return await upsertRow('ListPrzewozowyHasKontrahenci', query);
}
export async function insertMagazyn(query) {
  return await upsertRow('Magazyn', query);
}
export async function insertOperacje(query) {
  return await upsertRow('Operacje', query);
}
export async function insertOperacjeHasPartie(query) {
  return await upsertRow('OperacjeHasPartie', query);
}
export async function insertOperacjeHasPozycjaWMagazynie(query) {
  return await upsertRow('OperacjeHasPozycjaWMagazynie', query);
}
export async function insertOperacjeNaWinnicy(query) {
  return await upsertRow('OperacjeNaWinnicy', query);
}
export async function insertPartie(query) {
  return await upsertRow('Partie', query);
}
export async function insertPlanyProdukcyjne(query) {
  return await upsertRow('PlanyProdukcyjne', query);
}
export async function insertPlanyProdukcyjneHasPozycjaWMagazynie(query) {
  return await upsertRow('PlanyProdukcyjneHasPozycjaWMagazynie', query);
}
export async function insertPozycjaWMagazynie(query) {
  return await upsertRow('PozycjaWMagazynie', query);
}
export async function insertPrzesylka(query) {
  return await upsertRow('Przesylka', query);
}
export async function insertPrzesylkaHasPozycjaWMagazynie(query) {
  return await upsertRow('PrzesylkaHasPozycjaWMagazynie', query);
}
export async function insertRaporty(query) {
  return await upsertRow('Raporty', query);
}
export async function insertRaportyHasUzytkownicy(query) {
  return await upsertRow('RaportyHasUzytkownicy', query);
}
export async function insertUzytkownicy(query) {
  return await upsertRow('Uzytkownicy', query);
}
export async function insertWinnica(query) {
  return await upsertRow('Winnica', query);
}
export async function insertWinobranie(query) {
  return await upsertRow('Winobranie', query);
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

export async function deleteAdres(query) {
  return await deleteAnyRecord('Adres', query);
}
export async function deleteDictKategoriaWina(query) {
  return await deleteAnyRecord('DictKategoriaWina', query);
}
export async function deleteDictKategorie(query) {
  return await deleteAnyRecord('DictKategorie', query);
}
export async function deleteDictOdmianaWinogron(query) {
  return await deleteAnyRecord('DictOdmianaWinogron', query);
}
export async function deleteDictOperacjeNaWinnicy(query) {
  return await deleteAnyRecord('DictOperacjeNaWinnicy', query);
}
export async function deleteDictProcesy(query) {
  return await deleteAnyRecord('DictProcesy', query);
}
export async function deleteDictRolaUzytkownikow(query) {
  return await deleteAnyRecord('DictRolaUzytkownikow', query);
}
export async function deleteDictTypPartii(query) {
  return await deleteAnyRecord('DictTypPartii', query);
}
export async function deleteInformacjeOWinie(query) {
  return await deleteAnyRecord('InformacjeOWinie', query);
}
export async function deleteKontrahenci(query) {
  return await deleteAnyRecord('Kontrahenci', query);
}
export async function deleteListPrzewozowy(query) {
  return await deleteAnyRecord('ListPrzewozowy', query);
}
export async function deleteListPrzewozowyHasAdres(query) {
  return await deleteAnyRecord('ListPrzewozowyHasAdres', query);
}
export async function deleteListPrzewozowyHasKontrahenci(query) {
  return await deleteAnyRecord('ListPrzewozowyHasKontrahenci', query);
}
export async function deleteMagazyn(query) {
  return await deleteAnyRecord('Magazyn', query);
}
export async function deleteOperacje(query) {
  return await deleteAnyRecord('Operacje', query);
}
export async function deleteOperacjeHasPartie(query) {
  return await deleteAnyRecord('OperacjeHasPartie', query);
}
export async function deleteOperacjeHasPozycjaWMagazynie(query) {
  return await deleteAnyRecord('OperacjeHasPozycjaWMagazynie', query);
}
export async function deleteOperacjeNaWinnicy(query) {
  return await deleteAnyRecord('OperacjeNaWinnicy', query);
}
export async function deletePartie(query) {
  return await deleteAnyRecord('Partie', query);
}
export async function deletePlanyProdukcyjne(query) {
  return await deleteAnyRecord('PlanyProdukcyjne', query);
}
export async function deletePlanyProdukcyjneHasPozycjaWMagazynie(query) {
  return await deleteAnyRecord('PlanyProdukcyjneHasPozycjaWMagazynie', query);
}
export async function deletePozycjaWMagazynie(query) {
  return await deleteAnyRecord('PozycjaWMagazynie', query);
}
export async function deletePrzesylka(query) {
  return await deleteAnyRecord('Przesylka', query);
}
export async function deletePrzesylkaHasPozycjaWMagazynie(query) {
  return await deleteAnyRecord('PrzesylkaHasPozycjaWMagazynie', query);
}
export async function deleteRaporty(query) {
  return await deleteAnyRecord('Raporty', query);
}
export async function deleteRaportyHasUzytkownicy(query) {
  return await deleteAnyRecord('RaportyHasUzytkownicy', query);
}
export async function deleteUzytkownicy(query) {
  return await deleteAnyRecord('Uzytkownicy', query);
}
export async function deleteWinnica(query) {
  return await deleteAnyRecord('Winnica', query);
}
export async function deleteWinobranie(query) {
  return await deleteAnyRecord('Winobranie', query);
}

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
export async function getPlanyProdukcyjneHasPozycjaWMagazynie(query) {
  return await selectAnyQuery('PlanyProdukcyjneHasPozycjaWMagazynie', query);
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

        }
        return null;
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
}
*/
