import * as sequelize from '../../sequelizeDB';
import * as testData from '../../../.variables/graphGLStaticData';

export default {
  Query: {
    Adres: async (_, { idAdres, miasto, kodPocztowy, ulica, nrLokalu, nrPosesji, kraj }, context) => {
      const addresses = await sequelize.getAddresses({
        idAdres,
        miasto,
        kodPocztowy,
        ulica,
        nrLokalu,
        nrPosesji,
        kraj
      });
      return addresses;
    },
    DictKategorie: async (_, input, context) => {
      return await sequelize.getDictKategorie();
    },
    Magazyn: (_, { idMagazyn }, context) => {
      return testData.MAGAZYN.find(magazyn => magazyn.idMagazyn === idMagazyn);
    },
    Kontrahenci: async (
      _,
      { idKontrahenci, NIP, nazwaSpolki, telefon, eMail, stronaWww, KRS, nrKonta, fax, adresIdAdres },
      context
    ) => {
      return await sequelize.getKontrahenci({
        idKontrahenci,
        NIP,
        nazwaSpolki,
        telefon,
        eMail,
        stronaWww,
        KRS,
        nrKonta,
        fax,
        adresIdAdres
      });
    },
    ListPrzewozowy: (_, { idListPrzewozowy }, context) => {
      return testData.LISTPRZEWOZOWY.find(listPrzewozowy => listPrzewozowy.idListPrzewozowy === idListPrzewozowy);
    },
    Przesylka: (_, { idPrzesylka }, context) => {
      return testData.PRZESYLKA.find(przesylka => przesylka.idPrzesylka === idPrzesylka);
    },
    DictOperacjeNaWinnicy: (_, input, context) => {
      return testData.DICTOPERACJENAWINNICY;
    }
  },
  Magazyn: {
    adres: (_, input, context) => {
      return adresy.find(adres => adres.idAdres === _.idAdres);
    }
  },
  Kontrahenci: {
    adres: async (_, input, context) => {
      const adr = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return adr[0];
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

// const userPermissions = await sequelize.query(
//     'Select * from vwUserPermissions where email = :email',
//     {
//         raw: true,
//         type: Sequelize.QueryTypes.SELECT,
//         replacements: { email },
//     }
// );
