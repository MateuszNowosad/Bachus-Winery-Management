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
    Kontrahenci: (_, input, context) => {
      console.log('85, _ filip: ', _);
      console.log('86, input filip: ', input);
      console.log('87, context filip: ', context);
      return testData.KONTRAHENCI;
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

// const userPermissions = await sequelize.query(
//     'Select * from vwUserPermissions where email = :email',
//     {
//         raw: true,
//         type: Sequelize.QueryTypes.SELECT,
//         replacements: { email },
//     }
// );
