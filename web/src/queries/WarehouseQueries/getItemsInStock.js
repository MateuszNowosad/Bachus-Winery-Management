import gql from 'graphql-tag';

const getItemsInStock = gql`
  {
    PozycjaWMagazynie {
    idPozycja
    nazwa
    opis
    ilosc
    stanAktualny
    dataPrzyjecia
    dataWydania
    nazwaSektora
    kategorie {
      nazwa
    }
    magazyn {
      idMagazyn
    }
  }
  }
`;

export default getItemsInStock;
