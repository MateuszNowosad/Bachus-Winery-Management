import * as sequelize from '../../sequelizeDB';
// import * as testData from '../../../.variables/graphGLStaticData';

export default {
  Query: {
    Adres: async (_, { idAdres, miasto, kodPocztowy, ulica, nrLokalu, nrPosesji, kraj }, context) => {
      return await sequelize.getAddresses({
        idAdres,
        miasto,
        kodPocztowy,
        ulica,
        nrLokalu,
        nrPosesji,
        kraj
      });
    },
    DictKategorie: async (_, { idKategorie, nazwa, jednostka, opis }, context) => {
      return await sequelize.getDictKategorie({
        idKategorie,
        nazwa,
        jednostka,
        opis
      });
    },
    DictOdmianaWinogron: async (_, { idOdmianaWinogron, nazwa, opis }, context) => {
      return await sequelize.getDictOdmianaWinogron({ idOdmianaWinogron, nazwa, opis });
    },
    DictOperacjeNaWinnicy: async (_, { idDictOperacjeNaWinnicy, nazwa, opis }, context) => {
      return await sequelize.getDictOperacjeNaWinnicy({
        idDictOperacjeNaWinnicy,
        nazwa,
        opis
      });
    },
    DictProcesy: async (_, { idDictProcesy, nazwa, opis, dodatkowe }, context) => {
      return await sequelize.getDictProcesy({ idDictProcesy, nazwa, opis, dodatkowe });
    },
    DictRolaUzytkownikow: async (_, { idRolaUzytkownikow, nazwa, opis, typ }, context) => {
      return await sequelize.getDictRolaUzytkownikow({ idRolaUzytkownikow, nazwa, opis, typ });
    },
    DictTypPartii: async (_, { idTypPartii, nazwa, jednostka }, context) => {
      return await sequelize.getDictTypPartii({ idTypPartii, nazwa, jednostka });
    },
    InformacjeOWinie: async (
      _,
      { idInformacjeOWinie, nazwa, motto, zawartoscPotAlergenow, wartoscEnergetyczna },
      context
    ) => {
      return await sequelize.getInformacjeOWinie({
        idInformacjeOWinie,
        nazwa,
        motto,
        zawartoscPotAlergenow,
        wartoscEnergetyczna
      });
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
    ListPrzewozowy: async (
      _,
      {
        idListPrzewozowy,
        imieKierowcy,
        nazwiskoKierowcy,
        uwagiPrzewoznika,
        zastrzezeniaOdbiorcy,
        eDokument,
        przesylkaIdPrzesylka
      },
      context
    ) => {
      return await sequelize.getListPrzewozowy({
        idListPrzewozowy,
        imieKierowcy,
        nazwiskoKierowcy,
        uwagiPrzewoznika,
        zastrzezeniaOdbiorcy,
        eDokument,
        przesylkaIdPrzesylka
      });
    },
    Magazyn: async (_, { idMagazyn }, context) => {
      return await sequelize.getMagazyn();
    },
    Operacje: async (_, input, context) => {
      return await sequelize.getOperacje();
    },
    OperacjeNaWinnicy: async (_, input, context) => {
      return await sequelize.getOperacjeNaWinnicy();
    },
    Partie: async (_, input, context) => {
      return await sequelize.getPartie();
    },
    PlanyProdukcyjne: async (_, input, context) => {
      return await sequelize.getPlanyProdukcyjne();
    },
    PozycjaWMagazynie: async (_, input, context) => {
      return await sequelize.getPozycjaWMagazynie();
    },
    Przesylka: async (_, { idPrzesylka }, context) => {
      return await sequelize.getPrzesylka();
    },
    Raporty: async (_, input, context) => {
      return await sequelize.getRaporty();
    },
    Uzytkownicy: async (_, input, context) => {
      return await sequelize.getUzytkownicy();
    },
    Winnica: async (_, input, context) => {
      return await sequelize.getWinnica();
    },
    Winobranie: async (_, input, context) => {
      return await sequelize.getWinobranie();
    }
  },
  InformacjeOWinie: {
    kategoriaWina: async (_, input, context) => {
      const kat = await sequelize.getDictKategoriaWina({
        idDictKategoriaWina: _.dictKategoriaWinaIdDictKategoriaWina
      });
      return kat;
    }
  },
  Kontrahenci: {
    adres: async (_, input, context) => {
      const adr = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return adr[0];
    },
    listprzewozowy: async (_, input, context) => {
      const list = await sequelize.getListPrzewozowyHasKontrahenci({
        kontrahenciIdKontrahenci: _.idKontrahenci
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getListPrzewozowy({
                  idListPrzewozowy: listItem.listPrzewozowyIdListPrzewozowy
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      return [].concat.apply([], list2);
    }
  },
  Magazyn: {
    adres: (_, input, context) => {
      // TODO use sequelize table
      return adresy.find(adres => adres.idAdres === _.idAdres);
    }
  },

  ListPrzewozowy: {
    przesylka: (_, input, contest) => {
      return 1;
    },
    kontrahent: async (_, input, context) => {
      const kontr = await sequelize.getKontrahenci({ idKontrahenci: _.idKontrahenci });
      return kontr[0];
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
