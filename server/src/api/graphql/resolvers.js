import * as sequelize from '../../sequelizeDB';
// import * as testData from '../../../.variables/graphGLStaticData';
import _ from 'underscore';
import { tableIdName } from '../../sequelizeDB';
// import insert from '../common/insertModels';

const insert = {
  Adres: sequelize.insertAdres,
  DictKategoriaWina: sequelize.insertDictKategoriaWina,
  DictKategorie: sequelize.insertDictKategorie,
  DictOdmianaWinogron: sequelize.insertDictOdmianaWinogron,
  DictOperacjeNaWinnicy: sequelize.insertDictOperacjeNaWinnicy,
  DictProcesy: sequelize.insertDictProcesy,
  DictRolaUzytkownikow: sequelize.insertDictRolaUzytkownikow,
  DictTypPartii: sequelize.insertDictTypPartii,
  InformacjeOWinie: sequelize.insertInformacjeOWinie,
  Kontrahenci: sequelize.insertKontrahenci,
  ListPrzewozowy: sequelize.insertListPrzewozowy,
  ListPrzewozowyHasAdres: sequelize.insertListPrzewozowyHasAdres,
  ListPrzewozowyHasKontrahenci: sequelize.insertListPrzewozowyHasKontrahenci,
  Magazyn: sequelize.insertMagazyn,
  Operacje: sequelize.insertOperacje,
  OperacjeHasPartie: sequelize.insertOperacjeHasPartie,
  OperacjeHasPozycjaWMagazynie: sequelize.insertOperacjeHasPozycjaWMagazynie,
  OperacjeNaWinnicy: sequelize.insertOperacjeNaWinnicy,
  Partie: sequelize.insertPartie,
  PlanyProdukcyjne: sequelize.insertPlanyProdukcyjne,
  PlanyProdukcyjneHasPozycjaWMagazynie: sequelize.insertPlanyProdukcyjneHasPozycjaWMagazynie,
  PozycjaWMagazynie: sequelize.insertPozycjaWMagazynie,
  Przesylka: sequelize.insertPrzesylka,
  PrzesylkaHasPozycjaWMagazynie: sequelize.insertPrzesylkaHasPozycjaWMagazynie,
  Raporty: sequelize.insertRaporty,
  RaportyHasUzytkownicy: sequelize.insertRaportyHasUzytkownicy,
  Uzytkownicy: sequelize.insertUzytkownicy,
  Winnica: sequelize.insertWinnica,
  Winobranie: sequelize.insertWinobranie
};

export default {
  Query: {
    Adres: async (_, { idAdres, miasto, kodPocztowy, ulica, nrLokalu, nrPosesji, kraj }) => {
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
    DictKategoriaWina: async (_, { idDictKategoriaWina, nazwaKategoria, opis }) => {
      return await sequelize.getDictKategoriaWina({ idDictKategoriaWina, nazwaKategoria, opis });
    },
    DictKategorie: async (_, { idKategorie, nazwa, jednostka, opis }) => {
      return await sequelize.getDictKategorie({
        idKategorie,
        nazwa,
        jednostka,
        opis
      });
    },
    DictOdmianaWinogron: async (_, { idOdmianaWinogron, nazwa, opis }) => {
      return await sequelize.getDictOdmianaWinogron({ idOdmianaWinogron, nazwa, opis });
    },
    DictOperacjeNaWinnicy: async (_, { idDictOperacjeNaWinnicy, nazwa, opis }) => {
      return await sequelize.getDictOperacjeNaWinnicy({
        idDictOperacjeNaWinnicy,
        nazwa,
        opis
      });
    },
    DictProcesy: async (_, { idDictProcesy, nazwa, opis, dodatkowe }) => {
      return await sequelize.getDictProcesy({ idDictProcesy, nazwa, opis, dodatkowe });
    },
    DictRolaUzytkownikow: async (_, { idRolaUzytkownikow, nazwa, opis, typ }) => {
      return await sequelize.getDictRolaUzytkownikow({ idRolaUzytkownikow, nazwa, opis, typ });
    },
    DictTypPartii: async (_, { idTypPartii, nazwa, jednostka }) => {
      return await sequelize.getDictTypPartii({ idTypPartii, nazwa, jednostka });
    },
    InformacjeOWinie: async (
      _,
      {
        idInformacjeOWinie,
        nazwa,
        motto,
        zawartoscPotAlergenow,
        wartoscEnergetyczna,
        dictKategoriaWinaIdDictKategoriaWina
      }
    ) => {
      return await sequelize.getInformacjeOWinie({
        idInformacjeOWinie,
        nazwa,
        motto,
        zawartoscPotAlergenow,
        wartoscEnergetyczna,
        dictKategoriaWinaIdDictKategoriaWina
      });
    },
    Kontrahenci: async (
      _,
      { idKontrahenci, NIP, nazwaSpolki, telefon, eMail, stronaWww, KRS, nrKonta, fax, adresIdAdres }
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
      }
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
    Magazyn: async (_, { idMagazyn, rodzaj, pojemnosc, adresIdAdres }) => {
      return await sequelize.getMagazyn({ idMagazyn, rodzaj, pojemnosc, adresIdAdres });
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
        opis,
        uzytkownicyIdUzytkownicy,
        dictProcesyIdDictProcesy
      }
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
        opis,
        uzytkownicyIdUzytkownicy,
        dictProcesyIdDictProcesy
      });
    },
    OperacjeNaWinnicy: async (_, { idOperacja, data, opis, dictOperacjeNaWinnicy, winnicaIdWinnica }) => {
      return await sequelize.getOperacjeNaWinnicy({ idOperacja, data, opis, dictOperacjeNaWinnicy, winnicaIdWinnica });
    },
    Partie: async (
      _,
      {
        idPartie,
        ilosc,
        opis,
        dataUtworzenia,
        winobranieIdWinobranie,
        partieIdPartie,
        informacjeOWinieIdInformacjeOWinie,
        planyProdukcyjneIdPlanyProdukcyjne,
        czyPrzepis
      }
    ) => {
      return await sequelize.getPartie({
        idPartie,
        ilosc,
        opis,
        dataUtworzenia,
        winobranieIdWinobranie,
        partieIdPartie,
        informacjeOWinieIdInformacjeOWinie,
        planyProdukcyjneIdPlanyProdukcyjne,
        czyPrzepis
      });
    },
    PlanyProdukcyjne: async (_, { idPlanyProdukcyjne, nazwa, opis, eDokument }) => {
      return await sequelize.getPlanyProdukcyjne({ idPlanyProdukcyjne, nazwa, opis, eDokument });
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
        kategorieIdKategorie,
        magazynIdMagazyn,
        partieIdPartie
      }
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
        kategorieIdKategorie,
        magazynIdMagazyn,
        partieIdPartie
      });
    },
    Przesylka: async (_, { idPrzesylka, nazwaPrzesylki, ciezarLadunku, data }) => {
      return await sequelize.getPrzesylka({ idPrzesylka, nazwaPrzesylki, ciezarLadunku, data });
    },
    Raporty: async (_, { idRaport, nazwa, eDokument, dataUtworzenia }) => {
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
        adresIdAdres,
        dictRolaUzytkownikowIdRolaUzytkownikow
      }
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
        adresIdAdres,
        dictRolaUzytkownikowIdRolaUzytkownikow
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
        odmianiaWinogronIdOdmianaWinogron
      }
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
        odmianiaWinogronIdOdmianaWinogron
      });
    },
    Winobranie: async (_, { idWinobranie, dataWinobrania, iloscZebranychWinogron, winnicaIdWinnica }) => {
      return await sequelize.getWinobranie({ idWinobranie, dataWinobrania, iloscZebranychWinogron, winnicaIdWinnica });
    }
  },
  Adres: {
    uzytkownicy: async _ => {
      let users = await sequelize.getUzytkownicy({ adresIdAdres: _.idAdres });
      return users[0];
    },
    kontrahent: async _ => {
      let kontr = await sequelize.getKontrahenci({ adresIdAdres: _.idAdres });
      return kontr[0];
    },
    listprzewozowy: async root => {
      const list = await sequelize.getListPrzewozowyHasAdres({
        adresIdAdres: root.idAdres
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
      const resolvedQuery = _.flatten(list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement =>
            listElement.listPrzewozowyIdListPrzewozowy.toString() === queryElement.idListPrzewozowy.toString()
        );
        queryElement.miejsce = queryResult.miejsce;
      });
      return resolvedQuery;
    },
    magazyn: async _ => {
      let query = await sequelize.getMagazyn({ adresIdAdres: _.idAdres });
      return query[0];
    }
  },
  DictKategoriaWina: {
    informacjeOWinie: async _ => {
      return await sequelize.getInformacjeOWinie({ dictKategoriaWinaIdDictKategoriaWina: _.idDictKategoriaWina });
    }
  },
  DictKategorie: {
    planyProdukcyjne: async _ => {
      return await sequelize.getPlanyProdukcyjne({ dictKategorieIdKategorie: _.idKategorie });
    },
    pozycjaWMagazynie: async _ => {
      return await sequelize.getPozycjaWMagazynie({ kategorieIdKategorie: _.idKategorie });
    }
  },
  DictOdmianaWinogron: {
    planyProdukcyjne: async _ => {
      return await sequelize.getPlanyProdukcyjne({ dictRodzajWinogronIdOdmianaWinogron: _.idOdmianaWinogron });
    },
    winnica: async _ => {
      return await sequelize.getWinnica({ odmianiaWinogronIdOdmianaWinogron: _.idOdmianaWinogron });
    }
  },
  DictOperacjeNaWinnicy: {
    operacjeNaWinnicy: async _ => {
      return await sequelize.getOperacjeNaWinnicy({
        dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: _.idDictOperacjeNaWinnicy
      });
    }
  },
  DictProcesy: {
    operacje: async _ => {
      return await sequelize.getOperacje({ dictProcesyIdDictProcesy: _.idDictProcesy });
    },
    planyProdukcyjne: async root => {
      const list = await sequelize.getPlanyProdukcyjneHasDictProcesy({
        dictProcesyIdDictProcesy: root.idDictProcesy
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
      return _.flatten(list2);
    }
  },
  DictRolaUzytkownikow: {
    uzytkownicy: async _ => {
      return await sequelize.getUzytkownicy({
        dictRolaUzytkownikowIdRolaUzytkownikow: _.idRolaUzytkownikow
      });
    }
  },
  DictTypPartii: {
    partie: async _ => {
      return await sequelize.getPartie({
        typPartiiIdTypPartii: _.idTypPartii
      });
    },
    planyProdukcyjne: async _ => {
      return await sequelize.getPlanyProdukcyjne({
        dictTypPartiiIdTypPartii: _.idPlanyProdukcyjne
      });
    }
  },
  InformacjeOWinie: {
    kategoriaWina: async _ => {
      const kat = await sequelize.getDictKategoriaWina({
        idDictKategoriaWina: _.dictKategoriaWinaIdDictKategoriaWina
      });
      return kat[0];
    },
    partie: async _ => {
      return await sequelize.getPartie({
        informacjeOWinieIdInformacjeOWinie: _.idInformacjeOWinie
      });
    }
  },
  Kontrahenci: {
    adres: async _ => {
      const adr = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return adr[0];
    },
    listprzewozowy: async root => {
      const list = await sequelize.getListPrzewozowyHasKontrahenci({
        kontrahenciIdKontrahenci: root.idKontrahenci
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
      return _.flatten(list2);
    }
  },
  ListPrzewozowy: {
    przesylka: async _ => {
      const result = await sequelize.getPrzesylka({ idPrzesylka: _.przesylkaIdPrzesylka });
      return result[0];
    },
    kontrahent: async root => {
      const list = await sequelize.getListPrzewozowyHasKontrahenci({
        listPrzewozowyIdListPrzewozowy: root.idListPrzewozowy
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
      return _.flatten(list2);
    },
    adres: async root => {
      const list = await sequelize.getListPrzewozowyHasAdres({
        listPrzewozowyIdListPrzewozowy: root.idListPrzewozowy
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
      const resolvedQuery = _.flatten(list2);
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
    adresIdAdres: async _ => {
      const adr = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return adr[0];
    },
    pozycjaWMagazynie: async _ => {
      return await sequelize.getPozycjaWMagazynie({ magazynIdMagazyn: _.idMagazyn });
    }
  },
  Operacje: {
    uzytkownicy: async _ => {
      const usr = await sequelize.getUzytkownicy({
        idUzytkownika: _.uzytkownicyIdUzytkownicy
      });
      return usr[0];
    },
    dictProcesy: async _ => {
      const proc = await sequelize.getDictProcesy({ idDictProcesy: _.dictProcesyIdDictProcesy });
      return proc[0];
    },
    pozycjaWMagazynie: async root => {
      const list = await sequelize.getOperacjeHasPozycjaWMagazynie({
        operacjeIdOperacja: root.idOperacja
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
      const resolvedQuery = _.flatten(list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.pozycjaWMagazynieIdPozycja.toString() === queryElement.idPozycja.toString()
        );
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    },
    partie: async root => {
      const list = await sequelize.getOperacjeHasPartie({
        operacjeIdOperacja: root.idOperacja
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
      const resolvedQuery = _.flatten(list2);
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
    dictOperacjeNaWinnicy: async _ => {
      const oper = await sequelize.getDictOperacjeNaWinnicy({
        idDictOperacjeNaWinnicy: _.dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy
      });
      return oper[0];
    },
    winnica: async _ => {
      const win = await sequelize.getWinnica({ idWinnica: _.winnicaIdWinnica });
      return win[0];
    }
  },
  Partie: {
    typPartii: async _ => {
      const query = await sequelize.getDictTypPartii({
        idTypPartii: _.typPartiiIdTypPartii
      });
      return query[0];
    },
    informacjeOWinie: async _ => {
      const query = await sequelize.getInformacjeOWinie({
        idInformacjeOWinie: _.informacjeOWinieIdInformacjeOWinie
      });
      return query[0];
    },
    partie: async _ => {
      return await sequelize.getPartie({
        partieIdPartie: _.idPartie
      });
    },
    operacje: async root => {
      // 1 query to fkkeyName from base table primary key
      const list = await sequelize.getOperacjeHasPartie({
        partieIdPartie: root.idPartie
      });
      let list2 = [];
      if (list.length > 0) {
        const promises = list.map(
          listItem =>
            new Promise(async resolve => {
              list2.push(
                // 2 query target table primary key from join table fkKey
                await sequelize.getOperacje({
                  idOperacja: listItem.operacjeIdOperacja
                })
              );
              resolve();
            })
        );
        await Promise.all(promises);
      }
      const resolvedQuery = _.flatten(list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          // 3 compare fkKey from join table and primary key from target table
          listElement => listElement.operacjeIdOperacja.toString() === queryElement.idOperacja.toString()
        );
        // 4 add extra field to result
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    }
  },
  PlanyProdukcyjne: {
    partie: async _ => {
      return await sequelize.getPartie({
        planyProdukcyjneIdPlanyProdukcyjne: _.idPlanyProdukcyjne
      });
    },
    pozycjaWMagazynie: async root => {
      const list = await sequelize.getPlanyProdukcyjneHasPozycjaWMagazynie({
        planyProdukcyjneIdPlanyProdukcyjne: root.idPlanyProdukcyjne
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
      return _.flatten(list2);
    }
  },
  PozycjaWMagazynie: {
    kategorie: async _ => {
      let query = await sequelize.getDictKategorie({ idKategorie: _.kategorieIdKategorie });
      return query[0];
    },
    magazyn: async _ => {
      let query = await sequelize.getMagazyn({ idMagazyn: _.magazynIdMagazyn });
      return query[0];
    },
    partie: async _ => {
      let query = await sequelize.getPartie({ idPartie: _.partieIdPartie });
      return query[0];
    },
    przesylka: async root => {
      const list = await sequelize.getPrzesylkaHasPozycjaWMagazynie({
        pozycjaWMagazynieIdPozycja: root.idPozycja
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
      const resolvedQuery = _.flatten(list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.przesylkaIdPrzesylka.toString() === queryElement.idPrzesylka.toString()
        );
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    },
    operacje: async root => {
      const list = await sequelize.getOperacjeHasPozycjaWMagazynie({
        pozycjaWMagazynieIdPozycja: root.idPozycja
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
      return _.flatten(list2);
    }
  },
  Przesylka: {
    listPrzewozowy: async _ => {
      let query = await sequelize.getListPrzewozowy({ przesylkaIdPrzesylka: _.idPrzesylka });
      return query[0];
    },
    pozycjaWMagazynie: async root => {
      const list = await sequelize.getPrzesylkaHasPozycjaWMagazynie({
        przesylkaIdPrzesylka: root.idPrzesylka
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
      const resolvedQuery = _.flatten(list2);
      resolvedQuery.forEach(queryElement => {
        const queryResult = list.find(
          listElement => listElement.pozycjaWMagazynieIdPozycja.toString() === queryElement.idPozycja.toString()
        );
        queryElement.iloscFromJoinTable = queryResult.ilosc;
      });
      return resolvedQuery;
    }
  },
  Raporty: {
    uzytkownicy: async root => {
      const list = await sequelize.getRaportyHasUzytkownicy({
        raportyIdRaport: root.idRaport
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
      return _.flatten(list2);
    }
  },
  Uzytkownicy: {
    adres: async _ => {
      let query = await sequelize.getAddresses({ idAdres: _.adresIdAdres });
      return query[0];
    },
    rola: async _ => {
      let query = await sequelize.getDictRolaUzytkownikow({
        idRolaUzytkownikow: _.dictRolaUzytkownikowIdRolaUzytkownikow
      });
      return query[0];
    },
    raporty: async root => {
      const list = await sequelize.getRaportyHasUzytkownicy({
        uzytkownicyIdUzytkownika: root.idUzytkownika
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
      return _.flatten(list2);
    },
    operacje: async _ => {
      return await sequelize.getOperacje({ uzytkownicyIdUzytkownicy: _.idUzytkownika });
    }
  },
  Winnica: {
    dictOdmianaWinogron: async _ => {
      let query = await sequelize.getDictOdmianaWinogron({ idOdmianaWinogron: _.odmianiaWinogronIdOdmianaWinogron });
      return query[0];
    },
    winobranie: async _ => {
      let query = await sequelize.getWinobranie({ winnicaIdWinnica: _.idWinnica });
      return query[0];
    },
    operacjeNaWinnicy: async _ => {
      let query = await sequelize.getDictOperacjeNaWinnicy({ winnicaIdWinnica: _.idWinnica });
      return query[0];
    }
  },
  Winobranie: {
    winnica: async _ => {
      let query = await sequelize.getWinnica({ idWinnica: _.winnicaIdWinnica });
      return query[0];
    },
    partie: async _ => {
      return await sequelize.getPartie({ winobranieIdWinobranie: _.idWinobranie });
    }
  },
  Mutation: {
    upsertAdres: async (root, input) => {
      return await genericUpsertMutation(input, 'Adres');
    },
    upsertDictKategoriaWina: async (root, input) => {
      return await genericUpsertMutation(input, 'DictKategoriaWina');
    },
    upsertDictKategorie: async (root, input) => {
      return await genericUpsertMutation(input, 'DictKategorie');
    },
    upsertDictOdmianaWinogron: async (root, input) => {
      return await genericUpsertMutation(input, 'DictOdmianaWinogron');
    },
    upsertDictOperacjeNaWinnicy: async (root, input) => {
      return await genericUpsertMutation(input, 'DictOperacjeNaWinnicy');
    },
    upsertDictProcesy: async (root, input) => {
      return await genericUpsertMutation(input, 'DictProcesy');
    },
    upsertDictRolaUzytkownikow: async (root, input) => {
      return await genericUpsertMutation(input, 'DictRolaUzytkownikow');
    },
    upsertDictTypPartii: async (root, input) => {
      return await genericUpsertMutation(input, 'DictTypPartii');
    },
    upsertInformacjeOWinie: async (root, input) => {
      return await genericUpsertMutation(input, 'InformacjeOWinie');
    },
    upsertKontrahenci: async (root, input) => {
      return await genericUpsertMutation(input, 'Kontrahenci');
    },
    upsertListPrzewozowy: async (root, input) => {
      return await genericUpsertMutation(input, 'ListPrzewozowy');
    },
    upsertMagazyn: async (root, input) => {
      return await genericUpsertMutation(input, 'Magazyn');
    },
    upsertOperacje: async (root, input) => {
      return await genericUpsertMutation(input, 'Operacje');
    },
    upsertOperacjeNaWinnicy: async (root, input) => {
      return await genericUpsertMutation(input, 'OperacjeNaWinnicy');
    },
    upsertPartie: async (root, input) => {
      return await genericUpsertMutation(input, 'Partie');
    },
    upsertPlanyProdukcyjne: async (root, input) => {
      return await genericUpsertMutation(input, 'PlanyProdukcyjne');
    },
    upsertPozycjaWMagazynie: async (root, input) => {
      return await genericUpsertMutation(input, 'PozycjaWMagazynie');
    },
    upsertPrzesylka: async (root, input) => {
      return await genericUpsertMutation(input, 'Przesylka');
    },
    upsertRaporty: async (root, input) => {
      return await genericUpsertMutation(input, 'Raporty');
    },
    upsertUzytkownicy: async (root, input) => {
      return await genericUpsertMutation(input, 'Uzytkownicy');
    },
    upsertWinnica: async (root, input) => {
      return await genericUpsertMutation(input, 'Winnica');
    },
    upsertWinobranie: async (root, input) => {
      return await genericUpsertMutation(input, 'Winobranie');
    },
    upsertListPrzewozowyHasAdres: async (root, input) => {
      return await genericUpsertMutation(input, 'ListPrzewozowyHasAdres');
    },
    upsertListPrzewozowyHasKontrahenci: async (root, input) => {
      return await genericUpsertMutation(input, 'ListPrzewozowyHasKontrahenci');
    },
    upsertOperacjeHasPartie: async (root, input) => {
      return await genericUpsertMutation(input, 'OperacjeHasPartie');
    },
    upsertOperacjeHasPozycjaWMagazynie: async (root, input) => {
      return await genericUpsertMutation(input, 'OperacjeHasPozycjaWMagazynie');
    },
    upsertPlanyProdukcyjneHasPozycjaWMagazynie: async (root, input) => {
      return await genericUpsertMutation(input, 'PlanyProdukcyjneHasPozycjaWMagazynie');
    },
    upsertPrzesylkaHasPozycjaWMagazynie: async (root, input) => {
      return await genericUpsertMutation(input, 'PrzesylkaHasPozycjaWMagazynie');
    },
    upsertRaportyHasUzytkownicy: async (root, input) => {
      return await genericUpsertMutation(input, 'RaportyHasUzytkownicy');
    },

    deleteAdres: async (root, input) => {
      return await sequelize.deleteAdres(input);
    },
    deleteDictKategoriaWina: async (root, input) => {
      return await sequelize.deleteDictKategoriaWina(input);
    },
    deleteDictKategorie: async (root, input) => {
      return await sequelize.deleteDictKategorie(input);
    },
    deleteDictOdmianaWinogron: async (root, input) => {
      return await sequelize.deleteDictOdmianaWinogron(input);
    },
    deleteDictOperacjeNaWinnicy: async (root, input) => {
      return await sequelize.deleteDictOperacjeNaWinnicy(input);
    },
    deleteDictProcesy: async (root, input) => {
      return await sequelize.deleteDictProcesy(input);
    },
    deleteDictRolaUzytkownikow: async (root, input) => {
      return await sequelize.deleteDictRolaUzytkownikow(input);
    },
    deleteDictTypPartii: async (root, input) => {
      return await sequelize.deleteDictTypPartii(input);
    },
    deleteInformacjeOWinie: async (root, input) => {
      return await sequelize.deleteInformacjeOWinie(input);
    },
    deleteKontrahenci: async (root, input) => {
      return await sequelize.deleteKontrahenci(input);
    },
    deleteListPrzewozowy: async (root, input) => {
      return await sequelize.deleteListPrzewozowy(input);
    },
    deleteListPrzewozowyHasAdres: async (root, input) => {
      return await sequelize.deleteListPrzewozowyHasAdres(input);
    },
    deleteListPrzewozowyHasKontrahenci: async (root, input) => {
      return await sequelize.deleteListPrzewozowyHasKontrahenci(input);
    },
    deleteMagazyn: async (root, input) => {
      return await sequelize.deleteMagazyn(input);
    },
    deleteOperacje: async (root, input) => {
      return await sequelize.deleteOperacje(input);
    },
    deleteOperacjeHasPartie: async (root, input) => {
      return await sequelize.deleteOperacjeHasPartie(input);
    },
    deleteOperacjeHasPozycjaWMagazynie: async (root, input) => {
      return await sequelize.deleteOperacjeHasPozycjaWMagazynie(input);
    },
    deleteOperacjeNaWinnicy: async (root, input) => {
      return await sequelize.deleteOperacjeNaWinnicy(input);
    },
    deletePartie: async (root, input) => {
      return await sequelize.deletePartie(input);
    },
    deletePlanyProdukcyjne: async (root, input) => {
      return await sequelize.deletePlanyProdukcyjne(input);
    },
    deletePlanyProdukcyjneHasPozycjaWMagazynie: async (root, input) => {
      return await sequelize.deletePlanyProdukcyjneHasPozycjaWMagazynie(input);
    },
    deletePozycjaWMagazynie: async (root, input) => {
      return await sequelize.deletePozycjaWMagazynie(input);
    },
    deletePrzesylka: async (root, input) => {
      return await sequelize.deletePrzesylka(input);
    },
    deletePrzesylkaHasPozycjaWMagazynie: async (root, input) => {
      return await sequelize.deletePrzesylkaHasPozycjaWMagazynie(input);
    },
    deleteRaporty: async (root, input) => {
      return await sequelize.deleteRaporty(input);
    },
    deleteRaportyHasUzytkownicy: async (root, input) => {
      return await sequelize.deleteRaportyHasUzytkownicy(input);
    },
    deleteUzytkownicy: async (root, input) => {
      return await sequelize.deleteUzytkownicy(input);
    },
    deleteWinnica: async (root, input) => {
      return await sequelize.deleteWinnica(input);
    },
    deleteWinobranie: async (root, input) => {
      return await sequelize.deleteWinobranie(input);
    }
  }
};

const genericUpsertMutation = async (input, tableName) => {
  let insertResult;
  let sqlQuery;
  if (Object.keys(input)[0] !== tableIdName[tableName]) {
    // get dynamic FUNCTION name from insert model
    insertResult = await insert[tableName](input);
    sqlQuery = `select * from ${tableName} where 1=1 AND ${tableIdName[tableName]} = ${
      insertResult[0][tableIdName[tableName]]
    }`;
  } else {
    sqlQuery = `select * from ${tableName} where 1=1 AND ${tableIdName[tableName]} = ${Object.values(input)[0]}`;
    await insert[tableName](input);
  }

  let result = [];
  await new Promise(async resolve => {
    result.push(await sequelize.selectLast(sqlQuery));
    resolve();
  });
  result = _.flatten(result);
  return result[0];
};
