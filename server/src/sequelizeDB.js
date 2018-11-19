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
    max: 500,
    min: 1,
    idle: 200000
  },
  retry: { max: 2 },
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// TODO klucze obce jako id, które obsłuży resolver

export async function getAddresses(query) {
  let sqlQuery = 'select * from Adres where 1=1';
  if (query) {
    Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);
    _.each(query, (value, key) => {
      sqlQuery += ` and ${key} = "${value}"`;
    });
  }
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.SELECT });
}

export async function getDictKategorie(query) {
  let sqlQuery = 'select * from DictKategorie where 1=1';
  if (query) {
    Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);
    _.each(query, (value, key) => {
      sqlQuery += ` and ${key} = "${value}"`;
    });
  }
  return await sequelize.query(sqlQuery, { raw: true, type: Sequelize.QueryTypes.SELECT });
}

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

async function createDictKategorie() {
  await sequelize.sync().then(() =>
    DICTKATEGORIE.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      jednostka: faker.random.arrayElement(['sztuki', 'kilogramy', 'gramy', 'tony', 'mililitry', 'litry']),
      opis: faker.lorem.words(8)
    })
  );
}

async function createDictOdmianaWinogron() {
  await sequelize.sync().then(() =>
    DICTODMIANAWINOGRON.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      opis: faker.lorem.words(10)
    })
  );
}

async function createDictOperacjeNaWinnicy() {
  await sequelize.sync().then(() =>
    DICTOPERACJENAWINNICY.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      opis: faker.lorem.words(10)
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
      nazwa: faker.lorem.word(faker.random.number(100)),
      opis: faker.lorem.words(10),
      typ: faker.random.arrayElement(['administrator', 'pracownik', 'pracownik', 'pracownik', 'pracownik'])
    })
  );
}

async function createDictTypPartii() {
  await sequelize.sync().then(() =>
    DICTTYPPARTII.create({
      nazwa: faker.lorem.word(faker.random.number(100)),
      jednostka: faker.random.arrayElement(['sztuki', 'kilogramy', 'gramy', 'tony', 'mililitry', 'litry'])
    })
  );
}

async function createInformacjeOWinie() {
  await sequelize.sync().then(() => INFORMACJEOWINIE.create({}));
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
      adresIdAdres: faker.random.number({ min: 1, max: 10 })
    })
  );
}

async function createListPrzewozowy() {
  await sequelize.sync().then(() => LISTPRZEWOZOWY.create({}));
}

async function createMagazyn() {
  await sequelize.sync().then(() => MAGAZYN.create({}));
}

async function createOperacje() {
  await sequelize.sync().then(() => OPERACJE.create({}));
}

async function createOperacjeNaWinnicy() {
  await sequelize.sync().then(() => OPERACJENAWINNICY.create({}));
}

async function createPartie() {
  await sequelize.sync().then(() => PARTIE.create({}));
}

async function createPlanyProdukcyjne() {
  await sequelize.sync().then(() => PLANYPRODUKCYJNE.create({}));
}

async function createPozycjaWMagazynie() {
  await sequelize.sync().then(() => POZYCJAWMAGAZYNIE.create({}));
}

async function createPrzesylka() {
  await sequelize.sync().then(() => PRZESYLKA.create({}));
}

async function createUzytkownicy() {
  await sequelize.sync().then(() => UZYTKOWNICY.create({}));
}

async function createWinnica() {
  await sequelize.sync().then(() => WINNICA.create({}));
}

async function createWinobranie() {
  await sequelize.sync().then(() => WINOBRANIE.create({}));
}

const ADRES = sequelize.define('Adres', {
  idAdres: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  miasto: Sequelize.STRING(20),
  kodPocztowy: Sequelize.STRING(10),
  ulica: Sequelize.STRING(45),
  nrLokalu: Sequelize.STRING(2),
  nrPosesji: Sequelize.STRING(4),
  kraj: Sequelize.STRING(60)
});

const DICTKATEGORIAWINA = sequelize.define('DictKategoriaWina', {
  idDictKategoriaWina: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwaKategoria: Sequelize.STRING(45),
  opis: Sequelize.STRING(255)
});

const DICTKATEGORIE = sequelize.define('DictKategorie', {
  idKategorie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(20),
  jednostka: Sequelize.STRING(20),
  opis: Sequelize.STRING(250)
});

const DICTODMIANAWINOGRON = sequelize.define('DictOdmianaWinogron', {
  idOdmianaWinogron: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  opis: Sequelize.STRING(255)
});

const DICTOPERACJENAWINNICY = sequelize.define('DictOperacjeNaWinnicy', {
  idDictOperacjeNaWinnicy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  opis: Sequelize.STRING(255)
});

const DICTPROCESY = sequelize.define('DictProcesy', {
  idDictProcesy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(40),
  opis: Sequelize.STRING(255),
  dodatkowe: Sequelize.STRING(80)
});

const DICTROLAUZYTKOWNIKOW = sequelize.define('DictRolaUzytkownikow', {
  idRolaUzytkownikow: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  opis: Sequelize.STRING(255),
  typ: Sequelize.STRING(45)
});

const DICTTYPPARTII = sequelize.define('DictTypPartii', {
  idTypPartii: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  jednostka: Sequelize.STRING(45)
});

const INFORMACJEOWINIE = sequelize.define('InformacjeOWinie', {
  idInformacjeOWinie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  motto: Sequelize.STRING(100),
  zawartoscPotAlergenow: Sequelize.STRING(20),
  wartoscEnergetyczna: Sequelize.INTEGER(3)
  // kategoriaWina: { define foreign key } ,
});

const KONTRAHENCI = sequelize.define('Kontrahenci', {
  idKontrahenci: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIP: Sequelize.STRING(10),
  nazwaSpolki: Sequelize.STRING(40),
  telefon: Sequelize.STRING(14),
  eMail: Sequelize.STRING(90),
  stronaWww: Sequelize.STRING(255),
  KRS: Sequelize.STRING(10),
  nrKonta: Sequelize.STRING(26),
  fax: Sequelize.STRING(45),
  adresIdAdres: Sequelize.INTEGER(11)
});

// ADRES.hasOne(KONTRAHENCI, { as: 'adres' });
// ADRES.belongsTo(KONTRAHENCI, { foreignKey: { name: 'idAdres', constraints: false } });

const LISTPRZEWOZOWY = sequelize.define('ListPrzewozowy', {
  idListPrzewozowy: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imieKierowcy: Sequelize.STRING(45),
  nazwiskoKierowcy: Sequelize.STRING(60),
  uwagiPrzewoznika: Sequelize.STRING(255),
  zastrzezeniaOdbiorcy: Sequelize.STRING(255),
  eDokument: Sequelize.STRING(255)
  // przesylka: Przesylka // fk
});

const MAGAZYN = sequelize.define('Magazyn', {
  idMagazyn: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rodzaj: Sequelize.ENUM('producja', 'towary', 'sklad'), // enum
  pojemnosc: Sequelize.FLOAT(7) // Decimal 6,1
  // adres: Adres, // fk
});

const OPERACJE = sequelize.define('Operacje', {
  idOperacja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iloscPrzed: Sequelize.FLOAT(8), // 6,2
  iloscPo: Sequelize.FLOAT(8), // 6,2
  dataPoczatku: Sequelize.STRING(45), // date time
  dataZakonczenia: Sequelize.STRING(45), // date time
  zawartoscAlkoholu: Sequelize.FLOAT(3), // 2,1
  iloscDodatku: Sequelize.FLOAT(4), // 3,1
  zawartoscCukru: Sequelize.FLOAT(3), // 2,1
  kwasowosc: Sequelize.FLOAT(3), // 2,1
  temperatura: Sequelize.FLOAT(3), // 2,1
  opis: Sequelize.STRING(255)
  // uzytkownicy: Uzytkownicy, // fk
  // procesy: DictProcesy // fk
});

const OPERACJENAWINNICY = sequelize.define('OperacjeNaWinnicy', {
  idOperacja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: Sequelize.STRING(45),
  opis: Sequelize.STRING(45)
  // dictOperacjeNaWinnicy: DictOperacjeNaWinnicy,
  // winnica: Winnica
});

const PARTIE = sequelize.define('Partie', {
  idPartie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ilosc: Sequelize.FLOAT(5), // 4,1
  opis: Sequelize.STRING(255),
  dataUtworzenia: Sequelize.STRING(45) // date time
  // winobranie: Winobranie // fk
  // partie: Partie // fk
  // typPartii: DictTypPartii // fk
  // informacjeOWinie: InformacjeOWinie // fk
});

const PLANYPRODUKCYJNE = sequelize.define('PlanyProdukcyjne', {
  idPlanyProdukcyjne: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  opis: Sequelize.STRING(255),
  // rodzajWinogron: DictOdmianaWinogron, // fk
  // typPartii: DictTypPartii, // fk
  // kategorie: DictKategorie, // fk
  eDokument: Sequelize.STRING(255)
});

const POZYCJAWMAGAZYNIE = sequelize.define('PozycjaWMagazynie', {
  idPozycja: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  opis: Sequelize.STRING(255),
  ilosc: Sequelize.FLOAT(5), // 4,1
  kodKreskowy: Sequelize.STRING(13),
  stanAktualny: Sequelize.BOOLEAN, // true false or 1 0
  dataPrzyjecia: Sequelize.STRING(45), // date time
  dataWydania: Sequelize.STRING(45), // date time
  nazwaSektora: Sequelize.STRING(45)
  // kategorie: DictKategorie // fk
  // magazyn: Magazyn // fk
  // partie: Partie // fk
});

const PRZESYLKA = sequelize.define('Przesylka', {
  idPrzesylka: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwaPrzesylki: Sequelize.STRING(45),
  ciezarLadunku: Sequelize.FLOAT(8), // 6,2
  date: Sequelize.STRING(45) // date time
});

const RAPORTY = sequelize.define('Raporty', {
  idRaport: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(45),
  eDokument: Sequelize.STRING(255),
  dataUtworzenia: Sequelize.STRING(45) // date time
});

const UZYTKOWNICY = sequelize.define('Uzytkownicy', {
  idUzytkownika: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imie: Sequelize.STRING(30),
  nazwisko: Sequelize.STRING(30),
  login: Sequelize.STRING(10),
  haslo: Sequelize.STRING(60), // bcrypt - binary
  PESEL: Sequelize.STRING(11),
  eMail: Sequelize.STRING(40),
  nrTelefonu: Sequelize.STRING(11),
  dataOstatniegoLogowania: Sequelize.STRING(45), // date time
  zdjecie: Sequelize.STRING(100),
  czyAktywne: Sequelize.BOOLEAN // true false
  // adres: Adres, // fk
  // rola: DictRolaUzytkownikow, // fk
});

const WINNICA = sequelize.define('Winnica', {
  idWinnica: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nazwa: Sequelize.STRING(40),
  powierzchnia: Sequelize.FLOAT(8), // 6,2
  stan: Sequelize.ENUM('dziala', 'nie dziala'),
  terroir: Sequelize.STRING(255),
  dataOstatniegoZbioru: Sequelize.STRING(45), // date time
  dataZasadzenia: Sequelize.STRING(45), // date time
  ewidencyjnyIdDzialki: Sequelize.STRING(45)
  // dictOdmianaWinogron: DictOdmianaWinogron // fk
});

const WINOBRANIE = sequelize.define('Winobranie', {
  idWinobranie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dataWinobrania: Sequelize.STRING(45), // date time
  iloscZebranychWinogron: Sequelize.FLOAT(5) // 4,1
  // winnica: Winnica, // fk
});

// sequelize.sync({ force: true });

for (let i = 0; i < 10; i += 1) {
  // TODO split to separate loops
  // createAdres();
  // createDictKategoriaWina();
  // createDictKategorie();
  // createDictOdmianaWinogron();
  // createDictOperacjeNaWinnicy();
  // createDictProcesy();
  // createDictRolaUzytkownikow();
  // createDictTypPartii();
  createKontrahenci();
}

// sequelize.sync().then(() => User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     .then(jane => {
//         console.log(jane.toJSON());
//     });

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
