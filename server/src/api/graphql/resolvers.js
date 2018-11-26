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
    DictKategoriaWina: async (_, { idDictKategoriaWina, nazwaKategoria, opis }, context) => {
      return await sequelize.getDictKategoriaWina({ idDictKategoriaWina, nazwaKategoria, opis });
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
      { idKontrahenci, NIP, nazwaSpolki, telefon, eMail, stronaWww, KRS, nrKonta, fax },
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
        fax
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
    Magazyn: async (_, { idMagazyn, rodzaj, pojemnosc }, context) => {
      return await sequelize.getMagazyn({ idMagazyn, rodzaj, pojemnosc });
    },
    Operacje: async (
      _,
      {
        idOperacja,
        iloscPrzed,
        iloscPo,
        dataPoczatku,
        dataZakonczenia,
        zawartoscAlkoholu,
        iloscDodatku,
        zawartoscCukru,
        kwasowosc,
        temperatura,
        opis
      },
      context
    ) => {
      return await sequelize.getOperacje({
        idOperacja,
        iloscPrzed,
        iloscPo,
        dataPoczatku,
        dataZakonczenia,
        zawartoscAlkoholu,
        iloscDodatku,
        zawartoscCukru,
        kwasowosc,
        temperatura,
        opis
      });
    },
    OperacjeNaWinnicy: async (_, { idOperacja, data, opis, dictOperacjeNaWinnicy, winnica }, context) => {
      return await sequelize.getOperacjeNaWinnicy({ idOperacja, data, opis, dictOperacjeNaWinnicy, winnica });
    },
    Partie: async (_, { idPartie, ilosc, opis, dataUtworzenia, winobranie, typPartii, informacjeOWinie }, context) => {
      // TODO in situation when querying operacje, add field ilosc to table Partie
      return await sequelize.getPartie({
        idPartie,
        ilosc,
        opis,
        dataUtworzenia,
        winobranie,
        typPartii,
        informacjeOWinie
      });
    },
    PlanyProdukcyjne: async (_, input, context) => {
      return await sequelize.getPlanyProdukcyjne();
    },
    PozycjaWMagazynie: async (
      _,
      {
        idPozycja,
        nazwa,
        opis,
        ilosc,
        kodKreskowy,
        stanAktualny,
        dataPrzyjecia,
        dataWydania,
        nazwaSektora,
        kategorie,
        magazyn,
        partie
      },
      context
    ) => {
      return await sequelize.getPozycjaWMagazynie({
        idPozycja,
        nazwa,
        opis,
        ilosc,
        kodKreskowy,
        stanAktualny,
        dataPrzyjecia,
        dataWydania,
        nazwaSektora,
        kategorie,
        magazyn,
        partie
      });
    },
    Przesylka: async (_, { idPrzesylka, nazwaPrzesylki, ciezarLadunku, data, listPrzewozowy }, context) => {
      return await sequelize.getPrzesylka({ idPrzesylka, nazwaPrzesylki, ciezarLadunku, data, listPrzewozowy });
    },
    Raporty: async (_, { idRaport, nazwa, eDokument, dataUtworzenia }, context) => {
      return await sequelize.getRaporty({ idRaport, nazwa, eDokument, dataUtworzenia });
    },
    Uzytkownicy: async (
      _,
      {
        idUzytkownika,
        imie,
        nazwisko,
        login,
        haslo,
        PESEL,
        eMail,
        nrTelefonu,
        dataOstatniegoLogowania,
        zdjecie,
        czyAktywne,
        adres,
        rola
      },
      context
    ) => {
      return await sequelize.getUzytkownicy({
        idUzytkownika,
        imie,
        nazwisko,
        login,
        haslo,
        PESEL,
        eMail,
        nrTelefonu,
        dataOstatniegoLogowania,
        zdjecie,
        czyAktywne,
        adres,
        rola
      });
    },
    Winnica: async (
      _,
      {
        idWinnica,
        nazwa,
        powierzchnia,
        stan,
        terroir,
        dataOstatniegoZbioru,
        dataZasadzenia,
        ewidencyjnyIdDzialki,
        dictOdmianaWinogron
      },
      context
    ) => {
      return await sequelize.getWinnica({
        idWinnica,
        nazwa,
        powierzchnia,
        stan,
        terroir,
        dataOstatniegoZbioru,
        dataZasadzenia,
        ewidencyjnyIdDzialki,
        dictOdmianaWinogron
      });
    },
    Winobranie: async (_, { idWinobranie, dataWinobrania, iloscZebranychWinogron, winnica }, context) => {
      return await sequelize.getWinobranie({ idWinobranie, dataWinobrania, iloscZebranychWinogron, winnica });
    }
  },
  Adres: {
    uzytkownicy: async (_, input, context) => {
      let users = await sequelize.getUzytkownicy({ adresIdAdres: _.idAdres });
      return users[0];
    },
    kontrahent: async (_, input, context) => {
      // TODO fix unique key 1-1 relation here
      let kontr = await sequelize.getKontrahenci({ adresIdAdres: _.idAdres });
      return kontr[0];
    },
    listprzewozowy: async (_, input, context) => {
      const list = await sequelize.getListPrzewozowyHasAdres({
        adresIdAdres: _.idAdres
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
      return await [].concat.apply([], list2);
    }
  },
  DictKategoriaWina: {
    informacjeOWinie: async (_, input, context) => {
      return await sequelize.getInformacjeOWinie({ dictKategoriaWinaIdDictKategoriaWina: _.idDictKategoriaWina });
    }
  },
  DictKategorie: {
    planyProdukcyjne: async (_, input, context) => {
      return await sequelize.getPlanyProdukcyjne({ dictKategorieIdKategorie: _.idKategorie });
    },
    pozycjaWMagazynie: async (_, input, context) => {
      return await sequelize.getPozycjaWMagazynie({ kategorieIdKategorie: _.idKategorie });
    }
  },
  DictOdmianaWinogron: {
    planyProdukcyjne: async (_, input, context) => {
      return await sequelize.getPlanyProdukcyjne({ dictRodzajWinogronIdOdmianaWinogron: _.idOdmianaWinogron });
    },
    winnica: async (_, input, context) => {
      return await sequelize.getWinnica({ odmianiaWinogronIdOdmianaWinogron: _.idOdmianaWinogron });
    }
  },
  DictOperacjeNaWinnicy: {
    operacjeNaWinnicy: async (_, input, context) => {
      return await sequelize.getOperacjeNaWinnicy({
        dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: _.idDictOperacjeNaWinnicy
      });
    }
  },
  DictProcesy: {
    operacje: async (_, input, context) => {
      return await sequelize.getOperacje({ dictProcesyIdDictProcesy: _.idDictProcesy });
    },
    planyProdukcyjne: async (_, input, context) => {
      const list = await sequelize.getPlanyProdukcyjneHasDictProcesy({
        dictProcesyIdDictProcesy: _.idDictProcesy
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getPlanyProdukcyjne({
                  idPlanyProdukcyjne: listItem.planyProdukcyjneIdPlanyProdukcyjne
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      return await [].concat.apply([], list2);
    }
  },
  DictRolaUzytkownikow: {
    uzytkownicy: async (_, input, context) => {
      return await sequelize.getUzytkownicy({
        dictRolaUzytkownikowIdRolaUzytkownikow: _.idRolaUzytkownikow
      });
    }
  },
  DictTypPartii: {
    partie: async (_, input, context) => {
      return await sequelize.getPartie({
        typPartiiIdTypPartii: _.idTypPartii
      });
    },
    planyProdukcyjne: async (_, input, context) => {
      return await sequelize.getPlanyProdukcyjne({
        dictTypPartiiIdTypPartii: _.idPlanyProdukcyjne
      });
    }
  },
  InformacjeOWinie: {
    kategoriaWina: async (_, input, context) => {
      const kat = await sequelize.getDictKategoriaWina({
        idDictKategoriaWina: _.dictKategoriaWinaIdDictKategoriaWina
      });
      return kat[0];
    },
    partie: async (_, input, context) => {
      return await sequelize.getPartie({
        informacjeOWinieIdInformacjeOWinie: _.idInformacjeOWinie
      });
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
      return await [].concat.apply([], list2);
    }
  },
  ListPrzewozowy: {
    przesylka: async (_, input, contest) => {
      const result = await sequelize.getPrzesylka({ idPrzesylka: _.przesylkaIdPrzesylka });
      return result[0];
    },
    kontrahent: async (_, input, context) => {
      const list = await sequelize.getListPrzewozowyHasKontrahenci({
        listPrzewozowyIdListPrzewozowy: _.idListPrzewozowy
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getKontrahenci({
                  idKontrahenci: listItem.kontrahenciIdKontrahenci
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      return [].concat.apply([], list2);
    },
    adres: async (_, input, context) => {
      const list = await sequelize.getListPrzewozowyHasAdres({
        listPrzewozowyIdListPrzewozowy: _.idListPrzewozowy
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getAddresses({
                  idAdres: listItem.adresIdAdres
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      // TODO add third step for gathering join extra field and add to returned result
      const resolvedQuery = [].concat.apply([], list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.adresIdAdres.toString() === queryElement.idAdres.toString()
        );
        queryElement.miejsce = queryResult.miejsce;
      });
      return resolvedQuery;
    }
  },
  Magazyn: {
    adres: async (_, input, context) => {
      const adr = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return adr[0];
    },
    pozycjaWMagazynie: async (_, input, context) => {
      return await sequelize.getPozycjaWMagazynie({ magazynIdMagazyn: _.idMagazyn });
    }
  },
  Operacje: {
    // TODO resolve new fields
    uzytkownicy: async (_, input, context) => {
      const usr = await sequelize.getUzytkownicy({
        idUzytkownika: _.uzytkownicyIdUzytkownicy
      });
      return usr[0];
    },
    dictProcesy: async (_, input, context) => {
      const proc = await sequelize.getDictProcesy({ idDictProcesy: _.dictProcesyIdDictProcesy });
      return proc[0];
    },
    pozycjaWMagazynie: async (_, input, context) => {
      const list = await sequelize.getOperacjeHasPozycjaWMagazynie({
        operacjeIdOperacja: _.idOperacja
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getPozycjaWMagazynie({
                  idPozycja: listItem.pozycjaWMagazynieIdPozycja
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      // TODO add third step for gathering join extra field and add to returned result
      const resolvedQuery = [].concat.apply([], list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.pozycjaWMagazynieIdPozycja.toString() === queryElement.idPozycja.toString()
        );
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    },
    partie: async (_, input, context) => {
      const list = await sequelize.getOperacjeHasPartie({
        operacjeIdOperacja: _.idOperacja
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getPartie({
                  idPartie: listItem.partieIdPartie
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      // TODO add third step for gathering join extra field and add to returned result
      const resolvedQuery = [].concat.apply([], list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.partieIdPartie.toString() === queryElement.idPartie.toString()
        );
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    }
  },
  OperacjeNaWinnicy: {
    dictOperacjeNaWinnicy: async (_, input, context) => {
      const oper = await sequelize.getDictOperacjeNaWinnicy({
        idDictOperacjeNaWinnicy: _.dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy
      });
      return oper[0];
    },
    winnica: async (_, input, context) => {
      const win = await sequelize.getWinnica({ idWinnica: _.winnicaIdWinnica });
      return win[0];
    }
  },
  Partie: {
    typPartii: async (_, input, context) => {
      const query = await sequelize.getDictTypPartii({
        idTypPartii: _.typPartiiIdTypPartii
      });
      return query[0];
    },
    informacjeOWinie: async (_, input, context) => {
      const query = await sequelize.getInformacjeOWinie({
        idInformacjeOWinie: _.informacjeOWinieIdInformacjeOWinie
      });
      return query[0];
    },
    partie: async (_, input, context) => {
      return await sequelize.getPartie({
        partieIdPartie: _.idPartie
      });
    },
    operacje: async (_, input, context) => {
      const list = await sequelize.getOperacjeHasPartie({
        partieIdPartie: _.idPartie
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getOperacje({
                  idOperacja: listItem.operacjeIdOperacja
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
  // PlanyProdukcyjne: {},
  PozycjaWMagazynie: {
    kategorie: async (_, input, context) => {
      let query = await sequelize.getDictKategorie({ idKategorie: _.kategorieIdKategorie });
      return query[0];
    },
    magazyn: async (_, input, context) => {
      let query = await sequelize.getMagazyn({ idMagazyn: _.magazynIdMagazyn });
      return query[0];
    },
    partie: async (_, input, context) => {
      let query = await sequelize.getPartie({ idPartie: _.partieIdPartie });
      return query[0];
    },
    przesylka: async (_, input, context) => {
      const list = await sequelize.getPrzesylkaHasPozycjaWMagazynie({
        pozycjaWMagazynieIdPozycja: _.idPozycja
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getOperacje({
                  idPrzesylka: listItem.przesylkaIdPrzesylka
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      const resolvedQuery = [].concat.apply([], list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.przesylkaIdPrzesylka.toString() === queryElement.idPrzesylka.toString()
        );
        queryElement.ilosc = queryResult.ilosc;
      });
      return resolvedQuery;
    },
    operacje: async (_, input, context) => {
      const list = await sequelize.getOperacjeHasPozycjaWMagazynie({
        pozycjaWMagazynieIdPozycja: _.idPozycja
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getOperacje({
                  idOperacja: listItem.operacjeIdOperacja
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
  Przesylka: {
    listPrzewozowy: async (_, input, context) => {
      let query = await sequelize.getListPrzewozowy();
      return query[0];
    },
    pozycjaWMagazynie: async (_, input, context) => {
      const list = await sequelize.getPrzesylkaHasPozycjaWMagazynie({
        przesylkaIdPrzesylka: _.idPrzesylka
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getPozycjaWMagazynie({
                  idPozycja: listItem.pozycjaWMagazynieIdPozycja
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
  Raporty: {
    uzytkownicy: async (_, input, context) => {
      const list = await sequelize.getRaportyHasUzytkownicy({
        raportyIdRaport: _.idRaport
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getUzytkownicy({
                  idUzytkownika: listItem.uzytkownicyIdUzytkownika
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
  Uzytkownicy: {
    adres: async (_, input, context) => {
      let query = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return query[0];
    },
    rola: async (_, input, context) => {
      let query = await sequelize.getDictRolaUzytkownikow({
        idRolaUzytkownikow: _.dictRolaUzytkownikowIdRolaUzytkownikow
      });
      return query[0];
    },
    raporty: async (_, input, context) => {
      const list = await sequelize.getRaportyHasUzytkownicy({
        uzytkownicyIdUzytkownika: _.idUzytkownika
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                await sequelize.getRaporty({
                  idRaport: listItem.raportyIdRaport
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      return [].concat.apply([], list2);
    },
    operacje: async (_, input, context) => {
      let query = await sequelize.getOperacje({ uzytkownicyIdUzytkownicy: _.idUzytkownika });
      return query;
    }
  },
  Winnica: {
    dictOdmianaWinogron: async (_, input, context) => {
      let query = await sequelize.getDictOdmianaWinogron({ idOdmianaWinogron: _.odmianiaWinogronIdOdmianaWinogron });
      return query[0];
    },
    winobranie: async (_, input, context) => {
      let query = await sequelize.getWinobranie({ winnicaIdWinnica: _.idWinnica });
      return query[0];
    },
    operacjeNaWinnicy: async (_, input, context) => {
      let query = await sequelize.getDictOperacjeNaWinnicy({ winnicaIdWinnica: _.idWinnica });
      return query[0];
    }
  },
  Winobranie: {
    winnica: async (_, input, context) => {
      let query = await sequelize.getWinnica({ idWinnica: _.winnicaIdWinnica });
      return query[0];
    },
    partie: async (_, input, context) => {
      let query = await sequelize.getPartie({ winobranieIdWinobranie: _.idWinobranie });
      return query;
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

// const manyToManyQuery = async (
//   joinTableKey,
//   underscoreKey,
//   joinTableName,
//   targetKey,
//   fromJoinedTableKey,
//   targetTableName
// ) => {
//   const firstQueryResult = await sequelize[joinTableName]({
//     [joinTableKey]: underscoreKey
//   });
//   let secondQueryResult = [];
//   if (list.length > 0) {
//     const promises = firstQueryResult.map(
//       queryItem =>
//         new Promise(async resolve => {
//           secondQueryResult.push(
//             await sequelize[targetTableName]({
//               [targetKey]: queryItem[fromJoinedTableKey]
//             })
//           );
//           resolve();
//         })
//     );
//     await Promise.all(promises);
//   }
//   return [].concat.apply([], secondQueryResult);
// };
