import gql from 'graphql-tag';

const getItemsFromWarehouse = warehouseID => {
  let query = `{
    Magazyn(idMagazyn: ${warehouseID}) {
    pozycjaWMagazynie {
      idPozycja
      nazwa
      opis
      ilosc
      stanAktualny
    }
  }
  }`;

  return gql(query);
};

export default getItemsFromWarehouse;
