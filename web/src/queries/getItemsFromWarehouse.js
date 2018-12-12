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

  console.log('13, query jakub: ', query);
  return gql(query);
};

export default getItemsFromWarehouse;
